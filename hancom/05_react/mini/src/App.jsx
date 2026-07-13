import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Expenses from './pages/Expenses'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import Landing from './pages/Landing'
import { ThemeProvider } from './context/ThemeContext'
import { useTheme } from './hooks/useTheme'
import { UserProvider } from './context/UserContext'
import { useUser } from './hooks/useUser'

const navLinkClass = ({ isActive }) =>
  `text-sm transition-colors ${isActive ? 'text-[var(--color-text)] font-medium' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`

function Header() {
  const { theme, toggleTheme } = useTheme()
  const { name, clearName } = useUser()
  return (
    <header className="flex items-center gap-4 border-b border-[var(--color-border)] px-4 py-3">
      <NavLink to="/" className={navLinkClass}>가계부</NavLink>
      <NavLink to="/dashboard" className={navLinkClass}>대시보드</NavLink>
      <NavLink to="/calendar" className={navLinkClass}>캘린더</NavLink>
      <div className="ml-auto flex items-center gap-3">
        <span className="text-xs text-[var(--color-text-muted)]">{name}님</span>
        <button
          onClick={clearName}
          className="rounded-[6px] border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          다른 이름으로
        </button>
        <button
          onClick={toggleTheme}
          className="w-12 rounded-[6px] border border-[var(--color-border)] px-3 py-1 text-center text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          {theme === 'light' ? '다크 모드' : '라이트 모드'}
        </button>
      </div>
    </header>
  )
}

function AppShell() {
  const { name } = useUser()

  if (!name) return <Landing />

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Expenses />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppShell />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
