
import { useDispatch, useSelector } from 'react-redux';
import {
  orderByName,
  orderByHealtScore,
  orderByDiets,
  deleteFilters,
  orderByOrigin,
} from '../../redux/actions';
import styles from './style.module.css';

 const Filters = (props) => {   

    const allDiets = useSelector(state => state.diets.map((diet) => diet.text))
    const dispatch = useDispatch();
    
    const handlerOrderByName = (event) => {
      const value = event.target.value;
        dispatch(orderByName(value));
    };
    const handlerOrderByHealtScore = (event) => {
      const value = event.target.value;
        dispatch(orderByHealtScore(value));
    };

    const handlerOrderByDiets = (event) => {
      const value = event.target.value;
        props.setFirtsPage();
        dispatch(orderByDiets(value));
    };

    const handlerOrderByOrigin = (event) => {
      const value = event.target.value;
        props.setFirtsPage();
        dispatch(orderByOrigin(value));
    };

    const handlerResetFilters = () => {
        document.getElementById('diet').value = 'all';
        document.getElementById('origin').value = 'Filter by Origin';
        document.getElementById('alfabetico').value = 'Order by A-Z';
        document.getElementById('healtscore').value = 'Order by HealtScore';
        dispatch(deleteFilters());
    };

  return (
    <div className={styles.container}>
      <select
        defaultValue='all'
        id='diet'
        onChange={handlerOrderByDiets}
        className={styles.select}
      >
        <option disabled value='all'>
          Filter by Diet
        </option>
        {allDiets.map((diet, index) => (
          <option key={index} value={diet}>
            {diet}
          </option>
        ))}
      </select>

      <select
        defaultValue='Filter by Origin'
        id='origin'
        onChange={handlerOrderByOrigin}
        className={styles.select}
      >
        <option disabled value='Filter by Origin'>
          Filter by Origin
        </option>
        <option value="All">All</option>
        <option value='DataBase'>Data Base</option>
        <option value='API'>API</option>
      </select>

      <select
        defaultValue='Order by A-Z'
        id='alfabetico'
        onChange={handlerOrderByName}
        className={styles.select}
      >
        <option disabled value='Order by A-Z'>
          Order by A-Z
        </option>
        <option value='ascendente'>Ascendente</option>
        <option value='descendente'>Descendente</option>
      </select>

      <select
        defaultValue='Order by HealtScore'
        id='healtscore'
        onChange={handlerOrderByHealtScore}
        className={styles.select}
      >
        <option disabled value='Order by HealtScore'>
          Order by HealtScore
        </option>
        <option value='ascendente'>Healthier</option>
        <option value='descendente'>Less Healthy</option>
      </select>

      <button onClick={handlerResetFilters} className={styles.button}>
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;