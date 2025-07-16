import React, { useState } from 'react';
import Icon from '@/components/Atoms/Icon';
import NavTitle from '@/components/Atoms/NavTitle';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex  relative flex-row items-center justify-between w-full h-16 shadow-md bg-white'>
      <div>
        <img src='/logo.png' alt='logo' />
      </div>
      <div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Icon icon='material-symbols-light:menu-rounded' />
        </button>
      </div>
      {isOpen && (
        <div className='bg-white absolute shadow-md w-5/6 inset-x-10 top-20 rounded-md '>
          <NavTitle title='Home' link='/' />
          <NavTitle title='About' link='/' />
          <NavTitle title='Contact' link='/' />
          <NavTitle title='Services' link='/' />
          <NavTitle title='Products' link='/' />
          <NavTitle title='Blog' link='/' />
        </div>
      )}
    </div>
  );
};

export default Index;
