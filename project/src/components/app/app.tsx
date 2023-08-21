import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from "../../const";
import AddReviewPage from "../../pages/add-review-page/add-review-page";
import MainPage from "../../pages/main-page/main-page";
import MoviePage from "../../pages/movie-page/movie-page";
import MyListPage from "../../pages/my-list-page/my-list-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import PlayerPage from "../../pages/player-page/player-page";
import SignInPage from "../../pages/sign-in-page/sign-in-page";
import PrivateRoute from "../private-route/private-route";
import { Movie } from "../../types/movie";

type AppProps = {
  movies: Movie[]
}

function App({movies}: AppProps): JSX.Element {

  return (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
    <Route
          path={AppRoute.Main}
          element={<MainPage movies={movies}/>}
        />
      <Route
          path={AppRoute.Login}
          element={<SignInPage />}
        />
      <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus = {AuthorizationStatus.Auth}>
              <MyListPage />
            </PrivateRoute>
        }
        />
        <Route
          path={AppRoute.SelectedMovie}
          element={<MoviePage movies={movies} />}
        />
      <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage />}
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReviewPage />}
        />
        <Route
          path={AppRoute.Player}
          element={<PlayerPage />}
        />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
  )
}

export default App;
