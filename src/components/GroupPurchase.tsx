/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, ChevronRight, Tag, ShieldCheck, Heart } from "lucide-react";
import { Product } from "../types";

interface GroupPurchaseProps {
  products: Product[];
  onSelectProduct: (productName: string) => void;
}

export default function GroupPurchase({ products, onSelectProduct }: GroupPurchaseProps) {
  return (
    <section id="products" className="relative py-24 bg-black overflow-hidden border-t border-purple-500/10">
      {/* Background visual detail */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-purple-900/5 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-[var(--theme-primary)] text-xs font-bold tracking-wider mb-3">
            MEMBERSHIP EXCLUSIVES
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            뷰티기기 & 화장품 공동구매
          </h2>
          <div className="w-12 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-4">
            AI 피부진단기부터 최첨단 헤드스파 관리 장비, 전용 명품 화장품 라인까지 중간 유통 마진을 최소화하여 단독 도매 특가로 공급해드립니다.
          </p>
        </div>

        {/* Product Shelf Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="group flex flex-col justify-between rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-purple-500/50 overflow-hidden hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 backdrop-blur-md"
            >
              
              {/* Image Frame */}
              <div className="relative h-64 overflow-hidden bg-zinc-900 flex items-center justify-center">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glass Tag */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-purple-500/20 text-[10px] font-bold text-purple-300 uppercase tracking-widest">
                  {prod.category}
                </div>

                {/* Popularity badge */}
                {prod.isPopular && (
                  <div className="absolute top-4 right-4 flex items-center space-x-1 px-2 py-0.5 rounded bg-purple-600 text-[10px] font-bold text-white shadow">
                    <Heart size={10} className="fill-white" />
                    <span>추천기기</span>
                  </div>
                )}
              </div>

              {/* Specs Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--theme-primary)] transition-colors line-clamp-1">
                    {prod.name}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 mb-6">
                    {prod.description}
                  </p>
                </div>

                {/* Pricing & CTA Block */}
                <div className="pt-4 border-t border-purple-500/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <Tag size={13} className="text-purple-400" />
                      <span className="text-xs">공동구매 단가</span>
                    </div>
                    <span className="text-sm sm:text-base font-black text-white bg-purple-900/10 border border-purple-500/20 px-3 py-1 rounded-xl text-purple-200">
                      {prod.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectProduct(prod.name)}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-950/40 active:scale-95"
                  >
                    <ShoppingBag size={14} />
                    <span>공동구매 및 제휴 문의</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Quality assurance banner */}
        <div className="mt-16 p-5 rounded-2xl bg-gradient-to-r from-purple-950/5 via-zinc-900/50 to-purple-950/5 border border-white/5 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left backdrop-blur-md">
          <ShieldCheck size={28} className="text-[var(--theme-primary)] shrink-0 animate-pulse" />
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-zinc-200">정품 보증 및 기술 이전 지원</h4>
            <p className="text-xs text-zinc-500 max-w-xl leading-normal">
              더웨이홀딩스가 공식 제휴 공급하는 모든 기기는 100% 무상 기술 교육 매뉴얼 제공 및 본사 소속 강사단의 무료 샵 마스터 테크닉 튜토리얼을 지원합니다.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
