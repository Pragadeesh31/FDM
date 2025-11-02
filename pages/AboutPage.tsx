
import React from 'react';
import PageBanner from '../components/PageBanner';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <>
      <PageBanner title="About Us" breadcrumb="About" />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://picsum.photos/seed/about-us/600/500" alt="Farm field" className="rounded-lg shadow-xl w-full h-auto" />
          </div>
          <div className="about-info">
            <h3 className="text-xl font-semibold text-gray-700">Welcome to Farmers Digital Market</h3>
            <h1 className="font-montserrat text-4xl font-extrabold text-gray-900 mt-2">Who We Are</h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Farmers Digital Market (FDM) is an innovative online platform dedicated to connecting farmers directly with consumers. Our mission is to empower local farmers by providing them with a digital marketplace where they can showcase and sell their fresh produce, dairy products, and other agricultural goods.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              By eliminating intermediaries, we ensure that farmers receive fair prices for their products while consumers gain access to high-quality, farm-fresh items. At FDM, we believe in supporting local agriculture and promoting sustainable farming practices.
            </p>
            <div className="mt-8">
              <Link to="/shop" className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-md">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
