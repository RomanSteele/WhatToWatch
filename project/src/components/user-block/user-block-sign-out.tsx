import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const";
import { requireAuthorization } from "../../store/slices/user-data/used-data";

function UserBlockSignOut ():JSX.Element {



  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ul className="user-block">
    <li className="user-block__item">
      <div className="user-block__avatar">
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" onClick={() => {navigate(AppRoute.MyList)}}/>
      </div>
    </li>
    <li className="user-block__item">
      <Link className="user-block__link" to={AppRoute.Main} onClick={()=> dispatch(requireAuthorization(AuthorizationStatus.NoAuth))}>Sign out</Link>
    </li>
  </ul>
  )
}

export default UserBlockSignOut;
