import z from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;


export const forgotPasswordSchema = z.object({
  email: z.string().email('Valid email address is required'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP code must be exactly 6 digits')
    .regex(/^\d+$/, 'OTP code must contain only numbers'),
});

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

export const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Valid email address is required'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;