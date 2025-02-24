import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbProps {
  className?: string;
}

interface PathSegment {
  name: string;
  path: string;
  isLast: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ className = '' }) => {
  const pathname = usePathname();

  // Fungsi untuk mengubah format text
  const formatText = (text: string): string => {
    return text
      .split('-')
      .map((word: string): string => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Fungsi untuk membuat URL lengkap
  const createPath = (segments: string[], currentIndex: number): string => {
    const relevantSegments = ['dashboard', ...segments.slice(0, currentIndex + 1)];
    return `/${relevantSegments.join('/')}`;
  };

  // Generate path segments
  const segments: string[] = pathname
    .split('/')
    .filter((segment: string): boolean => segment !== '' && segment !== 'dashboard');

  // Create PathSegment objects
  const pathSegments: PathSegment[] = segments.map(
    (segment: string, index: number): PathSegment => ({
      name: segment,
      path: createPath(segments, index),
      isLast: index === segments.length - 1,
    })
  );

  return (
    <nav className={`flex items-center space-x-1 text-sm text-gray-600 ${className}`}>
      <Link href="/dashboard" className="flex items-center hover:text-gray-900">
        <Home className="h-4 w-4" />
        <span className="ml-1">Dashboard</span>
      </Link>

      {pathSegments.map((segment: PathSegment, index: number) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4" />
          {segment.isLast ? (
            <span className="font-bold text-gray-900">{formatText(segment.name)}</span>
          ) : (
            <Link href={segment.path} className="hover:text-gray-900">
              {formatText(segment.name)}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;