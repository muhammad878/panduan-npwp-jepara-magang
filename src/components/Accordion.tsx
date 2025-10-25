import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-left flex items-center justify-between gap-3 transition-colors duration-200 min-h-[56px] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-inset"
      >
        <span className="font-medium text-[#1E293B] text-[15px] md:text-base">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#64748B] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`transition-all duration-200 ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="p-4 bg-white text-[#334155] text-[15px] md:text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
