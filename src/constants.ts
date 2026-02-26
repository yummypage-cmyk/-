import { Post, SiteConfig } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  heroTitle: "합격의 압도적 차이, 몰입의 깊이로 증명합니다",
  heroSubtitle: "서울고시학원 20년 관리 노하우와 프리미엄 AI 몰입 시스템이 만났습니다. 당신의 시작과 끝을 함께하는 합격연구소.",
  primaryColor: "#B71C1C",
  contactPhone: "055-753-7774",
  address: "진주시 동진로 28 서울고시학원 엠코아빌딩 4층",
  kakaoUrl: "https://pf.kakao.com/_example",
};

export const SYSTEM_FEATURES = [
  {
    title: "생활관리",
    subtitle: "엄격한 3중 담임제",
    desc: "출결, 외출, 조퇴 관리는 기본. 스마트폰 의무 제출 및 인강 사이트 외 차단 시스템으로 완벽한 면학 분위기를 조성합니다.",
    icon: "ShieldCheck",
    tag: "Strict"
  },
  {
    title: "교과관리",
    subtitle: "개별 맞춤형 피드백",
    desc: "질의응답 시스템과 주간 테스트, 월간 모의고사를 통해 취약점을 분석하고 최적의 학습 경로를 제시합니다.",
    icon: "BookOpen",
    tag: "Academic"
  },
  {
    title: "시설관리",
    subtitle: "프리미엄 몰입 환경",
    desc: "와이드 데스크, 시디즈 의자, 백색 소음기, 공기 청정 시스템 등 오직 공부에만 최적화된 공간을 제공합니다.",
    icon: "LayoutDashboard",
    tag: "Environment"
  },
  {
    title: "콘텐츠관리",
    subtitle: "AI 학습 데이터 분석",
    desc: "자체 개발 AI 시스템을 통해 학습 패턴을 분석하고, 합격생 빅데이터 기반의 전략적 학습 콘텐츠를 제공합니다.",
    icon: "Smartphone",
    tag: "AI Tech"
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: '[모집] 공무원 합격반 모집',
    content: '압도적 합격 실적으로 증명된 몰입독학관의 정규반 모집이 시작되었습니다. 선착순 장학 혜택을 확인하세요.',
    category: 'notice',
    date: '2026-02-25',
    imageUrl: 'https://picsum.photos/seed/itall-recruit/800/600',
  },
  {
    id: '2',
    title: '9급 일반행정직 수석 합격 - "몰입 관리 시스템이 만든 기적"',
    content: '하루 14시간 순공 시간 확보, 휴대폰 통제, 그리고 매주 진행된 모의고사가 저를 수석으로 이끌었습니다.',
    category: 'success',
    date: '2026-02-15',
    imageUrl: 'https://picsum.photos/seed/itall-success/800/600',
  },
  {
    id: '3',
    title: '합격연구소만의 성적 향상 장학 제도 안내 (최대 100% 면제)',
    content: '성적 우수자뿐만 아니라 성적 향상도가 높은 원생들에게도 폭넓은 장학 혜택을 제공합니다.',
    category: 'guide',
    date: '2026-02-10',
    imageUrl: 'https://picsum.photos/seed/itall-scholarship/800/600',
  },
  {
    id: '4',
    title: '공무원 시험 대비 국어/영어/한국사 핵심 요약집 배포 안내',
    content: '재원생 전원에게 제공되는 과목별 핵심 요약집과 최신 기출 트렌드 분석 리포트를 확인하세요.',
    category: 'guide',
    date: '2026-02-05',
    imageUrl: 'https://picsum.photos/seed/itall-content/800/600',
  },
];
