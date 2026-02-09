import { useState } from 'react';
import { ScoreBoard } from './components/ScoreBoard';
import { Goal } from './components/Goal';
import { Goalkeeper } from './components/Goalkeeper';
import type { GoalkeeperAction } from './components/Goalkeeper';
import { Ball } from './components/Ball';
import { Controls } from './components/Controls';
import { HeroTitle } from './components/HeroTitle';
import { motion, AnimatePresence } from 'framer-motion';

type GameStatus = 'idle' | 'shooting' | 'scored' | 'saved';

function App() {
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [round, setRound] = useState(1);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [ballTarget, setBallTarget] = useState(0); // -100 (left), 0 (center), 100 (right)
  const [keeperAction, setKeeperAction] = useState<GoalkeeperAction>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleShoot = (direction: 'left' | 'center' | 'right') => {
    if (gameStatus !== 'idle') return;

    setGameStatus('shooting');

    // Determine shot target
    let targetX = 0;
    if (direction === 'left') targetX = -180; // Match goal width/keeper dive range
    if (direction === 'center') targetX = 0;
    if (direction === 'right') targetX = 180;

    setBallTarget(targetX);

    // Determine Keeper move (Random)
    const options: GoalkeeperAction[] = ['dive-left', 'center', 'dive-right'];
    const keeperChoice = options[Math.floor(Math.random() * options.length)];

    // Slight delay for keeper reaction realism (100ms)
    setTimeout(() => {
      setKeeperAction(keeperChoice);
    }, 100);

    // Calculate Result
    setTimeout(() => {
      // Logic: if direction matches keeper, it's a save.
      // Left matches dive-left, Center matches center, Right matches dive-right
      const isSave =
        (direction === 'left' && keeperChoice === 'dive-left') ||
        (direction === 'center' && keeperChoice === 'center') ||
        (direction === 'right' && keeperChoice === 'dive-right');

      if (isSave) {
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
        setGameStatus('saved');
        setFeedback('SAVED!');
      } else {
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
        setGameStatus('scored');
        setFeedback('GOAL!!!');
      }

      // Reset for next round
      setTimeout(() => {
        setGameStatus('idle');
        setKeeperAction('idle');
        setFeedback(null);
        setRound(prev => prev + 1);
      }, 3000);

    }, 800); // Wait for ball animation to complete (approx)
  };

  return (
    // Stadium Background
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-cover bg-center font-sans select-none"
      style={{
        background: `radial-gradient(circle at 50% 10%, #1e293b 0%, #0f172a 40%, #020617 80%)`
      }}
      animate={{
        background: [
          `radial-gradient(circle at 50% 10%, #1e293b 0%, #0f172a 40%, #020617 80%)`,
          `radial-gradient(circle at 45% 15%, #1e293b 0%, #0f172a 40%, #020617 80%)`,
          `radial-gradient(circle at 55% 15%, #1e293b 0%, #0f172a 40%, #020617 80%)`,
          `radial-gradient(circle at 50% 10%, #1e293b 0%, #0f172a 40%, #020617 80%)`
        ]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >

      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none mix-blend-overlay"></div>

      {/* Stadium Lights Effect - Flickering */}
      <motion.div
        animate={{ opacity: [0.3, 0.4, 0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[50%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"
      ></motion.div>
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3, 0.4, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-1/4 w-[50%] h-[40%] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"
      ></motion.div>

      {/* Confetti/Particles for Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[1px] ${gameStatus === 'scored' ? 'bg-green-400' : 'bg-white/10'}`}
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
            initial={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              scale: 1,
              opacity: 0.5
            }}
            animate={gameStatus === 'scored' ? {
              top: '50%',
              left: '50%',
              scale: [1, 5, 0],
              opacity: [1, 1, 0],
              x: (Math.random() - 0.5) * 800,
              y: (Math.random() - 0.5) * 800,
            } : {
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={gameStatus === 'scored' ? { duration: 1, ease: "easeOut" } : { duration: Math.random() * 3 + 2, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Main Containers */}
      <div className="relative z-10 flex flex-col h-full justify-between py-6">

        {/* Top: Scoreboard & Hero Title */}
        <div className="w-full max-w-4xl mx-auto px-4 relative">
          <ScoreBoard score={score} rounds={round} />
          {gameStatus === 'idle' && <HeroTitle />}
        </div>

        {/* Center: Game Area with Camera Zoom */}
        <motion.div
          animate={{ scale: gameStatus === 'shooting' ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex-1 relative flex items-center justify-center perspective-[1000px]"
        >
          {/* Goal Area */}
          <div className="relative w-full cursor-crosshair h-full max-h-[600px] flex items-center justify-center">
            <Goal />
            <Goalkeeper action={keeperAction} />

            {/* Feedback Overlay */}
            <AnimatePresence>
              {feedback && (
                <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
                    exit={{ scale: 2, opacity: 0 }}
                    className={`text-6xl md:text-9xl font-black italic tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]
                                    ${gameStatus === 'scored' ? 'text-green-400 drop-shadow-[0_0_50px_rgba(74,222,128,1)]' : 'text-red-500 drop-shadow-[0_0_50px_rgba(248,113,113,0.8)]'}
                                `}
                  >
                    {feedback}
                  </motion.div>

                  {/* Flash Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    exit={{ opacity: 0 }}
                    className={`absolute inset-0 w-[150vw] h-[150vh] -translate-x-1/4 -translate-y-1/4 ${gameStatus === 'scored' ? 'bg-green-500' : 'bg-red-500'} mix-blend-overlay`}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>

          <Ball
            isShot={gameStatus !== 'idle'}
            targetX={ballTarget}
          />
        </motion.div>

        {/* Bottom: Controls */}
        <div className="w-full relative h-[100px]">
          <Controls disabled={gameStatus !== 'idle'} onShoot={handleShoot} />
        </div>

      </div>
    </motion.div>
  );
}

export default App;
