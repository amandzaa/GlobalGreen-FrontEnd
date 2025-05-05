// import React from "react";
// import { NextPage } from "next";
// import { useRouter } from "next/router";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { openModal } from "../../redux/reviewSlice";
// import ReduxReviewModal from "@/component/modal/ReviewModal";

// const ProductPage: NextPage = () => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { id } = router.query;
//   const productId = id as string;

//   // Get the submitted reviews for this product
//   const submittedReviews = useAppSelector((state) =>
//     state.review.submittedReviews.filter(
//       (review) => review.productId === productId
//     )
//   );

//   const handleOpenReviewModal = () => {
//     dispatch(openModal("eSIM activation"));
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Product Details</h1>

//       <div className="mb-8">
//         <p className="mb-4">Product ID: {productId}</p>
//         <p className="mb-4">
//           This is the product description. It provides detailed information
//           about this specific product and its features. Users can read this to
//           understand what the product offers before making a purchase decision.
//         </p>

//         <button
//           onClick={handleOpenReviewModal}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Rate this product
//         </button>
//       </div>

//       {/* Show the reviews for this product */}
//       {submittedReviews.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
//           <div className="space-y-4">
//             {submittedReviews.map((review) => (
//               <div key={review.id} className="border p-4 rounded-md">
//                 <div className="flex items-center mb-2">
//                   <div className="text-yellow-400 mr-2">
//                     {"★".repeat(review.rating)}
//                     <span className="text-gray-300">
//                       {"★".repeat(5 - review.rating)}
//                     </span>
//                   </div>
//                   <span className="text-sm text-gray-500">
//                     {new Date(review.createdAt || "").toLocaleDateString()}
//                   </span>
//                 </div>
//                 <p className="text-gray-700">{review.comment}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* The review modal component */}
//       <ReduxReviewModal productId={productId} />
//     </div>
//   );
// };

// export default ProductPage;
