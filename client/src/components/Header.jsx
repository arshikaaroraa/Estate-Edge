import { FaSearch, FaUserCircle, FaHome } from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Logo from "../assets/logo.webp";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  
  const scrollToFeaturedProperties = () => {
    const element = document.getElementById('featured-properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className='bg-slate-100 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto px-3 py-4'>
        {/* Logo Section */}
        <Link to="/">
          <h1 className="font-bold text-2xl flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="h-10 w-10" />
            <div className="flex flex-col">
              <div className="flex space-x-1">
                <span className="text-slate-500">Estate</span>
                <span className="text-slate-700">Edge</span>
              </div>
              <h6 className="text-xs text-slate-500 mt-1 font-normal">Find your dream space with an edge</h6>
            </div>
          </h1>
        </Link>

        {/* Navigation and Search Section */}
        <div className='flex items-center space-x-6'>
          {/* Navigation Links */}
          <nav className='flex items-center'>
  <ul className='flex gap-8'>
    {/* <Link to='/'>
      <li className='relative text-slate-700 hover:text-slate-500 transition-all duration-300'>
        HOME SEARCH
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
      </li>
    </Link> */}

    <Link to='/' onClick={scrollToFeaturedProperties}>
      <li className='relative text-slate-700 hover:text-slate-500 transition-all duration-300'>
        FEATURED PROPERTIES
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
      </li>
    </Link>

    <Link to='/about'>
      <li className='relative text-slate-700 hover:text-slate-500 transition-all duration-300'>
        ABOUT US
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
      </li>
    </Link>
  </ul>
</nav>
<Link to='/saved-homes'>
                <li className='text-slate-700 hover:text-slate-500 transition-colors duration-300 flex items-center'>
                 {/*<FaHome className='mr-1 text-slate-700' /> */} SAVED HOMES
                </li>
              </Link>


          {/* Search Bar */}
          <form
            className='bg-white rounded-lg flex items-center shadow-md mt-3'
            onSubmit={handleSubmit}
          >
            <div className="flex items-center border border-gray-300 w-full max-w-md bg-slate-500">
              <input
                type="text"
                placeholder="Search..."
                className="relative block w-full min-w-0 flex-auto border border-solid border-neutral-300 bg-transparent px-3 py-2 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-blue-500 focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search"
                required
              />
              <button
                className="relative z-[2] border-2 border-slate-500 bg-slate-500 px-6 py-2 text-xs font-medium uppercase text-white transition duration-300 ease-in-out transform hover:bg-slate-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 h-full"
                type="submit"
                id="button-addon3"
              >
                <span className="font-semibold">Search</span>
              </button>
            </div>

          </form>

          {/* Profile Section */}
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-12 w-15 object-cover border-2 border-blue-500 hover:shadow-lg transition-all duration-300'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <FaUserCircle className='text-slate-600 text-3xl hover:text-slate-500 transition-colors duration-300 cursor-pointer' />
            )}
          </Link>

        </div>
      </div>
    </header>
  );
}

export default Header;



