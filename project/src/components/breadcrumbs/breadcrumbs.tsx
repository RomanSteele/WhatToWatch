import { Link } from "react-router-dom";

type BreadcrumbsProps ={
  movieName: string,
  movieId: number
}



function Breadcrumbs({movieName, movieId}:BreadcrumbsProps): JSX.Element {

  return(
    <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/movie/${movieId}`} className="breadcrumbs__link">{movieName}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
  )
}

export default Breadcrumbs;
