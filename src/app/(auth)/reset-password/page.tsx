'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, ArrowLeft, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { ResetPasswordFormValues, resetPasswordSchema } from '@/validation/validation';



export default function ResetPasswordPage() {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    console.log('Resetting password:', data);
    alert('Your password has been reset successfully! Please sign in with your new credentials.');
    router.push('/sign-in');
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="space-y-1 text-center sm:text-left border-b border-neutral-100 pb-4">
        <h1 className="text-base font-extrabold text-neutral-900 uppercase tracking-wider">
          RESET PASSWORD
        </h1>
        <p className="text-xs text-neutral-500 font-normal">
          Create a new strong password for your administrative account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* New Password Field */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
            NEW ADMIN PASSWORD
          </label>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Minimum 6 characters"
              {...register('newPassword')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded pl-9 pr-10 py-2.5 text-xs text-neutral-800 font-mono placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 text-neutral-400 hover:text-neutral-700 transition-colors p-0.5 cursor-pointer"
              title={showNewPassword ? 'Hide password' : 'Show password'}
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4 text-neutral-500" />
              ) : (
                <Eye className="w-4 h-4 text-neutral-500" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
            CONFIRM NEW PASSWORD
          </label>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter new password"
              {...register('confirmPassword')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded pl-9 pr-10 py-2.5 text-xs text-neutral-800 font-mono placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 text-neutral-400 hover:text-neutral-700 transition-colors p-0.5 cursor-pointer"
              title={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4 text-neutral-500" />
              ) : (
                <Eye className="w-4 h-4 text-neutral-500" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1c1c1c] hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider py-3 px-4 rounded transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>UPDATE PASSWORD & SIGN IN</span>
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Back to Sign In Link */}
      <div className="pt-2 text-center border-t border-neutral-100">
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SIGN IN</span>
        </Link>
      </div>
    </div>
  );
}