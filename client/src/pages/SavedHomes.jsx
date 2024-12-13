import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeSavedHomeAsync } from "../redux/savedHomes/savedHomesSlice"; // Path adjust kar lena
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const SavedHomesPage = () => {
  const [savedHome, setSavedHome ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,  setError] = useState(false);
  const { currentUser } = useSelector((state)=>state.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchListing = async() => {
      try{
        setLoading(true);
        console.log("savedHome vale page pr userid is ", currentUser._id);
        const res = await fetch(`/api/listing/getSavedHomes?userId=${currentUser._id}`);
        const data = await res.json();
        if(data.success == false){
          setError(true);
          setLoading(false);
          return;
        }
        
        setSavedHome(data.savedHomes);
        console.log("savedHome ka data is 😝😝😝😝😝😝", savedHome);
        setLoading(false);
        setError(false);
      }
      catch(error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchListing();
  },[]);

//   // Remove home handler
  // const handleRemove = (homeId) => {
  //   const userId = "userId"; // Replace with actual user ID logic
  //   dispatch(removeSavedHomeAsync(homeId, userId));
  // };

  if (loading) {
    return <p>Loading saved homes...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {
        savedHome && savedHome.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Your Saved Properties</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                  Add more Properties
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  savedHome.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
      }
    </div>
  );
};

export default SavedHomesPage;
