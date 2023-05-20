import { supabase } from '@/utils/supabase';

export async function castVote(item: string, count: number, id: string, user_id?: string) {
  if (user_id) {
    const { error } = await supabase.from('user_voted').update({ has_voted: true }).eq('user_id', user_id).select('*');
    if (error) {
      console.error(error);
    }
  }
  if (item === 'item1') {
    const { data, error } = await supabase
      .from('votes')
      .update({ item1Count: count + 1 })
      .eq('id', id)
      .select('*');
    if (error) {
      console.error(error);
      return;
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from('votes')
      .update({ item2Count: count + 1 })
      .eq('id', id)
      .select('*');
    if (error) {
      console.error(error);
      return;
    }
    return data;
  }
}

export async function createVoter(user_id: string) {
  const { error } = await supabase.from('user_voted').insert([{ user_id, has_voted: true }]);
  if (error) {
    console.error(error);
  }
}

export async function userExists(user_id: string): Promise<boolean> {
  const { data, error } = await supabase.from('user_voted').select('*').eq('user_id', user_id);
  if (error) {
    console.error(error);
  }
  if (data?.length === 0) {
    return false;
  } else {
    return true;
  }
}

export async function hasUserVoted(user_id: string) {
  const { data, error } = await supabase.from('user_voted').select('has_voted').eq('user_id', user_id);
  if (error) {
    console.error(error);
  }
  if (data) {
    return data[0].has_voted;
  }
  return;
}

export async function userVoted(user_id: string) {
  const { error } = await supabase.from('user_voted').update({ has_voted: true }).eq('user_id', user_id).select('*');
  if (error) {
    console.error(error);
  }
}
