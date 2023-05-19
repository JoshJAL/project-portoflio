'use client';

import { VotingOptions } from '@/types/VotingOptions';
import { supabase } from '@/utils/supabase';
import { useEffect, useState } from 'react';
import VotingBar from './VotingBar';

export default function VotesNotSignedIn({ serverVotes }: { serverVotes: VotingOptions[] }) {
  const [votes, setVotes] = useState(serverVotes);
  useEffect(() => {
    const channel = supabase
      .channel('realtime votes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'votes' }, (payload) => {
        setVotes([payload.new as VotingOptions]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [votes, setVotes]);

  const votingOptions = votes[0];

  const totalVotes = votingOptions.item1Count + votingOptions.item2Count;

  return (
    <div className='flex flex-col items-center'>
      <p className='text-lg'>Total Votes: {totalVotes}</p>
      <VotingBar
        item1Count={votingOptions.item1Count}
        totalVotes={totalVotes}
        item1={votingOptions.item1}
        item2={votingOptions.item2}
      />
    </div>
  );
}
