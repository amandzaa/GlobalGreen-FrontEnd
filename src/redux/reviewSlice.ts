import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Review, ReviewState } from "@/types/review";

const initialState: ReviewState = {
  currentRating: 0,
  currentComment: "",
  feedbackMessage: "",
  isModalOpen: false,
  productName: "",
  submittedReviews: [],
  isSubmitting: false,
  submitError: null,
};

// Helper function to generate feedback message based on rating
const getFeedbackMessage = (rating: number): string => {
  if (rating === 0) {
    return "";
  } else if (rating <= 2) {
    return "We're sorry to hear that. Please let us know how we can improve.";
  } else if (rating === 3) {
    return "Average, need improvements!";
  } else {
    return "Amazing experience! Love it!";
  }
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<number>) => {
      state.currentRating = action.payload;
      state.feedbackMessage = getFeedbackMessage(action.payload);
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.currentComment = action.payload;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.isModalOpen = true;
      state.productName = action.payload;
      // Reset form when opening modal
      state.currentRating = 0;
      state.currentComment = "";
      state.feedbackMessage = "";
      state.submitError = null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    submitReviewRequest: (
      state,
      { payload }: PayloadAction<{ productId: string }>
    ) => {
      state.isSubmitting = true;
      state.submitError = null;
    },
    submitReviewSuccess: (state, { payload }: PayloadAction<Review>) => {
      state.submittedReviews.push(payload);
      state.isSubmitting = false;
      state.isModalOpen = false;
      // Reset form after successful submission
      state.currentRating = 0;
      state.currentComment = "";
      state.feedbackMessage = "";
    },
    submitReviewFailure: (state, { payload }: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.submitError = payload;
    },
    resetForm: (state) => {
      state.currentRating = 0;
      state.currentComment = "";
      state.feedbackMessage = "";
      state.submitError = null;
    },
  },
});

export const {
  setRating,
  setComment,
  openModal,
  closeModal,
  submitReviewRequest,
  submitReviewSuccess,
  submitReviewFailure,
  resetForm,
} = reviewSlice.actions;

export default reviewSlice.reducer;