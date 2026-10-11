import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const dynamic = 'force-static'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
        404
      </span>
      <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-md text-sm sm:text-base text-muted-foreground">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:opacity-95"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  )
}
