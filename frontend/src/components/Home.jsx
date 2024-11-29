import React from 'react';
import Chatbot from './Chatbot';
import { Link } from 'react-router-dom';
const about = {
  Team: {
    FileTax: {
      name: 'File Taxes',
      info: 'Effortlessly file your taxes with our user-friendly platform.',
    },
    CTO: {
      name: 'Calculate Taxes',
      info: 'Accurate and advanced tax calculator for all your financial needs.',
    },
    ChatBot: {
      name: 'Chatbot',
      info: 'Our AI-powered chatbot provides instant answers to your tax queries.',
    },
    TaxAlerts: {
      name: 'Tax Alerts',
      info: 'Stay updated with the latest tax laws and regulations.',
    },
  },
};

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <img
          src="/assets/taxes.jpg"
          alt="Tax Services"
          className="object-cover w-full h-80 md:h-96 brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Simplify Your Tax Filing Process
          </h1>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="bg-gray-50 text-center py-12 px-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          India’s Largest Tax and Financial Services Platform
        </h1>
        <p className="text-lg text-gray-600">
          Experience hassle-free tax filing, advanced calculators, and personalized assistance to
          simplify your finances.
        </p>
        <Link to ="/filetaxes"><button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
          Get Started
        </button></Link>
      </div>

      {/* Our Services Section */}
      <div className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto max-w-7xl">
          {Object.values(about.Team).map((service) => (
            <div
              key={service.name}
              className="bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <img
                src="./assets/logo.jpg"
                alt={`${service.name} Icon`}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                {service.name}
              </h3>
              <p className="text-gray-600 text-center mt-2">{service.info}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-7xl">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Simplified Tax Solutions
            </h3>
            <p className="text-gray-600">
              File taxes easily with our streamlined platform and intuitive tools.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Advanced Tools
            </h3>
            <p className="text-gray-600">
              Use cutting-edge features like tax calculators and automated alerts.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Expert Support
            </h3>
            <p className="text-gray-600">
              Get personalized guidance from industry professionals.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-5xl text-center">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="text-lg mt-2">taxease@gmail.com</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold">Phone</h3>
            <p className="text-lg mt-2">+91 9999999999</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold">Address</h3>
            <p className="text-lg mt-2">
              TaxEase Pvt. Ltd., 123 Tax Avenue, New Delhi, India.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-indigo-200">Facebook</a>
            <a href="#" className="hover:text-indigo-200">Twitter</a>
            <a href="#" className="hover:text-indigo-200">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Chatbot Integration */}
      <Chatbot />
    </div>
  );
};

export default Home;
