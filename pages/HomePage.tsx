
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/herobg/1920/1080')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold font-montserrat leading-tight drop-shadow-lg">
            Welcome to <br /> Farmers D-Market
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow-md">
            Your one-stop shop for fresh and organic produce directly from local farmers. Experience the taste of nature with our wide selection of fruits, vegetables, dairy products, and more.
          </p>
          <Link
            to="/shop"
            className="mt-8 px-8 py-4 bg-green-600 text-white font-bold rounded-lg text-lg hover:bg-green-700 transition-transform duration-300 hover:scale-105 shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
