import { searchRecipe } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import styles from './style.module.css';
import { useState } from 'react';


 const SearchBar = () => {
    const dispatch = useDispatch();
    const [ data, setData ] = useState('');
    

    const handleChange = (event) => {        
        const value = event.target.value;      
        setData(value.toLowerCase());
    }

    const onSubmit = (event) => {
        event.preventDefault();        
        dispatch(searchRecipe(data));
        setData("");
    };
    
    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <input
                className={styles.inputSearch}
                placeholder="Search recipes..."
                type="text"
                onChange={handleChange}
                value={data}
            />
            <button className={styles.button} type="submit">
                Search
            </button>
        </form>
    );
};

export default SearchBar;