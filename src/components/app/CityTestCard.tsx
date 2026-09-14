'use client';

import React from 'react';
import { TCityTest } from '@/redux/features/app/app.type';
import { Edit2, Trash2, MapPin, ExternalLink as ExternalLinkIcon, HelpCircle, FileText } from 'lucide-react';

interface CityTestCardProps {
  test: TCityTest;
  onEdit?: (test: TCityTest) => void;
  onDelete?: (test: TCityTest) => void;
}

export default function CityTestCard({
  test,
  onEdit,
  onDelete,
}: CityTestCardProps) {
  const categoryName = test.category || test.category_id || 'food';

  const getCategoryBadgeStyle = (cat: string) => {
    switch (cat) {
      case 'food':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'free_time':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'infrastructure':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-sm p-5 shadow-2xs flex flex-col justify-between h-full transition-shadow hover:shadow-xs">
      <div className="space-y-3">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-[#1a1a1a] text-sm tracking-tight uppercase">
              {test.title}
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5 uppercase">
              CITY: {test.city} • ID: {test.id}
            </p>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 border rounded-xs shrink-0 uppercase whitespace-nowrap ${getCategoryBadgeStyle(
              categoryName
            )}`}
          >
            {categoryName.replace('_', ' ')}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50/80 p-3 rounded border border-neutral-100">
          {test.short_description}
        </p>

        {/* Google Maps Link */}
        {test.google_maps_link && (
          <div className="flex items-center gap-1.5 text-xs text-neutral-700">
            <MapPin className="w-3.5 h-3.5 text-[#ff3b30] shrink-0" />
            <a
              href={test.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline truncate font-mono"
            >
              {test.google_maps_link}
            </a>
          </div>
        )}

        {/* External Links */}
        {test.external_links && test.external_links.length > 0 && (
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
              EXTERNAL LINKS:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {test.external_links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded border border-neutral-200 transition-colors"
                >
                  <span>{link.label}</span>
                  <ExternalLinkIcon className="w-3 h-3 text-neutral-500" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Note Prompts */}
        {test.note_prompts && test.note_prompts.length > 0 && (
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>NOTE PROMPTS:</span>
            </span>
            <ul className="list-disc list-inside text-xs text-neutral-600 space-y-0.5 font-mono">
              {test.note_prompts.map((note, idx) => (
                <li key={idx} className="truncate">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Question Prompts */}
        {test.question_prompts && test.question_prompts.length > 0 && (
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>QUESTION PROMPTS:</span>
            </span>
            <ul className="list-disc list-inside text-xs text-neutral-600 space-y-0.5 font-mono">
              {test.question_prompts.map((q, idx) => (
                <li key={idx} className="truncate">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Links Bar */}
      <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-[11px]">
        <span className="text-[11px] font-bold text-neutral-400 uppercase font-mono">
          ORDER: #{test.order}
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit?.(test)}
            className="font-bold text-neutral-600 hover:text-neutral-900 uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>EDIT</span>
          </button>

          <button
            onClick={() => onDelete?.(test)}
            className="font-bold text-neutral-400 hover:text-red-500 uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>DELETE</span>
          </button>
        </div>
      </div>
    </div>
  );
}