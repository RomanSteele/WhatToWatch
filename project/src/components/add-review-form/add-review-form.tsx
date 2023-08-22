import React, { useState } from "react";
import { STARS } from "../../const";

function AddReviewForm ():JSX.Element {

  const [ratingData, setRatingData] = useState(0);
  const [commentData, setCommentData] = useState('');


  const hanldeMouseClick = (id: number) => {
    setRatingData(id);
  };

  const handleCommentAdd = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const enteredComment = event.target.value;
    setCommentData(enteredComment);
  };

  const handleSubmit = () => {
    console.log({
          rating: ratingData,
          comment: commentData,
    })
      }



  return(
    <form action="#" className="add-review__form">
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
              <button onClick={()=> {handleSubmit()}} className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
  )
}

export default AddReviewForm
