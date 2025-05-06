// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { Review } from "../types/review";
// import {
//   submitReviewRequest,
//   submitReviewSuccess,
//   submitReviewFailure,
// } from "./reviewSlice";
// import { AppDispatch, RootState } from "./store";

// // Async thunk to submit a review
// export const submitReview = createAsyncThunk<
//   void,
//   { productId: string },
//   { dispatch: AppDispatch; state: RootState }
// >("review/submitReview", async ({ productId }, { dispatch, getState }) => {
//   try {
//     const { review } = getState();
//     const { currentRating, currentComment } = review;

//     // Don't submit if rating is not set
//     if (currentRating === 0) {
//       throw new Error("Please select a rating");
//     }

//     dispatch(submitReviewRequest({ productId }));

//     // Create the review object
//     const newReview: Review = {
//       rating: currentRating,
//       comment: currentComment,
//       productId,
//       createdAt: new Date().toISOString(),
//     };

//     // Here you would normally make an API call to submit the review
//     // For example:
//     // const response = await fetch('/api/reviews', {
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify(newReview),
//     // });
//     // if (!response.ok) throw new Error('Failed to submit review');
//     // const savedReview = await response.json();

//     // For this example, we'll just simulate an API call with a timeout
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     // Add an ID to simulate a response from the server
//     const savedReview: Review = {
//       ...newReview,
//       id: `review-${Date.now()}`,
//     };

//     dispatch(submitReviewSuccess(savedReview));
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Failed to submit review";
//     dispatch(submitReviewFailure(errorMessage));
//     throw error;
//   }
// });
