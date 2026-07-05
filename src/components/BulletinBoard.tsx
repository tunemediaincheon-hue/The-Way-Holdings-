/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Search, Pin, Eye, Calendar, User, ArrowUpRight, X, ChevronRight, FileText } from "lucide-react";
import { Post } from "../types";

interface BulletinBoardProps {
  posts: Post[];
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
}

export default function BulletinBoard({ posts, isAdmin, setIsAdmin }: BulletinBoardProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>("전체");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);

  const categories = ["전체", "공지사항", "블로그", "언론보도", "교육소식"];

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "전체" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort pinned posts first, then newest
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    // Increment local views count for visual delight
    post.views += 1;
  };

  return (
    <section id="posts" className="relative py-24 bg-black overflow-hidden border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-[var(--theme-primary)] tracking-widest uppercase block mb-2">
              COMMUNITY & BULLETIN
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              센터 최신 소식 & 유용한 정보
            </h2>
            <div className="w-16 h-1 bg-purple-500 mt-3 rounded-full"></div>
          </div>
          
          {/* Quick Stats or CTA */}
          <div className="flex items-center space-x-3">
            <span className="text-xs text-zinc-500">
              총 {posts.length}개의 유효 콘텐츠 보관 중
            </span>
            <button
              onClick={() => setIsAdmin(true)}
              className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-purple-950/20 hover:bg-purple-600/20 border border-purple-500/20 hover:border-purple-400 text-purple-300 transition-all flex items-center gap-1.5"
            >
              <FileText size={13} />
              <span>새 게시글 작성 (관리자)</span>
            </button>
          </div>
        </div>

        {/* Filter Bar and Search Input */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-md mb-8">
          
          {/* Categories Tab */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white shadow-md shadow-purple-950/50"
                    : "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 md:max-w-sm">
            <input
              type="text"
              placeholder="제목, 내용으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/60 border border-purple-500/10 focus:border-purple-500/40 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
            />
            <Search size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
          </div>

        </div>

        {/* Post Grid/List */}
        {sortedPosts.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-zinc-900/30 border border-white/5 backdrop-blur-md">
            <span className="text-zinc-500 text-sm">해당 검색 결과에 부합하는 게시글이 존재하지 않습니다.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post)}
                className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden backdrop-blur-md ${
                  post.isPinned
                    ? "bg-gradient-to-br from-purple-900/10 via-zinc-900/50 to-zinc-900/50 border-purple-500/30 hover:border-purple-500/50"
                    : "bg-zinc-900/40 border-white/5 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.1)]"
                }`}
              >
                {/* Pin Badge FX */}
                {post.isPinned && (
                  <div className="absolute top-0 right-0 w-12 h-12 bg-purple-500/10 rounded-bl-full flex items-center justify-center pointer-events-none">
                    <Pin size={12} className="text-[var(--theme-primary)] rotate-45 -translate-y-1 translate-x-1" />
                  </div>
                )}

                <div>
                  {/* Category and Date Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      post.isPinned
                        ? "bg-purple-600/30 text-purple-200 border border-purple-500/30"
                        : "bg-zinc-900 text-zinc-400"
                    }`}>
                      {post.category}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-[var(--theme-primary)] transition-colors line-clamp-1 mb-2">
                    {post.title}
                  </h3>

                  {/* Content snippet */}
                  <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-6">
                    {post.content}
                  </p>
                </div>

                {/* Footer specs */}
                <div className="flex items-center justify-between pt-4 border-t border-purple-500/5 mt-auto">
                  <div className="flex items-center space-x-4">
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                      <User size={11} className="text-purple-500/50" />
                      {post.author}
                    </span>
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                      <Eye size={11} className="text-purple-500/50" />
                      {post.views}
                    </span>
                  </div>

                  <span className="text-xs text-purple-400 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                    <span>자세히 보기</span>
                    <ArrowUpRight size={13} className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Full Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-900/95 border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(168,85,247,0.25)] backdrop-blur-lg">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/40">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-600 text-white">
                  {selectedPost.category}
                </span>
                {selectedPost.isPinned && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-md border border-yellow-400/20">
                    <Pin size={10} />
                    중요공지
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {selectedPost.title}
              </h3>

              {/* Author, Date, Views Row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-500 pb-4 border-b border-purple-500/10">
                <span className="flex items-center gap-1.5">
                  <User size={13} className="text-purple-400" />
                  작성자: <strong className="text-zinc-300 font-medium">{selectedPost.author}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-purple-400" />
                  작성일: <strong className="text-zinc-300 font-medium">{selectedPost.date}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={13} className="text-purple-400" />
                  조회수: <strong className="text-zinc-300 font-medium">{selectedPost.views}</strong>
                </span>
              </div>

              {/* Text body */}
              <div className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-normal">
                {selectedPost.content}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-purple-500/10 flex justify-end bg-zinc-900/20">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors"
              >
                확인
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
