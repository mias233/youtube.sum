"use client";

import Link from "next/link";
import { Youtube, LogOut, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleOpenAuth = () => setIsAuthOpen(true);
    window.addEventListener("open-auth", handleOpenAuth);
    
    return () => {
      window.removeEventListener("open-auth", handleOpenAuth);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary/20 p-2 rounded-xl group-hover:bg-primary/30 transition-colors">
              <Youtube className="w-6 h-6 text-primary group-hover:text-red-500 transition-colors duration-300" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white hidden sm:block">
              Summz<span className="text-primary">.AI</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-4 animate-in fade-in duration-500">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground mr-2" />
            ) : user ? (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-2 pr-4 py-1.5 shadow-sm">
                {user.photoURL ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-white/20" />
                ) : (
                  <div className="w-8 h-8 rounded-full border border-white/20 bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                    {(user.displayName || user.email || "?").charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-white/90 hidden md:block">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <button 
                  onClick={() => auth.signOut()}
                  className="ml-2 p-1 text-muted-foreground hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="px-5 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]"
              >
                Sign In
              </button>
            )}

          </div>
        </div>
      </header>
      
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
