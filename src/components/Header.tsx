import React from 'react';

interface HeaderProps {
  category?: string;
  title?: string;
  px?: number;
  py?: number;
  span?: number;
}

const Header: React.FC<HeaderProps> = ({ category, title }) => {
  return (
    <div className='mb-10'>
      <p className='text-black font-medium text-sm text-gray-500'>
        {category}
      </p>

      <p className='text-3xl font-extrabold tracking-tight text-slate-900'>{title}</p>
    </div>
  );
};

export default Header;
