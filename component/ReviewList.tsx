import ReviewItem from './ReviewItem';

interface Review {
  
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }
  return (
    <div>
      {reviews.map((review,index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  );
}
