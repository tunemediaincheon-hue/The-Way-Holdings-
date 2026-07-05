/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Sparkles, BookOpen, UserCheck, ShoppingBag, Globe2, Award } from "lucide-react";
import { WebSiteData } from "../types";

interface VisionProps {
  websiteData: WebSiteData;
}

export default function Vision({ websiteData }: VisionProps) {
  const formula = websiteData.visionFormula || {
    part1: "교육",
    part2: "창업",
    part3: "유통",
    part4: "글로벌 네트워크",
    result: "성장"
  };

  return (
    <section id="vision" className="relative py-24 bg-black overflow-hidden border-t border-purple-500/10">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-900/5 to-indigo-900/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Infographic Layout */}
        <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-zinc-950 via-zinc-950 to-purple-950/20 border border-purple-500/20 shadow-[0_0_50px_rgba(139,92,246,0.1)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-bold text-[var(--theme-primary)]">
                <Sparkles size={12} />
                <span>THE WAY HOLDINGS VISION</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {websiteData.visionTitle}
              </h2>
              
              <p className="text-xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-200 bg-clip-text text-transparent italic">
                " {websiteData.heroTitle} "
              </p>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
                {websiteData.visionDesc}
              </p>
            </div>

            {/* Right Diagram / Formula Graphic */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-black/60 border border-purple-500/10 backdrop-blur-sm">
              <div className="text-center mb-8">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                  K-Beauty Growth Formula
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  K-뷰티 산업의 새로운 성장 생태계 연결
                </h3>
              </div>

              {/* Responsive Flowing Diagram */}
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3">
                
                {/* Part 1: 교육 */}
                <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center w-36 shadow-lg shadow-black/50 group hover:border-purple-500/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-purple-950/40 border border-purple-500/20 flex items-center justify-center mb-2.5 text-[var(--theme-primary)]">
                    <BookOpen size={18} />
                  </div>
                  <span className="text-sm font-bold text-white">{formula.part1}</span>
                  <span className="text-[10px] text-zinc-500 mt-1">Education</span>
                </div>

                <div className="text-purple-500 text-lg font-bold md:rotate-0 rotate-90">+</div>

                {/* Part 2: 창업 */}
                <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center w-36 shadow-lg shadow-black/50 group hover:border-purple-500/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-purple-950/40 border border-purple-500/20 flex items-center justify-center mb-2.5 text-[var(--theme-primary)]">
                    <UserCheck size={18} />
                  </div>
                  <span className="text-sm font-bold text-white">{formula.part2}</span>
                  <span className="text-[10px] text-zinc-500 mt-1">Startup</span>
                </div>

                <div className="text-purple-500 text-lg font-bold md:rotate-0 rotate-90">+</div>

                {/* Part 3: 유통 */}
                <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center w-36 shadow-lg shadow-black/50 group hover:border-purple-500/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-purple-950/40 border border-purple-500/20 flex items-center justify-center mb-2.5 text-[var(--theme-primary)]">
                    <ShoppingBag size={18} />
                  </div>
                  <span className="text-sm font-bold text-white">{formula.part3}</span>
                  <span className="text-[10px] text-zinc-500 mt-1">Distribution</span>
                </div>

                <div className="text-purple-500 text-lg font-bold md:rotate-0 rotate-90">+</div>

                {/* Part 4: 글로벌 네트워크 */}
                <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center w-36 shadow-lg shadow-black/50 group hover:border-purple-500/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-purple-950/40 border border-purple-500/20 flex items-center justify-center mb-2.5 text-[var(--theme-primary)]">
                    <Globe2 size={18} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">{formula.part4}</span>
                  <span className="text-[10px] text-zinc-500 mt-1">Global Net</span>
                </div>

                <div className="text-purple-500 text-lg font-bold md:rotate-0 rotate-90">=</div>

                {/* Result: 성장 */}
                <div className="flex flex-col items-center p-4.5 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 border border-purple-400/50 text-center w-36 shadow-[0_0_20px_rgba(139,92,246,0.35)] relative overflow-hidden group hover:scale-105 transition-all">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 rounded-bl-full"></div>
                  <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center mb-2.5 text-white">
                    <Award size={18} className="animate-bounce" />
                  </div>
                  <span className="text-base font-black text-white">{formula.result}</span>
                  <span className="text-[10px] text-purple-200 mt-1 font-semibold">Growth</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
