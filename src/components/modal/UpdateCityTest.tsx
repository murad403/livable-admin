'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit2, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { cityTestSchema, CityTestFormValues } from '@/validation/validation';
import { TCityTest } from '@/redux/features/app/app.type';
import { useUpdateCityTestMutation } from '@/redux/features/app/app.api';
import { toast } from 'sonner';

interface UpdateCityTestProps {
  isOpen: boolean;
  test: TCityTest | null;
  onClose: () => void;
}

export default function UpdateCityTest({
  isOpen,
  test,
  onClose,
}: UpdateCityTestProps) {
  const [updateCityTest, { isLoading }] = useUpdateCityTestMutation();

  const [notePromptsText, setNotePromptsText] = useState('');
  const [questionPromptsText, setQuestionPromptsText] = useState('');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CityTestFormValues>({
    resolver: zodResolver(cityTestSchema),
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'external_links',
  });

  useEffect(() => {
    if (test) {
      reset({
        id: test.id || '',
        city: test.city || '',
        category: test.category || test.category_id || 'food',
        title: test.title || '',
        short_description: test.short_description || '',
        google_maps_link: test.google_maps_link || '',
        external_links: test.external_links || [],
        note_prompts: test.note_prompts || [],
        question_prompts: test.question_prompts || [],
        order: test.order || 1,
      });
      replace(test.external_links || []);
      setNotePromptsText(test.note_prompts ? test.note_prompts.join('\n') : '');
      setQuestionPromptsText(test.question_prompts ? test.question_prompts.join('\n') : '');
    }
  }, [test, reset, replace]);

  if (!isOpen || !test) return null;

  const handleFormSubmit = async (values: CityTestFormValues) => {
    try {
      const parsedNotePrompts = notePromptsText
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const parsedQuestionPrompts = questionPromptsText
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const cleanExternalLinks = (values.external_links || []).filter(
        (link) => link.label.trim() && link.url.trim()
      );

      await updateCityTest({
        id: test.id,
        data: {
          id: values.id,
          city: values.city,
          category: values.category,
          title: values.title,
          short_description: values.short_description,
          google_maps_link: values.google_maps_link,
          external_links: cleanExternalLinks,
          note_prompts: parsedNotePrompts,
          question_prompts: parsedQuestionPrompts,
          order: Number(values.order),
        },
      }).unwrap();

      toast.success('City test updated successfully!');
      onClose();
    } catch (err: any) {
      console.error('Failed to update city test:', err);
      const backendMsg =
        err?.data?.id?.[0] ||
        err?.data?.detail ||
        err?.data?.message ||
        'Failed to update city test';
      toast.error(backendMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs overflow-y-auto">
      <div className="bg-white rounded-sm border border-neutral-200 shadow-2xl w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Edit2 className="w-5 h-5 text-[#ff3b30]" />
            <h2 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wider">
              UPDATE CITY TEST ({test.id})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ID */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                ID (UNIQUE KEY) *
              </label>
              <input
                type="text"
                {...register('id')}
                disabled
                className="w-full bg-neutral-100 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-500 font-mono cursor-not-allowed select-none"
              />
            </div>

            {/* CITY */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                CITY *
              </label>
              <input
                type="text"
                placeholder="e.g. dhaka"
                {...register('city')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.city && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.city.message}</p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                CATEGORY *
              </label>
              <select
                {...register('category')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-bold uppercase focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors cursor-pointer"
              >
                <option value="food">FOOD</option>
                <option value="free_time">FREE TIME</option>
                <option value="infrastructure">INFRASTRUCTURE</option>
              </select>
              {errors.category && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.category.message}</p>
              )}
            </div>

            {/* ORDER */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                DISPLAY ORDER *
              </label>
              <input
                type="number"
                placeholder="1"
                {...register('order', { valueAsNumber: true })}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.order && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.order.message}</p>
              )}
            </div>
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              TITLE *
            </label>
            <input
              type="text"
              placeholder="e.g. Everyday Lunch"
              {...register('title')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-bold uppercase placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
            {errors.title && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.title.message}</p>
            )}
          </div>

          {/* SHORT DESCRIPTION */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              SHORT DESCRIPTION *
            </label>
            <textarea
              rows={3}
              placeholder="Menús del día are traditional set lunches..."
              {...register('short_description')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors resize-none"
            />
            {errors.short_description && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.short_description.message}</p>
            )}
          </div>

          {/* GOOGLE MAPS LINK */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              GOOGLE MAPS LINK *
            </label>
            <input
              type="text"
              placeholder="https://maps.google.com/..."
              {...register('google_maps_link')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
            {errors.google_maps_link && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.google_maps_link.message}</p>
            )}
          </div>

          {/* EXTERNAL LINKS */}
          <div className="space-y-2 border-t border-neutral-100 pt-3">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                EXTERNAL LINKS
              </label>
              <button
                type="button"
                onClick={() => append({ label: '', url: '' })}
                className="text-[11px] font-bold text-[#ff3b30] hover:text-red-600 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>ADD LINK</span>
              </button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Label (e.g. Favorite)"
                  {...register(`external_links.${index}.label` as const)}
                  className="flex-1 bg-neutral-50/80 border border-neutral-200 rounded px-3 py-1.5 text-xs text-neutral-800"
                />
                <input
                  type="text"
                  placeholder="URL (https://...)"
                  {...register(`external_links.${index}.url` as const)}
                  className="flex-1 bg-neutral-50/80 border border-neutral-200 rounded px-3 py-1.5 text-xs text-neutral-800 font-mono"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* NOTE PROMPTS */}
          <div className="border-t border-neutral-100 pt-3">
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              NOTE PROMPTS (ONE PER LINE)
            </label>
            <textarea
              rows={3}
              placeholder="Price...&#10;Mostly locals...&#10;Tried..."
              value={notePromptsText}
              onChange={(e) => setNotePromptsText(e.target.value)}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors resize-none"
            />
          </div>

          {/* QUESTION PROMPTS */}
          <div className="border-t border-neutral-100 pt-3">
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              QUESTION PROMPTS (ONE PER LINE)
            </label>
            <textarea
              rows={3}
              placeholder="Typical price for this neighborhood?&#10;Did we handle the tipping etiquette correctly?"
              value={questionPromptsText}
              onChange={(e) => setQuestionPromptsText(e.target.value)}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors resize-none"
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-neutral-200 rounded text-xs font-bold text-neutral-600 hover:bg-neutral-50 uppercase tracking-wider transition-colors cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 bg-[#ff3b30] hover:bg-red-600 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs disabled:opacity-50 flex items-center gap-1.5"
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>SAVE CHANGES</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}