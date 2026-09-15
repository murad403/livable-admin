'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Save, Camera, Loader2 } from 'lucide-react';
import { profileSchema, ProfileFormValues } from '@/validation/validation';
import { useGetMeQuery, useUpdateMeMutation } from '@/redux/features/auth/auth.api';
import { toast } from 'sonner';

export default function ProfileTab() {
  const { data: userData, isLoading: isUserLoading } = useGetMeQuery();
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
      });
      if (userData.image) {
        setImagePreview(userData.image);
      }
    }
  }, [userData, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (values: ProfileFormValues) => {
    try {
      const formData = new FormData();
      formData.append('first_name', values.first_name);
      formData.append('last_name', values.last_name);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      await updateMe(formData).unwrap();
      toast.success('Admin Profile updated successfully!');
      setSelectedFile(null);
    } catch (err: any) {
      console.error('Failed to update profile:', err);
      toast.error(err?.data?.message || err?.data?.detail || 'Failed to update profile');
    }
  };

  if (isUserLoading) {
    return (
      <div className="py-12 flex items-center justify-center gap-2 text-neutral-500 text-xs font-medium">
        <Loader2 className="w-4 h-4 animate-spin text-[#ff3b30]" />
        <span>Loading profile data...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-xs font-extrabold text-neutral-800 uppercase tracking-wider border-b border-neutral-100 pb-3">
        <User className="w-4 h-4 text-[#ff3b30]" />
        <span>ADMINISTRATOR PERSONAL & CONTACT INFORMATION</span>
      </div>

      {/* Profile Image Section */}
      <div className="flex items-center gap-5">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-neutral-200 bg-neutral-100 flex items-center justify-center shrink-0">
          {imagePreview ? (
            // eslint-disable-next-next/no-img-element
            <img
              src={imagePreview}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-neutral-400" />
          )}
          <label
            htmlFor="profile-image-input"
            className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white"
            title="Change photo"
          >
            <Camera className="w-5 h-5" />
          </label>
        </div>

        <div>
          <label
            htmlFor="profile-image-input"
            className="inline-block px-3 py-1.5 bg-white border border-neutral-200 rounded text-xs font-bold text-neutral-700 hover:bg-neutral-50 uppercase tracking-wider cursor-pointer transition-colors shadow-2xs"
          >
            CHANGE PHOTO
          </label>
          <input
            id="profile-image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <p className="text-[11px] text-neutral-400 mt-1">
            JPG, PNG or WEBP formats allowed.
          </p>
        </div>
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* FIRST NAME */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            <User className="w-3.5 h-3.5 text-[#ff3b30]" />
            <span>FIRST NAME *</span>
          </label>
          <input
            type="text"
            {...register('first_name')}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
          {errors.first_name && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              {errors.first_name.message}
            </p>
          )}
        </div>

        {/* LAST NAME */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            <User className="w-3.5 h-3.5 text-[#ff3b30]" />
            <span>LAST NAME *</span>
          </label>
          <input
            type="text"
            {...register('last_name')}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
          {errors.last_name && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              {errors.last_name.message}
            </p>
          )}
        </div>

        {/* ADMINISTRATIVE EMAIL (READ ONLY) */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            <Mail className="w-3.5 h-3.5 text-neutral-400" />
            <span>ADMINISTRATIVE EMAIL (READ-ONLY)</span>
          </label>
          <input
            type="email"
            {...register('email')}
            disabled
            className="w-full bg-neutral-100 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-500 font-mono cursor-not-allowed select-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-[#1c1c1c] hover:bg-black text-white px-6 py-2.5 rounded text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
        >
          {isUpdating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>SAVING...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>SAVE ADMIN PROFILE CHANGES</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}