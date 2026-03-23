/**
 * @file frontend/src/features/auth/pages/Register.jsx
 * @description Registration page UI and form wiring for account creation.
 */
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth.js'
import { registerRequest } from '../api/auth.api.js'
import { registerSchema } from '../validation/register.validation.js'

const Register = () => {
    const { setUser } = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
        resolver: joiResolver(registerSchema),
    })

    const onSubmit = async (values) => {
        try {
            const data = await registerRequest(values)
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
            toast.success(data?.message || 'Account created successfully')
            navigate('/')
        } catch (error) {
            setError('root', { message: error?.message || 'Registration failed' })
            toast.error(error?.message || 'Registration failed')
        }
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-100 px-4 py-10 font-['Manrope',sans-serif] sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
                <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center">
                <section className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_28px_80px_-30px_rgba(15,23,42,0.4)] md:grid-cols-[1.05fr_0.95fr]">
                    <aside className="hidden bg-slate-900 p-10 text-slate-100 md:flex md:flex-col md:justify-between">
                        <div className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Interview Setup</p>
                            <h1 className="text-3xl font-semibold leading-tight">
                                Create your account and start practicing with AI.
                            </h1>
                            <p className="max-w-sm text-sm leading-6 text-slate-300">
                                Generate realistic interview sessions, get structured feedback, and follow a personalized roadmap to improve with every attempt.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                            <p className="text-sm leading-6 text-slate-200">
                                "The reports highlighted my weak areas and gave me a clear plan before my actual interview."
                            </p>
                            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-400">Product Design Candidate</p>
                        </div>
                    </aside>

                    <section className="p-6 sm:p-8 md:p-10">
                        <div className="mx-auto w-full max-w-md">
                            <div className="mb-8 space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Get Started</p>
                                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Create your interview account</h2>
                                <p className="text-sm text-slate-500">Fill in the details below to generate AI-powered interview reports and preparation plans.</p>
                            </div>

                            <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
                                {errors.root?.message && (
                                    <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                                        {errors.root.message}
                                    </p>
                                )}
                                <section className="space-y-2">
                                    <label htmlFor="username" className="text-sm font-medium text-slate-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        {...register('username')}
                                        placeholder="your-username"
                                        className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                                    />
                                    {errors.username && (
                                        <p className="text-xs font-medium text-rose-600">{errors.username.message}</p>
                                    )}
                                </section>

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
                                    <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        {...register('password')}
                                        placeholder="Create a password"
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
                                    {isSubmitting ? 'Creating account...' : 'Create Account'}
                                </button>
                            </form>

                            <p className="mt-6 text-center text-sm text-slate-500">
                                Already have an account?{' '}
                                <Link to="/login" className="font-semibold text-slate-900 transition hover:text-slate-700">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </section>
                </section>
            </div>
        </main>
    )
}

export default Register