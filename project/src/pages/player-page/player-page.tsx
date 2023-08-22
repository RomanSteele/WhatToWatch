import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Movie } from "../../types/movie";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { PlayerActiveStatus, TimeConvertion } from "../../const";

type PlayerPageProps = {
  movies: Movie[]
}

function PlayerPage({movies}:PlayerPageProps): JSX.Element {

  const [isPlaying, setIsPlaying] = useState(true);
  const [videoTimestamp, setVideoTimestamp] = useState<number>(0);
  const [togglePosition, setTogglePosition] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const params = useParams();
  const id = Number(params.id);

  const movie = movies.find((item) => item.id === id) as Movie;

  const {name, videoLink, posterImage} = movie;

  const handlePlayButtonClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFullScreenButtonClick = () => {
    videoRef.current?.requestFullscreen();
  };

  const progressUpdate = (evt: SyntheticEvent<HTMLVideoElement>) => {
    setVideoTimestamp(Math.round(evt.currentTarget.currentTime));
    setTogglePosition(getPercent(movie.runTime, videoTimestamp));
  };


  useEffect(() => {
    if (videoRef.current){
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);


  const getPercent = (runTime: number, currentTime: number) =>
  ((currentTime * TimeConvertion.SetPercent) / (runTime * TimeConvertion.SecondsInMinute)).toFixed(TimeConvertion.NumberAfterParse);

  const getLeftTime = (runTime: number, currentTime: number) =>
  new Date(((runTime * TimeConvertion.SecondsInMinute) - currentTime) * TimeConvertion.MilisecondsInSecond).toUTCString().split(/ /)[TimeConvertion.Limit];


  console.log(getPercent(movie.runTime, videoTimestamp))

  return <>

  <Helmet>
    <title>WTW: {isPlaying? 'Playing': 'Pause'} {name}</title>
  </Helmet>

  <div className="player">
      <video src={videoLink} ref={videoRef}
      className="player__video" poster={posterImage}
      onTimeUpdate={(evt) => progressUpdate(evt)}></video>

      <button type="button" className="player__exit"
      onClick={() => {
        videoRef.current?.pause();
        window.history.back();
      }}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={togglePosition} max="100"></progress>
            <div className="player__toggler" style={{ left: `${togglePosition}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">{getLeftTime(movie.runTime, videoTimestamp)}</div>
        </div>

        <div className="player__controls-row">
          <button onClick={handlePlayButtonClick} type="button" className='player__play'>
            <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref={isPlaying ? PlayerActiveStatus.RefPause : PlayerActiveStatus.RefPlay}></use>
            </svg>
            <span>{isPlaying ? PlayerActiveStatus.Play : PlayerActiveStatus.Pause}</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button onClick={handleFullScreenButtonClick} type="button" className="player__full-screen">
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
