'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShieldCheck, ArrowLeft, RotateCw } from 'lucide-react';

const verifyOtpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP code must be exactly 6 digits')
    .regex(/^\d+$/, 'OTP code must contain only numbers'),
});

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'admin@livable.co';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = (data: VerifyOtpFormValues) => {
    console.log('Verifying OTP:', data.otp);
    router.push('/reset-password');
  };

  const handleResendOtp = () => {
    alert(`A new 6-digit code has been sent to ${email}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="space-y-1 text-center sm:text-left border-b border-neutral-100 pb-4">
        <h1 className="text-base font-extrabold text-neutral-900 uppercase tracking-wider">
          VERIFY OTP CODE
        </h1>
        <p className="text-xs text-neutral-500 font-normal">
          Enter the 6-digit verification code sent to{' '}
          <span className="font-mono font-bold text-neutral-800">{email}</span>.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* OTP Input Field */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5 text-center">
            6-DIGIT VERIFICATION CODE
          </label>
          <input
            type="text"
            maxLength={6}
            placeholder="123456"
            {...register('otp')}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded py-3 text-center text-lg font-mono font-black tracking-[0.4em] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
          {errors.otp && (
            <p className="text-[11px] text-red-500 mt-1 font-medium text-center">
              {errors.otp.message}
            </p>
          )}
        </div>

        {/* Resend Code Link */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-xs font-bold text-[#ff3b30] hover:text-red-600 uppercase tracking-wider flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>RESEND CODE</span>
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1c1c1c] hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider py-3 px-4 rounded transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>VERIFY & CONTINUE</span>
            <ShieldCheck className="w-4 h-4" />
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