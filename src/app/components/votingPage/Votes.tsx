'use client';

import { supabase } from '@/utils/supabase';
import { MouseEvent, useEffect, useState } from 'react';
import VotingBar from './VotingBar';
import { VotingOptions } from '@/types/VotingOptions';
import { castVote, createVoter, hasUserVoted, userExists } from '@/functions/voting';
import VotingContainer from './VotingContainer';

export default function Votes({ serverVotes, userId }: { serverVotes: VotingOptions[]; userId: string }) {
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

  async function handleVote(
    itemName: string,
    item: string,
    count: number,
    id: string,
    e: MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    if (confirm(`Are you sure you want to vote for ${itemName}?`)) {
      if (!(await userExists(userId))) {
        await createVoter(userId)
          .then(async () => {
            const data = await castVote(item, count, id);
            setVotes(data as VotingOptions[]);
          })
          .catch((error) => console.error(error));
      } else if (await userExists(userId)) {
        const voted = await hasUserVoted(userId);
        if (voted) return alert('You already voted!');
        const data = await castVote(item, count, id, userId);
        setVotes(data as VotingOptions[]);
      }
    } else {
      return;
    }
  }

  const votingOptions = votes[0];

  const totalVotes = votingOptions.item1Count + votingOptions.item2Count;

  return (
    <div className='flex flex-col items-center'>
      <p>Total Votes: {totalVotes}</p>
      <VotingBar
        item1Count={votingOptions.item1Count}
        totalVotes={totalVotes}
        item1={votingOptions.item1}
        item2={votingOptions.item2}
      />
      <div className='flex items-center justify-around w-full'>
        <VotingContainer
          item={votingOptions.item1}
          itemCount={votingOptions.item1Count}
          itemId={votingOptions.id}
          itemColumn='item1'
          handleVote={handleVote}
        />
        <VotingContainer
          item={votingOptions.item2}
          itemCount={votingOptions.item2Count}
          itemId={votingOptions.id}
          itemColumn='item2'
          handleVote={handleVote}
        />
      </div>
    </div>
  );
}
