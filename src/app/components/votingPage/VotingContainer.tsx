import { MouseEvent } from 'react';

interface VotingContainerProps {
  item: string;
  itemCount: number;
  itemId: string;
  itemColumn: string;
  handleVote: (itemName: string, item: string, count: number, id: string, e: MouseEvent<HTMLButtonElement>) => void;
}

export default function VotingContainer({ item, itemCount, itemId, itemColumn, handleVote }: VotingContainerProps) {
  return (
    <div className='flex flex-col items-center gap-2'>
      <p>{item}</p>
      <p>{itemCount}</p>
      <button
        onClick={(e) => handleVote(item, itemColumn, itemCount, itemId, e)}
        className='px-3 py-2 transition-all duration-200 ease-in-out bg-green-600 rounded-md hover:bg-green-700'
      >
        Cast Vote
      </button>
    </div>
  );
}
