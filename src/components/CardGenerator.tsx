import React, { useState } from 'react';
import { RefreshCw, Printer, Verified, Star } from 'lucide-react';
import { BingoCard } from '../types';
import { generateBingoGrid, BINGO_LETTERS } from '../constants';

interface CardGeneratorProps {
  onGenerate: (cards: BingoCard[]) => void;
}

export default function CardGenerator({ onGenerate }: CardGeneratorProps) {
  const [count, setCount] = useState<number>(1);
  const [generatedCards, setGeneratedCards] = useState<BingoCard[]>(() => [createCard('PREVIEW')]);

  function createCard(id: string): BingoCard {
    return {
      id,
      serial: `#NV-${Math.floor(1000 + Math.random() * 9000)}`,
      grid: generateBingoGrid(),
      marked: Array(5).fill(null).map(() => Array(5).fill(false)),
    };
  }

  const handleGenerate = () => {
    const newCards = Array(count).fill(null).map((_, i) => createCard(`card-${Date.now()}-${i}`));
    setGeneratedCards(newCards);
    onGenerate(newCards);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
      <header className="mb-12 print-hidden">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-white mb-2">
          Card <span className="text-nebula-primary">Generator</span>
        </h1>
        <p className="text-slate-400 max-w-2xl font-body">
          Deploy customized bingo grids across the nebula. Select your quantity and generate instant, high-resolution celestial patterns.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 print-hidden">
        {/* Selector Card */}
        <div className="md:col-span-2 glass-panel rounded-xl p-8 flex flex-col justify-between">
          <div>
            <h2 className="font-headline text-xs uppercase tracking-widest text-nebula-primary mb-6">Configuration</h2>
            <label className="block text-slate-400 text-sm mb-4">Number of Cards</label>
            <div className="flex flex-wrap gap-4">
              {[1, 3, 6, 12].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`px-6 py-3 rounded-lg font-headline transition-all ${
                    count === n 
                      ? 'bg-nebula-primary/20 border border-nebula-primary text-nebula-primary' 
                      : 'bg-nebula-surface-highest border border-white/10 text-white hover:border-nebula-primary/40'
                  }`}
                >
                  {n}
                </button>
              ))}
              <div className="flex-grow">
                <input
                  type="number"
                  placeholder="Custom"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                  className="w-full bg-nebula-surface-highest border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-nebula-primary/60 text-white font-headline"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleGenerate}
              className="flex-1 bg-gradient-to-r from-nebula-primary to-cyan-600 text-nebula-surface font-headline font-bold py-4 rounded-xl shadow-lg shadow-nebula-primary/20 hover:shadow-nebula-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              Generate New Cards
            </button>
            <button 
              onClick={() => window.print()}
              className="px-8 py-4 bg-nebula-surface-highest border border-white/10 rounded-xl font-headline font-bold text-white hover:bg-white/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Printer size={20} />
              Print All Cards
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="glass-panel rounded-xl p-8 relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-nebula-secondary/10 rounded-full blur-3xl group-hover:bg-nebula-secondary/20 transition-all"></div>
          <h2 className="font-headline text-xs uppercase tracking-widest text-nebula-secondary mb-6">Card Info</h2>
          <div className="space-y-6 relative z-10">
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-tighter mb-1">Active Set</p>
              <p className="text-2xl font-headline font-bold text-white">{generatedCards[0]?.serial} Series</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-tighter mb-1">Estimated Print Size</p>
              <p className="text-2xl font-headline font-bold text-white">US Letter / A4</p>
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-2 text-nebula-primary">
                <Verified size={16} />
                <span className="text-[10px] font-headline uppercase tracking-widest">Anti-Cheat Validated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="print:block">
        <div className="flex items-center justify-between mb-8 print-hidden">
          <h2 className="font-headline text-2xl font-bold">Preview Grid</h2>
          <span className="text-slate-400 text-sm font-body">Showing {generatedCards.length} Cards</span>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-xl mx-auto">
          {generatedCards.map((card) => (
            <div key={card.id} className="glass-panel rounded-2xl overflow-hidden shadow-2xl print:break-after-page">
              <div className="bg-nebula-surface-highest/50 px-6 py-4 flex justify-between items-center border-b border-white/5">
                <div className="font-headline font-black text-xl tracking-tighter text-nebula-primary">NEBULA BINGO</div>
                <div className="font-headline text-xs text-slate-400">SERIAL: {card.serial}</div>
              </div>
              
              <div className="p-4 md:p-6 bg-nebula-surface-low">
                <div className="grid grid-cols-5 gap-1 md:gap-2 mb-4">
                  {BINGO_LETTERS.map((letter) => (
                    <div key={letter} className="flex items-center justify-center font-headline font-black text-2xl text-nebula-secondary pb-2">
                      {letter}
                    </div>
                  ))}
                  
                  {card.grid.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                      <div 
                        key={`${rowIndex}-${colIndex}`}
                        className={`aspect-square flex flex-col items-center justify-center rounded-lg border border-white/5 text-xl font-headline font-bold ${
                          cell === 'FREE' 
                            ? 'bg-gradient-to-br from-nebula-primary/20 to-nebula-secondary/20 border-nebula-primary/30' 
                            : 'bg-nebula-surface'
                        }`}
                      >
                        {cell === 'FREE' ? (
                          <>
                            <Star size={20} className="text-nebula-primary fill-nebula-primary" />
                            <span className="text-[10px] font-black font-headline tracking-widest text-nebula-primary mt-1">FREE</span>
                          </>
                        ) : (
                          cell
                        )}
                      </div>
                    ))
                  ))}
                </div>
              </div>
              
              <div className="px-6 py-4 bg-nebula-surface-highest/30 flex justify-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-headline">
                  Nebula Entertainment Systems • Zero-G Bingo Protocol
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
