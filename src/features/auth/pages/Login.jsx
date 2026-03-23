/**
 * @file frontend/src/features/auth/pages/Login.jsx
 * @description Login page UI and form wiring for user sign-in.
 */
import { joiResolver } from '@hookform/resolvers/joi'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth.js'
import { loginSchema } from '../validation/login.validation.js'
import { loginRequest } from '../api/auth.api.js'

const WorkspaceAside = memo(function WorkspaceAside() {
    return (
        <aside className="hidden bg-slate-900 p-10 text-slate-100 md:flex md:flex-col md:justify-between">
            <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Interview Access</p>
                <h1 className="text-3xl font-semibold leading-tight">
                    Sign in to unlock your AI interview reports.
                </h1>
                <p className="max-w-sm text-sm leading-6 text-slate-300">
                    Review past sessions, explore tailored questions, and follow a clear roadmap to improve every interview.
                </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-sm leading-6 text-slate-200">
                    "The insights made it obvious what to fix before my next interview."
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-400">Software Engineer Candidate</p>
            </div>
        </aside>
    )
})

const Login = () => {
    const { setUser } = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: joiResolver(loginSchema),
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    const onSubmit = useCallback(async (values) => {
        try {
            const data = await loginRequest(values)
            const token = data?.token
            const authUser = {
                token,
                username: data?.user?.username || '',
                email: data?.user?.email || '',
            }
            if (token) {
                localStorage.setItem('token', token)
            }
            localStorage.setItem('auth_user', JSON.stringify(authUser))
            setUser(authUser)

            toast.success(data?.message || 'Login successful')
            navigate('/')
        } catch (error) {
            setError('root', { message: error?.message || 'Login failed' })
            toast.error(error?.message || 'Login failed')
        }
    }, [navigate, setError, setUser])

    

    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-100 px-4 py-10 font-['Manrope',sans-serif] sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
                <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center">
                <section className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_28px_80px_-30px_rgba(15,23,42,0.4)] md:grid-cols-[1.05fr_0.95fr]">
                    <WorkspaceAside />

                    <section className="p-6 sm:p-8 md:p-10">
                        <div className="mx-auto w-full max-w-md">
                            <div className="mb-8 space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Welcome Back</p>
                                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Sign in to your interview space</h2>
                                <p className="text-sm text-slate-500">Use your account to access AI-generated interview reports and insights.</p>
                            </div>

                            <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
                                {errors.root?.message && (
                                    <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                                        {errors.root.message}
                                    </p>
                                )}
                                <section className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email')}
                                        placeholder="you@company.com"
                                        className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                                    />
                                    {errors.email && (
                                        <p className="text-xs font-medium text-rose-600">{errors.email.message}</p>
                                    )}
                                </section>

                                <section className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        {...register('password')}
                                        placeholder="Enter your password"
                                        className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                                    />
                                    {errors.password && (
                                        <p className="text-xs font-medium text-rose-600">{errors.password.message}</p>
                                    )}
                                </section>


                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="h-11 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
                                >
                                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                                </button>
                            </form>

                            <p className="mt-6 text-center text-sm text-slate-500">
                                New here?{' '}
                                <Link to="/register" className="font-semibold text-slate-900 transition hover:text-slate-700">
                                    Create an account to start practicing
                                </Link>
                            </p>
                        </div>
                    </section>
                </section>
            </div>
        </main>
    )
}

export default Login