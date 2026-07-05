/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Shield, Eye, Settings2, Instagram, Youtube, BookOpen } from "lucide-react";
import { WebSiteData } from "../types";

interface HeaderProps {
  websiteData: WebSiteData;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  onNavigate: (sectionId: string) => void;
  currentPage: string;
}

export default function Header({ websiteData, isAdmin, setIsAdmin, onNavigate, currentPage }: HeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--theme-bg)]/85 backdrop-blur-md border-b border-purple-500/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="header-logo-container"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate("home")}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-violet-800 to-fuchsia-950 border border-purple-400/30 shadow-[0_0_15px_rgba(139,92,246,0.25)] group-hover:scale-105 transition-transform">
              <span className="text-white font-serif font-black text-xl tracking-tighter">TW</span>
              <div className="absolute inset-0 rounded-xl bg-purple-500/10 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-white font-sans font-bold text-base sm:text-lg tracking-tight flex items-center gap-1.5 leading-none">
                {websiteData.siteName}
                <span className="text-xs px-1.5 py-0.5 rounded-md bg-purple-500/20 text-[var(--theme-primary)] border border-purple-500/30">
                  Center
                </span>
              </h1>
              <span className="text-[10px] text-zinc-400 font-medium tracking-wide">
                {websiteData.siteSubtitle}
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav id="header-nav-desktop" className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => onNavigate("programs")}
              className={`text-sm font-medium transition-all duration-300 cursor-pointer relative py-1 ${
                currentPage === "programs"
                  ? "text-[var(--theme-primary)] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-purple-500"
                  : "text-zinc-300 hover:text-[var(--theme-primary)]"
              }`}
            >
              주요 지원사업
            </button>
            <button
              onClick={() => onNavigate("targets")}
              className={`text-sm font-medium transition-all duration-300 cursor-pointer relative py-1 ${
                currentPage === "targets"
                  ? "text-[var(--theme-primary)] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-purple-500"
                  : "text-zinc-300 hover:text-[var(--theme-primary)]"
              }`}
            >
              지원 대상
            </button>
            <button
              onClick={() => onNavigate("advantages")}
              className={`text-sm font-medium transition-all duration-300 cursor-pointer relative py-1 ${
                currentPage === "advantages"
                  ? "text-[var(--theme-primary)] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-purple-500"
                  : "text-zinc-300 hover:text-[var(--theme-primary)]"
              }`}
            >
              플랫폼 강점
            </button>
            <button
              onClick={() => onNavigate("vision")}
              className={`text-sm font-medium transition-all duration-300 cursor-pointer relative py-1 ${
                currentPage === "vision"
                  ? "text-[var(--theme-primary)] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-purple-500"
                  : "text-zinc-300 hover:text-[var(--theme-primary)]"
              }`}
            >
              비전
            </button>
            <button
              onClick={() => onNavigate("posts")}
              className={`text-sm font-medium transition-all duration-300 cursor-pointer relative py-1 ${
                currentPage === "posts"
                  ? "text-[var(--theme-primary)] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-purple-500"
                  : "text-zinc-300 hover:text-[var(--theme-primary)]"
              }`}
            >
              최신 소식
            </button>
            <button
              onClick={() => onNavigate("products")}
              className={`text-sm font-medium transition-all duration-300 cursor-pointer relative py-1 ${
                currentPage === "products"
                  ? "text-[var(--theme-primary)] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-purple-500"
                  : "text-zinc-300 hover:text-[var(--theme-primary)]"
              }`}
            >
              기기·화장품 공동구매
            </button>
          </nav>

          {/* Controls & Quick Contacts */}
          <div id="header-actions" className="flex items-center space-x-3">
            {/* Social icons */}
            <div className="hidden sm:flex items-center space-x-2 mr-1">
              {websiteData.instagramUrl && (
                <a
                  href={websiteData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-zinc-400 hover:text-pink-500 transition-colors"
                  title="인스타그램"
                >
                  <Instagram size={17} />
                </a>
              )}
              {websiteData.youtubeUrl && (
                <a
                  href={websiteData.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
                  title="유튜브"
                >
                  <Youtube size={17} />
                </a>
              )}
              {websiteData.blogUrl && (
                <a
                  href={websiteData.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-zinc-400 hover:text-green-500 transition-colors flex items-center justify-center"
                  title="네이버 블로그"
                >
                  <BookOpen size={17} />
                </a>
              )}
            </div>

            {/* Quick Consultation CTA */}
            <button
              onClick={() => onNavigate("consultation")}
              className="hidden md:inline-flex items-center space-x-1 text-xs font-semibold px-4 py-2 rounded-full border border-purple-500/30 text-white bg-purple-950/20 hover:bg-purple-900/40 hover:border-purple-500/60 transition-all shadow-[0_0_10px_rgba(167,139,250,0.1)] active:scale-95"
            >
              <Sparkles size={13} className="text-[var(--theme-primary)] animate-pulse" />
              <span>상담 신청하기</span>
            </button>

            {/* Admin Switcher */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all shadow-md active:scale-95 ${
                isAdmin
                  ? "bg-purple-600 text-white hover:bg-purple-700 shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-400/50"
                  : "bg-zinc-800 text-purple-300 hover:bg-zinc-700/80 border border-purple-500/20 hover:border-purple-500/40"
              }`}
            >
              {isAdmin ? (
                <>
                  <Eye size={14} />
                  <span>미리보기</span>
                </>
              ) : (
                <>
                  <Settings2 size={14} className="animate-spin-slow" />
                  <span>관리자 대시보드</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
