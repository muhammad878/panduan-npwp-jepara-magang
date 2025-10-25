import { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AlertProps {
  type: 'info' | 'warning' | 'success' | 'error';
  children: ReactNode;
  className?: string;
}

export function Alert({ type, children, className = '' }: AlertProps) {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-l-4 border-[#3B82F6]',
      text: 'text-[#1E40AF]',
      icon: Info
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-l-4 border-[#F59E0B]',
      text: 'text-[#92400E]',
      icon: AlertTriangle
    },
    success: {
      bg: 'bg-emerald-50',
      border: 'border-l-4 border-[#10B981]',
      text: 'text-[#065F46]',
      icon: CheckCircle
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-l-4 border-[#EF4444]',
      text: 'text-[#991B1B]',
      icon: AlertCircle
    }
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={`${style.bg} ${style.border} p-4 rounded-lg flex gap-3 ${className}`}>
      <Icon className={`w-5 h-5 ${style.text} flex-shrink-0 mt-0.5`} />
      <div className={`text-[15px] md:text-base ${style.text} leading-relaxed`}>
        {children}
      </div>
    </div>
  );
}
