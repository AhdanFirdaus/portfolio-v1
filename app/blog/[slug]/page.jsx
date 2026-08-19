import { Terminal, Calendar, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Footer from '../../../src/components/Footer';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} | Writeup`,
    description: `Read CTF writeup and technical post: ${formattedTitle}`,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div className="space-y-8">
      {/* Path navigasi */}
      <div className="flex items-center gap-2 text-sm font-mono text-gray-500 border-b border-blue-500/10 pb-4">
        <span className="text-blue-400">~/portfolio</span>
        <span className="text-gray-600">/</span>
        <Link href="/blog" className="text-gray-400 hover:text-blue-400">
          CTF & Blog
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-blue-400">{slug}</span>
      </div>

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 transition-all"
      >
        <ArrowLeft size={14} />
        <span>Back to Writeups</span>
      </Link>

      {/* Header Post */}
      <div className="bg-[#0f1422] p-6 md:p-8 rounded-2xl border border-blue-500/20 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
          <ShieldCheck size={14} />
          <span>Verified CTF Challenge Writeup</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-mono font-bold text-white leading-tight">
          {title}
        </h1>

        <div className="flex items-center gap-4 text-xs font-mono text-gray-400 border-t border-blue-500/10 pt-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-blue-400" />
            <span>Published: February 2026</span>
          </div>
          <span className="text-gray-700">|</span>
          <div className="flex items-center gap-1.5">
            <Terminal size={14} className="text-blue-400" />
            <span>Author: Ahdan Firdaus</span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-[#0f1422] p-6 md:p-8 rounded-2xl border border-blue-500/10 text-gray-300 font-sans space-y-6 leading-relaxed">
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm font-mono text-blue-300">
          💡 Notion Integration Sync: Writeup blocks and code snippets will automatically render from your Notion API page.
        </div>

        <h2 className="text-xl font-mono font-bold text-white border-b border-blue-500/10 pb-2">
          Challenge Overview
        </h2>
        <p>
          In this challenge, we are presented with a web exploitation target requiring analysis of source code, identification of vulnerability parameters, and forging payload tokens.
        </p>

        <h2 className="text-xl font-mono font-bold text-white border-b border-blue-500/10 pb-2">
          Exploitation Step-by-Step
        </h2>
        <pre className="bg-[#1a1f2e] p-4 rounded-xl border border-blue-500/20 font-mono text-xs text-blue-300 overflow-x-auto">
{`# Sample Python Exploit Payload Script
import requests

url = "https://target-ctf.challenge/api/login"
payload = {
    "username": "' OR 1=1--",
    "password": "admin"
}

res = requests.post(url, json=payload)
print("[+] Flag:", res.json().get("flag"))`}
        </pre>
      </div>

      <Footer />
    </div>
  );
}
