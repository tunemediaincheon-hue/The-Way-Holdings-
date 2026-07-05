/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProgramDetail, TargetAudience, Advantage, Post, Inquiry, Product, WebSiteData, SEOData } from "./types";

export const initialPrograms: ProgramDetail[] = [
  {
    id: "prog-1",
    num: "1",
    title: "K-뷰티 창업 컨설팅",
    imageUrl: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=600",
    description: "뷰티샵, 에스테틱, 헤드스파 전문 창업을 위한 A to Z 마케팅 및 운영 매뉴얼 제공",
    bullets: [
      "뷰티샵·에스테틱·헤드스파 창업 지원",
      "사업계획서 및 운영 매뉴얼 제공",
      "브랜드 구축 및 마케팅 컨설팅",
      "창업 운영 및 수익모델 구축 지원"
    ]
  },
  {
    id: "prog-2",
    num: "2",
    title: "뷰티기기·화장품 공동구매",
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    description: "최신 AI 피부진단기 및 헤드스파 전문 관리기기 공동구매를 통해 장비 도입 부담을 획기적으로 낮춰드립니다.",
    bullets: [
      "AI 피부진단기 공동구매",
      "헤드스파 및 피부관리 장비 공급",
      "화장품 OEM·ODM 연계 지원",
      "K-뷰티 제품 유통 및 판로 지원"
    ]
  },
  {
    id: "prog-3",
    num: "3",
    title: "K-STAR 글로벌 강사 양성",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
    description: "국제 인증 강사 교육을 통해 국내외 뷰티 교육 무대에서 활약할 수 있는 프로페셔널 강사로 성장시킵니다.",
    bullets: [
      "국제 강사 인증과정 운영",
      "국내외 세미나 및 박람회 참여 지원",
      "글로벌 네트워크 구축 및 강사 활동 지원",
      "K-뷰티 전문 강사 양성 프로그램 운영"
    ]
  },
  {
    id: "prog-4",
    num: "4",
    title: "브랜드 창업 및 해외 진출",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
    description: "자체 화장품/뷰티 브랜드의 독창적인 개발부터 동남아, 유럽 등 글로벌 판로 개척까지 지원합니다.",
    bullets: [
      "K-뷰티 브랜드 개발",
      "동남아 및 글로벌 시장 진출 지원",
      "해외 바이어 및 투자자 연계",
      "글로벌 비즈니스 파트너십 구축"
    ]
  }
];

export const initialTargets: TargetAudience[] = [
  {
    id: "target-1",
    title: "뷰티 창업 예정자",
    iconName: "Sparkles",
    description: "새로운 뷰티샵, 에스테틱 및 두피케어 센터 창업을 목표로 하는 예비 창업주"
  },
  {
    id: "target-2",
    title: "미용인 및 피부관리사",
    iconName: "User",
    description: "기존의 기술력을 보완하고 차별화된 하이엔드 서비스 경쟁력을 도입하려는 전문가"
  },
  {
    id: "target-3",
    title: "헤드스파·두피 전문가",
    iconName: "Scissors",
    description: "최신 웰니스 트렌드인 헤드스파 및 맞춤형 두피 스페셜리스트가 되고자 하는 미용인"
  },
  {
    id: "target-4",
    title: "글로벌 강사 희망자",
    iconName: "Globe",
    description: "국제무대 및 해외 교육원, 아카데미에서 K-뷰티 교육을 전파할 전문 강사 희망자"
  },
  {
    id: "target-5",
    title: "브랜드 창업 희망 기업",
    iconName: "Building",
    description: "독창적인 K-뷰티 브랜드를 론칭하고 해외 OEM/ODM 제조 연계를 원하시는 법인"
  }
];

export const initialAdvantages: Advantage[] = [
  {
    id: "adv-1",
    title: "전문가 네트워크 & 멘토링",
    iconName: "Users",
    description: "업계 최정상급 뷰티 마스터 및 해외 진출 컨설턴트와의 1:1 맞춤형 피드백을 지원합니다."
  },
  {
    id: "adv-2",
    title: "공동구매로 비용 절감",
    iconName: "ShoppingBag",
    description: "제조사와 직접 협력하여 AI 진단장비, 에스테틱 기기 등을 독점 도매 혜택가로 공급합니다."
  },
  {
    id: "adv-3",
    title: "글로벌 진출 원스톱 지원",
    iconName: "Plane",
    description: "수출 검증, 해외 무역 대행, 바이어 연계 및 해외 아카데미 매칭을 원스톱으로 해결합니다."
  },
  {
    id: "adv-4",
    title: "브랜드 성장 전략 지원",
    iconName: "TrendingUp",
    description: "단순 오픈에 그치지 않고, 가맹 사업 및 프랜차이즈 구조화, 장기 성장 로드맵을 설계합니다."
  },
  {
    id: "adv-5",
    title: "국제 인증 강사 양성",
    iconName: "Award",
    description: "세계적으로 공인된 K-STAR 국제 강사 자격증 발급 및 대외 세미나 주강사 출강 기회를 보장합니다."
  }
];

