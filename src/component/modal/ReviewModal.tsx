// import React from "react";
// import { XCircle } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { setComment, closeModal } from "../../redux/reviewSlice";
// import { submitReview } from "../../redux/reviewThunks";
// import ReduxStarRating from "../StarRating";

// interface ReduxReviewModalProps {
//   title?: string;
//   subtitle?: string;
//   productId: string;
// }

// const ReduxReviewModal: React.FC<ReduxReviewModalProps> = ({
//   title = "Rate your experience!",
//   subtitle = "We love to hear from you! How's your experience with the",
//   productId,
// }) => {
//   const dispatch = useAppDispatch();
//   const {
//     isModalOpen,
//     currentRating,
//     currentComment,
//     feedbackMessage,
//     productName,
//     isSubmitting,
//     submitError,
//   } = useAppSelector((state) => state.review);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (currentRating > 0) {
//       dispatch(submitReview({ productId }));
//     }
//   };

//   const handleClose = () => {
//     dispatch(closeModal());
//   };

//   if (!isModalOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50"
//         onClick={handleClose}
//       ></div>
//       <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md relative z-10">
//         <button
//           onClick={handleClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//           aria-label="Close"
//         >
//           <XCircle size={20} />
//         </button>

//         <div className="text-center mb-6">
//           <h2 className="text-xl font-semibold mb-2">
//             {title} <span className="text-yellow-500">👋</span>
//           </h2>
//           <p className="text-gray-600">
//             {subtitle}{" "}
//             <span className="text-blue-500 font-medium">{productName}</span>?
//           </p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="flex justify-center mb-4">
//             <ReduxStarRating />
//           </div>

//           {feedbackMessage && (
//             <p className="text-center mb-4 text-sm text-gray-600">
//               {feedbackMessage}
//             </p>
//           )}

//           {submitError && (
//             <p className="text-center mb-4 text-sm text-red-600">
//               {submitError}
//             </p>
//           )}

//           <div className="mb-4">
//             <textarea
//               placeholder="Any comment for us?"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows={4}
//               value={currentComment}
//               onChange={(e) => dispatch(setComment(e.target.value))}
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             disabled={currentRating === 0 || isSubmitting}
//             className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? "Submitting..." : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReduxReviewModal;
