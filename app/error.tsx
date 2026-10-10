"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold text-foreground">Something went wrong!</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        An error occurred while loading this page.
      </p>
      <Button
        onClick={() => reset()}
        className="mt-6 gradient-primary text-white font-semibold"
      >
        Try again
      </Button>
    </div>
  )
}
