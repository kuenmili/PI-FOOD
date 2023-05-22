import Paginate from '../../components/Paginated/Paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets, getAllRecipes } from '../../redux/actions';
import Card from '../../components/Card/Card'
import { useEffect, useState } from 'react';
import style from './style.module.css';
import Filters from '../../components/Filters/Filters';
import SearchBar from '../../components/SearchBar/SearchBar';
const Home = () => {

    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.diets.map((diet) => diet.text));
    const allCards = useSelector((state => state.recipes));
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(9);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = allCards.slice(indexOfFirstCard, indexOfLastCard);
    

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };
    const setFirtsPage = () => {
        setCurrentPage(1);
      };
      

    useEffect(() => {
        dispatch(getAllRecipes());
        dispatch(getAllDiets());
    }, [dispatch]);

    debugger;
    
    return (
        <div>
            <div className={style.paginate}>                
                <Paginate
                cardsPerPage={cardsPerPage}
                allCards={allCards.length}
                paginate={paginate}
                />
            </div>
            <div className={style.container}>
                <div className={style.components}>
                    <SearchBar/>

                    <Filters
                    allDiets={allDiets}
                    setFirtsPage={setFirtsPage}
                    />
                </div>
                
                <div className={style.cardsContainer}>
                    {currentCards?.map((card) => {
                        if(card.created) {
                          
                            
                        card.diets = card.diets?.map((diet) => diet.name)
                        
                        }
                        return (
                            <div>
                                <Card 
                                key={card.id}
                                id={card.id}
                                image={card.image}
                                title={card.title}
                                diets={card.diets}
                                />
                            </div>      
                        )
                    })}
                
                </div>
            </div>    
            
        </div>
    )
};

export default Home;