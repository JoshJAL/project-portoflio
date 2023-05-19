import React from 'react';
import Votes from '../components/votingPage/Votes';
import { VotingOptions } from '@/types/VotingOptions';
import VotesNotSignedIn from '../components/votingPage/VotesNotSignedIn';
import Link from 'next/link';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

export default async function Voting() {
  const supabase = createServerComponentSupabaseClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    headers,
    cookies
  });
  const { data: userForServer } = await supabase.auth.getSession();
  const session = userForServer?.session;
  const { data } = await supabase.from('votes').select('*');

  return (
    <div className='flex flex-col gap-6'>
      {session === null ? (
        <>
          <div className='flex flex-col items-center'>
            <h1 className='text-xl font-semibold text-center'>
              Sign in so you can vote on the next project we work on together!
            </h1>
          </div>
          <VotesNotSignedIn serverVotes={(data as VotingOptions[]) ?? []} />
          <Link
            href='signIn'
            className='px-3 py-2 text-lg text-center transition bg-blue-500 rounded-lg hover:bg-blue-600'
          >
            Sign In
          </Link>
        </>
      ) : (
        <>
          <h1 className='text-xl font-semibold text-center'>Vote for the next project we work on together!</h1>
          <Votes serverVotes={(data as VotingOptions[]) ?? []} />
        </>
      )}
    </div>
  );
}
