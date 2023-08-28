import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import AddReviewForm from "../../components/add-review-form/add-review-form";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import Logo from "../../components/logo/logo";
import Userblock from "../../components/user-block/user-block";
import { Movie } from "../../types/movie";

type AddReviewPageProps = {
  movies: Movie[];
};


function AddReviewPage({ movies }:AddReviewPageProps): JSX.Element {

  const { id } = useParams() as {
    id: string;
  };
  const numericId = parseInt(id, 10);

  const  currentMovie = movies.find((item) => item.id === numericId);

  const { name, previewImage, posterImage } = currentMovie as {
  name: Movie['name'],
  previewImage: Movie['previewImage'],
  posterImage: Movie['posterImage'],
};


  return (
  <section className="film-card film-card--full">

    <Helmet>
      <title>WTW: Add Review</title>
    </Helmet>

      <div className="film-card__header">
         <div className="film-card__bg">
          <img src={previewImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <Breadcrumbs movieName={name} movieId={numericId}/>

          <Userblock/>

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm movieId={numericId} />
      </div>

    </section>
  )
    }

    export default AddReviewPage;
