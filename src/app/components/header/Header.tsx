'use client';
import { usePathname } from 'next/navigation';
import Icon from '../Icon';
import Link from 'next/link';
import HeaderLink from './HeaderLink';
import DropdownMenu from '../dropdownMenu/DropdownMenu';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className='fixed flex items-center justify-center w-full p-5 backdrop-blur-md'>
      <div className='flex items-center w-full max-w-3xl'>
        <h1 className='text-xl group'>
          <Link href='/' className='flex items-center gap-2'>
            {pathname === '/' ? 'Project Portfolio' : 'Voting'}
            <div className='group-hover:rotate-[20deg] transition-all duration-200 ease-in-out'>
              <Icon />
            </div>
          </Link>
        </h1>
        <div className='flex-1' />
        <div className='items-center hidden gap-6 md:flex'>
          <HeaderLink href='/voting'>Voting</HeaderLink>
        </div>
        <div className='md:hidden'>
          <DropdownMenu />
        </div>
      </div>
    </header>
  );
}
