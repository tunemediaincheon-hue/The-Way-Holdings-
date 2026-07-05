/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Icons from "lucide-react";
import { Advantage } from "../types";

interface AdvantagesProps {
  advantages: Advantage[];
}

export default function Advantages({ advantages }: AdvantagesProps) {
  
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent size={20} className="text-[var(--theme-primary)]" />;
    }
    return <Icons.Sparkles size={20} className="text-[var(--theme-primary)]" />;
  };

  return (
    <section id="advantages" className="relative py-24 bg-black overflow-hidden border-t border-purple-500/10">
      {/* Background orbs */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-900/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-[var(--theme-primary)] text-xs font-bold tracking-wider mb-3">
            PLATFORM STRENGTHS
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            플랫폼의 강점
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Bento/Modern List layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((adv, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <div
                key={adv.id || idx}
                className={`group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col justify-between backdrop-blur-md ${
                  isLarge ? "lg:col-span-2 md:col-span-1" : "lg:col-span-1 md:col-span-1"
                }`}
              >
                {/* Glowing radial back-effect on hover */}
                <div className="absolute inset-0 bg-radial-gradient from-purple-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

                <div>
                  {/* Icon badge */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-950/30 border border-purple-500/20 mb-6 group-hover:bg-purple-600/20 group-hover:border-purple-500 transition-all">
                    {renderIcon(adv.iconName)}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[var(--theme-primary)] transition-colors">
                    {adv.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                    {adv.description}
                  </p>
                </div>

                {/* Aesthetic index number */}
                <div className="mt-8 flex justify-between items-center border-t border-purple-500/5 pt-4">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-600">
                    STRENGTH #0{idx + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-purple-500/30 group-hover:bg-purple-500 group-hover:scale-125 transition-all"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
