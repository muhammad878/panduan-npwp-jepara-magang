import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 min-h-[44px] text-[15px] md:text-base';

  const variants = {
    primary: 'bg-[#1E3A8A] text-white hover:bg-[#F59E0B] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2',
    secondary: 'bg-white text-[#1E3A8A] border-2 border-[#1E3A8A] hover:bg-[#F59E0B] hover:text-white hover:border-[#F59E0B] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
