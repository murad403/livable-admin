'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, X, Loader2 } from 'lucide-react';
import { createScheduleSchema, CreateScheduleFormValues } from '@/validation/validation';
import { useCreateScheduleMutation, useGetClientsQuery } from '@/redux/features/app/app.api';
import { toast } from 'sonner';

interface AddScheduleProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddSchedule({ isOpen, onClose }: AddScheduleProps) {
    const { data: clients, isLoading: isClientsLoading } = useGetClientsQuery();
    const [createSchedule, { isLoading: isCreating }] = useCreateScheduleMutation();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateScheduleFormValues>({
        resolver: zodResolver(createScheduleSchema),
        defaultValues: {
            clientId: '',
            date: new Date().toISOString().split('T')[0],
            start_time: '09:00',
            title: '',
            item_type: 'meeting',
            short_description: '',
            description: '',
            host_name: '',
            meeting_point: '',
            what_to_bring: '',
            google_maps_link: '',
            order: 1,
        },
    });

    if (!isOpen) return null;

    const handleFormSubmit = async (values: CreateScheduleFormValues) => {
        try {
            const selectedClientId = Number(values.clientId);
            if (isNaN(selectedClientId)) {
                toast.error('Please select a valid client');
                return;
            }

            await createSchedule({
                clientId: selectedClientId,
                data: {
                    date: values.date,
                    items: [
                        {
                            start_time: values.start_time,
                            title: values.title,
                            item_type: values.item_type,
                            short_description: values.short_description,
                            description: values.description,
                            host_name: values.host_name || undefined,
                            meeting_point: values.meeting_point || undefined,
                            what_to_bring: values.what_to_bring || undefined,
                            google_maps_link: values.google_maps_link || undefined,
                            order: Number(values.order || 1),
                        },
                    ],
                },
            }).unwrap();

            toast.success('Schedule created successfully!');
            reset();
            onClose();
        } catch (err: any) {
            console.error('Failed to create schedule:', err);
            const backendMsg =
                err?.data?.detail ||
                err?.data?.message ||
                (err?.data && typeof err.data === 'object' ? JSON.stringify(err.data) : null) ||
                'Failed to create schedule';
            toast.error(backendMsg);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs overflow-y-auto">
            <div className="bg-white rounded-sm border border-neutral-200 shadow-2xl w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <Calendar className="w-5 h-5 text-[#ff3b30]" />
                        <h2 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wider">
                            CREATE TODAY&apos;S SCHEDULE
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
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                        {/* Row 1: Select Client & Schedule Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Select Client <span className="text-[#ff3b30]">*</span>
                                </label>
                                <select
                                    {...register('clientId')}
                                    className={`w-full px-3 py-2 bg-white border text-xs text-neutral-900 rounded focus:outline-none transition-colors cursor-pointer ${errors.clientId
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-neutral-200 focus:border-neutral-400'
                                        }`}
                                >
                                    <option value="">-- Select Client --</option>
                                    {clients && clients.length > 0 ? (
                                        clients.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.full_name} ({c.email})
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            {isClientsLoading ? 'Loading clients...' : 'No clients found'}
                                        </option>
                                    )}
                                </select>
                                {errors.clientId && (
                                    <p className="mt-1 text-[11px] font-semibold text-red-500">
                                        {errors.clientId.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Schedule Date <span className="text-[#ff3b30]">*</span>
                                </label>
                                <input
                                    type="date"
                                    {...register('date')}
                                    className={`w-full px-3 py-2 bg-white border text-xs text-neutral-900 rounded focus:outline-none transition-colors ${errors.date
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-neutral-200 focus:border-neutral-400'
                                        }`}
                                />
                                {errors.date && (
                                    <p className="mt-1 text-[11px] font-semibold text-red-500">
                                        {errors.date.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative border-t border-neutral-200 my-2">
                            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-white px-2 text-[10px] font-extrabold uppercase text-neutral-400">
                                Item Details
                            </span>
                        </div>

                        {/* Row 2: Item Type, Start Time, Order */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Item Type <span className="text-[#ff3b30]">*</span>
                                </label>
                                <select
                                    {...register('item_type')}
                                    className={`w-full px-3 py-2 bg-white border text-xs text-neutral-900 rounded focus:outline-none transition-colors cursor-pointer ${errors.item_type
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-neutral-200 focus:border-neutral-400'
                                        }`}
                                >
                                    <option value="meeting">Meeting</option>
                                    <option value="recommendation">Recommendation</option>
                                    <option value="open_time">Open Time</option>
                                    <option value="hotel">Hotel</option>
                                </select>
                                {errors.item_type && (
                                    <p className="mt-1 text-[11px] font-semibold text-red-500">
                                        {errors.item_type.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Start Time <span className="text-[#ff3b30]">*</span>
                                </label>
                                <input
                                    type="time"
                                    {...register('start_time')}
                                    className={`w-full px-3 py-2 bg-white border text-xs text-neutral-900 rounded focus:outline-none transition-colors ${errors.start_time
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-neutral-200 focus:border-neutral-400'
                                        }`}
                                />
                                {errors.start_time && (
                                    <p className="mt-1 text-[11px] font-semibold text-red-500">
                                        {errors.start_time.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    {...register('order', { valueAsNumber: true })}
                                    className="w-full px-3 py-2 bg-white border border-neutral-200 text-xs text-neutral-900 rounded focus:outline-none focus:border-neutral-400"
                                />
                            </div>
                        </div>

                        {/* Row 3: Item Title */}
                        <div>
                            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                Item Title <span className="text-[#ff3b30]">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Neighborhood Guide Tour"
                                {...register('title')}
                                className={`w-full px-3 py-2 bg-white border text-xs text-neutral-900 rounded focus:outline-none transition-colors ${errors.title
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-neutral-200 focus:border-neutral-400'
                                    }`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-[11px] font-semibold text-red-500 font-sans">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Row 4: Short Description */}
                        <div>
                            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                Short Description <span className="text-[#ff3b30]">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Tour of the historical district."
                                {...register('short_description')}
                                className={`w-full px-3 py-2 bg-white border text-xs text-neutral-900 rounded focus:outline-none transition-colors ${errors.short_description
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-neutral-200 focus:border-neutral-400'
                                    }`}
                            />
                            {errors.short_description && (
                                <p className="mt-1 text-[11px] font-semibold text-red-500 font-sans">
                                    {errors.short_description.message}
                                </p>
                            )}
                        </div>

                        {/* Row 5: Detailed Description */}
                        <div>
                            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                Full Description <span className="text-[#ff3b30]">*</span>
                            </label>
                            <textarea
                                rows={3}
                                placeholder="Detailed itinerary and specifics for this item..."
                                {...register('description')}
                                className={`w-full px-3 py-2 bg-white border text-xs text-neutral-900 rounded focus:outline-none transition-colors ${errors.description
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-neutral-200 focus:border-neutral-400'
                                    }`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-[11px] font-semibold text-red-500 font-sans">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Row 6: Host Name & Meeting Point */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Host Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Anna"
                                    {...register('host_name')}
                                    className="w-full px-3 py-2 bg-white border border-neutral-200 text-xs text-neutral-900 rounded focus:outline-none focus:border-neutral-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Meeting Point
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Main Square Cafe"
                                    {...register('meeting_point')}
                                    className="w-full px-3 py-2 bg-white border border-neutral-200 text-xs text-neutral-900 rounded focus:outline-none focus:border-neutral-400"
                                />
                            </div>
                        </div>

                        {/* Row 7: What To Bring & Google Maps Link */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    What To Bring
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Comfortable shoes, passport"
                                    {...register('what_to_bring')}
                                    className="w-full px-3 py-2 bg-white border border-neutral-200 text-xs text-neutral-900 rounded focus:outline-none focus:border-neutral-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                    Google Maps Link
                                </label>
                                <input
                                    type="text"
                                    placeholder="https://maps.google.com/..."
                                    {...register('google_maps_link')}
                                    className="w-full px-3 py-2 bg-white border border-neutral-200 text-xs text-neutral-900 rounded focus:outline-none focus:border-neutral-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="px-6 py-4 bg-neutral-50/50 border-t border-neutral-200 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 border border-neutral-200 rounded text-xs font-bold text-neutral-600 hover:bg-white uppercase tracking-wider transition-colors cursor-pointer"
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="px-5 py-2 bg-[#1c1c1c] hover:bg-black text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs disabled:opacity-50 flex items-center gap-1.5"
                        >
                            {isCreating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                            <span>CREATE SCHEDULE</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
