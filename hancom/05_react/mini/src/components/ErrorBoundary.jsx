import { Component } from 'react'
import Card from './Card'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error(error, info)
  }

  handleRetry = () => {
    this.props.onReset?.()
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        <Card className="mx-auto mt-10 max-w-sm p-6 text-center">
          <p className="mb-3 text-sm text-[var(--color-text-muted)]">문제가 발생했어요.</p>
          <button
            onClick={this.handleRetry}
            className="rounded-[6px] bg-[var(--color-primary)] px-4 py-2 text-sm text-[var(--color-surface)] transition-all hover:bg-[var(--color-primary-hover)] active:scale-[0.98]"
          >
            다시 시도
          </button>
        </Card>
      )
    }
    return this.props.children
  }
}
