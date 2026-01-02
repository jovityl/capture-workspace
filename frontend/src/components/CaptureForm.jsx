import { useState } from "react";
import { createCapturedText } from "../api/CapturedText";

export default function CaptureForm( {onCreated} ) {
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const trimmed = content.trim();
        if (!trimmed) return;

        setSubmitting(true);
        setError(null);

        try{
            await createCapturedText(trimmed);
            setContent("");
            onCreated?.();
        }
        catch{
            setError("Failed to save")
        }
        finally {
            setSubmitting(false);
        }

    }
    
    return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste text"
        className="w-full min-h-[100px] resize-y bg-slate-950 text-slate-100 border border-slate-800 rounded-lg px-3 py-2 placeholder:text-slate-500 outline-none"
      />

      <button
        type="submit"
        disabled={submitting}
        className="mt-3 px-4 py-2 rounded-md border border-indigo-600 bg-indigo-600 text-white text-sm disabled:opacity-50"
      >
        {submitting ? "Saving..." : "Save"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-rose-300">
          {error}
        </p>
      )}
    </form>
  );
}