"use client";
import { useState } from "react";

export default function Home() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [outputPrompt, setOutputPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOptimize = async () => {
    if (!inputPrompt.trim()) return;
    setLoading(true);
    setOutputPrompt("");

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      const data = await res.json();
      if (data.result) {
        setOutputPrompt(data.result);
      } else {
        setOutputPrompt("Error: " + (data.error || "Failed to generate."));
      }
    } catch (err) {
      setOutputPrompt("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "sans-serif", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", background: "linear-gradient(to right, #38bdf8, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AI Prompt Engineering Studio
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
            Transform any basic sentence into a professional 5-part engineered prompt instantly.
          </p>
        </header>

        {/* Input Card */}
        <div style={{ backgroundColor: "#1e293b", padding: "1.5rem", borderRadius: "12px", border: "1px solid #334155", marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#cbd5e1" }}>
            Your Simple / Vague Prompt:
          </label>
          <textarea
            rows={4}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="e.g., Write a workout plan to get fit..."
            style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "#fff", resize: "vertical", outline: "none", fontSize: "1rem" }}
          />
          <button
            onClick={handleOptimize}
            disabled={loading || !inputPrompt.trim()}
            style={{ width: "100%", marginTop: "1rem", padding: "0.85rem", borderRadius: "8px", border: "none", backgroundColor: loading ? "#64748b" : "#6366f1", color: "#fff", fontWeight: "bold", fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }}
          >
            {loading ? "Analyzing & Engineering Prompt..." : "✨ Turn Into Master Prompt"}
          </button>
        </div>

        {/* Output Card */}
        {outputPrompt && (
          <div style={{ backgroundColor: "#1e293b", padding: "1.5rem", borderRadius: "12px", border: "1px solid #334155" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <h3 style={{ margin: 0, color: "#38bdf8" }}>Engineered Master Prompt</h3>
              <button
                onClick={copyToClipboard}
                style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", border: "1px solid #38bdf8", backgroundColor: "transparent", color: "#38bdf8", cursor: "pointer", fontSize: "0.85rem" }}
              >
                {copied ? "✓ Copied!" : "Copy Prompt"}
              </button>
            </div>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", backgroundColor: "#0f172a", padding: "1rem", borderRadius: "8px", border: "1px solid #334155", color: "#e2e8f0", fontSize: "0.95rem", lineHeight: "1.5" }}>
              {outputPrompt}
            </pre>
          </div>
        )}

      </div>
    </main>
  );
        }
          
