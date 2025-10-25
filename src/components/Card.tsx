import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div className={`bg-white border border-[#1E3A8A]/10 rounded-xl p-6 ${hover ? 'transition-all duration-200 hover:shadow-xl hover:border-[#F59E0B]' : ''} ${className}`}>
      {children}
    </div>
  );
}
