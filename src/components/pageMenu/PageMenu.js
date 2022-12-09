import React from 'react';
import SPageMenus from './styles';
import {Link} from "react-router-dom";

function PageMenu({ pageName, pageImage, pageItemOne, pageItemTwo, pageItemThree}) {

    return (

        <SPageMenus>
            {/*// Page Image*/}
            <Link to={pageName}>
                <img
                    className="page-image"
                    alt="JOT_Compass_Logo"
                    src={pageImage}
                />
                {/*// Page Content & Links*/}

                <h2 className="page-name">{pageName}</h2>
            </Link>

            <li className="page-item-list">
                <Link to={pageItemOne}>
                    <h3 className="page-item">{pageItemOne}</h3>
                </Link>

                <Link to={pageItemTwo}>
                    <h3 className="page-item">{pageItemTwo}</h3>
                </Link>
                {pageItemThree && (
                    <Link to={pageItemThree}>
                        <h3 className="page-item">{pageItemThree}</h3>
                    </Link>
                )}
            </li>
        </SPageMenus>

    );
}

export default PageMenu;