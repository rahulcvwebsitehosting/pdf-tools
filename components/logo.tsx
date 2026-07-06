import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function Logo({ className = "w-6 h-6", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Mask to create transparency for the inner cutouts */}
        <mask id="gear-wrench-mask">
          {/* Keep everything outside the cutout white (visible) */}
          <rect x="0" y="0" width="100" height="100" fill="white" />
          
          {/* Cut out the inner circle of the gear (black = invisible) */}
          <circle cx="50" cy="50" r="22" fill="black" />
          
          {/* Draw the wrench head and handle back in white (visible) */}
          <g transform="rotate(-45 50 50)">
            <rect x="44" y="50" width="12" height="35" rx="4" fill="white" />
            <circle cx="50" cy="50" r="14" fill="white" />
          </g>
          
          {/* Cut out the jaw of the wrench (black = invisible) */}
          <g transform="rotate(-45 50 50)">
            <rect x="43" y="30" width="14" height="16" rx="2" fill="black" />
          </g>
        </mask>
      </defs>

      {/* The entire gear and wrench shapes are drawn with currentColor */}
      <g mask="url(#gear-wrench-mask)">
        {/* 8 Gear Teeth */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={angle}
            x="41"
            y="6"
            width="18"
            height="22"
            rx="4"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        
        {/* Outer Gear Disk */}
        <circle cx="50" cy="50" r="36" />
        
        {/* Wrench Shape */}
        <g transform="rotate(-45 50 50)">
          <rect x="44" y="50" width="12" height="35" rx="4" />
          <circle cx="50" cy="50" r="14" />
        </g>
      </g>
    </svg>
  );
}
