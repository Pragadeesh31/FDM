
import React from 'react';
import PageBanner from '../components/PageBanner';

const ContactPage: React.FC = () => {
  return (
    <>
      <PageBanner title="Contact Us" breadcrumb="Contact" />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
            <p className="mt-3 text-gray-600">If you have any questions, feel free to reach out to us using the contact form below or through our email and phone number.</p>
            <form action="#" className="mt-8 space-y-6">
              <div>
                <input type="email" className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Your Email" />
              </div>
              <div>
                <input type="text" className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Phone Number" />
              </div>
              <div>
                <textarea className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" rows={6} placeholder="Your Message Here"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">Submit</button>
              </div>
            </form>
          </div>
          <div className="mt-10 md:mt-0">
             <div className="space-y-8">
                 <div className="flex items-start space-x-4">
                     <div className="bg-green-100 p-3 rounded-full">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                     </div>
                     <div>
                         <h3 className="text-xl font-bold">Email</h3>
                         <p className="text-gray-600">contact@fdmarket.com</p>
                         <p className="text-gray-600">info@fdmarket.com</p>
                     </div>
                 </div>
                 <div className="flex items-start space-x-4">
                     <div className="bg-green-100 p-3 rounded-full">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                     </div>
                     <div>
                         <h3 className="text-xl font-bold">Phone</h3>
                         <p className="text-gray-600">+91 12345 67890</p>
                         <p className="text-gray-600">+91 09876 54321</p>
                     </div>
                 </div>
                 <div className="flex items-start space-x-4">
                     <div className="bg-green-100 p-3 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                     </div>
                     <div>
                         <h3 className="text-xl font-bold">Address</h3>
                         <p className="text-gray-600">123 Main St, Farmers Digital Market</p>
                         <p className="text-gray-600">City, State, Country</p>
                     </div>
                 </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
