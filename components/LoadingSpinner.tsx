import React, { useEffect, useState } from 'react';
import { Loader2, Hammer, PaintBucket, Ruler, HardHat } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  const [step, setStep] = useState(0);
  
  // Construction themed loading phases
  const steps = [
    { text: "Analisando geometria...", icon: <Ruler className="w-8 h-8 text-indigo-900" /> },
    { text: "Calculando modificações...", icon: <HardHat className="w-8 h-8 text-indigo-900" /> },
    { text: "Aplicando materiais...", icon: <Hammer className="w-8 h-8 text-indigo-900" /> },
    { text: "Renderizando acabamento...", icon: <PaintBucket className="w-8 h-8 text-indigo-900" /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 w-full h-full min-h-[300px] bg-white/50 backdrop-blur-sm">
      <div className="relative w-32 h-32 mb-8">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-900 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
        
        {/* Middle rotating ring (reverse) */}
        <div className="absolute inset-3 border-4 border-indigo-200 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
        
        {/* Inner pulse circle */}
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center animate-pulse shadow-inner">
              {/* Animated Icon Transition */}
              <div className="animate-bounce duration-1000">
                 {steps[step].icon}
              </div>
           </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-3 z-10">
        <h3 className="text-xl font-bold text-indigo-900 tracking-tight">
          Processamento IA
        </h3>
        
        <div className="h-8 overflow-hidden relative w-80 flex justify-center">
           <p key={step} className="text-gray-500 font-medium animate-fade-in-up absolute w-full text-center">
             {steps[step].text}
           </p>
        </div>
      </div>
      
      {/* Decorative progress bar */}
      <div className="w-64 h-1 bg-gray-200 rounded-full mt-8 overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full bg-indigo-600 w-1/3 animate-indeterminate-bar rounded-full"></div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          0% { transform: translateY(10px); opacity: 0; }
          20% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-10px); opacity: 0; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 2.5s ease-in-out infinite;
        }
        @keyframes indeterminate-bar {
          0% { left: -35%; width: 35%; }
          50% { left: 100%; width: 100%; }
          100% { left: -35%; width: 35%; }
        }
        .animate-indeterminate-bar {
          animation: indeterminate-bar 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;