import { Link } from 'react-router-dom';
import style from './style.module.css';


const Landing = () => {
    return (
        <div className={style.frame}>
            <div className={style.container}>
                <div >
                    <p className={style.recipes}>Recipes</p>
                    <h1 className={style.flavors}>Homemade Flavors</h1>
                    <Link to='/home' className={style.btn}>Home</Link>
                </div>
                
                <div >
                    <img className= { style.img } src={process.env.PUBLIC_URL + '/Landing.png'} alt="Landing" />
                </div>
            </div>
        </div>
    )
};

export default Landing;