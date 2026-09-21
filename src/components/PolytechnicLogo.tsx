import React from 'react';

interface PolytechnicLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark' | 'color';
  className?: string;
  onClick?: () => void;
}

export const PolytechnicLogo: React.FC<PolytechnicLogoProps> = ({
  size = 'md',
  showText = true,
  variant = 'color',
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: { icon: 38, textTitle: 'text-sm', textSub: 'text-[10px]' },
    md: { icon: 50, textTitle: 'text-base', textSub: 'text-xs' },
    lg: { icon: 72, textTitle: 'text-xl', textSub: 'text-xs' },
    xl: { icon: 96, textTitle: 'text-2xl', textSub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      id="polytechnic-logo-brand"
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* SVG Institutional Crest directly matching the user's uploaded logo */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-md"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path id="logoTextArc" d="M 72,252 A 185,185 0 0,1 428,252" fill="none" />
            <linearGradient id="logoPencilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <linearGradient id="logoBookGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FACC15" />
            </linearGradient>
          </defs>

          {/* White circular background disc */}
          <circle cx="250" cy="250" r="240" fill="#FFFFFF" />

          {/* Outer Green Cogwheel / Gear Arc */}
          <path
            d="
              M 50,265 
              L 35,245 L 45,215 L 65,218 
              A 210,210 0 0,1 78,175 
              L 60,152 L 80,128 L 102,138 
              A 210,210 0 0,1 128,105 
              L 120,80 L 148,64 L 165,80 
              A 210,210 0 0,1 202,60 
              L 204,32 L 236,30 L 244,56 
              A 210,210 0 0,1 256,56 
              L 264,30 L 296,32 L 298,60 
              A 210,210 0 0,1 335,80 
              L 352,64 L 380,80 L 372,105 
              A 210,210 0 0,1 398,138 
              L 420,128 L 440,152 L 422,175 
              A 210,210 0 0,1 435,218 
              L 455,215 L 465,245 L 450,265 
              L 415,265 
              A 168,168 0 0,0 85,265 
              Z"
            fill="#0D7A42"
          />

          {/* Curved Text inside Green Gear */}
          <text
            fill="#FFFFFF"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="900"
            fontSize="21"
            letterSpacing="2.8"
          >
            <textPath href="#logoTextArc" startOffset="50%" textAnchor="middle">
              RENAISSANCE MODERN POLYTECHNIC
            </textPath>
          </text>

          {/* Center Tools: Red Pencil, Center Spanner, Hammer */}
          <g transform="translate(0, -10)">
            {/* 1. Red Carpenter/Drafting Pencil (left tilted) */}
            <g transform="translate(200, 270) rotate(-35) translate(-200, -270)">
              <polygon points="186,130 214,130 214,295 186,295" fill="url(#logoPencilGrad)" stroke="#991B1B" strokeWidth="2" />
              <polygon points="186,130 214,130 200,85" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
              <polygon points="195,100 205,100 200,85" fill="#18181B" />
            </g>

            {/* 2. Claw Hammer (right tilted) */}
            <g transform="translate(300, 270) rotate(32) translate(-300, -270)">
              <rect x="290" y="160" width="20" height="150" rx="4" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              <path
                d="M 260,165 L 340,165 L 345,150 L 335,145 L 305,145 C 300,120 280,110 260,112 C 270,122 276,135 274,145 L 260,148 Z"
                fill="#18181B"
                stroke="#0F172A"
                strokeWidth="2"
              />
            </g>

            {/* 3. Center Open Wrench / Spanner (Vertical) */}
            <path
              d="M 215,135 C 215,105 230,85 250,85 C 270,85 285,105 285,135 L 268,140 C 265,122 258,115 250,115 C 242,115 235,122 232,140 Z"
              fill="#18181B"
              stroke="#0F172A"
              strokeWidth="2"
            />
            <rect x="238" y="135" width="24" height="150" rx="4" fill="#18181B" stroke="#0F172A" strokeWidth="2" />
            <line x1="250" y1="145" x2="250" y2="280" stroke="#334155" strokeWidth="4" />
          </g>

          {/* Open Book of Knowledge at Bottom */}
          <g transform="translate(0, -10)">
            {/* Book Spine (Maroon) */}
            <path
              d="M 250,335 C 230,350 140,360 20,345 L 18,368 C 140,385 230,375 250,360 C 270,375 360,385 482,368 L 480,345 C 360,360 270,350 250,335 Z"
              fill="#7F1D1D"
              stroke="#500724"
              strokeWidth="2"
            />
            {/* Book Pages Rim (Golden Yellow) */}
            <path
              d="M 250,325 C 230,338 140,348 25,335 L 22,358 C 140,372 230,362 250,350 C 270,362 360,372 478,358 L 475,335 C 360,348 270,338 250,325 Z"
              fill="url(#logoBookGrad)"
              stroke="#CA8A04"
              strokeWidth="2"
            />
            {/* Open Pages */}
            <path d="M 250,325 C 220,300 130,300 25,325 L 30,348 C 130,328 220,328 250,345 Z" fill="#FFFBEB" stroke="#CA8A04" strokeWidth="2" />
            <path d="M 250,325 C 280,300 370,300 475,325 L 470,348 C 370,328 280,328 250,345 Z" fill="#FFFBEB" stroke="#CA8A04" strokeWidth="2" />

            {/* Left Orange Tag & Right Green Tag */}
            <rect x="65" y="318" width="55" height="16" rx="3" fill="#EA580C" />
            <rect x="365" y="318" width="65" height="16" rx="3" fill="#16A34A" />

            {/* Lines on page */}
            <line x1="140" y1="316" x2="230" y2="316" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
            <line x1="135" y1="326" x2="235" y2="326" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
            <line x1="270" y1="316" x2="350" y2="316" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
            <line x1="265" y1="326" x2="355" y2="326" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Bottom Green Motto Bar */}
          <path d="M 80,410 L 420,410 L 400,445 L 250,445 L 100,445 Z" fill="#0D7A42" />
          <text
            x="250"
            y="433"
            fill="#FDE047"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="900"
            fontSize="18"
            letterSpacing="3"
            textAnchor="middle"
          >
            MBAUKWU • ANAMBRA
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight leading-tight ${currentSize.textTitle} ${
                variant === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              RENAISSANCE
            </span>
            <span className="text-emerald-700 font-bold tracking-tight">MODERN</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`font-semibold tracking-wider uppercase ${currentSize.textSub} ${
                variant === 'dark' ? 'text-emerald-300' : 'text-emerald-800'
              }`}
            >
              POLYTECHNIC MBAUKWU
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span
              className={`hidden sm:inline-block font-medium tracking-tight ${currentSize.textSub} ${
                variant === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              ANAMBRA STATE
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
