import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    }); // email/password auth[web:251][web:256]

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setInfoMsg("Signup successful. Check your email to confirm.");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
        <h1 className="text-xl font-semibold">Register</h1>

        {errorMsg && (
          <div className="text-xs text-red-400 bg-red-950/40 border border-red-700 rounded px-2 py-1">
            {errorMsg}
          </div>
        )}

        {infoMsg && (
          <div className="text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-700 rounded px-2 py-1">
            {infoMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-3">
          <div className="space-y-1 text-sm">
            <label className="block text-slate-300">Email</label>
            <input
              type="email"
              className="w-full rounded bg-slate-800 border border-slate-700 px-2 py-1 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label className="block text-slate-300">Password</label>
            <input
              type="password"
              className="w-full rounded bg-slate-800 border border-slate-700 px-2 py-1 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-xs text-slate-400">
  No account?{" "}
  <Link to="/register" className="text-emerald-400 hover:underline">
    Signup
  </Link>
</p>

      </div>
    </div>
  );
};

export default Register;
