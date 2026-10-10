"use client"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: "2rem", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "sans-serif", textAlign: "center" }}>
        <h2>Something went wrong!</h2>
        <button
          onClick={() => reset()}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer" }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
