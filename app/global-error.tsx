'use client'

export const dynamic = 'force-static'
export const revalidate = 0

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
          <h2>Something went wrong!</h2>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>An unexpected error occurred.</p>
          <button
            onClick={() => reset()}
            style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '0.75rem', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
