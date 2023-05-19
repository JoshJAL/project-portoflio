import React from 'react';

interface Props {
  item1Count: number;
  totalVotes: number;
  item1: string;
  item2: string;
}

export default function VotingBar({ item1Count, totalVotes, item1, item2 }: Props) {
  const votes = (item1Count / totalVotes) * 100;

  return (
    <div className='h-[30px] w-full bg-blue-300 rounded-lg m-12 flex items-center'>
      <div
        className='flex items-center h-full transition-all duration-300 bg-orange-500 rounded-s-lg'
        style={{ width: `${votes}%` }}
      >
        <p className='mx-auto text-white'>{item1}</p>
      </div>
      <p className='mx-auto text-center text-black'>{item2}</p>
    </div>
  );
}
