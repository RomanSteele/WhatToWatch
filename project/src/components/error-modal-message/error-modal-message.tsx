
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setError } from '../../store/slices/app-data/app-data';
import './error-modal-message.css';



function ErrorModalMessage ():JSX.Element | null {

  const { error } = useAppSelector(({ DATA })=> DATA);


  const dispatch = useAppDispatch();


  return (error)
  ? <div className="error-modal-overlay">
  <div className="error-modal">
    <div className="error-modal-content">
      <p>{error}</p>
      <button onClick={()=>dispatch(setError(null))} >Close</button>
    </div>
  </div>
</div>
  : null;

    }

export default ErrorModalMessage;
