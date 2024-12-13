// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore from 'swiper';
// import { useSelector } from 'react-redux';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css/bundle';
// import {
//   FaBath,
//   FaBed,
//   FaChair,
//   FaMapMarkedAlt,
//   FaMapMarkerAlt,
//   FaParking,
//   FaShare,
// } from 'react-icons/fa';
// import Contact from '../components/Contact';
// // import Contact from '../components/Contact';

// // https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

// export default function Listing() {
//   SwiperCore.use([Navigation]);
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [contact, setContact] = useState(false);
//   const params = useParams();
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/listing/get/${params.listingId}`);
//         const data = await res.json();
//         if (data.success === false) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         setListing(data);
//         setLoading(false);
//         setError(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [params.listingId]);

//   return (
//     <main>
//       {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
//       {error && (
//         <p className='text-center my-7 text-2xl'>Something went wrong!</p>
//       )}
//       {listing && !loading && !error && (
//         <div>
//           <Swiper navigation>
//             {listing.imageUrls.map((url) => (
//               <SwiperSlide key={url}>
//                 <div
//                   className='h-[550px]'
//                   style={{
//                     background: `url(${url}) center no-repeat`,
//                     backgroundSize: 'cover',
//                   }}
//                 ></div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//           <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
//             <FaShare
//               className='text-slate-500'
//               onClick={() => {
//                 navigator.clipboard.writeText(window.location.href);
//                 setCopied(true);
//                 setTimeout(() => {
//                   setCopied(false);
//                 }, 2000);
//               }}
//             />
//           </div>
//           {copied && (
//             <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
//               Link copied!
//             </p>
//           )}
//           <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
//             <p className='text-2xl font-semibold'>
//               {listing.name} - ${' '}
//               {listing.offer
//                 ? listing.discountPrice.toLocaleString('en-US')
//                 : listing.regularPrice.toLocaleString('en-US')}
//               {listing.type === 'rent' && ' / month'}
//             </p>
//             <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
//               <FaMapMarkerAlt className='text-green-700' />
//               {listing.address}
//             </p>
//             <div className='flex gap-4'>
//               <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
//                 {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
//               </p>
//               {listing.offer && (
//                 <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
//                   ${+listing.regularPrice - +listing.discountPrice} OFF
//                 </p>
//               )}
//             </div>
//             <p className='text-slate-800'>
//               <span className='font-semibold text-black'>Description - </span>
//               {listing.description}
//             </p>
//             <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaBed className='text-lg' />
//                 {listing.bedrooms > 1
//                   ? `${listing.bedrooms} beds `
//                   : `${listing.bedrooms} bed `}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaBath className='text-lg' />
//                 {listing.bathrooms > 1
//                   ? `${listing.bathrooms} baths `
//                   : `${listing.bathrooms} bath `}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaParking className='text-lg' />
//                 {listing.parking ? 'Parking spot' : 'No Parking'}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaChair className='text-lg' />
//                 {listing.furnished ? 'Furnished' : 'Unfurnished'}
//               </li>
//             </ul>
//             {currentUser && listing.userRef !== currentUser._id && !contact && (
//               <button
//                 onClick={() => setContact(true)}
//                 className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
//               >
//                 Contact landlord
//               </button>
//             )}
//             {contact && <Contact listing={listing}/>}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }  

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaHeart,  // Import the heart icon
  FaRegHeart, // Import the empty heart icon
} from 'react-icons/fa';
import Contact from '../components/Contact';
import { addSavedHomeAsync, removeSavedHomeAsync } from '../redux/savedHomes/savedHomesSlice'; // Import async actions

export default function Listing() {
  SwiperCore.use([Navigation]);
  const userdata = useSelector((state)=>state.user.currentUser);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [saved, setSaved] = useState(false);
  const params = useParams();
  const dispatch = useDispatch(); // Initialize dispatch
  const { currentUser } = useSelector((state) => state.user);
  const { savedHomes } = useSelector((state) => state.savedHomes); // Access saved homes from Redux

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        console.log(data, "       😎😎😎😎😎😎😎😎", userdata);
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        if(data.savedBy.includes(userdata._id)){
          setSaved(true);
        }
        setListing(data);
        console.log(`backend se jo data aaya listing ka ${data}`);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  // Check if the listing is saved
  const isSaved = savedHomes.some((home) => home === params.listingId);

  useEffect(() => {
    if (listing) { 
      console.log(`useeffect ke andr jb bhi page reload ho rhaa hoga`);
      const isSaved = savedHomes.some((home) => home === params.listingId);
      console.log("Is this listing saved?", isSaved);
      setSaved(isSaved);
    }
  }, [listing, savedHomes]);
  const handleSaveToggle = () => {
    console.log("we are in handle toggele ands the user data is:, ",userdata);

    if (saved) {
      console.log(`remove kr rha h`);
      dispatch(removeSavedHomeAsync(params.listingId, userdata._id));  // Remove saved home
      setSaved(!saved);
      console.log(`remove ho chuka h`);
    } else {
      console.log(`add kr rha h `);
      dispatch(addSavedHomeAsync(params.listingId, userdata._id));  // Add saved home
      setSaved(!saved);
    }
  };

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <div className="flex justify-between items-center">
              <p className='text-2xl font-semibold'>
                {listing.name} - ${' '}
                {listing.offer
                  ? listing.discountPrice.toLocaleString('en-US')
                  : listing.regularPrice.toLocaleString('en-US')}
                {listing.type === 'rent' && ' / month'}
              </p>
              {/* Heart button for saving/removing home */}
              <button
                onClick={handleSaveToggle}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 flex items-center justify-center'>
                {saved ? (
                  <FaHeart className='text-white' size={24} />  // Filled heart for saved
                ) : (
                  <FaRegHeart className='text-white' size={24} />  // Empty heart for not saved
                )}
              </button>
            </div>
            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing}/>}
          </div>
        </div>
      )}
    </main>
  );
}