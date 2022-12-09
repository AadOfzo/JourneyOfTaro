import React from 'react';
import './CategoryItem.css'
import {Link} from "react-router-dom";

function CategoryItem({ categoryName, item, secondItem, buttonType, clickhandler }) {
    return (
        <li>
            <h2>{categoryName}</h2>
            <Link to={`/category-details/${categoryName}`}>Naar de detailpagina</Link>
            <h3>{item}</h3>
            <h3>{secondItem}</h3>
            <button type={buttonType}
                    onClick={clickhandler}>Like</button>
        </li>
    );
}

export default CategoryItem;