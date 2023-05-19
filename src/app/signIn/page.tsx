'use client';

import { supabase } from '@/utils/supabase';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  async function onClick() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:3000/voting'
      }
    });
    if (error) {
      console.error(error);
    } else {
      setSuccess(true);
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      {success ? (
        <>
          <h1 className='text-xl font-semibold text-center'>Check your email for a sign in link!</h1>
        </>
      ) : (
        <>
          <h1 className='text-xl font-semibold text-center'>
            Sign in with your email so you can vote for our next project!
          </h1>
          <label className='text-lg underline underline-offset-2'>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='px-3 py-2 text-black rounded-md outline-none'
            placeholder='example@email.com'
            required={true}
          />
          <button className='px-3 py-2 text-lg transition bg-blue-500 rounded-lg hover:bg-blue-600' onClick={onClick}>
            Sign In
          </button>
        </>
      )}
    </div>
  );
}
