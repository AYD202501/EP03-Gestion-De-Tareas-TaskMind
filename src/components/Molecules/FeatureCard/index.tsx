import React from 'react';
import Icon from '@/components/Atoms/Icon';
import { SubTitle, SubText } from '@/components/Atoms/Titles';

const Index = ({ icon, title, text }: { icon: string; title: string; text: string }) => {
  return (
    <div className=' flex flex-col gap-5'>
      <div>
        <Icon icon={icon} />
      </div>
      <div>
        <SubTitle title={title} />
      </div>
      <div>
        <SubText text={text} />
      </div>
    </div>
  );
};

export default Index;
