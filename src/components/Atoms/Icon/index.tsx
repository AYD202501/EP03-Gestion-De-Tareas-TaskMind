import React from 'react';
import { Icon } from '@iconify/react';

const Index = ({ icon }: { icon: string }) => {
  return (
    <div className='flex flex-col items-center justify-center gradient w-[72px] h-[72px] rounded-full'>
      <Icon icon={`${icon}`} width='40' height='40' className='text-white' />
    </div>
  );
};

export default Index;
