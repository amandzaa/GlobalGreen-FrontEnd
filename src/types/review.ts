// Review-related types
export interface Review {
    id?: string;
    rating: number;
    comment: string;
    productId?: string;
    createdAt?: string;
  }
  
  export interface ReviewState {
    currentRating: number;
    currentComment: string;
    feedbackMessage: string;
    isModalOpen: boolean;
    productName: string;
    submittedReviews: Review[];
    isSubmitting: boolean;
    submitError: string | null;
  }
  
  // Action types
  export enum ReviewActionTypes {
    SET_RATING = 'review/SET_RATING',
    SET_COMMENT = 'review/SET_COMMENT',
    OPEN_MODAL = 'review/OPEN_MODAL',
    CLOSE_MODAL = 'review/CLOSE_MODAL',
    SUBMIT_REVIEW_REQUEST = 'review/SUBMIT_REVIEW_REQUEST',
    SUBMIT_REVIEW_SUCCESS = 'review/SUBMIT_REVIEW_SUCCESS',
    SUBMIT_REVIEW_FAILURE = 'review/SUBMIT_REVIEW_FAILURE',
    RESET_FORM = 'review/RESET_FORM',
  }
