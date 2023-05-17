import { getAllRecipes } from '../../redux/actions';
import Cards from '../../components/Cards/Cards'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRecipes())
    }, [dispatch])

    return (
        <>
            <h1>Welcome to Home</h1>
            <Cards />
        </>
    )
};

export default Home;