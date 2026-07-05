/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Icons from "lucide-react";
import { TargetAudience } from "../types";

interface TargetsProps {
  targets: TargetAudience[];
}

export default function Targets({ targets }: TargetsProps) {
  
  // Dynamic icon helper safely matching Lucide icon names
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent size={24} className="text-[var(--theme-primary)]" />;
    }
    return <Icons.Sparkles size={24} className="text-[var(--theme-primary)]" />;
  };

  return (
    <section id="targets" className="relative py-20 bg-black overflow-hidden border-t border-purple-500/10">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-indigo-900/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-[var(--theme-primary)] text-xs font-bold tracking-wider uppercase mb-3">
            TARGET AUDIENCE
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            지원 대상
          </h2>
          <div className="w-12 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Targets Responsive Row/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {targets.map((target, idx) => (
            <div
              key={target.id || idx}
              className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 backdrop-blur-md"
            >
              {/* Animated Circle Icon Container */}
              <div className="relative mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-purple-950/30 border border-purple-500/20 group-hover:bg-purple-600 group-hover:scale-105 group-hover:border-purple-400 group-hover:shadow-[0_0_15px_rgba(167,139,250,0.3)] transition-all duration-500">
                <div className="absolute inset-0.5 rounded-full border border-purple-500/10 group-hover:border-purple-200/20"></div>
                <div className="group-hover:text-white group-hover:scale-110 transition-transform duration-300">
                  {renderIcon(target.iconName)}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[var(--theme-primary)] transition-colors">
                {target.title}
              </h3>
              
              {/* Divider */}
              <div className="w-8 h-[1px] bg-purple-500/25 mb-3 group-hover:w-12 transition-all"></div>

              {/* Description */}
              <p className="text-zinc-400 text-xs leading-relaxed max-w-xs">
                {target.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
