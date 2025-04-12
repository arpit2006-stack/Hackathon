import Apply from "../models/nominee.model.js";
import {sendStatusUpdateEmail} from "../utils/statusSender.js";

export const show = async (req, res, next) => {
  const { post } = req.params;
  
  try {
    const candidates = await Apply.find({ post: post }) // Explicitly use post parameter
      .select("name email contactNo post agenda status _id ssamt")
      // .lean();

    console.log(`Found ${candidates.length} candidates for post:`, post); // Debug log

    res.status(200).json({ 
      success: true,
      candidates // Changed from 'info' to match frontend expectation
    });
    
  } catch (error) {
    console.error("Error in show controller:", error);
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedCandidate = await Apply.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select("name email post status _id");

    if (!updatedCandidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }

    // Send email notification
    await sendStatusUpdateEmail(updatedCandidate, status);

    res.status(200).json({
      success: true,
      candidate: updatedCandidate,
      message: `Status updated and notification sent to ${updatedCandidate.email}`
    });

  } catch (error) {
    console.error("Status update error:", error);
    
    // Check if email failed but status was updated
    // if (updatedCandidate) {
    //   error.message = `Status updated but email failed: ${error.message}`;
    // }
    
    next(error);
  }
};