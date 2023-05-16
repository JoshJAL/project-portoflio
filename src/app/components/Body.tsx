import { Rubik } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'] });

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return (
    <body
      className={`mx-auto leading-6 break-words transition-colors duration-500 bg-zinc-900 text-zinc-300 ${rubik.className}`}
    >
      {children}
    </body>
  );
}
