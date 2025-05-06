// import React from 'react';
// import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import { setRating } from '../redux/reviewSlice';

// const ReduxStarRating: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const rating = useAppSelector(state => state.review.currentRating);

//   const handleRatingChange = (newRating: number) => {
//     dispatch(setRating(newRating));
//   };

//   return (
//     <div className="flex items-center justify-center space-x-1">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <button
//           key={star}
//           type="button"
//           onClick={() => handleRatingChange(star)}
//           className="focus:outline-none"
//           aria-label={`Rate ${star} out of 5 stars`}
//         >
//           <span className={`text-4xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
//             ★
//           </span>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default ReduxStarRating;