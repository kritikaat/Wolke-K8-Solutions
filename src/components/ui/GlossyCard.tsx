"use client"

import React from 'react';

interface GlossyCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const GlossyCard: React.FC<GlossyCardProps> = ({ children, className = "", glowColor = "from-indigo-500/20" }) => (
  <div className={`backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-all duration-500 ${className}`}>
    <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
    <div className="relative z-10">{children}</div>
  </div>
);

export default GlossyCard;