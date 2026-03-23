/**
 * @file frontend/src/App.jsx
 * @description Top-level React application shell and root UI composition entry.
 */

import useAuth from './features/auth/hooks/useAuth'
import { Link } from 'react-router-dom'

function App() {
  const { user, logout } = useAuth()

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] px-4 py-12 font-['Syne',sans-serif] text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-44 -top-24 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-sky-500/18 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-500/14 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/65 p-6 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-300/60 to-transparent" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Dashboard</p>
            <h1 className="mt-3 font-['Cormorant_Garamond',serif] text-5xl font-light leading-[0.95] tracking-tight text-slate-100 sm:text-6xl">
              Welcome{user?.username ? `, ${user.username}` : ''}
            </h1>
            <p className="mt-4 text-base text-slate-300/85 sm:text-lg">
              You are authenticated and ready to generate interview intelligence with role-specific preparation insights.
            </p>

            <div className="mt-6 grid max-w-md grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="p-3 text-center">
                <p className="font-['Cormorant_Garamond',serif] text-2xl font-semibold text-violet-100">AI</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Analyzer</p>
              </div>
              <div className="border-x border-white/10 p-3 text-center">
                <p className="font-['Cormorant_Garamond',serif] text-2xl font-semibold text-sky-100">Pro</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Reports</p>
              </div>
              <div className="p-3 text-center">
                <p className="font-['Cormorant_Garamond',serif] text-2xl font-semibold text-rose-100">Fast</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Workflow</p>
              </div>
            </div>
          </div>

          <div className="grid w-full max-w-sm grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              to="/ai"
              className="inline-flex items-center justify-center rounded-xl border border-violet-300/40 bg-violet-400/10 px-5 py-3 text-sm font-semibold text-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-400/15"
            >
              AI Analyzer
            </Link>
            <Link
              to="/interview-report"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-300/40 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-400/15"
            >
              Interview Report
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900 sm:col-span-2 lg:col-span-1"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Account</p>
          <p className="mt-2 text-lg text-slate-200">
            <span className="font-semibold text-slate-100">Email:</span> {user?.email || 'Not available'}
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
