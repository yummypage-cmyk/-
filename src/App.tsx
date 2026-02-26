import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Phone, MapPin, MessageSquare, 
  ShieldCheck, Clock, Smartphone, LayoutDashboard, 
  Settings, FileText, Plus, 
  Trash2, Edit3, Save, LogOut, ChevronRight,
  Award, BookOpen
} from 'lucide-react';
import { Post, SiteConfig, ViewMode } from './types';
import { INITIAL_CONFIG, INITIAL_POSTS, SYSTEM_FEATURES } from './constants';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('user');
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'notice' | 'success' | 'guide'>('notice');

  // Admin State
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleSaveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
  };

  const handleAddPost = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      title: '새로운 게시글',
      content: '내용을 입력하세요.',
      category: 'notice',
      date: new Date().toISOString().split('T')[0],
      imageUrl: 'https://picsum.photos/seed/new/800/600',
    };
    setPosts([newPost, ...posts]);
    setEditingPost(newPost);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                合
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-primary tracking-widest">PASS LAB</span>
                <span className="text-lg font-black text-gray-900 leading-tight">합격연구소 몰입독학관</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#intro" className="text-sm font-medium hover:text-primary transition-colors">소개</a>
              <a href="#system" className="text-sm font-medium hover:text-primary transition-colors">시스템</a>
              <a href="#facilities" className="text-sm font-medium hover:text-primary transition-colors">시설</a>
              <a href="#posts" className="text-sm font-medium hover:text-primary transition-colors">소식/수기</a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">상담신청</a>
              <button 
                onClick={() => setViewMode(viewMode === 'user' ? 'admin' : 'user')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors"
              >
                {viewMode === 'user' ? <LayoutDashboard size={14} /> : <LogOut size={14} />}
                {viewMode === 'user' ? '관리자' : '나가기'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={() => setViewMode(viewMode === 'user' ? 'admin' : 'user')}
                className="p-2 bg-gray-100 rounded-full"
              >
                {viewMode === 'user' ? <LayoutDashboard size={18} /> : <LogOut size={18} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-xl font-bold">
              <a href="#intro" onClick={() => setIsMenuOpen(false)}>학원 소개</a>
              <a href="#system" onClick={() => setIsMenuOpen(false)}>관리 시스템</a>
              <a href="#facilities" onClick={() => setIsMenuOpen(false)}>학습 시설</a>
              <a href="#posts" onClick={() => setIsMenuOpen(false)}>합격 수기</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>상담 및 위치</a>
              <button 
                onClick={() => {
                  setViewMode(viewMode === 'user' ? 'admin' : 'user');
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 text-primary pt-4 border-t border-gray-100"
              >
                {viewMode === 'user' ? <LayoutDashboard size={20} /> : <LogOut size={20} />}
                {viewMode === 'user' ? '관리자 모드' : '사용자 모드'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {viewMode === 'user' ? (
        <UserView config={config} posts={posts} activeTab={activeTab} setActiveTab={setActiveTab} />
      ) : (
        <AdminView 
          config={config} 
          posts={posts} 
          onSaveConfig={handleSaveConfig}
          onAddPost={handleAddPost}
          onDeletePost={handleDeletePost}
          onUpdatePost={handleUpdatePost}
          editingPost={editingPost}
          setEditingPost={setEditingPost}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold">合</div>
                <span className="text-xl font-black">합격연구소 몰입독학관</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                서울고시학원의 20년 노하우가 집약된 프리미엄 관리형 독학관입니다. 
                당신의 합격을 위해 24시간 몰입을 지원합니다.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Contact</h4>
              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-primary" />
                  <span>{config.contactPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary" />
                  <span>{config.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare size={16} className="text-primary" />
                  <a href={config.kakaoUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">카카오톡 상담하기</a>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                <a href="#intro" className="hover:text-white transition-colors">학원소개</a>
                <a href="#system" className="hover:text-white transition-colors">관리시스템</a>
                <a href="#facilities" className="hover:text-white transition-colors">학습시설</a>
                <a href="#posts" className="hover:text-white transition-colors">합격수기</a>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
            © 2026 합격연구소 서울고시학원 몰입독학관. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function UserView({ config, posts, activeTab, setActiveTab }: { 
  config: SiteConfig, 
  posts: Post[], 
  activeTab: string, 
  setActiveTab: (t: any) => void 
}) {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/itall-hero/1920/1080?blur=1" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-8 leading-[0.9] tracking-tighter">
              {config.heroTitle.split(' ').map((word, i) => (
                <span key={i} className={word.includes('압도적') ? 'text-primary' : ''}>{word} </span>
              ))}
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
              {config.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="w-full sm:w-auto px-12 py-5 bg-primary text-white font-black rounded-full hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 text-lg">
                입학 예약하기 <ChevronRight size={20} />
              </a>
              <a href="#system" className="w-full sm:w-auto px-12 py-5 bg-white border-2 border-gray-900 text-gray-900 font-black rounded-full hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-3 text-lg">
                몰입 시스템 확인
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-300 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Recruitment Details */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                합격연구소 <br />
                몰입독학관 <br />
                <span className="text-white/60">공무원 합격반 모집</span>
              </h2>
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <Award className="text-white" size={24} />
                  <div>
                    <div className="text-xs font-bold text-white/60 uppercase tracking-widest">Special Benefit</div>
                    <div className="text-lg font-bold">빠른 등원 시 수강료 최대 30% 할인 혜택</div>
                  </div>
                </div>
              </div>
              <button className="px-12 py-5 bg-white text-primary font-black rounded-full hover:bg-gray-100 transition-all shadow-2xl flex items-center gap-3 text-lg">
                지금 바로 신청하기 <ChevronRight size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-xl font-bold mb-2">행정직</h4>
                <p className="text-sm text-white/60">일반행정, 교육행정 등 행정직군 완벽 대비</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-xl font-bold mb-2">소방직</h4>
                <p className="text-sm text-white/60">소방공무원 필기 및 체력 관리를 위한 몰입 환경</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-xl font-bold mb-2">경찰직</h4>
                <p className="text-sm text-white/60">경찰공무원 채용 시험 최적화 학습 시스템</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-xl font-bold mb-2">기술직</h4>
                <p className="text-sm text-white/60">보건, 토목, 건축 등 기술직군 전공 과목 집중 관리</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-xl font-bold mb-2">임용</h4>
                <p className="text-sm text-white/60">유치원, 초등, 중등 교원 임용 시험 대비</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-xl font-bold mb-2">편입</h4>
                <p className="text-sm text-white/60">상위권 대학 편입을 위한 압도적 학습량 확보</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section id="intro" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight">
                왜 <span className="text-primary underline decoration-4 underline-offset-8">몰입(Immersion)</span> 인가?
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg font-medium text-gray-900">
                  공무원 시험은 지식의 양보다 '시간의 밀도'가 결정합니다.
                </p>
                <p>
                  수많은 수험생들이 책상 앞에 앉아있지만, 실제로 뇌가 풀가동되는 시간은 하루 3~4시간에 불과합니다. 합격연구소는 이 '순공 시간'을 극대화하기 위해 탄생했습니다.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-primary font-black text-3xl mb-2">98%</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Attendance Rate</div>
                    <div className="text-sm font-bold mt-1">철저한 출결 관리</div>
                  </div>
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-primary font-black text-3xl mb-2">14h</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Daily Study Time</div>
                    <div className="text-sm font-bold mt-1">최대 순공 시간 확보</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://picsum.photos/seed/study-intro/800/800" 
                alt="Study Environment" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 p-8 bg-primary text-white rounded-3xl shadow-xl hidden md:block">
                <p className="text-2xl font-black mb-1">20년 노하우</p>
                <p className="text-sm opacity-80">서울고시학원의 합격 DNA</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* System Section */}
      <section id="system" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">합격연구소가 선택받는 이유, <br className="hidden md:block" /><span className="text-primary">압도적 몰입 시스템</span></h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-lg">단순한 자습 공간을 넘어, 합격을 위한 모든 요소를 데이터로 관리합니다.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SYSTEM_FEATURES.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-primary hover:border-primary transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-white rounded-2xl group-hover:bg-white/20 transition-colors">
                    {item.icon === 'ShieldCheck' && <ShieldCheck className="text-primary group-hover:text-white" size={28} />}
                    {item.icon === 'BookOpen' && <BookOpen className="text-primary group-hover:text-white" size={28} />}
                    {item.icon === 'LayoutDashboard' && <LayoutDashboard className="text-primary group-hover:text-white" size={28} />}
                    {item.icon === 'Smartphone' && <Smartphone className="text-primary group-hover:text-white" size={28} />}
                  </div>
                  <span className="text-[10px] font-black text-primary group-hover:text-white/80 uppercase tracking-widest bg-white px-3 py-1 rounded-full group-hover:bg-white/10">
                    {item.tag}
                  </span>
                </div>
                <div className="text-xs font-bold text-primary group-hover:text-white/60 mb-2">{item.subtitle}</div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-white">{item.title}</h3>
                <p className="text-gray-600 group-hover:text-white/80 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">최적의 학습 공간</h2>
              <p className="text-gray-500">오직 공부에만 집중할 수 있도록 설계된 프리미엄 시설입니다.</p>
            </div>
            <div className="flex gap-2">
              <button className="p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <ChevronRight className="rotate-180" size={20} />
              </button>
              <button className="p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "개인별 와이드 데스크", img: "https://picsum.photos/seed/f1/600/800" },
              { title: "시디즈 프리미엄 체어", img: "https://picsum.photos/seed/f2/600/800" },
              { title: "백색 소음 시스템", img: "https://picsum.photos/seed/f3/600/800" },
              { title: "리프레시 라운지", img: "https://picsum.photos/seed/f4/600/800" }
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl aspect-[3/4]">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section id="posts" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-8">합격 소식 및 가이드</h2>
            <div className="inline-flex p-1 bg-gray-100 rounded-full">
              {[
                { id: 'notice', label: '공지사항' },
                { id: 'success', label: '합격수기' },
                { id: 'guide', label: '학습가이드' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeTab === tab.id ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.filter(p => p.category === activeTab).map((post) => (
              <motion.article 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={post.id} 
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-video mb-6">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
                    {post.category}
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-wider">{post.date}</div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">{post.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{post.content}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-8">상담 신청 및 오시는 길</h2>
              <p className="text-gray-600 mb-12 leading-relaxed">
                합격으로 가는 가장 빠른 길, 지금 바로 상담 신청하세요. <br />
                전문 매니저가 당신의 학습 성향에 맞는 관리 플랜을 제안해 드립니다.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">전화 상담</h4>
                    <p className="text-gray-500 text-sm">{config.contactPhone}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">학원 위치</h4>
                    <p className="text-gray-500 text-sm">{config.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-3xl overflow-hidden h-64 bg-gray-200 border border-gray-100">
                {/* Google Maps Placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold italic">
                  Google Maps Integration Placeholder
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8">빠른 상담 신청</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Name</label>
                  <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="성함을 입력하세요" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Phone</label>
                  <input type="tel" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="연락처를 입력하세요" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Exam Category</label>
                  <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                    <option>9급 일반행정</option>
                    <option>7급 일반행정</option>
                    <option>경찰/소방</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Message</label>
                  <textarea className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all h-32" placeholder="궁금하신 내용을 입력하세요"></textarea>
                </div>
                <button className="w-full py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 uppercase tracking-widest">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AdminView({ 
  config, posts, onSaveConfig, onAddPost, onDeletePost, onUpdatePost, editingPost, setEditingPost 
}: { 
  config: SiteConfig, 
  posts: Post[], 
  onSaveConfig: (c: SiteConfig) => void,
  onAddPost: () => void,
  onDeletePost: (id: string) => void,
  onUpdatePost: (p: Post) => void,
  editingPost: Post | null,
  setEditingPost: (p: Post | null) => void
}) {
  const [activeAdminTab, setActiveAdminTab] = useState<'site' | 'posts'>('site');
  const [localConfig, setLocalConfig] = useState(config);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black mb-2">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">사이트의 모든 콘텐츠를 관리하세요.</p>
          </div>
          <div className="flex gap-2 p-1 bg-gray-200 rounded-xl">
            <button 
              onClick={() => setActiveAdminTab('site')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeAdminTab === 'site' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
            >
              <Settings size={16} className="inline mr-2" /> 사이트 설정
            </button>
            <button 
              onClick={() => setActiveAdminTab('posts')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeAdminTab === 'posts' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
            >
              <FileText size={16} className="inline mr-2" /> 게시글 관리
            </button>
          </div>
        </div>

        {activeAdminTab === 'site' ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Settings className="text-primary" /> 기본 정보 설정
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Hero Title</label>
                  <input 
                    type="text" 
                    value={localConfig.heroTitle}
                    onChange={(e) => setLocalConfig({...localConfig, heroTitle: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Hero Subtitle</label>
                  <textarea 
                    value={localConfig.heroSubtitle}
                    onChange={(e) => setLocalConfig({...localConfig, heroSubtitle: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 h-24" 
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Contact Phone</label>
                  <input 
                    type="text" 
                    value={localConfig.contactPhone}
                    onChange={(e) => setLocalConfig({...localConfig, contactPhone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Address</label>
                  <input 
                    type="text" 
                    value={localConfig.address}
                    onChange={(e) => setLocalConfig({...localConfig, address: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => onSaveConfig(localConfig)}
                className="px-10 py-4 bg-primary text-white font-black rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2"
              >
                <Save size={18} /> 설정 저장하기
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="text-primary" /> 게시글 목록 ({posts.length})
              </h2>
              <button 
                onClick={onAddPost}
                className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 text-sm"
              >
                <Plus size={16} /> 새 게시글 추가
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-black text-gray-500 uppercase rounded">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">{post.date}</span>
                      </div>
                      <h3 className="font-bold text-gray-900">{post.title}</h3>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setEditingPost(post)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => onDeletePost(post.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Edit Post Modal */}
      <AnimatePresence>
        {editingPost && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingPost(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-2xl font-black">게시글 편집</h3>
                <button onClick={() => setEditingPost(null)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X />
                </button>
              </div>
              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
                  <select 
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({...editingPost, category: e.target.value as any})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="notice">공지사항</option>
                    <option value="success">합격수기</option>
                    <option value="guide">학습가이드</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Title</label>
                  <input 
                    type="text" 
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Content</label>
                  <textarea 
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 h-48" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Image URL</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={editingPost.imageUrl}
                      onChange={(e) => setEditingPost({...editingPost, imageUrl: e.target.value})}
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" 
                    />
                    <div className="w-12 h-12 rounded-xl border border-gray-100 overflow-hidden shrink-0">
                      <img src={editingPost.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50 flex justify-end gap-4">
                <button 
                  onClick={() => setEditingPost(null)}
                  className="px-8 py-3 text-sm font-bold text-gray-500 hover:text-gray-700"
                >
                  취소
                </button>
                <button 
                  onClick={() => onUpdatePost(editingPost)}
                  className="px-10 py-3 bg-primary text-white font-black rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                  저장하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