export const initialPosts: Post[] = [
  {
    id: "post-1",
    title: "[공지] 2026년 제3회 K-STAR 글로벌 강사 자격증 과정 수강생 모집",
    content: "안녕하세요. 더웨이홀딩스 K-뷰티 창업지원센터입니다. 동남아 및 일본 시장의 급격한 K-뷰티 아카데미 확대로 인해 현지 출강을 담당할 'K-STAR 글로벌 강사' 인증 과정 교육생을 선발합니다. 이번 기수 합격자에게는 해외 세미나 보조강사 참관 지원 및 현지 항공비 일부 지원 혜택이 주어집니다. 미용 면허 소지자 또는 에스테틱 경력 2년 이상인 분들의 많은 관심 바랍니다.",
    author: "관리자",
    date: "2026-07-04",
    category: "공지사항",
    views: 142,
    isPinned: true
  },
  {
    id: "post-2",
    title: "[공동구매] 차세대 AI 3D 피부 정밀 진단기 7월 정기 모집 개시",
    content: "창업 및 리뉴얼 샵의 필수품! 스마트 AI 3D 피부진단장비의 7월 단체 공동구매를 개시합니다. 고객의 주름, 모공, 탄력, 피지 상태를 10초 만에 완벽 분석하여 맞춤형 패키지 결제로 이어지게 하는 일등공신 기기입니다. 더웨이홀딩스 파트너 전용 45% 특별 할인가 및 1년 무상 A/S 보증 혜택이 적용됩니다. 선착순 10대 한정 수량으로 조기 마감될 수 있습니다.",
    author: "창업지원센터",
    date: "2026-07-03",
    category: "교육소식",
    views: 95,
    isPinned: true
  },
  {
    id: "post-3",
    title: "베트남 호치민 에스테틱 세미나 성료 및 현지 MOU 체결",
    content: "더웨이홀딩스가 주관한 '2026 호치민 K-Beauty Advance 세미나'가 현지 피부미용사 200여 명이 참석한 가운데 성황리에 종료되었습니다. 본 세미나에서는 K-뷰티식 고품격 헤드스파 및 에스테틱 테크닉을 교육하였으며, 현지 유력 미용 프랜차이즈 그룹인 'Aura Beauty Group'과 한국 프리미엄 앰플 및 두피관리 장비 공급에 관한 독점 30만 불 규모의 수출 협약(MOU)을 성사시켰습니다.",
    author: "글로벌사업부",
    date: "2026-06-28",
    category: "언론보도",
    views: 118
  },
  {
    id: "post-4",
    title: "[에스테틱 정보] 요즘 대세 '헤드스파'가 뷰티샵의 매출을 2배 올리는 원리",
    content: "단순 샴푸 서비스를 넘어 최고급 스칼프 웰니스로 정착한 헤드스파! 기존 피부관리실이나 1인 미용실에 헤드스파를 추가 도입했을 때의 매출 시너지 효과와 차별화된 회원권 구성 노하우를 공개합니다. 고객 단가를 높이고 고정 고객의 주간 방문 주기를 단축시키는 구체적인 운영 매뉴얼 사례를 더웨이홀딩스 창업 컨설팅 자료실에서 확인해보세요.",
    author: "교육팀장",
    date: "2026-06-25",
    category: "블로그",
    views: 231
  }
];

