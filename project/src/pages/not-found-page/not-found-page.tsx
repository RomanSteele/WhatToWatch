import { Helmet } from "react-helmet-async";
import Footer from "../../components/footer/footer";
import Logo from "../../components/logo/logo";


function NotFoundPage(): JSX.Element {

  return <>

  <Helmet>
      <title>WTW: Not Found!</title>
  </Helmet>

  <div className="user-page">
      <header className="page-header user-page__head">

        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

  <h1 style={{textAlign: "center",}}>NOT FOUND!</h1>

      <Footer/>

    </div>
  </>
    }

    export default NotFoundPage;
