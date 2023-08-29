import { CSSProperties } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import Footer from "../footer/footer";

type SpinnerProps = {
  loading: boolean
}


function Spinner ({loading}: SpinnerProps):JSX.Element {


  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    marginTop: "150px"
  };

  return <>
  <section className="film-card" style={{ height: '150px' }}>
    <div className="film-card__bg">
    </div>

    <h1 className="visually-hidden">WTW</h1>

    <header className="page-header film-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
            </div>
          </li>
          <li className="user-block__item">
          </li>
        </ul>
      </header>

  </section>

  <div className="page-content">
  <section className="catalog" style={{ height: '200px' }}>

   <div className="sweet-loading">


      <FadeLoader
        color={'#eee5b5'}
        loading={loading}
        cssOverride={override}
        height={89}
        radius={3}
        width={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </section>
     <Footer/>

    </div>
    </>
    }


export default Spinner;


