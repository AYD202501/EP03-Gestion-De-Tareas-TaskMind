import React from 'react';
import HeroTitle from '@/components/Molecules/HeroTitle';
import HeroImage from '@/components/Molecules/HeroImage';
const Index = () => {
  return (
    <div className='flex flex-row-reverse w-full h-screen '>
      <div className=' w-1/2'>
        <HeroImage />
      </div>
      <div className=' w-1/2  flex items-center justify-center'>
        <HeroTitle />
      </div>
    </div>
  );
};

export default Index;
