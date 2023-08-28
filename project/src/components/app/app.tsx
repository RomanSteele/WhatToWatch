import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from "../../const";
import AddReviewPage from "../../pages/add-review-page/add-review-page";
import MainPage from "../../pages/main-page/main-page";
import MoviePage from "../../pages/movie-page/movie-page";
import MyListPage from "../../pages/my-list-page/my-list-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import PlayerPage from "../../pages/player-page/player-page";
import SignInPage from "../../pages/sign-in-page/sign-in-page";
import PrivateRoute from "../private-route/private-route";
import { useAppSelector } from "../../hooks";
import HistoryRouter from "../history-route/history-route";
import browserHistory from "../browser-history";



function App(): JSX.Element {

  const { authorizationStatus } = useAppSelector(({ USER })=> USER);
  const Movies = useAppSelector(({ DATA })=> DATA.movies);

  return (
  <HelmetProvider>
    <HistoryRouter history = {browserHistory}>
      <Routes>
    <Route
          path={AppRoute.Main}
          element={<MainPage movies={Movies}/>}
        />
      <Route
          path={AppRoute.Login}
          element= {<SignInPage authorizationStatus={authorizationStatus}/>}
        />
      <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus = {authorizationStatus}>
              <MyListPage />
            </PrivateRoute>
        }
        />
        <Route
          path={AppRoute.SelectedMovie}
          element={<MoviePage />}
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
          path={AppRoute.PlayerById}
          element={<PlayerPage movies={Movies}/>}
        />
      </Routes>
    </HistoryRouter>
  </HelmetProvider>
  )
}

export default App;
