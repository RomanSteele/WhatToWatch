import { AuthorizationStatus } from "../../const";
import { useAppSelector } from "../../hooks";
import UserBlockSignIn from "./user-block-sign-in";
import UserBlockSignOut from "./user-block-sign-out";

function UserBlock(): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return(
    authorizationStatus === AuthorizationStatus.Auth ?
    <UserBlockSignOut/>
    :
    <UserBlockSignIn/>
  )
}

export default UserBlock;
