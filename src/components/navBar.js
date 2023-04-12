import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectToogleValues } from '../features/toogleSlice';

export const Navbar = () => {

    const dispatcher = useDispatch();

    const toogle = useSelector(selectToogleValues);

    const handleToogleValues = () => {
        const action = {
            type: "toogle/values"
        }
        dispatcher(action);
    }

    return (
        <div className="NavBar">
            <div className='toogleMenuValues' onClick={handleToogleValues}>
                {
                    toogle ?
                    <i className="bi bi-arrow-left-square-fill icon iconMenu">Hide Values</i>
                     :
                    <i className="bi bi-arrow-right-square-fill icon iconMenu">Show Values</i>
                    
                }
            </div>
            <h1>
                Jey! Grapher
            </h1>
        </div>
    )
}