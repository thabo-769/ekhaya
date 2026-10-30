import React from 'react';

interface BrandLogoProps {
  light?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  light = false,
  size = 'md',
  showTagline = true,
}) => {
  const imgSize = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
  }[size];

  return (
    <a
      href="#home"
      className="inline-flex items-center gap-0 select-none group"
      aria-label="Ekhaya Takeaways home"
    >
      <img
        src="/logo.jpg"
        alt="Ekhaya – kumnandi ngempela"
        className={`${imgSize} w-auto object-contain rounded-lg drop-shadow-md transition-transform duration-300 group-hover:scale-105`}
      />
    </a>
  );
};
