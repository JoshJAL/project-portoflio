import { supabase } from '@/utils/supabase';

export async function castVote(item: string, count: number, id: string) {
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
