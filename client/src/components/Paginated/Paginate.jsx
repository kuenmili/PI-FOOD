/* eslint-disable jsx-a11y/anchor-is-valid */
import style from './style.module.css';


const Paginate = ({cardsPerPage, allCards, paginate }) => {

   const pageNumber = [];

   for (let i = 0; i < Math.ceil(allCards/cardsPerPage); i++){
        pageNumber.push(i + 1);
   };

   return (
    <section className={style.section}>
        <ul className={style.paginate}>
            { pageNumber && 
            pageNumber.map( number => (
                <ul className={style.number} key={number}>
                    <a onClick={() => paginate(number)} >{number}</a>
                </ul>  
            ))}
        </ul>
    </section>
   )
};

export default Paginate;