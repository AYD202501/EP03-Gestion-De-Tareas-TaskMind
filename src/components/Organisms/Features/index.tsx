import React from 'react';
import FeatureCard from '@/components/Molecules/FeatureCard';

const features = [
  {
    icon: 'material-symbols-light:add-card-outline-rounded',
    title: 'Online Banking',
    text: 'Our modern web and mobile applications allow you to keep track of your finances wherever you are in the world.',
  },
  {
    icon: 'material-symbols-light:attach-money-rounded',
    title: 'Simple Budgeting',
    text: 'See exactly where your money goes each month. Receive notifications when you’re close to hitting your limits.',
  },
  {
    icon: 'material-symbols-light:monetization-on-outline-rounded',
    title: 'Fast Onboarding',
    text: 'We don’t do branches. Open your account in minutes online and start taking control of your finances right away.',
  },
  {
    icon: 'material-symbols-light:credit-card-off-outline-rounded',
    title: 'Open API',
    text: 'Manage your savings, investments, pension, and much more from one account. Tracking your money has never been easier.',
  },
];

const Index = () => {
  return (
    <div>
      <div className='flex flex-row justify-around items-center w-full '>
        {features.map((features) => {
          return (
            <div key={features.title} className='flex items-center justify-center'>
              <FeatureCard icon={features.icon} title={features.title} text={features.text} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
