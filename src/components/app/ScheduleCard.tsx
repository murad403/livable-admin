'use client';
import { Calendar, Clock, MapPin, User, ShoppingBag, Trash2, Edit3, ExternalLink } from 'lucide-react';
import { TSchedule, TScheduleItem } from '@/redux/features/app/app.type';

interface ScheduleCardProps {
    schedule: TSchedule;
    onEditItem: (item: TScheduleItem) => void;
    onDeleteSchedule: (schedule: TSchedule) => void;
}

export default function ScheduleCard({ schedule, onEditItem, onDeleteSchedule }: ScheduleCardProps) {
    const getInitials = (name: string) => {
        if (!name) return 'C';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="bg-white border border-neutral-200 rounded-sm shadow-2xs overflow-hidden flex flex-col hover:border-neutral-300 transition-all duration-200">
            {/* Card Header: Client Info & Schedule Metadata */}
            <div className="bg-neutral-50/70 border-b border-neutral-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1c1c1c] text-white flex items-center justify-center font-extrabold text-sm shrink-0 border border-neutral-300 shadow-2xs">
                        {schedule.client_image ? (
                            <img
                                src={schedule.client_image}
                                alt={schedule.client_name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            getInitials(schedule.client_name)
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wide">
                                {schedule.client_name}
                            </h3>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-neutral-200/70 text-neutral-700 uppercase">
                                ID #{schedule.client_id}
                            </span>
                        </div>
                        <p className="text-xs text-neutral-500 font-medium">{schedule.client_email}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-neutral-200 text-xs font-bold text-neutral-700 shadow-2xs">
                        <Calendar className="w-3.5 h-3.5 text-[#ff3b30]" />
                        <span>{schedule.date}</span>
                    </div>

                    <div className="px-2.5 py-1 rounded bg-red-50 border border-red-100 text-xs font-bold text-[#ff3b30]">
                        {schedule.items_count || schedule.items?.length || 0} {schedule.items?.length === 1 ? 'Item' : 'Items'}
                    </div>

                    <button
                        onClick={() => onDeleteSchedule(schedule)}
                        title="Delete Schedule"
                        className="p-1.5 rounded border border-neutral-200 bg-white hover:bg-red-50 hover:border-red-200 text-neutral-400 hover:text-[#ff3b30] transition-colors cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Items Section */}
            <div className="p-4 flex-1 space-y-4">
                {schedule.items && schedule.items.length > 0 ? (
                    schedule.items.map((item, index) => (
                        <div
                            key={item.id || index}
                            className="bg-white border border-neutral-200 rounded p-4 space-y-3 relative hover:border-neutral-300 transition-colors group"
                        >
                            {/* Item Top Row: Time, Type Badge, Edit Button */}
                            <div className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-2.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-neutral-900 text-white rounded text-[11px] font-extrabold uppercase tracking-wider">
                                        <Clock className="w-3 h-3 text-[#ff3b30]" />
                                        <span>{item.start_time}</span>
                                    </div>
                                    <span className="px-2.5 py-0.5 bg-red-50 text-[#ff3b30] border border-red-100 rounded text-[10px] font-extrabold uppercase tracking-wider">
                                        {item.item_type || item.type || 'EVENT'}
                                    </span>
                                    {item.order ? (
                                        <span className="text-[10px] font-semibold text-neutral-400">
                                            Order #{item.order}
                                        </span>
                                    ) : null}
                                </div>

                                <button
                                    onClick={() => onEditItem(item)}
                                    className="flex items-center gap-1 text-xs font-bold text-neutral-600 hover:text-[#ff3b30] px-2 py-1 rounded hover:bg-neutral-100 transition-colors cursor-pointer"
                                >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">EDIT</span>
                                </button>
                            </div>

                            {/* Title & Short Description */}
                            <div>
                                <h4 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wide">
                                    {item.title}
                                </h4>
                                {item.short_description && (
                                    <p className="text-xs text-neutral-600 font-medium mt-0.5">
                                        {item.short_description}
                                    </p>
                                )}
                            </div>

                            {/* Detailed Description */}
                            {item.description && (
                                <div className="text-xs text-neutral-600 leading-relaxed bg-neutral-50/60 p-2.5 rounded border border-neutral-100">
                                    {item.description}
                                </div>
                            )}

                            {/* Metadata Pills */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                {item.host_name && (
                                    <div className="flex items-center gap-2 text-xs text-neutral-700 bg-white border border-neutral-200 px-2.5 py-1.5 rounded">
                                        <User className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                                        <span className="truncate">
                                            <strong className="text-neutral-500 font-bold">Host:</strong> {item.host_name}
                                        </span>
                                    </div>
                                )}

                                {item.meeting_point && (
                                    <div className="flex items-center gap-2 text-xs text-neutral-700 bg-white border border-neutral-200 px-2.5 py-1.5 rounded">
                                        <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                                        <span className="truncate">
                                            <strong className="text-neutral-500 font-bold">Point:</strong> {item.meeting_point}
                                        </span>
                                    </div>
                                )}

                                {item.what_to_bring && (
                                    <div className="flex items-center gap-2 text-xs text-neutral-700 bg-white border border-neutral-200 px-2.5 py-1.5 rounded">
                                        <ShoppingBag className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                                        <span className="truncate">
                                            <strong className="text-neutral-500 font-bold">Bring:</strong> {item.what_to_bring}
                                        </span>
                                    </div>
                                )}

                                {item.google_maps_link && (
                                    <a
                                        href={item.google_maps_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs text-[#ff3b30] hover:underline bg-red-50/50 border border-red-100 px-2.5 py-1.5 rounded font-semibold truncate"
                                    >
                                        <MapPin className="w-3.5 h-3.5 text-[#ff3b30] shrink-0" />
                                        <span className="truncate">Google Maps</span>
                                        <ExternalLink className="w-3 h-3 shrink-0 ml-auto" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-6 text-xs text-neutral-400 font-medium">
                        No items in this schedule yet.
                    </div>
                )}
            </div>
        </div>
    );
}
