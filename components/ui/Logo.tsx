import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="currentColor" />
    <path d="M30 35L20 50L30 65" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M70 35L80 50L70 65" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="10" fill="#06B6D4" />
    <path d="M45 50H55" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

export default Logo;
