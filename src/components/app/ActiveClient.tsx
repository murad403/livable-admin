'use client';

import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface Dossier {
  id: string;
  name: string;
  email: string;
  destination: string;
  phase: string;
  progress: number;
}

const dossiers: Dossier[] = [
  {
    id: '1',
    name: 'ALEX & SARAH VANCE',
    email: 'client@livable.co',
    destination: 'VALENCIA & PORTO',
    phase: '03',
    progress: 100,
  },
  {
    id: '2',
    name: 'ELENA ROSSI & MARCUS COLE',
    email: 'elena.marcus@gmail.com',
    destination: 'LISBON & CASCAIS',
    phase: '01',
    progress: 33,
  },
  {
    id: '3',
    name: 'DAVID CHEN',
    email: 'david.chen.tech@outlook.com',
    destination: 'MADRID (SALAMANCA / CHAMBERÍ)',
    phase: '03',
    progress: 88,
  },
  {
    id: '4',
    name: 'SOPHIA & LIAM CLARK',
    email: 'sophia.clark@venturecap.io',
    destination: 'PORTO (FOZ DO DOURO)',
    phase: '01',
    progress: 45,
  },
  {
    id: '5',
    name: 'JAMES & VICTORIA STERLING',
    email: 'jsterling@sterlingholdings.co.uk',
    destination: 'BARCELONA (SARRIÀ-SANT GERVASI)',
    phase: '02',
    progress: 60,
  },
];

export default function ActiveClient() {
  return (
    <div className="bg-white border border-neutral-200 rounded p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs font-bold text-neutral-800 uppercase tracking-widest">
          ACTIVE CLIENT DOSSIERS
        </h2>
        <a
          href="#"
          className="text-xs font-bold text-[#ff3b30] hover:text-red-600 uppercase tracking-wider flex items-center gap-0.5 transition-colors"
        >
          <span>VIEW ALL</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-100 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              <th className="py-2.5 px-3 font-bold">CLIENT</th>
              <th className="py-2.5 px-3 font-bold">DESTINATION</th>
              <th className="py-2.5 px-3 font-bold text-center">PHASE</th>
              <th className="py-2.5 px-3 font-bold">PROGRESS</th>
              <th className="py-2.5 px-3 font-bold text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs">
            {dossiers.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-neutral-50/60 transition-colors"
              >
                {/* Client Name & Email */}
                <td className="py-4 px-3 align-middle min-w-50">
                  <div className="font-extrabold text-neutral-800 uppercase tracking-tight text-xs">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                    {item.email}
                  </div>
                </td>

                {/* Destination */}
                <td className="py-4 px-3 align-middle font-bold text-neutral-800 uppercase text-xs tracking-tight max-w-50">
                  {item.destination}
                </td>

                {/* Phase Badge */}
                <td className="py-4 px-3 align-middle text-center">
                  <div className="inline-flex flex-col items-center justify-center border border-neutral-200 rounded px-2 py-0.5 bg-neutral-50/50">
                    <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-semibold leading-tight">
                      Phase
                    </span>
                    <span className="text-xs font-black text-neutral-800 leading-tight">
                      {item.phase}
                    </span>
                  </div>
                </td>

                {/* Progress Bar & Percent */}
                <td className="py-4 px-3 align-middle min-w-35">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#ff3b30] h-full rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-neutral-600 font-mono min-w-8 text-right">
                      {item.progress}%
                    </span>
                  </div>
                </td>

                {/* Action Link */}
                <td className="py-4 px-3 align-middle text-center">
                  <a
                    href="#"
                    className="inline-flex flex-col items-center text-[11px] font-extrabold text-neutral-800 hover:text-[#ff3b30] tracking-wider uppercase transition-colors group"
                  >
                    <span>MANAGE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#ff3b30] group-hover:translate-x-0.5 transition-all -mt-0.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}