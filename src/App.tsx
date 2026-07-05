/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Programs from "./components/Programs";
import Targets from "./components/Targets";
import Advantages from "./components/Advantages";
import Vision from "./components/Vision";
import BulletinBoard from "./components/BulletinBoard";
import GroupPurchase from "./components/GroupPurchase";
import ConsultationForm from "./components/ConsultationForm";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import PageBanner from "./components/PageBanner";

import {
  initialPrograms,
  initialTargets,
  initialAdvantages,
  initialPosts,
  initialInquiries,
  initialProducts,
  initialSEO,
  initialWebsiteData
} from "./initialData";

import { WebSiteData, ProgramDetail, Post, Inquiry, Product, SEOData } from "./types";
import { saveToLocalStorage, loadFromLocalStorage, hexToRgb } from "./utils";

export default function App() {
  // Shared States
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<string>("home");
  
  const [websiteData, setWebsiteData] = React.useState<WebSiteData>(() =>
    loadFromLocalStorage<WebSiteData>("website_data", initialWebsiteData)
  );
  
  const [programs, setPrograms] = React.useState<ProgramDetail[]>(() =>
    loadFromLocalStorage<ProgramDetail[]>("programs", initialPrograms)
  );
  
  const [targets, setTargets] = React.useState(() =>
    loadFromLocalStorage("targets", initialTargets)
  );
  
  const [advantages, setAdvantages] = React.useState(() =>
    loadFromLocalStorage("advantages", initialAdvantages)
  );
  
  const [posts, setPosts] = React.useState<Post[]>(() =>
    loadFromLocalStorage<Post[]>("posts", initialPosts)
  );
  
  const [inquiries, setInquiries] = React.useState<Inquiry[]>(() =>
    loadFromLocalStorage<Inquiry[]>("inquiries", initialInquiries)
  );
  
  const [products, setProducts] = React.useState<Product[]>(() =>
    loadFromLocalStorage<Product[]>("products", initialProducts)
  );
  
  const [seo, setSeo] = React.useState<SEOData>(() =>
    loadFromLocalStorage<SEOData>("seo", initialSEO)
  );

  // Form selections and shortcuts
  const [selectedProgram, setSelectedProgram] = React.useState<string>("K-뷰티 창업 컨설팅");
  const [customMessage, setCustomMessage] = React.useState<string>("");

  // Sync states to local storage upon modification
  React.useEffect(() => {
    saveToLocalStorage("website_data", websiteData);
  }, [websiteData]);

  React.useEffect(() => {
    saveToLocalStorage("programs", programs);
  }, [programs]);

  React.useEffect(() => {
    saveToLocalStorage("posts", posts);
  }, [posts]);

  React.useEffect(() => {
    saveToLocalStorage("inquiries", inquiries);
  }, [inquiries]);

  React.useEffect(() => {
    saveToLocalStorage("products", products);
  }, [products]);

  React.useEffect(() => {
    saveToLocalStorage("seo", seo);
  }, [seo]);

  // Handle SEO Title tag injection
  React.useEffect(() => {
    document.title = seo.metaTitle || "더웨이홀딩스 K-뷰티 창업지원센터";
    
    // Dynamically update meta description if exists
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", seo.metaDescription);

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", seo.metaKeywords);
  }, [seo]);

  // Navigate to sections smoothly or switch pages
  const handleNavigate = (sectionId: string) => {
    setIsAdmin(false); // Make sure we are in preview mode to see the elements
    
    const pageMapping: Record<string, string> = {
      hero: "home",
      home: "home",
      programs: "programs",
      targets: "targets",
      advantages: "advantages",
      vision: "vision",
      posts: "posts",
      products: "products",
      consultation: "consultation"
    };

    const targetPage = pageMapping[sectionId] || "home";
    setCurrentPage(targetPage);
    
    // Scroll smoothly to top when switching pages
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  // Add inquiry handler
  const handleAddInquiry = (newInq: Omit<Inquiry, "id" | "createdAt" | "status">) => {
    const formattedInq: Inquiry = {
      ...newInq,
      id: `inq-${Date.now()}`,
      status: "접수대기",
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16)
    };
    setInquiries([formattedInq, ...inquiries]);
  };

  // Shortcut inquiry selection
  const handleInquireProgram = (programTitle: string) => {
    setSelectedProgram(programTitle);
    setCustomMessage(`안녕하세요. [${programTitle}] 맞춤 컨설팅 및 운영 매뉴얼 상담 신청합니다.`);
    handleNavigate("consultation");
  };

  const handleSelectProduct = (productName: string) => {
    setSelectedProgram("뷰티기기·화장품 공동구매");
    setCustomMessage(`안녕하세요. 공동구매 제품인 [${productName}] 기기의 도매 공급 단가 및 기술 보증 교육 혜택 문의드립니다.`);
    handleNavigate("consultation");
  };

  // RGB helper for custom variables (enables opacity colors like purple-500/20)
  const primaryRgb = hexToRgb(websiteData.primaryColor);

  const customThemeVars = {
    "--theme-primary": websiteData.primaryColor,
    "--theme-primary-rgb": primaryRgb,
    "--theme-secondary": websiteData.secondaryColor,
    "--theme-bg": websiteData.backgroundColor,
  } as React.CSSProperties;

  return (
    <div
      style={customThemeVars}
      className={`min-h-screen transition-colors duration-500 bg-[var(--theme-bg)] text-zinc-100 selection:bg-purple-600/30 selection:text-purple-300 ${websiteData.fontFamily}`}
    >
      {/* Header bar */}
      <Header
        websiteData={websiteData}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      {/* Conditional rendering based on Mode */}
      {isAdmin ? (
        <AdminDashboard
          websiteData={websiteData}
          setWebsiteData={setWebsiteData}
          programs={programs}
          setPrograms={setPrograms}
          posts={posts}
          setPosts={setPosts}
          inquiries={inquiries}
          setInquiries={setInquiries}
          products={products}
          setProducts={setProducts}
          seo={seo}
          setSeo={setSeo}
        />
      ) : (
        <>
          {currentPage === "home" && (
            <>
              <Hero
                websiteData={websiteData}
                onNavigate={handleNavigate}
              />
              <Programs
                programs={programs}
                cardStyle={websiteData.cardStyle}
                primaryColor={websiteData.primaryColor}
                onInquireProgram={handleInquireProgram}
              />
              <Targets
                targets={targets}
              />
              <Advantages
                advantages={advantages}
              />
              <Vision
                websiteData={websiteData}
              />
              <BulletinBoard
                posts={posts}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
              <GroupPurchase
                products={products}
                onSelectProduct={handleSelectProduct}
              />
              <ConsultationForm
                websiteData={websiteData}
                onAddInquiry={handleAddInquiry}
                selectedProgram={selectedProgram}
                setSelectedProgram={setSelectedProgram}
                customMessage={customMessage}
                setCustomMessage={setCustomMessage}
              />
            </>
          )}

          {currentPage === "programs" && (
            <>
              <PageBanner
                title="K-뷰티 창업 맞춤형 지원사업"
                subtitle="더웨이홀딩스가 엄선한 단계별 성공 솔루션과 가맹 및 기술 지원 프로그램을 소개합니다."
                category="주요 지원사업"
                onGoHome={() => setCurrentPage("home")}
              />
              <Programs
                programs={programs}
                cardStyle={websiteData.cardStyle}
                primaryColor={websiteData.primaryColor}
                onInquireProgram={handleInquireProgram}
              />
            </>
          )}

          {currentPage === "targets" && (
            <>
              <PageBanner
                title="이런 분들과 함께 성장합니다"
                subtitle="신규 창업자부터 기존 뷰티샵 원장님, 소자본 1인 창업자까지 맞춤형 비즈니스를 지원합니다."
                category="지원 대상"
                onGoHome={() => setCurrentPage("home")}
              />
              <Targets
                targets={targets}
              />
            </>
          )}

          {currentPage === "advantages" && (
            <>
              <PageBanner
                title="더웨이홀딩스만의 특별한 핵심 역량"
                subtitle="독보적인 기기 라인업, 합리적인 공급가, 완벽한 사후 관리로 창업의 격을 높입니다."
                category="플랫폼 강점"
                onGoHome={() => setCurrentPage("home")}
              />
              <Advantages
                advantages={advantages}
              />
            </>
          )}

          {currentPage === "vision" && (
            <>
              <PageBanner
                title="대한민국을 넘어 세계로 나아가는 K-뷰티"
                subtitle="가장 아름답고 건강한 일상을 기술과 신뢰로 완성해나가는 더웨이홀딩스의 약속입니다."
                category="비전"
                onGoHome={() => setCurrentPage("home")}
              />
              <Vision
                websiteData={websiteData}
              />
            </>
          )}

          {currentPage === "posts" && (
            <>
              <PageBanner
                title="공지사항 및 업계 소식 뉴스룸"
                subtitle="더웨이홀딩스의 최신 프로모션, 교육 일정, 세미나 공지 및 K-뷰티 트렌드를 실시간으로 전해드립니다."
                category="최신 소식"
                onGoHome={() => setCurrentPage("home")}
              />
              <BulletinBoard
                posts={posts}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            </>
          )}

          {currentPage === "products" && (
            <>
              <PageBanner
                title="프리미엄 뷰티기기 & 맞춤 솔루션 도매"
                subtitle="기술 보증 교육과 함께 최고의 조건으로 공급해 드리는 가맹점 전용 공동구매 샵입니다."
                category="기기·화장품 공동구매"
                onGoHome={() => setCurrentPage("home")}
              />
              <GroupPurchase
                products={products}
                onSelectProduct={handleSelectProduct}
              />
            </>
          )}

          {currentPage === "consultation" && (
            <>
              <PageBanner
                title="성공적인 K-뷰티 창업의 시작"
                subtitle="궁금한 점이 있으시다면 언제든 문의를 남겨주세요. 전문 컨설턴트가 성심껏 답변해 드립니다."
                category="상담 신청"
                onGoHome={() => setCurrentPage("home")}
              />
              <ConsultationForm
                websiteData={websiteData}
                onAddInquiry={handleAddInquiry}
                selectedProgram={selectedProgram}
                setSelectedProgram={setSelectedProgram}
                customMessage={customMessage}
                setCustomMessage={setCustomMessage}
              />
            </>
          )}
        </>
      )}

      {/* Footer is constant */}
      <Footer websiteData={websiteData} />
    </div>
  );
}
