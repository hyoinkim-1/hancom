import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGODB_URI)
await client.connect()
const expenses = client.db('gagyebu').collection('expenses')

app.get('/api/expenses', async (req, res) => {
  const { user } = req.query
  const docs = await expenses.find(user ? { user } : {}).toArray()
  res.json(docs.map(({ _id, ...rest }) => ({ id: _id, ...rest })))
})

app.post('/api/expenses', async (req, res) => {
  const { amount, category, memo, user } = req.body
  const doc = { amount: Number(amount), category, memo, user, date: new Date().toISOString() }
  const result = await expenses.insertOne(doc)
  res.status(201).json({ id: result.insertedId, amount: doc.amount, category: doc.category, memo: doc.memo, user: doc.user, date: doc.date })
})

app.delete('/api/expenses/:id', async (req, res) => {
  await expenses.deleteOne({ _id: new ObjectId(req.params.id) })
  res.status(204).end()
})

const PORT = 4000
app.listen(PORT, () => console.log(`API server on http://localhost:${PORT}`))
