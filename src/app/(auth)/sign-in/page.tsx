'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, LogIn, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useSignInMutation } from '@/redux/features/auth/auth.api';
import { saveToken } from '@/utils/auth';
import { SignInFormValues, signInSchema } from '@/validation/validation';



export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [signIn, { isLoading }] = useSignInMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'unknownmr713@gmail.com',
      password: '1234',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setErrorMessage(null);
    try {
      const res = await signIn({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (res?.access) {
        await saveToken(res.access, res.refresh);
        router.push('/');
        router.refresh();
      } else {
        setErrorMessage('Sign in failed. Access token was not received.');
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      const apiError =
        err?.data?.detail ||
        err?.data?.message ||
        (Array.isArray(err?.data?.non_field_errors) && err.data.non_field_errors[0]) ||
        'Invalid credentials or server error. Please try again.';
      setErrorMessage(apiError);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="space-y-1 text-center sm:text-left border-b border-neutral-100 pb-4">
        <h1 className="text-base font-extrabold text-neutral-900 uppercase tracking-wider">
          ADMIN SIGN IN
        </h1>
        <p className="text-xs text-neutral-500 font-normal">
          Enter your administrative credentials to access the Relocation Ops Hub.
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Sign In Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
            ADMINISTRATIVE EMAIL
          </label>
          <div className="relative flex items-center">
            <Mail className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type="email"
              placeholder="admin@example.com"
              {...register('email')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded pl-9 pr-3 py-2.5 text-xs text-neutral-800 font-mono placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field with Show/Hide Toggle */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
            PASSWORD
          </label>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded pl-9 pr-10 py-2.5 text-xs text-neutral-800 font-mono placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-neutral-400 hover:text-neutral-700 transition-colors p-0.5 cursor-pointer"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-neutral-500" />
              ) : (
                <Eye className="w-4 h-4 text-neutral-500" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-neutral-600 font-medium cursor-pointer">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="accent-[#ff3b30] w-4 h-4 rounded"
            />
            <span>Remember session</span>
          </label>

          <Link
            href="/forgot-password"
            className="text-xs font-bold text-[#ff3b30] hover:text-red-600 uppercase tracking-wider transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1c1c1c] hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider py-3 px-4 rounded transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>SIGNING IN...</span>
              </>
            ) : (
              <>
                <span>SIGN IN TO OPS HUB</span>
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}