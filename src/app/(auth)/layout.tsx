import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] flex flex-col justify-center items-center p-4 sm:p-6 select-none font-sans">
      {/* Brand Header Badge */}
      <div className="flex flex-col items-center mb-6 text-center space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ff3b30] flex items-center justify-center font-black text-white text-2xl rounded-sm tracking-tighter shadow-md">
            L
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-base text-neutral-900 uppercase">
                LIVABLE™
              </span>
              <span className="bg-[#ff3b30] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-widest leading-none">
                ADMIN
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 tracking-wider uppercase font-semibold">
              RELOCATION OPS HUB
            </span>
          </div>
        </div>
      </div>

      {/* Main Auth Form Container Card */}
      <div className="bg-white border border-neutral-200 rounded-sm p-6 sm:p-8 shadow-sm w-full max-w-md">
        {children}
      </div>

      {/* Footer Copyright */}
      <div className="mt-8 text-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
        © 2026 LIVABLE™ RELOCATION OPS. ALL RIGHTS RESERVED.
      </div>
    </div>
  );
}