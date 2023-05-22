import { Link } from 'react-router-dom';
import style from './style.module.css';


const NavBar = () => {
    return (
        <div className={style.mainContainer}>
           <div className={style.container}>
                <Link to='/home' className={style.home}>Home</Link>
                <Link to='/create' className={style.form}>Form</Link>
           </div>
        </div>
    )
};

export default NavBar;