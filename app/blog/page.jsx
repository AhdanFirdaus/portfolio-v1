import { BookOpen, Terminal, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '../../src/components/Footer';
import { getBlogPosts } from '../../lib/notion';

export const metadata = {
  title: 'CTF Writeups & Blog',
  description: 'Cybersecurity CTF challenge writeups, penetration testing notes, and tech articles by Ahdan Firdaus.',
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-8">
      {/* Path navigasi */}
      <div className="flex items-center gap-2 text-sm font-mono text-gray-500 border-b border-blue-500/10 pb-4">
        <span className="text-blue-400">~/portfolio</span>
        <span className="text-gray-600">/</span>
        <span className="text-blue-400">CTF & Blog</span>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-transparent to-transparent blur-3xl -z-10" />
        
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <BookOpen size={28} className="text-blue-400" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">
              CTF Writeups & Tech Blog
            </h1>
            <p className="text-gray-400 text-sm font-mono flex items-center gap-2">
              <Terminal size={14} className="text-blue-400" />
              <span>$ cat writeups.log | grep security</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 bg-[#0f1422] px-3 py-1.5 rounded-full border border-blue-500/20">
          <BookOpen size={14} className="text-blue-400" />
          <span className="text-gray-300">Total Writeups:</span>
          <span className="text-white font-semibold">{posts.length}</span>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative bg-[#0f1422] rounded-2xl border border-blue-500/10 overflow-hidden hover:border-blue-400/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex flex-wrap gap-1.5">
                  {post.category.map((cat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-mono rounded-full border border-blue-500/20"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 font-mono shrink-0">
                  <Calendar size={12} />
                  <span>{post.date}</span>
                </div>
              </div>

              <h2 className="text-xl font-mono font-semibold text-white group-hover:text-blue-400 transition-colors mb-3 line-clamp-2">
                {post.title}
              </h2>

              <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                {post.summary}
              </p>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/blog/${post.slug}`}
                className="w-full py-2.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 hover:text-blue-300 transition-all text-sm font-mono flex items-center justify-center gap-2 group/btn"
              >
                <span>Read Writeup</span>
                <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
