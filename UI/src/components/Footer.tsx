import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full rounded-lg mt-auto py-6">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-6">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 w-3/4 max-w-2xl mx-auto" />
        <span className="block text-sm text-gray-500 text-center">
          © 2023 Team Clear All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
