/**
 * @file frontend/src/features/auth/components/AuthLoading.jsx
 * @description Authentication loading indicator component for route/session transitions.
 */
const AuthLoading = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 font-['Manrope',sans-serif]">
      <section className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
        <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Checking Session</h1>
        <p className="mt-2 text-sm text-slate-600">Please wait while we verify your authentication.</p>
      </section>
    </main>
  )
}

export default AuthLoading
