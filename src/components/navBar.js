import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectToggleValues } from '../store/slices/toggleSlice';

export const Navbar = () => {

    const dispatcher = useDispatch();

    const toggle = useSelector(selectToggleValues);

    const handleToggleValues = () => {
        const action = {
            type: "toggle/values"
        }
        dispatcher(action);
    }

    return (
        <div className="NavBar">
            <div className='toggleMenuValues' onClick={handleToggleValues}>
                {
                    toggle ?
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