/* eslint-disable jsx-a11y/anchor-is-valid */
import style from './style.module.css';

const Paginate = ({ cardsPerPage, allCards, paginate, currentPage }) => {
    const pageNumber = [];
  
    for (let i = 0; i < Math.ceil(allCards / cardsPerPage); i++) {
      pageNumber.push(i + 1);
    }
  
    const renderPageNumbers = () => {
      if (pageNumber.length <= 2) {
        return pageNumber.map((number) => (
          
          <ul className={currentPage === number ? style.active : ''} key={number}>
            <a onClick={() => paginate(number)} className={style.pageList}>{number}</a>
          </ul>
        ));
      } else {
        let pageNumbersToRender = [];
        if (currentPage === 1 || currentPage === 2) {
          pageNumbersToRender = pageNumber.slice(0, 2);
        } else if (currentPage === pageNumber.length || currentPage === pageNumber.length - 1) {
          pageNumbersToRender = pageNumber.slice(-2);
        } else {
          pageNumbersToRender = pageNumber.slice(currentPage - 2, currentPage);
        }  
        return pageNumbersToRender.map((number) => (
          <ul className={currentPage === number ? style.active : ''} key={number}>            
            <a onClick={() => paginate(number)} className={style.pageList}>{number}</a>
          </ul>
        ));
      }
    };

    return (
      <section className={style.section}>
        <ul className={style.paginate}>
          <ul>
            <a onClick={() => paginate(currentPage - 1)}>Prev</a>
          </ul>
          {renderPageNumbers()}
          <ul>
            <a onClick={() => paginate(currentPage + 1)}>Next</a>
          </ul>
        </ul>
      </section>
    );
  };

  export default Paginate;
  