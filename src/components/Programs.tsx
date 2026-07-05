/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";
import { ProgramDetail } from "../types";

interface ProgramsProps {
  programs: ProgramDetail[];
  cardStyle: "glow" | "minimal" | "bordered";
  primaryColor: string;
  onInquireProgram: (programTitle: string) => void;
}

export default function Programs({ programs, cardStyle, primaryColor, onInquireProgram }: ProgramsProps) {
  
  const getCardClasses = () => {
    switch (cardStyle) {
      case "glow":
        return "bg-zinc-900/50 border border-white/5 shadow-[0_0_20px_rgba(168,85,247,0.05)] hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 backdrop-blur-md";
      case "bordered":
        return "bg-zinc-950 border-2 border-purple-900 hover:border-[var(--theme-primary)]";
      case "minimal":
      default:
        return "bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70";
    }
  };

  return (
    <section id="programs" className="relative py-24 bg-black overflow-hidden border-t border-purple-500/10">
      {/* Dynamic light gradient behind heading */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-purple-900/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex justify-center items-center gap-1.5 mb-3 text-xs sm:text-sm font-bold text-[var(--theme-primary)] uppercase tracking-widest">
            <span className="w-8 h-[1px] bg-purple-500/50"></span>
            <span>CORE PROGRAMS</span>
            <span className="w-8 h-[1px] bg-purple-500/50"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            주요 지원사업
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            더웨이홀딩스는 교육, 유통, 글로벌 비즈니스를 통합 설계하여 창업 예정자와 미용인들의 지속 가능한 성공 모델을 함께 구축해 나갑니다.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className={`group flex flex-col rounded-3xl overflow-hidden transition-all duration-300 ${getCardClasses()}`}
            >
              {/* Card Image and Num */}
              <div className="relative h-60 sm:h-64 overflow-hidden">
                <img
                  src={prog.imageUrl}
                  alt={prog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                
                {/* Float Num Badge */}
                <div className="absolute top-6 left-6 flex items-center justify-center w-12 h-12 rounded-2xl bg-black/70 backdrop-blur-md border border-purple-500/30 text-white font-serif font-black text-xl shadow-lg shadow-black/50">
                  {prog.num}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[var(--theme-primary)] transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {prog.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-3 mb-8">
                    {prog.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-zinc-300 text-sm leading-tight">
                        <CheckCircle2 size={16} className="text-purple-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer buttons of card */}
                <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between gap-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                    The Way Holdings Support {prog.num}
                  </span>
                  
                  <button
                    onClick={() => onInquireProgram(prog.title)}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-purple-950/30 hover:bg-purple-600 border border-purple-500/20 hover:border-purple-400 text-purple-300 hover:text-white transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(167,139,250,0.05)]"
                  >
                    <MessageSquare size={13} />
                    <span>상담 신청하기</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
