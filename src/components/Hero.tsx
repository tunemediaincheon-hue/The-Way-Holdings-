/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowDown, Shield, Award, Users, TrendingUp } from "lucide-react";
import { WebSiteData } from "../types";

interface HeroProps {
  websiteData: WebSiteData;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ websiteData, onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden"
    >
      {/* Dynamic Background FX */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black opacity-100"></div>
        {/* Glowing Orbs */}
        <div className="absolute top-[10%] left-[10%] w-[35rem] h-[35rem] rounded-full bg-purple-900/10 blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[40rem] h-[40rem] rounded-full bg-indigo-900/10 blur-[130px] mix-blend-screen animate-pulse duration-5000"></div>
        
        {/* Abstract cyber grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Center Tagline */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-[var(--theme-primary)] text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md animate-fade-in shadow-[0_0_15px_rgba(167,139,250,0.1)]">
          <Sparkles size={14} className="animate-spin-slow" />
          <span>{websiteData.heroBadge}</span>
        </div>

        {/* Display Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black tracking-tight text-white mb-6 leading-none max-w-5xl mx-auto">
          <span className="block mb-2 text-zinc-300 text-3xl sm:text-4xl md:text-5xl font-medium tracking-normal">
            더웨이홀딩스 K-뷰티 창업지원센터
          </span>
          <span className="bg-gradient-to-r from-[var(--theme-primary)] via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent filter drop-shadow-[0_2px_15px_rgba(168,85,247,0.15)]">
            {websiteData.heroTitle}
          </span>
        </h1>

        {/* Subtitle description */}
        <p className="text-zinc-400 text-base sm:text-lg md:text-xl font-normal max-w-3xl mx-auto mb-10 leading-relaxed">
          {websiteData.heroSub}
        </p>

        {/* Buttons and CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onNavigate("consultation")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_25px_rgba(139,92,246,0.45)] hover:shadow-[0_4px_30px_rgba(139,92,246,0.6)] cursor-pointer active:scale-95"
          >
            1:1 창업 상담 문의하기
          </button>
          <button
            onClick={() => onNavigate("programs")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900 border border-purple-500/30 hover:border-purple-500/60 text-zinc-300 hover:text-white hover:bg-zinc-800 font-semibold text-base transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-[0_0_15px_rgba(167,139,250,0.05)] active:scale-95"
          >
            지원사업 자세히 보기
          </button>
        </div>

        {/* Quick core metrics / indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-purple-500/10 pt-12 text-center">
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              1:1 맞춤
            </div>
            <div className="text-xs sm:text-sm text-zinc-500 mt-1 flex items-center gap-1">
              <Users size={12} className="text-purple-400" />
              창업 밀착 컨설팅
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              최대 45%
            </div>
            <div className="text-xs sm:text-sm text-zinc-500 mt-1 flex items-center gap-1">
              <TrendingUp size={12} className="text-purple-400" />
              기기 공동구매 특가
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              K-STAR
            </div>
            <div className="text-xs sm:text-sm text-zinc-500 mt-1 flex items-center gap-1">
              <Award size={12} className="text-purple-400" />
              국제강사 인증과정
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              원스톱
            </div>
            <div className="text-xs sm:text-sm text-zinc-500 mt-1 flex items-center gap-1">
              <Shield size={12} className="text-purple-400" />
              글로벌 해외 진출
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce flex justify-center">
          <button
            onClick={() => onNavigate("programs")}
            className="text-zinc-500 hover:text-purple-400 transition-colors"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
