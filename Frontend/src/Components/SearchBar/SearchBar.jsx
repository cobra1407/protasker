import React from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ placeholder , filter}) => {
    return (
        <div className="container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input type="text" placeholder={placeholder} onChange={filter} className={"search-input"}/>
        </div>
    );
};

export default SearchBar;
