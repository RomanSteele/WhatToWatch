import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Movie } from "../../types/movie";

type PlayerPageProps = {
  movies: Movie[]
}

function PlayerPage({movies}:PlayerPageProps): JSX.Element {

  const params = useParams();
  const id = Number(params.id);

  const isPlaying = true;

  const movie = movies.find((item) => item.id === id) as Movie;

  const {name, videoLink} = movie;

  return <>

  <Helmet>
    <title>WTW: {isPlaying? 'Playing': 'Pause'} {name}</title>
  </Helmet>

  <div className="player">
      <video src={videoLink} className="player__video" poster="img/player-poster.jpg"></video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" data-style="left: 30%;">Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  </>
    }

    export default PlayerPage;
