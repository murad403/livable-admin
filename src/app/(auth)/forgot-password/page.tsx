'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Valid email address is required'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log('Sending OTP to:', data.email);
    router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="space-y-1 text-center sm:text-left border-b border-neutral-100 pb-4">
        <h1 className="text-base font-extrabold text-neutral-900 uppercase tracking-wider">
          FORGOT PASSWORD
        </h1>
        <p className="text-xs text-neutral-500 font-normal">
          Enter your registered administrative email to receive a 6-digit verification code.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
            REGISTERED ADMINISTRATIVE EMAIL
          </label>
          <div className="relative flex items-center">
            <Mail className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type="email"
              placeholder="admin@livable.co"
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

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#ff3b30] hover:bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider py-3 px-4 rounded transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>SEND VERIFICATION CODE</span>
            <Send className="w-4 h-4" />
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