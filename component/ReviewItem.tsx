import StarRating from './StarRating';

interface Review {
 
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewItemProps {
  review: Review;
}


export default function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="border-b p-4 border-8">
      <div className="flex items-center justify-between border-2 p-2">
        <span className="font-semibold text-amber-200">{review.name}</span>
        <span className=" text-white text-sm">{review.date}</span>
      </div>
      <div className="flex items-center mt-1">
        <StarRating rating={review.rating} />
        <span className="ml-2">{review.rating}/5</span>
      </div>
      <p className="mt-2 text-white ">{review.comment}</p>
    </div>
  );
}
