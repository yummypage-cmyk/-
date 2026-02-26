import { Post, SiteConfig } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  heroTitle: "당신의 합격, 몰입의 깊이가 결정합니다",
  heroSubtitle: "서울고시학원 합격연구소 몰입독학관에서 압도적인 합격률을 경험하세요.",
  primaryColor: "#B71C1C",
  contactPhone: "02-123-4567",
  address: "서울특별시 동작구 노량진로 123 서울고시학원 빌딩 4층",
  kakaoUrl: "https://pf.kakao.com/_example",
};

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: '2026년 대비 몰입독학관 신규 원생 모집',
    content: '최고의 학습 환경에서 합격을 향한 첫걸음을 시작하세요.',
    category: 'notice',
    date: '2026-02-20',
    imageUrl: 'https://picsum.photos/seed/study1/800/600',
  },
  {
    id: '2',
    title: '9급 일반행정직 최종 합격 수기 - 김OO 원생',
    content: '몰입독학관의 엄격한 생활 관리 시스템이 합격의 열쇠였습니다.',
    category: 'success',
    date: '2026-02-15',
    imageUrl: 'https://picsum.photos/seed/success1/800/600',
  },
  {
    id: '3',
    title: '효율적인 오답 노트 작성법 가이드',
    content: '합격생들이 입을 모아 칭찬하는 오답 정리 노하우를 공개합니다.',
    category: 'guide',
    date: '2026-02-10',
    imageUrl: 'https://picsum.photos/seed/guide1/800/600',
  },
];
