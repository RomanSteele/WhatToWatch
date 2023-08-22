import { Helmet } from "react-helmet-async";
import AddReviewForm from "../../components/add-review-form/add-review-form";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import Logo from "../../components/logo/logo";
import Userblock from "../../components/user-block/user-block";

function AddReviewPage(): JSX.Element {


  return (
  <section className="film-card film-card--full">

    <Helmet>
      <title>WTW: Add Review</title>
    </Helmet>

      <div className="film-card__header">
         <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <Breadcrumbs/>

          <Userblock/>

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm />
      </div>

    </section>
  )
    }

    export default AddReviewPage;
