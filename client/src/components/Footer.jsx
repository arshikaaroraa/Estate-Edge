import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Logo from '../assets/logo.webp'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Logo and Company Info */}
          <div className="mb-6 md:mb-0">
            <img src={Logo} alt="Logo" className="w-40 mb-4" />
            <p className="text-gray-400">
              EstateEdge offers premium real estate marketing services for realtors, brokers, and property owners.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Services</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2">Digital Marketing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2">SEO Optimization</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2">Social Media Strategy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2">Website Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2">Real Estate Branding</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info and Social Media */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-4">Email: support@EstateEdge.com</p>
            <p className="text-gray-400 mb-4">Phone: +1 234 567 890</p>

            <div className="flex space-x-6 mt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6">
          <div className="flex justify-between items-center">
            <div className="text-gray-400">
              <p>© 2024 EstateEdge, Inc. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
              >
                Sitemap
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
              >
                Company Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
