import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImageUrl from '../assets/about-bg.jpg';

const About = () => {
  return (
    <div className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 text-center text-white px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">The EstateEdge Community</h2>
        <p className="text-lg mb-4">
          EstateEdge is more than just about finding a home. It's about discovering a community that aligns with your lifestyle. We know that buying a property is a big decision, and it’s important to feel connected to the area you're moving to.
        </p>
        <p className="text-lg mb-4">
          The EstateEdge is one of the most exceptional places to live, and we're here to help you experience all that it has to offer. Our team of experienced Realtors lives the local lifestyle every day, from exploring neighborhood spots to attending local events.
        </p>
        <p className="text-lg mb-4">
          Through our Realtors, you’ll get a unique insider's perspective on the community. Whether it’s finding the best local dining spots or knowing about upcoming festivals, we ensure that you feel a true connection to the area.
        </p>
        <p className="text-lg mb-8">
          At EstateEdge, we believe that buyers first need to find a community they love, and then a home that fits their needs. Our agents are here to guide you and make you feel right at home in the EstateEdge.
        </p>
        <Link to="/search" className="inline-block bg-green-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors">
          Explore Properties
        </Link>
      </div>
    </div>
  );
};

export default About;
