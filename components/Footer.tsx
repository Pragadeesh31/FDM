
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto py-4 px-5">
        <p className="text-gray-600 text-center text-sm">
          &copy; {new Date().getFullYear()} Farmers Digital Market. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
