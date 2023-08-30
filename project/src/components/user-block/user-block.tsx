import { useAppSelector } from "../../hooks";
import UserBlockSignIn from "./user-block-sign-in";
import UserBlockSignOut from "./user-block-sign-out";
import { AuthorizationStatus } from "../../const";

function UserBlock(): JSX.Element {

  const { authorizationStatus } = useAppSelector(({ USER })=> USER);

  return(
    authorizationStatus === AuthorizationStatus.Auth ?
      <UserBlockSignOut/>
      :
      <UserBlockSignIn/>
  )
}

export default UserBlock;
