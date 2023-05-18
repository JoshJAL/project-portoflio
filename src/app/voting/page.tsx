import React from 'react';
import Votes from '../components/votingPage/Votes';
import { supabase } from '../../utils/supabase';
import { VotingOptions } from '@/types/VotingOptions';

export default async function Voting() {
  const { data } = await supabase.from('votes').select('*');
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-semibold text-center'>Vote for the next project we work on together!</h1>
      <Votes serverVotes={(data as VotingOptions[]) ?? []} />
    </div>
  );
}
