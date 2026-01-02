import { useState, useEffect } from "react";
import { listCapturedText, updateCapturedText, deleteCapturedText } from "../api/CapturedText";

export default function CapturedList({ refreshToken }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");

    async function loadItems() {
        setLoading(true);
        setError(null);

        try{
            const res = await listCapturedText();
            setItems(res.data);
        }
        catch{
            setError("Failed to load");
        }
        finally{
            setLoading(false);
        }

    }

    useEffect(() => {loadItems();}, [refreshToken]);

    async function deleteItems(id) {
        setError(null)
      
        try{
            await deleteCapturedText(id);
            setItems(prev => prev.filter(item => item.id !== id));

        }
        catch{
            setError("Failed to delete")
        }
    }

    async function saveEdit(id) {
        try {
            const res = await updateCapturedText(id, { content: editValue });
            setItems(prev => prev.map(item => (item.id === id ? res.data : item)));
            setEditingId(null);
        }
        catch{
            setError("Failed to save changes");
        }
    }

    return (
    <div>
      {loading ? (
        <p className="px-4 py-3 text-sm text-slate-400">Loading</p>
      ) : items.length === 0 ? (
        <p className="px-4 py-3 text-sm text-slate-400">No items found</p>
      ) : (
        <ul className="divide-y divide-slate-800">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-4 px-4 py-3"
            >
              {editingId === item.id ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 bg-slate-950 text-slate-100 border border-slate-800 rounded-md px-2 py-1 text-sm"
                  />

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => saveEdit(item.id)}
                      className="px-3 py-1 text-xs border border-indigo-600 rounded-md text-indigo-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditValue("");
                      }}
                      className="px-3 py-1 text-xs border border-slate-600 rounded-md text-slate-300"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="flex-1 text-sm text-slate-100 break-words">
                    {item.content}
                  </p>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditValue(item.content);
                      }}
                      className="px-3 py-1 text-xs border border-slate-600 rounded-md text-slate-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItems(item.id)}
                      className="px-3 py-1 text-xs border border-slate-600 rounded-md text-slate-300"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="px-4 py-2 text-sm text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
};
