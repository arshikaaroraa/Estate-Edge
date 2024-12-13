import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import {Navigation} from 'swiper/modules';
import SwiperCore from 'swiper';
import ListingItem from '../components/ListingItem';
import videoFile from "../assets/7578543-hd_1280_720_30fps.mp4";
import Footer from "../components/Footer";
import saleimg from "../assets/saleimg.jpeg";
import rentimg from "../assets/rentimg.jpeg";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [expandedSections, setExpandedSections] = useState([]);
  SwiperCore.use([Navigation])

  // console.log(saleListings)
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json(); 
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, []);

  const toggleSection = (sectionIndex) => {
    setExpandedSections((prevState) => {
      if (prevState.includes(sectionIndex)) {
        return prevState.filter((idx) => idx !== sectionIndex);
      } else {
        return [...prevState, sectionIndex];
      }
    });
  };
  const faqSections = [
    {
      question: "What is EstateEdge and how does it work?",
      answer:
        "EstateEdge is a platform for discovering and booking tranquil properties in woodland settings. From weekend getaways to permanent retreats, it connects you with nature-filled accommodations.",
    },
    {
      question: "How do I use search filters?",
      answer:
        "Search filters let you refine your results by location, amenities, price range, and more. Use filters for specifics like pet-friendly homes, proximity to hiking trails, or fireplace options.",
    },
    {
      question: "Are the properties pet-friendly?",
      answer:
        "Yes, many properties listed are pet-friendly. Use search filters to find properties that allow pets and check the property details for specific policies.",
    },
    {
      question: "What types of properties can I find?",
      answer:
        "You can find a range of woodland properties including cabins, cottages, chalets, and lodges. Whether you need a romantic retreat or a family getaway, there’s something for everyone.",
    },
  ];
  return (
    <div>
      {/* Top section with video */}
      <div className="relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-h-[800px] object-cover"
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="text-center text-white mt-3">
            <h2 className="text-5xl font-normal mb-4 uppercase">
              FIND YOUR PERFECT SPACE – BUY, RENT, LIVE
            </h2>
            <p className="text-xl mb-8">
              Your new address is closer than you think – explore curated
              listings for sale and rent with Estate Edge.
            </p>
            <Link
              to="/search"
              className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition-colors duration-300"
            >
              Find My Perfect Space
            </Link>
          </div>
        </div>
      </div>

      {/* Buy or Rent section with images */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {/* Sale Section */}
        <div id="featured-properties" className="flex items-center">
        <div className="w-1/2 h-72 overflow-hidden relative">
            <img
              src={saleimg}
              alt="Explore Sale"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-70 rounded-xl transition-opacity duration-500 ease-in-out hover:opacity-100"
            />
          </div>
          {/* Content Section (on the left) */}
          <div className="w-1/2 pr-12 ml-auto text-right">
  <h3 className="text-3xl font-semibold text-gray-800 mb-4">
    Buy Your Dream Home
  </h3>
  <p className="text-lg text-gray-600 mb-6 ">
    Open new Door with estate edge.
  </p>
  <Link
    to="/search?type=sale"
    className="bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-700 transition-colors duration-300 inline-block"
  >
    Explore for Sale
  </Link>
</div>

          
          {/* Image Section (on the right) */}
          
        </div>


        {/* Rent Section */}
        <div className="flex flex-row items-center ">
          {/* Content Section */}
          <div className="w-1/2 pr-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Rent Your Perfect Escape
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Elevate your experience-EstateEdge Has the Answer.
            </p>
            <Link
              to="/search?type=rent"
              className="bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-700 transition-colors duration-300 inline-block"
            >
              Explore for Rent
            </Link>
          </div>

          {/* Image Section */}
          <div className="w-1/2 h-72 overflow-hidden relative">
            <img
              src={rentimg}
              alt="Explore Rent"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-70 rounded-xl transition-opacity duration-500 ease-in-out hover:opacity-100"
            />
          </div>
        </div>

        {/* Recent Listings (Offers, Rent, Sale) */}
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-6 text-center">
              <h2 className="text-5xl font-medium uppercase text-slate-700">
                Featured Properties
              </h2>
              <p className="text-lg text-slate-500 mt-2">
                Elevate your experience - browse below listings
              </p>
              <Link
                className="text-sm text-blue-800 hover:underline mt-2 inline-block"
                to={"/search?offer=true"}
              >
                Have a look at listings
              </Link>
            </div>

            <div className="flex flex-wrap gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Rent Listings */}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Places for Rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Sale Listings */}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Places for Sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqSections.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <button
                  className="flex justify-between items-center w-full text-left font-medium text-lg text-gray-800"
                  onClick={() => toggleSection(index)}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transform transition-transform ${
                      expandedSections.includes(index) ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {expandedSections.includes(index) && (
                  <div className="mt-4 text-gray-700">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
