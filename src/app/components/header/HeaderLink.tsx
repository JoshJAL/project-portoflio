import Link from 'next/link';

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function HeaderLink({ href, children }: HeaderLinkProps) {
  return (
    <Link href={href} className='text-lg hover:underline underline-offset-2'>
      {children}
    </Link>
  );
}
