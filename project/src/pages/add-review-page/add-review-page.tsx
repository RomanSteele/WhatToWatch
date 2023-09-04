import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { store } from "../../store";
import { fetchCurrentMovieAction } from "../../store/api-actions";
import AddReviewForm from "../../components/add-review-form/add-review-form";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import Logo from "../../components/logo/logo";
import Userblock from "../../components/user-block/user-block";


function AddReviewPage(): JSX.Element {

  const params = useParams();
  const movieId = Number(params.id);

  const { currentMovie } = useAppSelector(({DATA})=> DATA)

  const {  name, posterImage, backgroundImage } = currentMovie;

  useEffect (() => {
    if (params.id) {
      store.dispatch(fetchCurrentMovieAction(movieId));
    }
  }, [params.id]);


  return (
  <section className="film-card film-card--full">

    <Helmet>
      <title>WTW: Add Review</title>
    </Helmet>

      <div className="film-card__header">
         <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

            <Breadcrumbs movieName={name} movieId={movieId}/>

            <Userblock/>

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm movieId={movieId} />
      </div>

    </section>
  )
    }

    export default AddReviewPage;
