import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-black text-cyan-400">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-foreground">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-primary text-white text-sm font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Return Home
      </Link>
    </div>
  )
}
