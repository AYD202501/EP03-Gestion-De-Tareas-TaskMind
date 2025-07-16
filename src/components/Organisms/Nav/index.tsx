import React from 'react';
import NavTitle from '@/components/Atoms/NavTitle';
import Buttom from '@/components/Atoms/Buttom';

const Index = () => {
  return (
    <nav className='flex flex-row w-full justify-around items-center bg-white shadow-md h-20'>
      <div className=''>
        <img src='/logo.png' alt='logo' />
      </div>
      <div className='flex flex-row items-center justify-between gap-2 w-1/3'>
        <NavTitle title='Home' link='/' />
        <NavTitle title='About' link='/' />
        <NavTitle title='Contact' link='/' />
        <NavTitle title='Services' link='/' />
        <NavTitle title='Products' link='/' />
        <NavTitle title='Blog' link='/' />
      </div>
      <div className=''>
        <Buttom />
      </div>
    </nav>
  );
};

export default Index;
