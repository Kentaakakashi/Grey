'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Loader2 } from 'lucide-react';

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
const apiUrl = (path: string) => `${API_BASE}${path}`;

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const res = await fetch(apiUrl('/api/session.php'), {
          credentials: 'include',
        });

        if (!mounted || !res.ok) return;

        const data = await res.json();
        if (data?.authenticated) {
          router.replace('/admin');
        }
      } catch {
        // Ignore: if session check fails, user stays on login page.
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(apiUrl('/api/login.php'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        router.push('/admin');
      } else {
        setError(data?.message || 'Invalid username or password');
      }
    } catch {
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#050505] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full bg-white/[0.02] border border-white/10 rounded-[32px] p-8 md:p-10 backdrop-blur-xl relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">Admin Login</h1>
          <p className="text-gray-400 mt-3 font-medium">Sign in to manage your website content</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-8 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Username</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:border-white/40 focus:bg-white/20 text-white transition-all placeholder:text-gray-400 font-medium"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:border-white/40 focus:bg-white/20 text-white transition-all placeholder:text-gray-400 font-medium"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 bg-white text-black rounded-2xl font-black text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:hover:scale-100 uppercase tracking-wider"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
