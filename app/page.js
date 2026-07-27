'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Wand2,
  Orbit,
  Zap,
  AlertTriangle,
  Copy,
  Check,
  RotateCcw,
  Compass,
  Atom,
} from 'lucide-react';
import StarfieldCanvas from './components/StarfieldCanvas';

export default function PromptOptimizerPage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    'Opening quantum wormhole...',
    'Traversing event horizon...',
    'Mapping neural constellations...',
    'Synthesizing ultimate prompt resonance...',
  ];

  const handleOptimize = async (e) => {
    e?.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResult('');
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 1200);

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gravitational anomaly detected in the API stream.');
      }

      setResult(data.optimizedPrompt || data.result || 'Prompt successfully transformed across space-time!');
    } catch (err) {
      setError(err.message || 'Celestial communication link failed.');
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 z-10 overflow-hidden">
      <StarfieldCanvas />

      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)] text-purple-300 text-xs font-mono tracking-widest uppercase">
            <Orbit className="w-4 h-4 animate-spin text-cyan-400" style={{ animationDuration: '8s' }} />
            Quantum Engine v3.0 • Orbital Transmutation
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-cyan-200 to-indigo-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
            Cosmic Prompt Optimizer
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Transmit raw concepts through our neural nebula. Reframe intent, eliminate fuzziness, and elevate AI responses to stellar perfection.
          </p>
        </motion.div>

        {/* Input & Output Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-slate-950/60 backdrop-blur-2xl border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(79,70,229,0.15)] space-y-6"
        >
          <form onSubmit={handleOptimize} className="space-y-4">
            <div className="relative">
              <label htmlFor="prompt-input" className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-cyan-400 mb-2">
                <Compass className="w-4 h-4" />
                Raw Prompt Coordinate Input
              </label>
              
              <textarea
                id="prompt-input"
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your unrefined query into the space-time vector... (e.g., 'Write a story about a spaceship explorer')"
                className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/20 rounded-2xl p-4 text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none transition-all duration-300 shadow-inner resize-none"
              />

              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none border-t-2 border-r-2 border-cyan-400/40 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none border-b-2 border-l-2 border-purple-400/40 rounded-bl-2xl" />
            </div>

            <div className="flex justify-end">
              <motion.button
                type="submit"
                disabled={loading || !prompt.trim()}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(56, 189, 248, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto relative group overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Atom className="w-5 h-5 animate-spin" />
                      <span>Transmuting Vector...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 transition-transform group-hover:rotate-45 duration-300" />
                      <span>Initiate Optimization</span>
                    </>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/25 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </motion.button>
            </div>
          </form>

          {/* Dynamic States */}
          <AnimatePresence mode="wait">
            
            {/* Loading State */}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="py-12 flex flex-col items-center justify-center space-y-6 text-center border-t border-slate-800/80"
              >
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-purple-500 border-b-transparent border-l-pink-500 shadow-[0_0_25px_rgba(56,189,248,0.5)]"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                    className="absolute inset-3 rounded-full border-2 border-t-transparent border-r-indigo-400 border-b-cyan-300 border-l-transparent"
                  />
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.8)] animate-pulse flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white animate-spin" />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-cyan-300 font-mono text-sm tracking-wide">
                    {loadingMessages[loadingStep]}
                  </p>
                  <p className="text-slate-500 text-xs font-mono">
                    Gravitational Neural Engine in Progress
                  </p>
                </div>
              </motion.div>
            )}

            {/* Error State */}
            {error && !loading && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl bg-red-950/40 border border-red-500/40 p-5 backdrop-blur-md shadow-[0_0_30px_rgba(239,68,68,0.2)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-500/20 rounded-xl border border-red-500/30 text-red-400">
                    <AlertTriangle className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-red-300 font-semibold text-sm">Solar Flare Anomaly Interrupted Link</h4>
                    <p className="text-red-400/80 text-xs mt-0.5">{error}</p>
                  </div>
                </div>
                <button
                  onClick={handleOptimize}
                  className="px-4 py-2 rounded-xl bg-red-900/60 hover:bg-red-800/80 border border-red-500/40 text-red-200 text-xs font-medium flex items-center gap-1.5 transition-colors self-end sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retry Transmission
                </button>
              </motion.div>
            )}

            {/* Output State */}
            {result && !loading && (
              <motion.div
                key="output"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-4 pt-4 border-t border-slate-800/80"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-300 tracking-wider uppercase">
                    <Zap className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                    Transmuted Output Matrix
                  </div>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition-all duration-200"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Galaxy!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Copy Output</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative group bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-purple-500/30 rounded-2xl p-5 text-slate-100 text-sm sm:text-base leading-relaxed shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                  <p className="whitespace-pre-wrap selection:bg-cyan-500 selection:text-black">
                    {result}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
                    <span className="px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-800/40 text-purple-300">
                      ✦ Resonance: 99.8%
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/40 text-cyan-300">
                      ✦ Quantum Density: Max
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>

        <p className="text-center text-xs text-slate-600 font-mono tracking-widest uppercase">
          Powered by Deep Cosmos AI Network • All Dimensions Synchronized
        </p>

      </div>
    </main>
  );
                    }
                  
