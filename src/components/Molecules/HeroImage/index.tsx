import React from 'react';

const Index = () => {
  return (
    <div className='relative w-full'>
      <div className=' absolute -z-40 -top-25 right-0'>
        <img src='/Hero1.png' alt='hero1' />
      </div>
      <div className=' absolute -z-50 -top-10 right-0'>
        <img src='/Hero2.png' alt='hero2' />
      </div>
      <div className='absolute -z-0 top-0 right-0'>
        <img src='/Hero3.png' alt='hero3' />
      </div>
    </div>
  );
};

export default Index;
