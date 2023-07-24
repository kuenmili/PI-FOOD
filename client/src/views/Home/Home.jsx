import { getAllDiets, getAllRecipes, deleteFilters } from '../../redux/actions';
import SearchBar from '../../components/SearchBar/SearchBar';
import Paginate from '../../components/Paginated/Paginate';
import Filters from '../../components/Filters/Filters';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import { useEffect, useState } from 'react';
import style from './style.module.css';
import LoadingGlobal from '../../components/LoadingGlobal/loading';

const Home = () => {

    const dispatch = useDispatch();

   
    const allCards = useSelector((state => state.recipes));
    const filteredRecipes = useSelector((state) => state.filteredRecipes);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(9);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = (
        filteredRecipes.length > 0 
        ? filteredRecipes 
        : allCards).slice(
        indexOfFirstCard,
        indexOfLastCard
      );    

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };
    const setFirtsPage = () => {
        setCurrentPage(1);
    };      

    useEffect(() => {
        dispatch(getAllRecipes());
        dispatch(getAllDiets());
        setTimeout(() => {
            setLoading(false);
        }, 1000);       
    }, [dispatch]);  
    
    return (
        <div >
            <div className={style.paginate}> 
                <h2 className={style.recipes}>Recipes</h2>               
                <Paginate
                cardsPerPage={cardsPerPage}
                allCards={allCards.length}
                paginate={paginate}
                currentPage={currentPage}
                />
            </div>
            <div className={style.container}>
                <div className={style.components}>
                    <SearchBar/>
                    <Filters  
                    deleteFilters={deleteFilters}
                    getAllDiets={getAllDiets}
                    getAllRecipes={getAllRecipes}                 
                    setFirtsPage={setFirtsPage}
                    />
                </div>

                {
                    loading ?
                    (
                        <div className={style.loader}>
                            <LoadingGlobal />
                        </div>
                    )
                    :
                    (
                <div className={style.cardsContainer}>
                {
                    currentCards.map((card) => {
                    let diets = card.diets;
                    if (card.created) {
                        diets = diets?.map((diet) => diet.name);
                    }
                    return (                    
                        <Card 
                        id={card.id}
                        image={card.image}
                        title={card.title}
                        diets={diets}
                        />                          
                    )
                })}
                
                </div>                        
                    )
                }
                
            </div>
            
        </div>
    )
};

export default Home; 