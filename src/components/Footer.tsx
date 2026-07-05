/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowUp, Instagram, Youtube, BookOpen } from "lucide-react";
import { WebSiteData } from "../types";

interface FooterProps {
  websiteData: WebSiteData;
}

export default function Footer({ websiteData }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="relative bg-zinc-950 border-t border-purple-500/15 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-purple-500/10 pb-12 mb-10">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-violet-800 to-fuchsia-950 border border-purple-400/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <span className="text-white font-serif font-black text-2xl tracking-tighter">TW</span>
              </div>
              <div>
                <h3 className="text-white font-black text-lg tracking-tight flex items-center gap-1.5 leading-none">
                  {websiteData.siteName}
                </h3>
                <span className="text-xs text-zinc-400 tracking-wide">
                  {websiteData.siteSubtitle}
                </span>
              </div>
            </div>
            
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-sm">
              더웨이홀딩스는 대한민국 K-뷰티 경쟁력을 극대화하여 글로벌 무대로 도약하도록 교육, 유통, 인큐베이팅 생태계를 원스톱으로 지원합니다.
            </p>

            {/* Social media connections */}
            <div className="flex items-center space-x-3">
              {websiteData.instagramUrl && (
                <a
                  href={websiteData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-purple-500/10 hover:border-pink-500 hover:text-pink-500 text-zinc-400 transition-colors flex items-center justify-center"
                  title="Instagram"
                >
                  <Instagram size={16} />
                </a>
              )}
              {websiteData.youtubeUrl && (
                <a
                  href={websiteData.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-purple-500/10 hover:border-red-500 hover:text-red-500 text-zinc-400 transition-colors flex items-center justify-center"
                  title="YouTube"
                >
                  <Youtube size={16} />
                </a>
              )}
              {websiteData.blogUrl && (
                <a
                  href={websiteData.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-purple-500/10 hover:border-green-500 hover:text-green-500 text-zinc-400 transition-colors flex items-center justify-center"
                  title="Naver Blog"
                >
                  <BookOpen size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Core Programs Shortcut */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-zinc-200 text-sm font-bold tracking-widest uppercase">핵심 지원분야</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-500">
              <li>
                <a href="#programs" className="hover:text-purple-400 transition-colors">1. K-뷰티 창업 컨설팅</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-purple-400 transition-colors">2. 기기 및 화장품 공동구매</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-purple-400 transition-colors">3. K-STAR 글로벌 강사 양성</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-purple-400 transition-colors">4. 브랜드 론칭 및 글로벌 수출</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Vision formula quote */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-zinc-200 text-sm font-bold tracking-widest uppercase">센터 비전 슬로건</h4>
            <div className="p-4.5 rounded-2xl bg-zinc-900 border border-purple-500/10 space-y-3">
              <p className="text-zinc-400 text-xs italic leading-relaxed font-semibold">
                "교육, 창업, 유통, 글로벌 네트워크를 긴밀히 연결하여 K-뷰티 산업의 새로운 가치를 창출합니다."
              </p>
              <div className="flex items-center gap-1.5 text-[var(--theme-primary)] font-bold text-xs">
                <Sparkles size={12} className="animate-pulse" />
                <span>더웨이홀딩스 이순미 대표</span>
              </div>
            </div>
          </div>

        </div>

        {/* Corporate Legal Footer */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 text-zinc-600 text-xs sm:text-xs font-normal">
          <div className="space-y-1.5 leading-normal max-w-4xl">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>상호명: <strong>{websiteData.siteName}</strong></span>
              <span className="hidden sm:inline text-zinc-800">|</span>
              <span>대표자: <strong>{websiteData.representative}</strong></span>
              <span className="hidden sm:inline text-zinc-800">|</span>
              <span>사업자등록번호: <strong className="font-mono">{websiteData.businessNumber}</strong></span>
            </div>
            <div>
              <span>대표 연락처: <strong className="font-mono text-zinc-400">{websiteData.contactPhone}</strong></span>
              <span className="mx-4 hidden sm:inline text-zinc-800">|</span>
              <span>사무실 주소: <strong>{websiteData.officeAddress}</strong></span>
            </div>
            <p className="text-[10px] text-zinc-700 mt-2">
              본 홈페이지는 더웨이홀딩스의 K-뷰티 창업지원 프로그램을 안내하기 위해 제공되는 플랫폼입니다. 무단 전재 및 배포를 금합니다.
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={handleScrollToTop}
            className="self-center lg:self-auto p-3 rounded-full bg-zinc-900 hover:bg-purple-600 hover:text-white border border-purple-500/15 hover:border-purple-400 transition-all cursor-pointer shadow-lg hover:shadow-purple-950/40 active:scale-95 text-zinc-400"
            title="맨 위로 이동"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center text-zinc-700 text-[11px] font-mono mt-10">
          &copy; 2026 THE WAY HOLDINGS. All Rights Reserved. Powered by Antigravity and Gemini.
        </div>
      </div>
    </footer>
  );
}
