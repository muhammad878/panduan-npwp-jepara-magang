import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-[#1E3A8A] text-white border-[#1E3A8A]',
    success: 'bg-[#059669] text-white border-[#059669]',
    warning: 'bg-[#F59E0B] text-white border-[#F59E0B]',
    info: 'bg-[#6B7280] text-white border-[#6B7280]'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
