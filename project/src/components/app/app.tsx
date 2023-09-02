import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import AddReviewPage from "../../pages/add-review-page/add-review-page";
import MainPage from "../../pages/main-page/main-page";
import MoviePage from "../../pages/movie-page/movie-page";
import MyListPage from "../../pages/my-list-page/my-list-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import PlayerPage from "../../pages/player-page/player-page";
import SignInPage from "../../pages/sign-in-page/sign-in-page";
import PrivateRoute from "../private-route/private-route";
import Spinner from "../spinner/spinner";
import { isAuthStatusUnknown } from "../../helpers";
import { AppRoute } from "../../const";



function App(): JSX.Element {

  const { authorizationStatus } = useAppSelector(({ USER })=> USER);
  const { movies } = useAppSelector(({ DATA })=> DATA);
  const { isLoading } = useAppSelector(({ACTION})=> ACTION)


  if (isAuthStatusUnknown(authorizationStatus) ) {
    return (
      <Spinner loading={isLoading} />
    );
  }

  return (
      <Routes>
    <Route
          path={AppRoute.Main}
          element={<MainPage movies={movies} isLoading={isLoading}/>}
        />
      <Route
          path={AppRoute.Login}
          element= {
            <PrivateRoute authorizationStatus = {authorizationStatus}>
          <SignInPage />
          </PrivateRoute>
        }
        />
      <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus = {authorizationStatus} >
              <MyListPage />
            </PrivateRoute>
        }
        />
        <Route
          path={AppRoute.SelectedMovie}
          element={<MoviePage isLoading={isLoading} />}
        />
      <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage />}
        />
        <Route
          path={AppRoute.AddReview}
          element={
          <PrivateRoute authorizationStatus = {authorizationStatus}>
            <AddReviewPage />
          </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.PlayerById}
          element={<PlayerPage movies={movies}/>}
        />
      </Routes>
  )
}

export default App;
