import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { sendUpdateMail } from "../utils/emailService.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing); 
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler(404, 'Listing not found'))
    }
    
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401, 'You can only delete your own listings!'))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id); 
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error);
    }
}

export const updateListing = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      
      if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
      }
  
      // Ensure only the owner can update their listing
      if (req.user.id !== listing.userRef.toString()) {
        return next(errorHandler(401, 'You can only update your own listings!'));
      }
  
      // Fetch emails of users who have saved this listing without modifying the savedBy array
      if (listing.savedBy.length > 0) {
        const savedUsers = await User.find({ _id: { $in: listing.savedBy } }).select('email').lean();
  
        // Send update emails to each user
        await Promise.all(
          savedUsers.map((user) => sendUpdateMail(user.email, listing))
        );
      }
  
      // Update the listing
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      res.status(200).json(updatedListing);
    } catch (error) {
      next(error);
    }
  };

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found'))
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

export const getListings = async (req, res, next) => {
    try {
        
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;

        if(offer === undefined || offer === 'false'){
            offer = { $in: [false, true]};
        }

        let furnished = req.query.furnished;
        if(furnished === undefined || furnished === 'false'){
            furnished = { $in: [false, true]};
        }

        let parking = req.query.parking;

        if(parking === undefined || parking === 'false'){
            parking = { $in: [false, true]};
        }

        let type = req.query.type;

        if(type === undefined || type === 'all'){
            type = { $in: ['sale', 'rent']};
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer, 
            furnished, 
            parking,
            type,
        }).sort(
            {[sort]: order}
        ).limit(limit).skip(startIndex);

        res.status(200).json(listings);

    } catch (error) {
        next(error);
    }
}

export const addSaveHome = async (req, res, next) => {
    try {
        const { homeId, userId } = req.body;

        if (!homeId || !userId) {
            return next(errorHandler(400, "Invalid request body"));
        }

        const listing = await Listing.findById(homeId);
        const user = await User.findById(userId);

        if (!listing) return next(errorHandler(404, "Listing doesn't exist"));
        if (!user) return next(errorHandler(404, "User not found"));

        const isAlreadySaved = listing.savedBy.includes(userId) && user.savedHomes.includes(homeId);
        if (isAlreadySaved) {
            return res.status(200).json({ message: "Property is already marked in savedHomes", success: true });
        }

        if (!listing.savedBy.includes(userId)) listing.savedBy.push(userId);
        if (!user.savedHomes.includes(homeId)) user.savedHomes.push(homeId);

        await Promise.all([listing.save(), user.save()]);
        return res.status(200).json({ message: "Property has been successfully saved", success: true});
    } catch (error) {
        next(error);
    }
};


export const removeHome = async(req, res, next) => {
    try {
        const { homeId, userId } = req.body;

        const listing = await Listing.findById(homeId);
        const user = await User.findById(userId);

        console.log(`backend m remove krte time homeId aa rhi h: ${homeId} and userId aa rhi h: ${userId}`);

        if(!listing) return next(errorHandler(404,`Listing doesn't exist`));
        if(!user) return next(errorHandler(404, `user doesn't exist`));

        const isAlreadySaved = listing.savedBy.includes(userId) && user.savedHomes.includes(homeId);
        if(!isAlreadySaved){
            return res.status(200).json({message: "Property is already not saved in savedHomes"})
        }

        listing.savedBy = listing.savedBy.filter(
            (savedUser) => savedUser.toString() !== req.body.userId.toString()
        )
        

        user.savedHomes = user.savedHomes.filter(
            (home) => home.toString() !== req.body.homeId.toString()
        )
        await Promise.all([listing.save(), user.save()]);
        return res.status(200).json({
            message: "Property has been successfully removed",
            success: true
        });
    } catch (error) {
        next(error);
    }
}


export const getSavedHomes = async(req, res) => {
    const userId  = req.query.userId;
    console.log("backend m userid jo aa rhi h vo h", userId);
    const user = await User.findById(userId)
                    .populate('savedHomes');

    if(!user) 
        return res.status(404).json({
            success: false, 
            message: 'User not found'
        });

    const savedHomes = user.savedHomes;

    return res.status(200).json({
        success: true,
        message: "savedHomes listing fetched successfully",
        savedHomes
    })
}

export const getCompareHomes = async(req, res) => {
    const userId = req.query.userId;
    console.log("backend of compare page user id coming is", userId);
    const user = await User.findById(userId)
                            .populate('compareHomes');

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const compareHomes = user.compareHomes;

    return res.status(200).json({
        success: true,
        message: "compareHomes data fetched successfully",
        compareHomes
    })
}

export const addCompareHome = async(req, res) => {
    const { userId, homeId } = req.body;

    const user = User.findById(userId);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "user not found"
        })
    }

    const isAlreadyAdded = user.compareHomes.includes(homeId)
    if(isAlreadyAdded){
        res.status(200).json({
            success: true,
            message: "added to compare"
        })
    }

    user.compareHomes.push(homeId);
    await Promise(user.save());
    return res.status(200).json({
        success: true, 
        message: "added to compare",
    })
}

export const removeCompareHome = async(req, res) => {

    const { userId, homeId } = req.body;

    const user = user.findById(userId);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "user not found"
        })
    }

    const isAlreadyIncludes = user.compareHomes.includes(homeId);
    if(!isAlreadyIncludes){
        return res.status(200).json({
            success: true,
            message: "already not present"
        })
    }

    user.compareHomes = user.compareHomes.filter(
        (home) => home.toString() !== homeId.toString()
    )

    await Promise(user.save());

    return res.status(200).json({
        success: true,
        message: "home removed from compareHomes"
    })
}