/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Briefcase,
  Layers,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Plus,
  Eye,
  FileEdit,
  Sparkles,
  RefreshCw,
  Globe,
  Share2,
  TrendingUp,
  Award,
  Users,
  ShoppingBag,
  Inbox,
  Palette,
  ChevronRight
} from "lucide-react";
import {
  WebSiteData,
  ProgramDetail,
  Post,
  Inquiry,
  Product,
  SEOData
} from "../types";

interface AdminDashboardProps {
  websiteData: WebSiteData;
  setWebsiteData: (data: WebSiteData) => void;
  programs: ProgramDetail[];
  setPrograms: (progs: ProgramDetail[]) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  inquiries: Inquiry[];
  setInquiries: (inqs: Inquiry[]) => void;
  products: Product[];
  setProducts: (prods: Product[]) => void;
  seo: SEOData;
  setSeo: (seo: SEOData) => void;
}

export default function AdminDashboard({
  websiteData,
  setWebsiteData,
  programs,
  setPrograms,
  posts,
  setPosts,
  inquiries,
  setInquiries,
  products,
  setProducts,
  seo,
  setSeo,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = React.useState<string>("overview");
  const [inquiryFilter, setInquiryFilter] = React.useState<string>("전체");

  // Post form states
  const [newPostTitle, setNewPostTitle] = React.useState("");
  const [newPostContent, setNewPostContent] = React.useState("");
  const [newPostCategory, setNewPostCategory] = React.useState<Post["category"]>("공지사항");
  const [newPostPinned, setNewPostPinned] = React.useState(false);
  const [editingPostId, setEditingPostId] = React.useState<string | null>(null);

  // Product form states
  const [newProdName, setNewProdName] = React.useState("");
  const [newProdCategory, setNewProdCategory] = React.useState<Product["category"]>("AI피부진단");
  const [newProdPrice, setNewProdPrice] = React.useState("");
  const [newProdDesc, setNewProdDesc] = React.useState("");
  const [newProdImage, setNewProdImage] = React.useState("");
  const [editingProdId, setEditingProdId] = React.useState<string | null>(null);

  // Predefined luxury color palettes
  const palettes = [
    { name: "더웨이 시그니처 퍼플 & 골드", primary: "#a78bfa", secondary: "#fef08a", bg: "#030008" },
    { name: "아메지스트 클래식", primary: "#c084fc", secondary: "#e9d5ff", bg: "#080312" },
    { name: "오션 인디고 & 실버", primary: "#818cf8", secondary: "#e2e8f0", bg: "#02020a" },
    { name: "로즈뷰티 마젠타", primary: "#f472b6", secondary: "#fdf2f8", bg: "#050106" },
  ];

  // Helper to change theme in bulk
  const handleApplyPalette = (p: typeof palettes[0]) => {
    setWebsiteData({
      ...websiteData,
      primaryColor: p.primary,
      secondaryColor: p.secondary,
      backgroundColor: p.bg,
    });
  };

  // SEO Score Analyzer
  const getSeoHealth = () => {
    let score = 0;
    const tips: string[] = [];

    // Title Check
    if (seo.metaTitle.length >= 10 && seo.metaTitle.length <= 60) {
      score += 20;
    } else {
      tips.push("Meta 제목을 10자에서 60자 사이로 최적화해주세요.");
    }

    // Description Check
    if (seo.metaDescription.length >= 50 && seo.metaDescription.length <= 160) {
      score += 25;
    } else {
      tips.push("Meta 설명을 50자에서 160자 사이로 작성하면 가독성 점수가 향상됩니다.");
    }

    // Keywords Check
    const kwCount = seo.metaKeywords.split(",").filter((k) => k.trim()).length;
    if (kwCount >= 5) {
      score += 20;
    } else {
      tips.push("최소 5개 이상의 쉼표(,) 구분 핵심 키워드를 설정해 주세요.");
    }

    // OpenGraph Tag Check
    if (seo.ogTitle && seo.ogDescription) {
      score += 20;
    } else {
      tips.push("소셜 네트워크(OpenGraph) 전용 홍보 제목/설명을 완료해 주세요.");
    }

    // Author check
    if (seo.author) {
      score += 15;
    } else {
      tips.push("사이트 퍼블리셔/저작자 정보를 채워주세요.");
    }

    return { score, tips };
  };

  const { score: seoScore, tips: seoTips } = getSeoHealth();

  // Handle Inquiry status updates
  const handleUpdateInquiryStatus = (id: string, newStatus: Inquiry["status"]) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    setInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm("이 문의 내역을 정말 삭제하시겠습니까?")) {
      setInquiries(inquiries.filter((inq) => inq.id !== id));
    }
  };

  // Handle Post Actions
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    if (editingPostId) {
      // Edit mode
      const updated = posts.map((p) =>
        p.id === editingPostId
          ? {
              ...p,
              title: newPostTitle,
              content: newPostContent,
              category: newPostCategory,
              isPinned: newPostPinned,
            }
          : p
      );
      setPosts(updated);
      setEditingPostId(null);
    } else {
      // Create mode
      const newPost: Post = {
        id: `post-${Date.now()}`,
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory,
        author: "관리자",
        date: new Date().toISOString().split("T")[0],
        views: 0,
        isPinned: newPostPinned,
      };
      setPosts([newPost, ...posts]);
    }

    // Clear form
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostPinned(false);
  };

  const handleEditPostInit = (post: Post) => {
    setEditingPostId(post.id);
    setNewPostTitle(post.title);
    setNewPostContent(post.content);
    setNewPostCategory(post.category);
    setNewPostPinned(post.isPinned || false);
    // Scroll form into view
    setActiveTab("posts_tab");
  };

  const handleDeletePost = (id: string) => {
    if (confirm("이 게시글을 정말 영구 삭제하시겠습니까?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  // Handle Product Actions
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice.trim()) return;

    const finalImage =
      newProdImage.trim() ||
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600";

    if (editingProdId) {
      // Edit
      const updated = products.map((p) =>
        p.id === editingProdId
          ? {
              ...p,
              name: newProdName,
              category: newProdCategory,
              price: newProdPrice,
              description: newProdDesc,
              imageUrl: finalImage,
            }
          : p
      );
      setProducts(updated);
      setEditingProdId(null);
    } else {
      // Create
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: newProdName,
        category: newProdCategory,
        price: newProdPrice,
        description: newProdDesc,
        imageUrl: finalImage,
      };
      setProducts([...products, newProd]);
    }

    // Clear
    setNewProdName("");
    setNewProdPrice("");
    setNewProdDesc("");
    setNewProdImage("");
  };

  const handleEditProductInit = (prod: Product) => {
    setEditingProdId(prod.id);
    setNewProdName(prod.name);
    setNewProdCategory(prod.category);
    setNewProdPrice(prod.price);
    setNewProdDesc(prod.description);
    setNewProdImage(prod.imageUrl);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("이 공동구매 상품을 삭제하시겠습니까?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Helper of category color styling in table
  const getStatusColor = (status: Inquiry["status"]) => {
    switch (status) {
      case "상담완료":
        return "bg-green-500/15 text-green-400 border border-green-500/30";
      case "보류":
        return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30";
      case "접수대기":
      default:
        return "bg-purple-500/15 text-purple-400 border border-purple-500/30 animate-pulse";
    }
  };

  return (
    <div className="min-h-screen bg-[#07050e] text-zinc-100 flex flex-col pt-24 pb-16">
      
      {/* Top Header Panel */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-8">
        <div className="p-6 rounded-3xl bg-zinc-950 border border-purple-500/15 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
              <span className="text-xs font-mono font-bold text-purple-400 tracking-wider">CMS CONTROL CENTER</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              더웨이홀딩스 관리자 대시보드
            </h2>
            <p className="text-zinc-500 text-xs font-normal">
              이 대시보드에서 수정하시는 텍스트, 이미지, 테마, 게시글은 '미리보기' 모드에서 즉각 반응형 웹사이트로 반영됩니다.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-zinc-900/50 p-2.5 rounded-2xl border border-purple-500/5">
            <span className="text-xs text-zinc-400 font-medium">실시간 데이터 연동 상태:</span>
            <span className="px-2.5 py-1 text-[11px] font-bold text-green-400 bg-green-500/10 rounded-md border border-green-500/20 flex items-center gap-1">
              <RefreshCw size={11} className="animate-spin-slow" />
              <span>실시간 동기화 중 (Local)</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-3 bg-zinc-950 p-4 rounded-3xl border border-purple-500/10">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full p-3.5 rounded-2xl text-sm font-bold flex items-center space-x-3 transition-colors ${
              activeTab === "overview"
                ? "bg-purple-600 text-white shadow-md shadow-purple-950"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <LayoutDashboard size={18} />
            <span>대시보드 개요 (통계)</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries_tab")}
            className={`w-full p-3.5 rounded-2xl text-sm font-bold flex items-center justify-between transition-colors ${
              activeTab === "inquiries_tab"
                ? "bg-purple-600 text-white shadow-md shadow-purple-950"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Inbox size={18} />
              <span>상담/문의 신청 관리</span>
            </div>
            {inquiries.filter((i) => i.status === "접수대기").length > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white animate-bounce">
                {inquiries.filter((i) => i.status === "접수대기").length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("text_content")}
            className={`w-full p-3.5 rounded-2xl text-sm font-bold flex items-center space-x-3 transition-colors ${
              activeTab === "text_content"
                ? "bg-purple-600 text-white shadow-md shadow-purple-950"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <FileText size={18} />
            <span>기본 정보 & 콘텐츠 편집</span>
          </button>

          <button
            onClick={() => setActiveTab("programs_tab")}
            className={`w-full p-3.5 rounded-2xl text-sm font-bold flex items-center space-x-3 transition-colors ${
              activeTab === "programs_tab"
                ? "bg-purple-600 text-white shadow-md shadow-purple-950"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Briefcase size={18} />
            <span>주요 지원사업 관리</span>
          </button>

          <button
            onClick={() => setActiveTab("posts_tab")}
            className={`w-full p-3.5 rounded-2xl text-sm font-bold flex items-center space-x-3 transition-colors ${
              activeTab === "posts_tab"
                ? "bg-purple-600 text-white shadow-md shadow-purple-950"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Layers size={18} />
            <span>게시판 및 뉴스 관리</span>
          </button>

          <button
            onClick={() => setActiveTab("products_tab")}
            className={`w-full p-3.5 rounded-2xl text-sm font-bold flex items-center space-x-3 transition-colors ${
              activeTab === "products_tab"
                ? "bg-purple-600 text-white shadow-md shadow-purple-950"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <ShoppingBag size={18} />
            <span>공동구매 장비 관리</span>
          </button>

          <button
            onClick={() => setActiveTab("seo_tab")}
            className={`w-full p-3.5 rounded-2xl text-sm font-bold flex items-center justify-between transition-colors ${
              activeTab === "seo_tab"
                ? "bg-purple-600 text-white shadow-md shadow-purple-950"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Globe size={18} />
              <span>SEO 최적화 분석 도구</span>
            </div>
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
              seoScore >= 80 ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"
            }`}>
              {seoScore}점
            </span>
          </button>

          <button
            onClick={() => setActiveTab("styling_tab")}
            className={`w-full p-3.5 rounded-2xl text-sm font-bold flex items-center space-x-3 transition-colors ${
              activeTab === "styling_tab"
                ? "bg-purple-600 text-white shadow-md shadow-purple-950"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Palette size={18} />
            <span>비주얼 테마 & 브랜드 컬러</span>
          </button>
        </div>

        {/* RIGHT COLUMN: Active Panel Workspace */}
        <div className="lg:col-span-9 bg-zinc-950 border border-purple-500/10 rounded-3xl p-6 sm:p-8 min-h-[500px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-purple-500/10 pb-4">
                <h3 className="text-xl font-bold text-white">실시간 운영 대시보드</h3>
                <p className="text-zinc-500 text-xs">전체 웹사이트 사용량 및 유입 키 지표를 요약 분석합니다.</p>
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-zinc-900 border border-purple-500/5">
                  <span className="text-xs text-zinc-500 font-bold">누적 상담 문의</span>
                  <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono mt-1">
                    {inquiries.length}건
                  </div>
                  <div className="text-[10px] text-green-400 flex items-center gap-0.5 mt-1">
                    <TrendingUp size={11} />
                    <span>실시간 접수 활성</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900 border border-purple-500/5">
                  <span className="text-xs text-zinc-500 font-bold">게시판 등록 글</span>
                  <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono mt-1">
                    {posts.length}개
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">
                    공지사항, 블로그 등
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900 border border-purple-500/5">
                  <span className="text-xs text-zinc-500 font-bold">공동구매 품목수</span>
                  <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono mt-1">
                    {products.length}종
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">
                    AI 진단기 및 앰플
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900 border border-purple-500/5">
                  <span className="text-xs text-zinc-500 font-bold">SEO 건강 점수</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono mt-1 text-green-400">
                    {seoScore} / 100
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">
                    검색엔진 최적화 수준
                  </div>
                </div>
              </div>

              {/* Dynamic SVG Charts (Bulletproof & Highly customizable in React 19) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Chart A: Visitor sources / Interest analysis */}
                <div className="p-6 rounded-2xl bg-zinc-900 border border-purple-500/5">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                    지원 프로그램별 상담 수요 (건수)
                  </h4>
                  <div className="space-y-3 pt-2">
                    {["K-뷰티 창업 컨설팅", "뷰티기기·화장품 공동구매", "K-STAR 글로벌 강사 양성", "브랜드 창업 및 해외 진출"].map((prog) => {
                      const count = inquiries.filter((i) => i.program === prog).length;
                      const max = inquiries.length || 1;
                      const pct = Math.round((count / max) * 100) || 5;
                      return (
                        <div key={prog}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-zinc-300 font-medium">{prog}</span>
                            <span className="text-purple-400 font-bold">{count}건 ({pct}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-500 transition-all duration-1000"
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chart B: Inquiry state tracker */}
                <div className="p-6 rounded-2xl bg-zinc-900 border border-purple-500/5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                      문의 승인 / 관리 현황 비율
                    </h4>
                    <div className="flex items-center gap-6 pt-4">
                      {/* Interactive SVG circle */}
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="transparent" stroke="#111" strokeWidth="2.5" />
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="transparent"
                            stroke="#8b5cf6"
                            strokeWidth="2.5"
                            strokeDasharray="100"
                            strokeDashoffset={100 - (inquiries.filter((i) => i.status === "상담완료").length / (inquiries.length || 1)) * 100}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-lg font-black text-white font-mono">
                            {Math.round((inquiries.filter((i) => i.status === "상담완료").length / (inquiries.length || 1)) * 100)}%
                          </span>
                          <span className="text-[9px] text-zinc-500 font-semibold uppercase">완료율</span>
                        </div>
                      </div>

                      {/* Stat figures */}
                      <div className="flex-1 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-purple-400 font-bold">● 접수대기:</span>
                          <span className="font-mono text-zinc-300 font-bold">{inquiries.filter((i) => i.status === "접수대기").length}건</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-400 font-bold">● 상담완료:</span>
                          <span className="font-mono text-zinc-300 font-bold">{inquiries.filter((i) => i.status === "상담완료").length}건</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-yellow-400 font-bold">● 보류중:</span>
                          <span className="font-mono text-zinc-300 font-bold">{inquiries.filter((i) => i.status === "보류").length}건</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-purple-500/5 flex justify-end">
                    <button
                      onClick={() => setActiveTab("inquiries_tab")}
                      className="text-xs text-purple-400 font-bold flex items-center gap-1 hover:underline"
                    >
                      <span>신규 문의 처리하기</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

              </div>

              {/* Feed: Newest inquiries */}
              <div className="p-6 rounded-2xl bg-zinc-900 border border-purple-500/5">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                  최근 유입 상담 신청 리스트 (가장 최근 2건)
                </h4>
                <div className="space-y-4">
                  {inquiries.slice(0, 2).map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl bg-black/60 border border-purple-500/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{inq.name} 원장님</span>
                          <span className={`px-2 py-0.5 text-[10px] rounded ${getStatusColor(inq.status)}`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">
                          희망 과정: <strong className="text-purple-300">{inq.program}</strong> | 연락처: {inq.phone}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600">{inq.createdAt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES */}
          {activeTab === "inquiries_tab" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-purple-500/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">상담/문의 신청 실시간 관리</h3>
                  <p className="text-zinc-500 text-xs">고객들이 남긴 1:1 창업 및 교육 접수 현황을 처리합니다.</p>
                </div>

                {/* Filter segments */}
                <div className="flex gap-1">
                  {["전체", "접수대기", "상담완료", "보류"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setInquiryFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        inquiryFilter === f
                          ? "bg-purple-600 text-white"
                          : "bg-zinc-900 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {f} ({f === "전체" ? inquiries.length : inquiries.filter((i) => i.status === f).length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries table/list */}
              <div className="space-y-4">
                {inquiries
                  .filter((i) => inquiryFilter === "전체" || i.status === inquiryFilter)
                  .map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-zinc-900 border border-purple-500/5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-purple-500/5 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-base text-white">{inq.name}</strong>
                            <span className="text-xs text-zinc-500">({inq.email || "이메일 미입력"})</span>
                            <span className={`px-2.5 py-0.5 text-[10px] rounded ${getStatusColor(inq.status)}`}>
                              {inq.status}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-400 mt-1">
                            희망 지원사업: <span className="text-[var(--theme-primary)] font-bold">{inq.program}</span>
                          </div>
                        </div>

                        {/* Status changers */}
                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                          <button
                            onClick={() => handleUpdateInquiryStatus(inq.id, "상담완료")}
                            className="px-2.5 py-1 text-[11px] rounded bg-green-500/10 hover:bg-green-600 border border-green-500/20 hover:text-white text-green-400 transition-colors"
                          >
                            상담완료로 승인
                          </button>
                          <button
                            onClick={() => handleUpdateInquiryStatus(inq.id, "보류")}
                            className="px-2.5 py-1 text-[11px] rounded bg-yellow-500/10 hover:bg-yellow-600 border border-yellow-500/20 hover:text-white text-yellow-400 transition-colors"
                          >
                            보류 설정
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 rounded bg-red-500/10 hover:bg-red-600 hover:text-white text-red-400 border border-red-500/10 transition-all"
                            title="삭제"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Msg content box */}
                      <div className="p-4 rounded-xl bg-black/40 border border-purple-500/5 text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                        {inq.message}
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-zinc-600">
                        <span>연락처: <strong className="text-zinc-400 font-mono">{inq.phone}</strong></span>
                        <span>접수시각: {inq.createdAt}</span>
                      </div>
                    </div>
                  ))}

                {inquiries.filter((i) => inquiryFilter === "전체" || i.status === inquiryFilter).length === 0 && (
                  <div className="text-center py-16 bg-zinc-900/40 rounded-2xl border border-purple-500/5">
                    <span className="text-zinc-500 text-sm">처리할 상담 내역이 존재하지 않습니다.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SITE TEXT CONTENT */}
          {activeTab === "text_content" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("기본 사이트 정보가 안전하게 저장되어 반영되었습니다!");
              }}
              className="space-y-6 animate-fade-in"
            >
              <div className="border-b border-purple-500/10 pb-4">
                <h3 className="text-xl font-bold text-white">기본 정보 & 콘텐츠 편집</h3>
                <p className="text-zinc-500 text-xs">사이트 곳곳에 반영되는 기본 텍스트 및 대표자 정보를 수정합니다.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2">대표 브랜드명</label>
                  <input
                    type="text"
                    value={websiteData.siteName}
                    onChange={(e) => setWebsiteData({ ...websiteData, siteName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 focus:outline-none focus:border-purple-500/40 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2">센터 서브타이틀</label>
                  <input
                    type="text"
                    value={websiteData.siteSubtitle}
                    onChange={(e) => setWebsiteData({ ...websiteData, siteSubtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 focus:outline-none focus:border-purple-500/40 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2">Hero 메인 타이틀</label>
                <input
                  type="text"
                  value={websiteData.heroTitle}
                  onChange={(e) => setWebsiteData({ ...websiteData, heroTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 focus:outline-none focus:border-purple-500/40 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2">Hero 설명글</label>
                <textarea
                  rows={3}
                  value={websiteData.heroSub}
                  onChange={(e) => setWebsiteData({ ...websiteData, heroSub: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 focus:outline-none focus:border-purple-500/40 text-sm text-white leading-relaxed resize-none"
                ></textarea>
              </div>

              <div className="border-t border-purple-500/10 pt-6">
                <h4 className="text-sm font-bold text-white mb-4">비전 섹션 콘텐츠</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">비전 제목</label>
                    <input
                      type="text"
                      value={websiteData.visionTitle}
                      onChange={(e) => setWebsiteData({ ...websiteData, visionTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 focus:outline-none focus:border-purple-500/40 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">비전 본문설명</label>
                    <textarea
                      rows={3}
                      value={websiteData.visionDesc}
                      onChange={(e) => setWebsiteData({ ...websiteData, visionDesc: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 focus:outline-none focus:border-purple-500/40 text-sm text-white leading-relaxed resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="border-t border-purple-500/10 pt-6">
                <h4 className="text-sm font-bold text-white mb-4">대표자 법률 정보 및 푸터용 연락처</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">대표자 명</label>
                    <input
                      type="text"
                      value={websiteData.representative}
                      onChange={(e) => setWebsiteData({ ...websiteData, representative: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 focus:outline-none text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">사업자번호</label>
                    <input
                      type="text"
                      value={websiteData.businessNumber}
                      onChange={(e) => setWebsiteData({ ...websiteData, businessNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 focus:outline-none text-sm text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">전화번호</label>
                    <input
                      type="text"
                      value={websiteData.contactPhone}
                      onChange={(e) => setWebsiteData({ ...websiteData, contactPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 focus:outline-none text-sm text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">사무실 이메일 주소</label>
                    <input
                      type="email"
                      value={websiteData.contactEmail}
                      onChange={(e) => setWebsiteData({ ...websiteData, contactEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 focus:outline-none text-sm text-white font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-400 mb-2">사무실 주소</label>
                    <input
                      type="text"
                      value={websiteData.officeAddress}
                      onChange={(e) => setWebsiteData({ ...websiteData, officeAddress: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 focus:outline-none text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-purple-500/10 pt-6">
                <h4 className="text-sm font-bold text-white mb-4">소셜 미디어 주소</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">인스타그램 URL</label>
                    <input
                      type="text"
                      value={websiteData.instagramUrl}
                      onChange={(e) => setWebsiteData({ ...websiteData, instagramUrl: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-purple-500/5 focus:outline-none text-xs text-zinc-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">유튜브 URL</label>
                    <input
                      type="text"
                      value={websiteData.youtubeUrl}
                      onChange={(e) => setWebsiteData({ ...websiteData, youtubeUrl: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-purple-500/5 focus:outline-none text-xs text-zinc-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">네이버 블로그 URL</label>
                    <input
                      type="text"
                      value={websiteData.blogUrl}
                      onChange={(e) => setWebsiteData({ ...websiteData, blogUrl: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-purple-500/5 focus:outline-none text-xs text-zinc-300 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  기본 정보 일괄 저장
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: PROGRAMS */}
          {activeTab === "programs_tab" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-purple-500/10 pb-4">
                <h3 className="text-xl font-bold text-white">4대 핵심 지원사업 관리</h3>
                <p className="text-zinc-500 text-xs">메인 카드에서 제공하는 핵심 교육/창업 프로그램 세부사항을 편집합니다.</p>
              </div>

              <div className="space-y-8">
                {programs.map((prog, idx) => (
                  <div key={prog.id} className="p-6 rounded-2xl bg-zinc-900 border border-purple-500/5 space-y-4">
                    <div className="flex items-center space-x-3 border-b border-purple-500/5 pb-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-950/40 border border-purple-500/20 text-[var(--theme-primary)] text-sm font-bold font-serif">
                        0{idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-white">프로그램 {idx + 1} 단락</h4>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 mb-1">지원사업 명칭</label>
                        <input
                          type="text"
                          value={prog.title}
                          onChange={(e) => {
                            const updated = [...programs];
                            updated[idx].title = e.target.value;
                            setPrograms(updated);
                          }}
                          className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-purple-500/10 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-400 mb-1">상세 요약 설명</label>
                        <textarea
                          rows={2}
                          value={prog.description}
                          onChange={(e) => {
                            const updated = [...programs];
                            updated[idx].description = e.target.value;
                            setPrograms(updated);
                          }}
                          className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-purple-500/10 text-xs text-white leading-relaxed resize-none"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-400 mb-1">대표 이미지 경로 (Unsplash 등)</label>
                        <input
                          type="text"
                          value={prog.imageUrl}
                          onChange={(e) => {
                            const updated = [...programs];
                            updated[idx].imageUrl = e.target.value;
                            setPrograms(updated);
                          }}
                          className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-purple-500/10 text-xs text-zinc-400 font-mono"
                        />
                      </div>

                      {/* Bullet point subfield edits */}
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 mb-2">세부 지원 내역 리스트 (총 4개 항목)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {prog.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center space-x-2">
                              <span className="text-[10px] text-zinc-600 font-mono">#{bIdx + 1}</span>
                              <input
                                type="text"
                                value={b}
                                onChange={(e) => {
                                  const updated = [...programs];
                                  updated[idx].bullets[bIdx] = e.target.value;
                                  setPrograms(updated);
                                }}
                                className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-950 border border-purple-500/10 text-xs text-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: POSTS BULLETIN */}
          {activeTab === "posts_tab" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-purple-500/10 pb-4">
                <h3 className="text-xl font-bold text-white">센터 소식 & 유용한 정보 글 작성 관리</h3>
                <p className="text-zinc-500 text-xs">공지사항이나 교육 세미나, 블로그 연재글을 신속하게 추가하거나 편집합니다.</p>
              </div>

              {/* Form to Create/Edit */}
              <form onSubmit={handleSavePost} className="p-5 rounded-2xl bg-zinc-900 border border-purple-500/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[var(--theme-primary)]" />
                  <span>{editingPostId ? "선택한 게시글 수정 중" : "새로운 아티클 작성하기"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">제목</label>
                    <input
                      type="text"
                      required
                      placeholder="게시글 제목을 적어주세요."
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-purple-500/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">카테고리</label>
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value as Post["category"])}
                      className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-purple-500/10 text-xs text-white"
                    >
                      <option value="공지사항">공지사항</option>
                      <option value="블로그">블로그</option>
                      <option value="언론보도">언론보도</option>
                      <option value="교육소식">교육소식</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">게시글 본문 내용</label>
                  <textarea
                    rows={6}
                    required
                    placeholder="내용을 채워주세요. (줄바꿈이 자동 처리됩니다)"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-purple-500/10 text-xs text-white leading-relaxed resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="pin-post-check"
                      checked={newPostPinned}
                      onChange={(e) => setNewPostPinned(e.target.checked)}
                      className="rounded border-purple-500/20 text-purple-600 focus:ring-purple-500 focus:ring-opacity-20"
                    />
                    <label htmlFor="pin-post-check" className="text-xs text-zinc-400 select-none cursor-pointer">
                      중요 공지로 최상단 고정 (Pinned Post)
                    </label>
                  </div>

                  <div className="flex gap-2">
                    {editingPostId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPostId(null);
                          setNewPostTitle("");
                          setNewPostContent("");
                          setNewPostPinned(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-bold"
                      >
                        취소
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-950/40"
                    >
                      {editingPostId ? "게시글 수정 완료" : "작성 및 실시간 발행"}
                    </button>
                  </div>
                </div>
              </form>

              {/* List of existing posts */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">등록된 게시글 현황 ({posts.length}개)</h4>
                <div className="divide-y divide-purple-500/5 bg-zinc-900/40 rounded-2xl border border-purple-500/5">
                  {posts.map((post) => (
                    <div key={post.id} className="p-4 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/10 font-bold">
                            {post.category}
                          </span>
                          {post.isPinned && (
                            <span className="text-[10px] text-yellow-400 font-bold bg-yellow-400/5 border border-yellow-500/20 px-1.5 py-0.2 rounded">
                              고정
                            </span>
                          )}
                          <strong className="text-sm text-zinc-200">{post.title}</strong>
                        </div>
                        <div className="text-[11px] text-zinc-500">
                          작성일: {post.date} | 조회수: {post.views}회 | 작성자: {post.author}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditPostInit(post)}
                          className="p-2 text-zinc-400 hover:text-purple-400 hover:bg-zinc-800/80 rounded-xl transition-colors"
                          title="수정"
                        >
                          <FileEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800/80 rounded-xl transition-colors"
                          title="삭제"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PRODUCTS */}
          {activeTab === "products_tab" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-purple-500/10 pb-4">
                <h3 className="text-xl font-bold text-white">공동구매 품목 & 특가 관리</h3>
                <p className="text-zinc-500 text-xs">피부진단기, 아쿠아 헤드스파 전문 장비 및 스킨케어 도매 제품 라인업을 구성합니다.</p>
              </div>

              {/* Product Edit form */}
              <form onSubmit={handleSaveProduct} className="p-5 rounded-2xl bg-zinc-900 border border-purple-500/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ShoppingBag size={14} className="text-purple-400" />
                  <span>{editingProdId ? "선택 기기 세부사항 수정 중" : "새 장비/화장품 공동구매 등록"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">제품명</label>
                    <input
                      type="text"
                      required
                      placeholder="제품명을 적어주세요."
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-purple-500/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">기기 분류</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value as Product["category"])}
                      className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-purple-500/10 text-xs text-white"
                    >
                      <option value="AI피부진단">AI 피부 진단기</option>
                      <option value="피부·헤드스파">에스테틱 & 헤드스파 장비</option>
                      <option value="화장품">특수 기능성 화장품</option>
                      <option value="기타장비">기타 보조장비</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">공동구매 단가 표기</label>
                    <input
                      type="text"
                      required
                      placeholder="예: 공동구매가 문의, 도매 특가 공급"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-purple-500/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">대표 이미지 주소</label>
                    <input
                      type="text"
                      placeholder="Unsplash 등 이미지 URL 경로"
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-purple-500/10 text-xs text-zinc-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">제품 요약 및 세부 스펙</label>
                  <textarea
                    rows={3}
                    placeholder="기능 및 전압, 무상보증 기간 등"
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-purple-500/10 text-xs text-white leading-normal resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2">
                  {editingProdId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProdId(null);
                        setNewProdName("");
                        setNewProdPrice("");
                        setNewProdDesc("");
                        setNewProdImage("");
                      }}
                      className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-bold"
                    >
                      취소
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-950/40"
                  >
                    {editingProdId ? "수정사항 저장" : "공동구매 등록"}
                  </button>
                </div>
              </form>

              {/* Product Shelf list */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">활성화된 공동구매 품목 ({products.length}종)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl bg-zinc-900 border border-purple-500/5 flex gap-4">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-16 h-16 rounded-lg object-cover bg-black"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] text-purple-300 font-bold bg-purple-950/40 px-1.5 py-0.2 rounded border border-purple-500/10">
                            {p.category}
                          </span>
                          <span className="text-xs text-zinc-400 font-bold font-mono">{p.price}</span>
                        </div>
                        <h5 className="text-sm font-bold text-white truncate">{p.name}</h5>
                        <div className="flex items-center justify-end gap-1.5 pt-1">
                          <button
                            onClick={() => handleEditProductInit(p)}
                            className="text-[11px] text-purple-400 hover:underline flex items-center gap-0.5"
                          >
                            <FileEdit size={11} />
                            <span>수정</span>
                          </button>
                          <span className="text-zinc-700">|</span>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="text-[11px] text-red-400 hover:underline flex items-center gap-0.5"
                          >
                            <Trash2 size={11} />
                            <span>삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SEO CONTROLS */}
          {activeTab === "seo_tab" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-purple-500/10 pb-4">
                <h3 className="text-xl font-bold text-white">SEO(검색엔진 최적화) 정밀 분석 및 설정</h3>
                <p className="text-zinc-500 text-xs">네이버, 구글 등 주요 포털 검색 결과 노출을 증대시키기 위한 헤더 메타태그 정보입니다.</p>
              </div>

              {/* Real-time Health Analyzer Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-purple-950/20 border border-purple-500/10 flex flex-col md:flex-row items-center gap-6">
                
                {/* Score gauge circle (SVG) */}
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="transparent" stroke="#111" strokeWidth="2.5" />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="transparent"
                      stroke={seoScore >= 80 ? "#22c55e" : "#eab308"}
                      strokeWidth="2.5"
                      strokeDasharray="100"
                      strokeDashoffset={100 - seoScore}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white font-mono">{seoScore}점</span>
                    <span className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">SEO Score</span>
                  </div>
                </div>

                {/* Score tips */}
                <div className="flex-1 space-y-2">
                  <h4 className="text-sm font-bold text-white">실시간 SEO 자가진단 리포트</h4>
                  {seoTips.length === 0 ? (
                    <p className="text-xs text-green-400 font-medium">
                      ✓ 완벽합니다! 현재 모든 검색 포털 가이드라인 점수를 통과하였습니다.
                    </p>
                  ) : (
                    <ul className="space-y-1">
                      {seoTips.map((tip, idx) => (
                        <li key={idx} className="text-xs text-yellow-400 flex items-start gap-1">
                          <span>•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* SEO form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("SEO 검색엔진 데이터 메타태그가 안전하게 저장되어 반영되었습니다!");
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">메인 Meta 제목 (Title)</label>
                    <input
                      type="text"
                      value={seo.metaTitle}
                      onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-purple-500/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">작성자 퍼블리셔 (Author)</label>
                    <input
                      type="text"
                      value={seo.author}
                      onChange={(e) => setSeo({ ...seo, author: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-purple-500/10 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">포털 설명글 (Description - 80자 내외 권장)</label>
                  <textarea
                    rows={2}
                    value={seo.metaDescription}
                    onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-purple-500/10 text-xs text-white leading-normal resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">핵심 검색 키워드 (Keywords - 쉼표로 구분)</label>
                  <input
                    type="text"
                    value={seo.metaKeywords}
                    onChange={(e) => setSeo({ ...seo, metaKeywords: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-purple-500/10 text-xs text-white font-mono"
                  />
                </div>

                <div className="border-t border-purple-500/5 pt-4 space-y-4">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    소셜 미디어 공유용 메타태그 (OpenGraph Protocol)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-zinc-500 mb-1">카카오톡/블로그 공유 제목</label>
                      <input
                        type="text"
                        value={seo.ogTitle}
                        onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-purple-500/5 text-xs text-zinc-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-500 mb-1">카카오톡/블로그 공유 요약글</label>
                      <input
                        type="text"
                        value={seo.ogDescription}
                        onChange={(e) => setSeo({ ...seo, ogDescription: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-purple-500/5 text-xs text-zinc-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-950/40"
                  >
                    SEO 설정 및 메타태그 일괄 저장
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 8: STYLING & BRAND COLOR */}
          {activeTab === "styling_tab" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-purple-500/10 pb-4">
                <h3 className="text-xl font-bold text-white">비주얼 테마 & 브랜드 컬러 설정</h3>
                <p className="text-zinc-500 text-xs">웹사이트 전반의 분위기를 결정짓는 포인트 컬러, 폰트 패밀리, 카드 스타일 형태를 제어합니다.</p>
              </div>

              {/* Predefined luxury presets */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  원클릭 프리미엄 컬러 파레트 프리셋
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {palettes.map((p) => {
                    const isSelected =
                      websiteData.primaryColor === p.primary &&
                      websiteData.backgroundColor === p.bg;
                    return (
                      <div
                        key={p.name}
                        onClick={() => handleApplyPalette(p)}
                        className={`p-4 rounded-2xl bg-zinc-900 border transition-all cursor-pointer flex items-center justify-between gap-4 hover:border-purple-500/40 ${
                          isSelected ? "border-purple-500" : "border-purple-500/5"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <strong className="text-xs sm:text-sm text-zinc-200">{p.name}</strong>
                          <div className="text-[10px] text-zinc-500 font-mono">
                            BG: {p.bg} | Prim: {p.primary}
                          </div>
                        </div>

                        {/* Color circular indicators */}
                        <div className="flex items-center space-x-1.5 shrink-0">
                          <span
                            className="w-5 h-5 rounded-full border border-white/10"
                            style={{ backgroundColor: p.bg }}
                            title="배경색"
                          ></span>
                          <span
                            className="w-5 h-5 rounded-full border border-white/10"
                            style={{ backgroundColor: p.primary }}
                            title="주요 포인트색"
                          ></span>
                          <span
                            className="w-5 h-5 rounded-full border border-white/10"
                            style={{ backgroundColor: p.secondary }}
                            title="보조강조색"
                          ></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Manual inputs */}
              <div className="border-t border-purple-500/5 pt-6 space-y-6">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  고급 개발자용 색상 상세 미세조정 (HEX 값 직접 입력)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">대표 포인트 컬러 (Primary)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={websiteData.primaryColor}
                        onChange={(e) => setWebsiteData({ ...websiteData, primaryColor: e.target.value })}
                        className="w-8 h-8 rounded border-none cursor-pointer"
                      />
                      <input
                        type="text"
                        value={websiteData.primaryColor}
                        onChange={(e) => setWebsiteData({ ...websiteData, primaryColor: e.target.value })}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-purple-500/10 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">보조 하이라이트 (Secondary)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={websiteData.secondaryColor}
                        onChange={(e) => setWebsiteData({ ...websiteData, secondaryColor: e.target.value })}
                        className="w-8 h-8 rounded border-none cursor-pointer"
                      />
                      <input
                        type="text"
                        value={websiteData.secondaryColor}
                        onChange={(e) => setWebsiteData({ ...websiteData, secondaryColor: e.target.value })}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-purple-500/10 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">백그라운드 배경색 (Background)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={websiteData.backgroundColor}
                        onChange={(e) => setWebsiteData({ ...websiteData, backgroundColor: e.target.value })}
                        className="w-8 h-8 rounded border-none cursor-pointer"
                      />
                      <input
                        type="text"
                        value={websiteData.backgroundColor}
                        onChange={(e) => setWebsiteData({ ...websiteData, backgroundColor: e.target.value })}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-purple-500/10 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card design and font styling */}
              <div className="border-t border-purple-500/5 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Font selector */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2">웹폰트 및 한글서체 스타일</label>
                  <select
                    value={websiteData.fontFamily}
                    onChange={(e) => setWebsiteData({ ...websiteData, fontFamily: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 text-xs text-white"
                  >
                    <option value="font-sans">Inter / 산세리프 고딕체 (기본 권장)</option>
                    <option value="font-serif">나눔명조 / 클래식 엘레강스 명조체</option>
                    <option value="font-mono">Fira Mono / 테크니컬 개발 모노체</option>
                  </select>
                </div>

                {/* Card style */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2">지원카드 및 목록 컨테이너 비주얼</label>
                  <select
                    value={websiteData.cardStyle}
                    onChange={(e) => setWebsiteData({ ...websiteData, cardStyle: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-purple-500/10 text-xs text-white"
                  >
                    <option value="glow">고급 네온 글로우 스타일 (Neon Shadow Glow)</option>
                    <option value="minimal">모던 플랫 미니멀 스타일 (Pure Minimal Dark)</option>
                    <option value="bordered">강조 선 외곽 레이아웃 (Accent Double-Bordered)</option>
                  </select>
                </div>

              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => alert("스타일링 속성이 즉시 글로벌 적용되었습니다! 미리보기 버튼을 클릭해 확인해 보세요.")}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-950/40 cursor-pointer"
                >
                  테마 스타일 즉시 적용
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
