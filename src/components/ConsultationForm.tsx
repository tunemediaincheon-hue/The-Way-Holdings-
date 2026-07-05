/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Send, Phone, MapPin, Mail, Clock, HelpCircle, FileCheck, Check } from "lucide-react";
import { WebSiteData, Inquiry } from "../types";

interface ConsultationFormProps {
  websiteData: WebSiteData;
  onAddInquiry: (inquiry: Omit<Inquiry, "id" | "createdAt" | "status">) => void;
  selectedProgram: string;
  setSelectedProgram: (prog: string) => void;
  customMessage: string;
  setCustomMessage: (msg: string) => void;
}

export default function ConsultationForm({
  websiteData,
  onAddInquiry,
  selectedProgram,
  setSelectedProgram,
  customMessage,
  setCustomMessage,
}: ConsultationFormProps) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const programs = [
    "K-뷰티 창업 컨설팅",
    "뷰티기기·화장품 공동구매",
    "K-STAR 글로벌 강사 양성",
    "브랜드 창업 및 해외 진출",
    "기타 제휴 및 제안",
  ];

  React.useEffect(() => {
    if (selectedProgram) {
      // Keep dropdown in sync with outside selections (like clicking product cards)
    }
  }, [selectedProgram]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !agree) return;

    onAddInquiry({
      name,
      phone,
      program: selectedProgram || "K-뷰티 창업 컨설팅",
      message: customMessage || "상담 신청합니다.",
    });

    setSubmitted(true);
    setTimeout(() => {
      // Clear fields
      setName("");
      setPhone("");
      setCustomMessage("");
      setAgree(false);
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="consultation" className="relative py-24 bg-black overflow-hidden border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Corporate Info Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div className="space-y-6">
              <span className="text-xs font-bold text-[var(--theme-primary)] uppercase tracking-widest block">
                CONTACT & CONSULTING
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                더웨이홀딩스와 함께<br />
                K-뷰티 전문가의 꿈을 펼치세요
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                미래의 K-뷰티 브랜드 오너, 에스테틱 원장님, 글로벌 아카데미 메인 강사를 꿈꾸시는 모든 분들을 위한 문이 열려 있습니다. 문의를 남겨주시면 담당 컨설턴트가 신속하게 연락을 드리겠습니다.
              </p>
            </div>

            {/* Micro Details list */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-400">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-xs text-zinc-500 font-bold">대표 번호 및 긴급 상담</h4>
                  <p className="text-white text-base sm:text-lg font-bold font-mono tracking-tight mt-0.5">
                    {websiteData.contactPhone}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-400">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs text-zinc-500 font-bold">이메일 제안 및 서류 접수</h4>
                  <p className="text-white text-sm font-semibold font-mono mt-0.5">
                    {websiteData.contactEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs text-zinc-500 font-bold">상담실 주소</h4>
                  <p className="text-white text-xs sm:text-sm leading-relaxed mt-0.5 font-normal">
                    {websiteData.officeAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick operating hours indicator */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-purple-500/5 flex items-center space-x-3 text-zinc-500 text-xs">
              <Clock size={16} className="text-purple-400" />
              <span>운영시간: 평일 오전 9시 - 오후 6시 (토/일, 공휴일 휴무)</span>
            </div>
          </div>

          {/* Right Block: Live Consultation Form */}
          <div className="lg:col-span-7 rounded-3xl bg-zinc-900/50 border border-white/5 p-6 sm:p-10 relative overflow-hidden flex flex-col justify-center backdrop-blur-md">
            
            {submitted ? (
              <div className="text-center py-12 space-y-6 flex flex-col items-center justify-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <Check size={32} className="animate-scale-up" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white">상담 신청 접수 완료!</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                    성공적으로 상담 신청서가 전송되었습니다. 상단 우측의 <strong className="text-purple-300">관리자 대시보드</strong>를 클릭하시면 실시간으로 이 문의가 정상 접수되었는지 직접 모니터링 하실 수 있습니다!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-purple-500/10 pb-4 mb-2">
                  <h3 className="text-lg font-bold text-white">비공개 1:1 창업&교육 컨설팅 신청</h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    제출된 비밀상담 데이터는 담당 창업플래너 외에 누구에게도 공개되지 않습니다.
                  </p>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">성함 *</label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/5 focus:border-purple-500/50 focus:outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">연락처 *</label>
                    <input
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/5 focus:border-purple-500/50 focus:outline-none text-white text-sm font-mono transition-colors"
                    />
                  </div>
                </div>

                {/* Interest category dropdown */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2">희망 및 상담 관심분야 *</label>
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/5 focus:border-purple-500/50 focus:outline-none text-white text-sm transition-colors"
                  >
                    {programs.map((prog) => (
                      <option key={prog} value={prog} className="bg-zinc-950 text-white">
                        {prog}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Detailed description */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2">상담 문의 상세내용 *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="희망 지역, 예산 규모, 고민 중이신 부분을 편하게 기재해주시면 더욱 정확한 컨설팅에 도움이 됩니다."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/5 focus:border-purple-500/50 focus:outline-none text-white text-sm leading-relaxed transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Terms agreement */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms-agree"
                    required
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-purple-500/30 text-purple-600 focus:ring-purple-500 focus:ring-opacity-20"
                  />
                  <label htmlFor="terms-agree" className="text-zinc-500 text-xs leading-normal select-none cursor-pointer">
                    개인정보 수집 및 상담 진행 동의 (성함, 연락처, 희망분야 정보는 1:1 창업지원 및 교육 매뉴얼 제공 절차 이행만을 위해 수집되며, 목적 달성 즉시 안전하게 파기됩니다.) *
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!agree || !name.trim() || !phone.trim()}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-500 active:scale-95 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                >
                  <Send size={15} />
                  <span>실시간 창업 지원 신청 접수하기</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
