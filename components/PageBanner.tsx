
import React from 'react';
import { Link } from 'react-router-dom';

interface PageBannerProps {
  title: string;
  breadcrumb: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ title, breadcrumb }) => {
  return (
    <section className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <p className="font-montserrat text-gray-500 text-sm">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <span className="mx-2">&gt;</span>
          {breadcrumb}
        </p>
        <h1 className="text-4xl font-bold text-gray-800 mt-2">{title}</h1>
      </div>
    </section>
  );
};

export default PageBanner;
