import {Navigate} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import SignInPage from '../../pages/sign-in-page/sign-in-page';

type PrivateRouteProps = {
  authorizationStatus: string;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element{
  const {authorizationStatus, children} = props;

console.log(authorizationStatus)

  if (children.type !== SignInPage){


    return (
      authorizationStatus === AuthorizationStatus.Auth
        ? children
        : <Navigate to={AppRoute.Login} />
    );
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Main} />
      : children
  );
}


export default PrivateRoute;
