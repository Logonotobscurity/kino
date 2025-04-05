"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo)
    this.setState({ errorInfo })

    // You could also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-dark-800 border border-dark-600 rounded-lg text-center">
            <AlertTriangle className="h-12 w-12 text-pink mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-300 mb-4">We encountered an error while loading this content.</p>
            <TryAgainButton onReset={() => this.setState({ hasError: false, error: null, errorInfo: null })} />
          </div>
        )
      )
    }

    return this.props.children
  }
}

// Separate client component to handle the onClick event
function TryAgainButton({ onReset }: { onReset: () => void }) {
  return (
    <Button
      onClick={onReset}
      className="bg-pink hover:bg-pink-dark text-white"
    >
      Try Again
    </Button>
  )
}

