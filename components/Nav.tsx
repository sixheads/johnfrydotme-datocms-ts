'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav role="navigation">
      <ul className="flex gap-5">
        {NAV.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link href={href} className={isActive ? 'active' : ''}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
