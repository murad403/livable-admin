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
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const externalLinkSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  url: z.string().min(1, 'URL is required'),
});

export const cityTestSchema = z.object({
  id: z
    .string()
    .min(1, 'ID is required')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Enter a valid slug consisting of letters, numbers, underscores or hyphens (e.g. everyday-lunch)'
    ),
  city: z.string().min(1, 'City is required'),
  category: z.string().min(1, 'Category is required'),
  title: z.string().min(1, 'Title is required'),
  short_description: z.string().min(1, 'Short description is required'),
  google_maps_link: z.string().min(1, 'Google Maps link is required'),
  external_links: z.array(externalLinkSchema),
  note_prompts: z.array(z.string()),
  question_prompts: z.array(z.string()),
  order: z.number().min(1, 'Order must be at least 1'),
});

export type CityTestFormValues = z.infer<typeof cityTestSchema>;

export const createScheduleSchema = z.object({
  clientId: z.string().min(1, 'Client selection is required'),
  date: z.string().min(1, 'Date is required'),
  start_time: z.string().min(1, 'Start time is required'),
  title: z.string().min(1, 'Title is required'),
  item_type: z.string().min(1, 'Item type is required'),
  short_description: z.string().min(1, 'Short description is required'),
  description: z.string().min(1, 'Description is required'),
  host_name: z.string().optional(),
  meeting_point: z.string().optional(),
  what_to_bring: z.string().optional(),
  google_maps_link: z.string().optional(),
  order: z.number().min(1, 'Order must be at least 1'),
});

export type CreateScheduleFormValues = z.infer<typeof createScheduleSchema>;

export const updateScheduleItemSchema = z.object({
  start_time: z.string().min(1, 'Start time is required'),
  title: z.string().min(1, 'Title is required'),
  item_type: z.string().min(1, 'Item type is required'),
  short_description: z.string().min(1, 'Short description is required'),
  description: z.string().min(1, 'Description is required'),
  host_name: z.string().optional(),
  meeting_point: z.string().optional(),
  what_to_bring: z.string().optional(),
  google_maps_link: z.string().optional(),
  order: z.number().min(1, 'Order must be at least 1'),
});

export type UpdateScheduleItemFormValues = z.infer<typeof updateScheduleItemSchema>;


