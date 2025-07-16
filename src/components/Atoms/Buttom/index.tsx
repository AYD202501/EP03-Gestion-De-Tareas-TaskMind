import React from 'react';
import { signIn } from 'next-auth/react';
const Index = () => {
  return (
    <button
      onClick={() => {
        signIn('auth0', {
          callbackUrl: `${window.location.origin}/`,
        });
      }}
      className='w-40 h-11 gradient text-white font-bold rounded-full text-sm hover:scale-105 transition-all duration-300 cursor-pointer'
    >
      Request Invite
    </button>
  );
};

export default Index;
