import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "../../const";
import { useAppDispatch } from "../../hooks";
import { logoutAction } from "../../store/api-actions";

function UserBlockSignOut ():JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
    <li className="user-block__item">
      <div className="user-block__avatar">
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" onClick={() => {navigate(AppRoute.MyList)}}/>
      </div>
    </li>
    <li className="user-block__item">
      <Link className="user-block__link" to={AppRoute.Main} onClick={()=> dispatch(logout)}>Sign out</Link>
    </li>
  </ul>
  )
}

export default UserBlockSignOut;
