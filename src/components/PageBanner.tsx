/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ChevronRight, Home } from "lucide-react";

interface PageBannerProps {
  title: string;
  subtitle: string;
  category: string;
  onGoHome: () => void;
}

export default function PageBanner({ title, subtitle, category, onGoHome }: PageBannerProps) {
  return (
    <div className="relative pt-32 pb-16 overflow-hidden bg-black/60 border-b border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-48 h-48 bg-fuchsia-600/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-zinc-400 mb-4 bg-zinc-900/40 w-fit px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
          <button onClick={onGoHome} className="hover:text-white transition-colors flex items-center gap-1">
            <Home size={12} />
            <span>홈</span>
          </button>
          <ChevronRight size={10} className="text-zinc-600" />
          <span className="text-purple-400 font-medium">{category}</span>
        </div>

        {/* Title Content */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-light">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