export const initialInquiries: Inquiry[] = [
  {
    id: "inq-1",
    name: "김수연",
    phone: "010-4455-8899",
    email: "suyeon.k@gmail.com",
    program: "K-뷰티 창업 컨설팅",
    message: "인천 논현동 인근에 헤드스파 겸 에스테틱 샵을 새로 창업하고자 준비 중입니다. 매장 규모 및 인테리어 기기 구매와 마케팅 컨설팅 세부 내용에 대해 오프라인 상담 예약하고 싶습니다.",
    status: "접수대기",
    createdAt: "2026-07-04 15:30"
  },
  {
    id: "inq-2",
    name: "박진우",
    phone: "010-3322-7711",
    email: "jinwoo_p@naver.com",
    program: "뷰티기기·화장품 공동구매",
    message: "현재 피부관리실을 운영하고 있는데 이번에 공동구매 진행하는 AI 피부진단기 가격과 렌탈/할부 금융 연계가 가능한지 견적서와 세부 리플렛 이메일로 송부 부탁드립니다.",
    status: "상담완료",
    createdAt: "2026-07-03 11:15"
  },
  {
    id: "inq-3",
    name: "이혜민",
    phone: "010-8899-2233",
    email: "hyemin_star@daum.net",
    program: "K-STAR 글로벌 강사 양성",
    message: "에스테틱 원장 경력이 5년 정도 됩니다. 해외 출강을 나가는 국제 강사 자격증 취득 및 다음 해외 세미나 참관 일정과 선발 조건이 궁금해서 문의 남깁니다.",
    status: "접수대기",
    createdAt: "2026-07-02 09:40"
  }
];

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "AI Smart Skin 3D 피부정밀분단기",
    category: "AI피부진단",
    price: "공동구매가 문의 (최대 45% 할인)",
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    description: "초고해상도 다각도 렌즈 및 AI 피부 매핑 알고리즘으로 모공, 색소, 피지 등 10가지 피부 지표 정밀 측정 및 케어 추천 보고서 즉시 인쇄.",
    isPopular: true
  },
  {
    id: "prod-2",
    name: "웰니스 아쿠아 스팀 헤드스파 장비",
    category: "피부·헤드스파",
    price: "공동구매 특가 공급",
    imageUrl: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=600",
    description: "순환 유기농 워터스파 라인과 극미세 음이온 온열 스틸 분사 헤드로 두피 모공 스케일링 및 안구 이완 힐링 시스템 동시 탑재.",
    isPopular: true
  },
  {
    id: "prod-3",
    name: "K-STAR 더웨이 펩타이드 리페어 앰플 (10vials)",
    category: "화장품",
    price: "회원사 전용 도매가",
    imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
    description: "창업지원센터 마스터들이 엄선한 주름 개선 기능성 EGF 포뮬러. 해외 지사 및 에스테틱 샵 전용 고함량 피부 재생 유효 성분 주입.",
  }
];

export const initialSEO: SEOData = {
  metaTitle: "더웨이홀딩스 K-뷰티 창업지원센터",
  metaDescription: "K-뷰티의 성장을 연결하는 더웨이홀딩스. 뷰티숍 에스테틱 창업 컨설팅, AI 피부진단 장비 및 헤드스파 전문 기기 공동구매, 글로벌 강사 양성 및 브랜드 론칭 원스톱 지원",
  metaKeywords: "더웨이홀딩스, K-뷰티 창업, 에스테틱 창업, 헤드스파 창업, 피부관리기 공동구매, AI피부진단기, 글로벌 뷰티강사, K-STAR, 이순미 대표",
  ogTitle: "더웨이홀딩스 K-뷰티 창업지원센터 - 대한민국 K-뷰티를 세계로!",
  ogDescription: "창업 컨설팅, 기기 공동구매, 국제 강사 인증과정, 글로벌 네트워크 및 브랜드 해외 시장 진출 지원",
  author: "더웨이홀딩스"
};

export const initialWebsiteData: WebSiteData = {
  siteName: "더웨이홀딩스",
  siteSubtitle: "K-뷰티 창업지원센터",
  heroTitle: "대한민국 K-뷰티를 세계로!",
  heroSub: "창업 교육, 기기 공동구매, 독자 브랜드 론칭, 글로벌 강사 육성 및 해외 진출까지 — 더웨이홀딩스가 성공적인 K-Beauty 창업 생태계를 원스톱으로 지원합니다.",
  heroBadge: "함께 성장하는 글로벌 K-뷰티 플랫폼",
  visionTitle: "더웨이홀딩스 비전",
  visionDesc: "교육, 창업, 유통, 글로벌 네트워크를 긴밀하게 연결하여 K-뷰티 전문가들이 꿈을 이루고 해외 시장에서 주도적으로 활약하는 건강한 성장 생태계를 창조합니다.",
  visionFormula: {
    part1: "교육",
    part2: "창업",
    part3: "유통",
    part4: "글로벌 네트워크",
    result: "성장"
  },
  contactPhone: "010-9654-9882",
  contactEmail: "thewayholdings@naver.com",
  representative: "이순미",
  businessNumber: "414-81-09913",
  officeAddress: "인천광역시 남동구 청능대로 559, 4층 4556호 (논현동, 논현메디컬센터)",
  instagramUrl: "https://instagram.com/theway.holdings",
  youtubeUrl: "https://youtube.com/@thewayholdings",
  blogUrl: "https://blog.naver.com/thewayholdings",
  
  // Theme styling (Sleek Interface Dark Theme)
  primaryColor: "#a855f7", // Sleek Purple
  secondaryColor: "#d946ef", // fuchsia accent
  backgroundColor: "#000000", // Sleek Pure Black
  fontFamily: "font-sans",
  cardStyle: "glow"
};
