import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {APIRoute} from '../const';
import {State} from '../types/state';
import { addMovieReview, addMyListMovie, fetchCurrentMovieAction, fetchFavoriteMoviesAction, fetchMoviesAction, fetchPromoMovieAction, fetchReviewsAction, fetchSimilarMoviesAction, fetchUserAction, loginAction, logoutAction } from './api-actions';
import { redirectToRoute } from './action';
import { api } from '.';
import { fakeDeleteFromFavoritesMovie, fakeId, fakeLoginData, fakeMovie, fakeMoviesArray, fakeReview, fakeUserData, fakeUserReview } from '../utils/mocks';
import { loadUserData, requireAuthorization } from './slices/user-data/user-data';
import { loadCurrentMovie, loadFavoriteMovies, loadMovies, loadPromoMovie, loadReviews, loadSimilarMovies, setError } from './slices/app-data/app-data';
import { changeLoadingStatus } from './slices/action-data/action-data';


const fakemockDeleteFromFavoritesMovie = fakeDeleteFromFavoritesMovie;
const mockId = fakeId;
const mockLoginData = fakeLoginData;
const mockMovie = fakeMovie;
const mockMoviesArray = fakeMoviesArray;
const mockReviewsArray = [fakeReview, fakeReview, fakeReview];
const mockUserData = fakeUserData;
const mockUserReview = fakeUserReview;


