import { useState } from "react";
import { login } from "../api/auth";

export default function Login( {onSuccess} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");    
    const [loading, setLoading] = useState(false);    
    const [error, setError] = useState(null);    

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try{
            await login(username, password);
            onSuccess();
        }
        catch{
            setError("Failed to login")
        }
        finally{
            setLoading(false);
        }
    }

    return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-md px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-md px-3 py-2 text-sm outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full mt-2 px-4 py-2 rounded-md border border-indigo-600 bg-indigo-600 text-white text-sm disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-rose-300">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};