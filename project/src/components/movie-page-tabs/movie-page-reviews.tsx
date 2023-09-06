import { Review } from "../../types/review";
import SingleReview from "../single-review/single-review";

type MoviePageReviewsProps = {
  reviews: Review[];
}

function MoviePageReviews({ reviews }: MoviePageReviewsProps): JSX.Element {

  const sortedReviews = reviews.slice().sort((a, b) => (a.rating > b.rating) ? -1 : 1);

  const middleIndex = Math.floor(sortedReviews.length / 2);

  const firstHalf = sortedReviews.slice(0, middleIndex);
  const secondHalf = sortedReviews.slice(middleIndex);

  const firstHalfRendered = firstHalf.map((item) => (
    <SingleReview review={item} key={item.id} />
  ));

  const secondHalfRendered = secondHalf.map((item) => (
    <SingleReview review={item} key={item.id} />
  ));

  return (
    reviews.length<1
    ?
    <div className="film-card__reviews film-card__row">
      <h2 style={{color:"#150101"}}>No reviews yet!</h2>
      </div>
    :
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {firstHalfRendered}
      </div>

      <div className="film-card__reviews-col">
        {secondHalfRendered}
      </div>
    </div>
  );
}

export default MoviePageReviews;
