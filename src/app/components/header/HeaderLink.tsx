import Link from 'next/link';

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
  active: boolean;
}

export default function HeaderLink({ href, children, active }: HeaderLinkProps) {
  return (
    <Link
      href={href}
      className={`text-lg hover:underline underline-offset-2 ${active ? 'font-semibold underline' : ''}`}
    >
      {children}
    </Link>
  );
}
