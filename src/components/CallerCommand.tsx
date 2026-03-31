import React, { useState } from 'react';
import { Play, History, Users, MoreHorizontal, Download, Verified } from 'lucide-react';
import { getBingoLetter, BINGO_LETTERS } from '../constants';

interface CallerCommandProps {
  drawnNumbers: number[];
  onDraw: (num: number) => void;
}

export default function CallerCommand({ drawnNumbers, onDraw }: CallerCommandProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const currentBall = drawnNumbers[drawnNumbers.length - 1];
  const lastBall = drawnNumbers[drawnNumbers.length - 2];
  const remainingCount = 75 - drawnNumbers.length;

  const handleDraw = () => {
    if (drawnNumbers.length >= 75 || isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      let nextNum;
      do {
        nextNum = Math.floor(Math.random() * 75) + 1;
      } while (drawnNumbers.includes(nextNum));
      
      onDraw(nextNum);
      setIsAnimating(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Drawing Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-nebula-secondary tracking-[0.2em] font-headline uppercase text-xs">Active Session</span>
              <h1 className="text-4xl font-headline font-bold text-white tracking-tight mt-1">Drawing</h1>
            </div>
            <div className="text-right">
              <span className="text-slate-400 tracking-[0.2em] font-headline uppercase text-xs">Balls Remaining</span>
              <p className="text-2xl font-headline font-medium text-nebula-primary">
                {remainingCount} / 75
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-nebula-primary/20 to-nebula-secondary/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass-panel rounded-[2rem] p-8 min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nebula-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-nebula-secondary/15 rounded-full blur-[100px]"></div>
              </div>

              <div className="relative z-10 w-full flex flex-col items-center">
                <div className={`w-64 h-64 rounded-full bg-gradient-to-br from-nebula-surface-high to-nebula-surface-low border border-white/10 flex items-center justify-center bingo-ball-glow mb-12 relative overflow-hidden ${isAnimating ? 'ball-animating' : ''}`}>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                  <div className="relative">
                    <span className="text-8xl font-headline font-black text-nebula-primary nebula-glow tracking-tighter">
                      {currentBall ? `${getBingoLetter(currentBall)} ${currentBall}` : '--'}
                    </span>
                  </div>
                  <div className="absolute top-4 left-10 w-20 h-8 bg-white/10 rounded-full blur-md -rotate-45"></div>
                </div>

                <button 
                  onClick={handleDraw}
                  disabled={isAnimating}
                  className="relative px-12 py-5 bg-gradient-to-br from-nebula-primary to-cyan-600 rounded-full text-nebula-surface font-headline font-extrabold text-xl tracking-tighter shadow-lg shadow-nebula-primary/40 hover:shadow-nebula-primary/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  <Play size={24} fill="currentColor" />
                  CALL NEXT NUMBER
                </button>
                <p className="mt-6 text-slate-400 font-medium tracking-widest uppercase text-[10px] animate-pulse">
                  Synchronizing with Nebula Network...
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
              <History className="text-nebula-secondary mb-4" size={24} />
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Last Ball</p>
                <p className="text-2xl font-headline font-bold text-white">
                  {lastBall ? `${getBingoLetter(lastBall)} ${lastBall}` : '--'}
                </p>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
              <Users className="text-nebula-primary mb-4" size={24} />
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Active Players</p>
                <p className="text-2xl font-headline font-bold text-white">1,204</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: History Grid */}
        <div className="lg:col-span-4 h-full">
          <div className="glass-panel rounded-[2rem] p-6 sticky top-24 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline font-bold text-xl tracking-tight">Signal History</h2>
              <span className="px-3 py-1 bg-nebula-surface-highest rounded-full text-[10px] uppercase font-bold tracking-widest text-nebula-primary border border-nebula-primary/20">
                All 75 Slots
              </span>
            </div>

            <div className="space-y-6">
              {BINGO_LETTERS.map((letter) => (
                <div key={letter}>
                  <div className="text-[10px] font-black text-nebula-secondary tracking-[0.3em] mb-2 uppercase">
                    Nebula-{letter}
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 15 }, (_, i) => {
                      const num = (BINGO_LETTERS.indexOf(letter) * 15) + i + 1;
                      const isDrawn = drawnNumbers.includes(num);
                      return (
                        <div 
                          key={num}
                          className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold border transition-all ${
                            isDrawn 
                              ? 'bg-nebula-primary/20 text-nebula-primary border-nebula-primary/30 shadow-[0_0_10px_rgba(153,247,255,0.1)]' 
                              : 'bg-nebula-surface-low text-slate-600 border-white/5'
                          }`}
                        >
                          {num}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              <div className="p-4 bg-nebula-surface-low rounded-xl border border-dashed border-nebula-outline text-center">
                <MoreHorizontal className="text-nebula-outline mx-auto mb-1" size={20} />
                <p className="text-[10px] uppercase tracking-widest text-nebula-outline">
                  G (46-60) & O (61-75)
                </p>
              </div>
            </div>

            <button className="w-full mt-8 py-4 border border-white/10 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
              <Download size={14} />
              Download Session Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
