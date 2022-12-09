import React from 'react';
import './ItemMenu.css'
import { Link } from "react-router-dom";
// import Samples from "../../pages/samples/Samples";

function ItemMenu(props) {
    return (
        <>
            <div className="item-menus">
                <img
                    alt="JOT_Compass_Logo"
                    src={props.ItemImage}
                />
                <ul className="page-menus">

                    <img
                        alt="JOT_Compass_Logo"
                        src={props.pageimage}
                    />

                    <li className="item-menus-list">

                        <h2 className="page-name">{props.pageName}</h2>

                        <Link to={props.pageItemOne}>
                            <h3 className="page-item">{props.pageItemOne}</h3>
                        </Link>

                        <Link to={props.pageItemTwo}>
                            <h3 className="page-item">{props.pageItemTwo}</h3>
                        </Link>

                        <Link to={props.pageItemThree}>
                            <h3 className="page-item">{props.pageItemThree}</h3>
                        </Link>
                    </li>
                </ul>

            </div>
        </>
    );
}

export default ItemMenu;