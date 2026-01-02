import { useState } from "react";
import CaptureForm from "./components/CaptureForm";
import CapturedList from "./components/CapturedList";
import Login from "./pages/Login"
import { logout } from "./api/auth"

function hasToken() {
  return !!localStorage.getItem("accessToken");
}

export default function App() {
  const [authed, setAuthed] = useState(hasToken());
  const [refreshToken, setRefreshToken] = useState(0);

  function handleCreated() {
    setRefreshToken((x) => x + 1);
  }

  if (!authed) {
    return <Login onSuccess={() => setAuthed(true)}/>;
  }

return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h1 className="text-lg font-semibold">Capture</h1>
            <button
              className="text-sm text-slate-400 hover:text-indigo-400"
              onClick={() => {
                logout();
                setAuthed(false);
              }}
            >
              Logout
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-10">

            {/* Input */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <CaptureForm onCreated={handleCreated} />
            </div>

            {/* Notes */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-medium">Notes</h2>
                <span className="text-xs text-slate-500">
                  Your latest captures
                </span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl">
                <CapturedList refreshToken={refreshToken} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};