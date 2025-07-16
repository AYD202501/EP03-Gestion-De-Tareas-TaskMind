import React from 'react';
import Link from 'next/link';
interface Indexprops {
  title: string;
  link: string;
}
const Index = ({ title = 'Title', link = '/' }: Indexprops) => {
  return (
    <Link href={link}>
      <div className='h-20 flex justify-center text-bank3 items-center hover:text-bank2 cursor-pointer hover:border-b-2 hover:border-bank1 '>
        <h1 className='text-sm  font-normal'>{title}</h1>
      </div>
    </Link>
  );
};

export default Index;
