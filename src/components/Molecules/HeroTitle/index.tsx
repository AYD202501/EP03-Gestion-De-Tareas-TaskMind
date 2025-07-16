import React from 'react';
import { HeroTitle, SubText } from '@/components/Atoms/Titles';
import Buttom from '@/components/Atoms/Buttom';

const Index = () => {
  return (
    <div className=' flex flex-col gap-5'>
      <HeroTitle />
      <SubText text='Take your financial life online. Your Easybank account will be a one-stop-shop for spending, saving, budgeting, investing, and much more.' />
      <Buttom />
    </div>
  );
};

export default Index;
