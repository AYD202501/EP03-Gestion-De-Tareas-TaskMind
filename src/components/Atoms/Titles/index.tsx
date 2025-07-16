import React from 'react';

const HeroTitle = () => {
  return (
    <h1 className='text-[56px] text-bank2 font-light text-left max-w-[400px]'>
      Next generation digital banking
    </h1>
  );
};
const MediumTitle = () => {
  return <h2>Next generation digital banking</h2>;
};
const SubTitle = ({ title }: { title: string }) => {
  return <h3 className='text-[24px] text-bank2 font-light text-left'>{title}</h3>;
};
const SubText = ({ text }: { text: string }) => {
  return <p className='text-[18px] text-bank3 font-normal text-left max-w-[400px]'>{text}</p>;
};

export { HeroTitle, MediumTitle, SubTitle, SubText };