describe('Async actions', () => {

  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);


    it('should dispatch changeLoadingStatus and loadMovies when GET /films with a 200 status', async () => {
      mockAPI
        .onGet(APIRoute.Movies)
        .reply(200, mockMoviesArray);

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(fetchMoviesAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchMoviesAction.pending.type,
        changeLoadingStatus.type,
        loadMovies.type,
        changeLoadingStatus.type,
        fetchMoviesAction.fulfilled.type,
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });


    it('should dispatch loadFavoriteMovies when GET /favorite with a 200 status', async () => {
      mockAPI
        .onGet(APIRoute.FavotireMovies)
        .reply(200, mockMoviesArray);

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(fetchFavoriteMoviesAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFavoriteMoviesAction.pending.type,
        loadFavoriteMovies.type,
        fetchFavoriteMoviesAction.fulfilled.type,
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });


    it('should dispatch loadPromoMovie when GET /promo with a 200 status', async () => {
      mockAPI
        .onGet(APIRoute.PromoMovie)
        .reply(200, mockMovie);

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(fetchPromoMovieAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchPromoMovieAction.pending.type,
        loadPromoMovie.type,
        fetchPromoMovieAction.fulfilled.type,
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });


    it('should dispatch loadSimilarMovies when GET /movie/:id/similar with a 200 status' , async () => {
      mockAPI
        .onGet(`${APIRoute.Movies}/${mockMovie.id}/similar`)
        .reply(200, mockMoviesArray);

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(fetchSimilarMoviesAction(mockMovie.id));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchSimilarMoviesAction.pending.type,
        loadSimilarMovies.type,
        fetchSimilarMoviesAction.fulfilled.type,
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });


describe('fetchCurrentMovieAction', () => {


    it('should dispatch changeLoadingStatus, loadCurrentMovie when GET /movie/:id with a 200 status', async () => {
      mockAPI
        .onGet(`${APIRoute.Movies}/${mockMovie.id}`)
        .reply(200, mockMovie);

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(fetchCurrentMovieAction(mockMovie.id));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCurrentMovieAction.pending.type,
        changeLoadingStatus.type,
        loadCurrentMovie.type,
        changeLoadingStatus.type,
        fetchCurrentMovieAction.fulfilled.type,
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });


    it('should dispatch changeLoadingStatus twice when GET /movie/:id with a 404 status', async () => {
      mockAPI
        .onGet(`${APIRoute.Movies}/${mockMovie.id}`)
        .reply(404, []);

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(fetchCurrentMovieAction(mockMovie.id));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCurrentMovieAction.pending.type,
        changeLoadingStatus.type,
        changeLoadingStatus.type,
        fetchCurrentMovieAction.fulfilled.type,
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });

  });


describe('fetchUserAction', () => {


    it('should dispatch loadUserData, fetchFavoriteMoviesAction, requireAuthorization and RedirectToRoute when GET /login with a 200 status', async () => {
      mockAPI
        .onGet(APIRoute.Login)
        .reply(200, mockUserData);

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(fetchUserAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchUserAction.pending.type,
        loadUserData.type,
        fetchFavoriteMoviesAction.pending.type,
        requireAuthorization.type,
        fetchUserAction.fulfilled.type
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });


      it('should dispatch requireAuthorization  when GET /login with a 400status', async () => {
        mockAPI
          .onGet(APIRoute.Login)
          .reply(400, []);

        const store = mockStore();
        Storage.prototype.setItem = jest.fn();

        await store.dispatch(fetchUserAction());

        const actions = store.getActions().map(({type}) => type);

        expect(actions).toEqual([
          fetchUserAction.pending.type,
          requireAuthorization.type,
          fetchUserAction.fulfilled.type
        ]);
        expect(Storage.prototype.setItem).toBeCalledTimes(0);
      });

    });


describe('loginAction', () => {


    it('should dispatch fetchMoviesAction, loadUserData, fetchFavoriteMoviesAction, requireAuthorization and RedirectToRoute when POST /login with a 200 status', async () => {
      mockAPI
        .onPost(APIRoute.Login)
        .reply(200, mockUserData);

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(mockLoginData));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        loadUserData.type,
        fetchFavoriteMoviesAction.pending.type,
        requireAuthorization.type,
        redirectToRoute.type,
        loginAction.fulfilled.type
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('what-to-watch-token', mockUserData.token);
    });


    it('should dispatch requireAuthorization when POST /login with a 404 status', async () => {
      mockAPI
        .onPost(APIRoute.Login)
        .reply(404, []);

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(mockLoginData));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        requireAuthorization.type,
        loginAction.fulfilled.type
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });

  })


    it('should dispatch requireAuthorization when DELETE /logout with a 204 status', async () => {
      mockAPI
        .onDelete(APIRoute.Logout)
        .reply(204, []);

      const store = mockStore();

      Storage.prototype.setItem = jest.fn();

      await store.dispatch(logoutAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        logoutAction.pending.type,
        requireAuthorization.type,
        logoutAction.fulfilled.type
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });


    it('should dispatch fetchFavoriteMoviesAction when POST /favorite/:id/:status with a 200 status', async () => {
      mockAPI
        .onPost(`${APIRoute.FavotireMovies}/${fakemockDeleteFromFavoritesMovie.id}/${fakemockDeleteFromFavoritesMovie.status}`)
        .reply(200, []);

      const store = mockStore();

      Storage.prototype.setItem = jest.fn();

      await store.dispatch(addMyListMovie(fakemockDeleteFromFavoritesMovie));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        addMyListMovie.pending.type,
        fetchFavoriteMoviesAction.pending.type,
        addMyListMovie.fulfilled.type,
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });


    it('should dispatch reviews array with loadReviews when POST /comments/id with a 200 status', async () => {
      mockAPI
        .onGet(`${APIRoute.Reviews}/${mockId}`)
        .reply(200, mockReviewsArray);

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(fetchReviewsAction(mockId));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        loadReviews.type,
        fetchReviewsAction.fulfilled.type
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });


    it('should dispatch changeLoadingStatus twice when POST /reviews/id with a 200 status', async () => {
      mockAPI
        .onPost(`${APIRoute.Reviews}/${mockUserReview.id}`)
        .reply(200, []);

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(addMovieReview(mockUserReview));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        addMovieReview.pending.type,
        changeLoadingStatus.type,
        changeLoadingStatus.type,
        addMovieReview.fulfilled.type,
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });


    it('should dispatch null to error when used', async () => {
      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      store.dispatch(setError(null));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        setError.type
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });

});
