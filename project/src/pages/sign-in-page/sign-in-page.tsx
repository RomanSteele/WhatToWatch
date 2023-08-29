import { FormEvent, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/footer/footer";
import Logo from "../../components/logo/logo";
import { validateEmail, validatePassword } from "../../helpers";
import { store } from "../../store";
import { loginAction } from "../../store/api-actions";
import { AuthData } from "../../types/auth-data";


function SignInPage(): JSX.Element {

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const sendOnSubmit = (authData: AuthData) => {
    store.dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current && passwordRef.current) {
      const emailValue = emailRef.current.value;
      const passwordValue = passwordRef.current.value;

      if (validateEmail(emailValue) && validatePassword(passwordValue)) {

        sendOnSubmit({
          email: emailValue,
          password: passwordValue,
        });

      }
    }
  };

return(
  <>

  <Helmet>
    <title>WTW: Sign In</title>
  </Helmet>

  <div className="user-page">
      <header className="page-header user-page__head">

        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input ref={emailRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>

    </div>
  </>
  )
    }

    export default SignInPage;
