import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`)
  })
  next()
})

const client = new MongoClient(process.env.MONGODB_URI)
await client.connect()
console.log('MongoDB connected')
const expenses = client.db('gagyebu').collection('expenses')

function asyncHandler(fn, errorMessage) {
  return async (req, res) => {
    try {
      await fn(req, res)
    } catch (err) {
      console.error(`${req.method} ${req.originalUrl} failed:`, err)
      res.status(500).json({ error: errorMessage })
    }
  }
}

// 금액은 정수(원 단위)로 반올림하고, 카테고리 없거나 금액이 0 이하면 유효하지 않은 것으로 처리
function parseExpenseInput(body) {
  const amount = Math.round(Number(body.amount))
  if (!Number.isFinite(amount) || amount <= 0 || !body.category) return null
  return { amount, category: body.category, memo: body.memo ?? '' }
}

app.get(
  '/api/expenses',
  asyncHandler(async (req, res) => {
    const { user } = req.query
    if (!user) return res.status(400).json({ error: 'user 파라미터가 필요합니다.' })
    const docs = await expenses.find({ user }).toArray()
    res.json(docs.map(({ _id, ...rest }) => ({ id: _id, ...rest })))
  }, '지출 목록을 불러오지 못했어요.'),
)

app.post(
  '/api/expenses',
  asyncHandler(async (req, res) => {
    const parsed = parseExpenseInput(req.body)
    if (!parsed) return res.status(400).json({ error: '금액과 카테고리를 확인해주세요.' })
    const doc = { ...parsed, user: req.body.user, date: new Date().toISOString() }
    const result = await expenses.insertOne(doc)
    res.status(201).json({ id: result.insertedId, amount: doc.amount, category: doc.category, memo: doc.memo, user: doc.user, date: doc.date })
  }, '지출 추가에 실패했어요.'),
)

app.put(
  '/api/expenses/:id',
  asyncHandler(async (req, res) => {
    const parsed = parseExpenseInput(req.body)
    if (!parsed) return res.status(400).json({ error: '금액과 카테고리를 확인해주세요.' })
    const _id = new ObjectId(req.params.id)
    await expenses.updateOne({ _id }, { $set: parsed })
    const updated = await expenses.findOne({ _id })
    res.json({
      id: updated._id,
      amount: updated.amount,
      category: updated.category,
      memo: updated.memo,
      user: updated.user,
      date: updated.date,
    })
  }, '수정에 실패했어요.'),
)

app.delete(
  '/api/expenses/:id',
  asyncHandler(async (req, res) => {
    await expenses.deleteOne({ _id: new ObjectId(req.params.id) })
    res.status(204).end()
  }, '삭제에 실패했어요.'),
)

const PORT = 4000
app.listen(PORT, () => console.log(`API server on http://localhost:${PORT}`))
