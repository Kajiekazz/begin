
import React, { useState, useEffect } from 'react';

interface TypewriterBioProps {
  text: string;
  className?: string;
}

const TypewriterBio: React.FC<TypewriterBioProps> = ({ text, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let currentIndex = 0;
    
    // Initial delay before typing starts
    const startTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text.charAt(currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(intervalId);
        }
      }, 150); // Typing speed (ms per char)

      return () => clearInterval(intervalId);
    }, 800);

    return () => clearTimeout(startTimeout);
  }, [text]);

  return (
    <div className={`relative inline-block ${className}`}>
      <div className="relative z-10 px-6 py-2 bg-white/40 dark:bg-night-900/40 backdrop-blur-md rounded-xl border border-white/40 dark:border-sakura-500/20 shadow-lg text-center min-h-[3rem] flex items-center justify-center">
        <span className="font-handwriting text-lg md:text-xl font-bold text-slate-700 dark:text-sakura-100 tracking-widest">
          {displayedText}
        </span>
        <span className={`inline-block w-[2px] h-5 ml-1 bg-sakura-500 align-middle ${isTyping ? 'opacity-100' : 'cursor-blink'}`}></span>
      </div>
      
      {/* Decorative Pen/Feather Icon (Optional visual cue) */}
      <div className="absolute -right-2 -bottom-2 text-sakura-400 opacity-50 rotate-[-45deg]">
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
            <path d="M2 2l7.586 7.586"></path>
            <circle cx="11" cy="11" r="2"></circle>
         </svg>
      </div>
    </div>
  );
};

export default TypewriterBio;
