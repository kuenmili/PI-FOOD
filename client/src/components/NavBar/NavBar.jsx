import { Link } from 'react-router-dom';
import style from './style.module.css';

const NavBar = () => {
    return (
        <div className={style.mainContainer}>
            <Link to='/home'>HOME</Link>
            <Link to='/create'>FORM</Link>
        </div>
    )
};

export default NavBar;