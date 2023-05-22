import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipe } from '../../redux/actions';

import styles from './style.module.css';

 const SearchBar = () => {
    const dispatch = useDispatch();
    const [ data, setData ] = useState('');

    const handleChange = (event) => {        
        const value = event.target.value;                 
        setData(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(searchRecipe(data));
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