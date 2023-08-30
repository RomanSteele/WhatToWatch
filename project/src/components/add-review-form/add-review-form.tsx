import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../store";
import { useAppSelector } from "../../hooks";
import { addMovieReview } from "../../store/api-actions";
import { addReview } from "../../types/add-review";
import { AppRoute, CommentLength, STARS, StarsStart } from "../../const";


type AddReviewFormProps = {
  movieId: number,
}

function AddReviewForm ({ movieId } : AddReviewFormProps):JSX.Element {

  const navigate = useNavigate();

  const [ratingData, setRatingData] = useState(0);
  const [commentData, setCommentData] = useState('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const { isLoading } = useAppSelector(({ ACTION }) => ACTION);


  const hanldeMouseClick = (id: number) => {
    setRatingData(id);
  };

  const handleCommentAdd = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const enteredComment = event.target.value;
    setCommentData(enteredComment);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const sendOnSubmit = ({ id, comment, rating }: addReview) => {
      store.dispatch(addMovieReview({ id, comment, rating }));

    };

    if ( !isDisabled ) {
      sendOnSubmit(
        {
          id: movieId,
          rating: ratingData,
          comment: commentData,
        });
    }
    navigate(`${AppRoute.Movie}/${movieId}`)
  };

  useEffect (() => {
    setIsDisabled(
      ratingData === StarsStart.start ||
      commentData.length < CommentLength.Min ||
      commentData.length > CommentLength.Max,
    );
  }, [ ratingData, commentData ]);


  return(
    <form onSubmit={handleSubmit} action="#" className={` ${isLoading ? 'add-review__form' : 'add-review__form-disabled'}`}>
          <div className="rating">
            <div className="rating__stars">

    {STARS.map((item) => (
      <React.Fragment key={item.id}>
        <input onClick={() => {hanldeMouseClick(item.id);}}  className="rating__input" id={`star-${item.id}`} type="radio" name="rating" value={item.id}/>
        <label className="rating__label" htmlFor={`star-${item.id}`}>Rating {item.id}</label>
      </React.Fragment>
    ))}
            </div>

          </div>

          <div className="add-review__text">
            <textarea onChange={handleCommentAdd} value={commentData} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text">{commentData}</textarea>
            <div className="add-review__submit">
              <button disabled={isDisabled|| isLoading} className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
  )
}

export default AddReviewForm
