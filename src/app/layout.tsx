import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Body from './components/Body';
import Header from './components/header/Header';
import Main from './components/Main';
import './globals.css';
import SupabaseProvider from './supabase-provider';
import { headers, cookies } from 'next/headers';

export const metadata = {
  title: 'Project Portfolio',
  description: 'A single website containing all of my projects'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentSupabaseClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    headers,
    cookies
  });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  return (
    <html lang='en'>
      <Body>
        <Header />
        <Main>
          <SupabaseProvider session={session}>{children}</SupabaseProvider>
        </Main>
      </Body>
    </html>
  );
}
