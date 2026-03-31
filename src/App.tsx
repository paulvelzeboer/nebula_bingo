import React, { useState } from 'react';
import Layout from './components/Layout';
import CardGenerator from './components/CardGenerator';
import CallerCommand from './components/CallerCommand';
import MyCards from './components/MyCards';
import { BingoCard, View, GameState } from './types';

export default function App() {
  const [view, setView] = useState<View>('generator');
  const [gameState, setGameState] = useState<GameState>({
    drawnNumbers: [],
    remainingNumbers: Array.from({ length: 75 }, (_, i) => i + 1),
    activeCards: [],
  });

  const handleGenerateCards = (cards: BingoCard[]) => {
    setGameState(prev => ({
      ...prev,
      activeCards: cards,
    }));
    setView('cards');
  };

  const handleDrawNumber = (num: number) => {
    setGameState(prev => ({
      ...prev,
      drawnNumbers: [...prev.drawnNumbers, num],
      remainingNumbers: prev.remainingNumbers.filter(n => n !== num),
    }));
  };

  const handleToggleMark = (cardId: string, rowIndex: number, colIndex: number) => {
    setGameState(prev => ({
      ...prev,
      activeCards: prev.activeCards.map(card => {
        if (card.id === cardId) {
          const newMarked = [...card.marked.map(row => [...row])];
          newMarked[rowIndex][colIndex] = !newMarked[rowIndex][colIndex];
          return { ...card, marked: newMarked };
        }
        return card;
      }),
    }));
  };

  return (
    <Layout currentView={view} onViewChange={setView}>
      {view === 'generator' && (
        <CardGenerator onGenerate={handleGenerateCards} />
      )}
      {view === 'caller' && (
        <CallerCommand 
          drawnNumbers={gameState.drawnNumbers} 
          onDraw={handleDrawNumber} 
        />
      )}
      {view === 'cards' && (
        <MyCards 
          cards={gameState.activeCards} 
          drawnNumbers={gameState.drawnNumbers}
          onToggleMark={handleToggleMark}
        />
      )}
    </Layout>
  );
}
