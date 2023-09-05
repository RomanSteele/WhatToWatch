import { Helmet } from "react-helmet-async";
import Footer from "../../components/footer/footer";
import Logo from "../../components/logo/logo";
import UserBlock from "../../components/user-block/user-block";


function NotFoundPage(): JSX.Element {


  return <>

  <Helmet>
      <title>WTW: Not Found!</title>
  </Helmet>

  <div className="user-page">
      <header className="page-header user-page__head">

        <Logo/>

        <UserBlock/>

      </header>

  <h1 style={{textAlign: "center",}}>NOT FOUND!</h1>

      <Footer/>

    </div>
  </>
    }

    export default NotFoundPage;
