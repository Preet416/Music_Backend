import React from "react";
import PlayerBar from "../player/PlayerBar";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../supabaseClient";

const SidebarLink = ({ to, children }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={
        "flex items-center px-3 py-2 rounded-md text-[0.95rem] " +
        "transition-colors duration-150 " +
        (active
          ? "bg-emerald-500 text-slate-950 font-semibold"
          : "text-slate-200 hover:bg-slate-800 hover:text-emerald-300")
      }
    >
      {children}
    </Link>
  );
};

const AppShell = ({ children }) => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut(); // user session clear[web:250][web:287]
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top bar */}
      <header className="h-14 border-b border-slate-800 flex items-center px-6 justify-between">
        <h1 className="text-xl font-semibold tracking-tight">
          Music &amp; Podcast Player
        </h1>

        {/* User icon + logout */}
        {user && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/90 text-slate-950 flex items-center justify-center text-sm font-bold">
              {user.email?.[0]?.toUpperCase() || "U"}
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-600 text-xs"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden w-full">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 p-5 space-y-6 bg-slate-900">
          <div className="text-base font-semibold tracking-tight mb-1">
            Browse
          </div>

          <nav className="space-y-1">
            <SidebarLink to="/">Home</SidebarLink>
            <SidebarLink to="/search">Search</SidebarLink>
            <SidebarLink to="/library">Library</SidebarLink>
            <SidebarLink to="/podcasts">Podcasts</SidebarLink>
          </nav>

          <div className="pt-4 border-t border-slate-800">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
              Account
            </div>

            <nav className="space-y-1 text-sm">
              {/* Auth pages sidebar se access ke liye */}
              {!user && (
                <>
                  <SidebarLink to="/login">Login</SidebarLink>
                  <SidebarLink to="/register">Register</SidebarLink>
                </>
              )}
              <SidebarLink to="/admin">Admin</SidebarLink>
            </nav>
          </div>
        </aside>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-950">
          <div className="max-w-6xl mx-auto w-full">{children}</div>
        </main>
      </div>

      {/* Bottom player bar */}
      <PlayerBar />
    </div>
  );
};

export default AppShell;
