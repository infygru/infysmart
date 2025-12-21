// components/Breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm font-medium text-slate-500">
      <ol className="flex items-center space-x-2">
        {/* Home */}
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
            <Home className="h-4 w-4" />
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
            
            {item.active ? (
              <span className="text-slate-900 font-semibold truncate max-w-[150px] md:max-w-xs">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href || '#'} 
                className="hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}