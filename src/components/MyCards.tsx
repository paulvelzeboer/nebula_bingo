import React from 'react';
import { Radar, Star, Sparkles, ZoomIn, RefreshCw, Printer } from 'lucide-react';
import { BingoCard } from '../types';
import { BINGO_LETTERS, getBingoLetter } from '../constants';

interface MyCardsProps {
  cards: BingoCard[];
  drawnNumbers: number[];
  onToggleMark: (cardId: string, rowIndex: number, colIndex: number) => void;
}

export default function MyCards({ cards, drawnNumbers, onToggleMark }: MyCardsProps) {
  const currentBall = drawnNumbers[drawnNumbers.length - 1];
  const history = [...drawnNumbers].reverse().slice(1, 6);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-12 flex flex-col xl:flex-row gap-8">
      {/* Cards Grid Section */}
      <div className="flex-grow order-2 xl:order-1 print:block">
        <header className="mb-8 flex justify-between items-end print-hidden">
          <div>
            <h1 className="text-4xl font-headline font-bold tracking-tight text-white mb-2">Active Mission Cards</h1>
            <p className="text-slate-400 font-body">Mark your coordinates to secure the sector.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => window.print()}
              className="px-6 py-2 bg-nebula-surface-high hover:bg-white/10 rounded-full border border-white/10 flex items-center gap-2 text-white text-xs font-headline uppercase tracking-widest transition-all active:scale-95"
            >
              <Printer size={14} />
              Print Cards
            </button>
            <div className="px-4 py-2 bg-nebula-surface-high rounded-full border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-nebula-secondary shadow-[0_0_8px_#ed62ff]"></span>
              <span className="text-xs font-headline uppercase tracking-widest">{cards.length} Cards Active</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-1 print:max-w-xl print:mx-auto">
          {cards.map((card) => (
            <div key={card.id} className="glass-panel p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group print:break-after-page print:bg-white print:text-black print:border-black print:shadow-none">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-nebula-primary/10 blur-[80px] rounded-full group-hover:bg-nebula-primary/20 transition-all print:hidden"></div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="text-xs font-headline uppercase tracking-tighter text-cyan-400 font-bold print:text-black">Serial: {card.serial}</div>
                <div className="flex gap-1 print:hidden">
                  <span className="w-2 h-2 rounded-full bg-nebula-outline"></span>
                  <span className="w-2 h-2 rounded-full bg-nebula-outline"></span>
                  <span className="w-2 h-2 rounded-full bg-nebula-primary animate-pulse"></span>
                </div>
                <div className="hidden print:block font-headline font-black text-xl tracking-tighter text-black">NEBULA BINGO</div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {BINGO_LETTERS.map((letter) => (
                  <div key={letter} className="text-center font-black text-2xl text-slate-500 mb-2 font-headline print:text-black">
                    {letter}
                  </div>
                ))}
                
                {card.grid.map((row, rowIndex) => (
                  row.map((cell, colIndex) => {
                    const isMarked = card.marked[rowIndex][colIndex];
                    const isFree = cell === 'FREE';
                    
                    return (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => onToggleMark(card.id, rowIndex, colIndex)}
                        className={`aspect-square flex items-center justify-center text-lg font-bold rounded-lg transition-all border relative ${
                          isMarked || isFree
                            ? 'bg-gradient-to-br from-nebula-primary to-cyan-600 text-nebula-surface border-white/20 shadow-lg shadow-nebula-primary/20 print:bg-none print:bg-slate-200 print:text-black print:border-black'
                            : 'bg-nebula-surface-low text-white border-white/5 hover:bg-nebula-surface-highest print:bg-white print:text-black print:border-black'
                        }`}
                      >
                        {(isMarked || isFree) && (
                          <Star size={12} className="absolute top-1 right-1 fill-current print:text-black" />
                        )}
                        {isFree ? (
                          <span className="text-[10px] font-black uppercase tracking-tighter">Free</span>
                        ) : (
                          cell
                        )}
                      </button>
                    );
                  })
                ))}
              </div>
              <div className="hidden print:block mt-8 pt-4 border-t border-black/10 text-center">
                <p className="text-[8px] text-slate-500 uppercase tracking-[0.2em] font-headline">
                  Nebula Entertainment Systems • Zero-G Bingo Protocol
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-panel p-4 rounded-2xl flex flex-wrap gap-6 items-center justify-between border border-white/5 print-hidden">
          <button className="px-8 py-3 bg-gradient-to-r from-nebula-secondary to-fuchsia-700 text-white font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(237,98,255,0.5)] transition-all">
            Call Bingo!
          </button>
          <div className="flex gap-2">
            <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-nebula-surface-highest hover:bg-white/10 transition-colors border border-white/10 text-slate-400">
              <Sparkles size={20} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-nebula-surface-highest hover:bg-white/10 transition-colors border border-white/10 text-slate-400">
              <ZoomIn size={20} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-nebula-surface-highest hover:bg-white/10 transition-colors border border-white/10 text-slate-400">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar: Signal Feed */}
      <aside className="w-full xl:w-80 order-1 xl:order-2 print-hidden">
        <div className="glass-panel rounded-3xl p-6 border border-white/5 sticky top-24">
          <div className="flex items-center gap-3 mb-8">
            <Radar className="text-nebula-primary" size={24} />
            <h2 className="font-headline font-bold text-xl uppercase tracking-tight">Signal Feed</h2>
          </div>

          <div className="space-y-6">
            <div className="relative flex flex-col items-center">
              <div className="absolute inset-0 bg-nebula-primary/20 blur-3xl rounded-full"></div>
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-nebula-surface-high to-nebula-surface-low border-4 border-nebula-primary shadow-lg shadow-nebula-primary/20 flex flex-col items-center justify-center">
                <span className="text-nebula-primary font-headline text-5xl font-black mb-0">
                  {currentBall ? `${getBingoLetter(currentBall)}-${currentBall}` : '--'}
                </span>
                <div className="w-12 h-1 bg-nebula-primary/40 rounded-full mt-2"></div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Latest Transmission</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <p className="text-xs font-headline uppercase tracking-widest text-slate-400 mb-4">Previous Signals</p>
              <div className="grid grid-cols-5 gap-2">
                {history.map((num, i) => (
                  <div 
                    key={i}
                    className="aspect-square rounded-full bg-nebula-surface-highest border border-white/10 flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ opacity: 1 - (i * 0.2) }}
                  >
                    {getBingoLetter(num)}{num}
                  </div>
                ))}
                {Array.from({ length: 5 - history.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square rounded-full bg-nebula-surface-highest border border-white/5 opacity-10"></div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-nebula-surface-highest/40 rounded-2xl border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Balls Drawn</span>
                <span className="text-white font-bold">{drawnNumbers.length} / 75</span>
              </div>
              <div className="w-full h-1 bg-nebula-surface rounded-full overflow-hidden">
                <div className="h-full bg-nebula-primary" style={{ width: `${(drawnNumbers.length / 75) * 100}%` }}></div>
              </div>
              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-slate-400">Players Online</span>
                <span className="text-nebula-secondary font-bold">1,248</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
