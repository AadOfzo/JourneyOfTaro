import React from 'react';
import './Music.css'
import ItemMenu from "../../components/itemMenu/ItemMenu";
import MainLogo from "../../assets/images/svg/JourneyOfTaro_Logo_Compass.svg"

function Music() {
    return (
        <>
            <h1>Music Page</h1>
            <ItemMenu
            ItemImage={MainLogo}
            ItemName="Item Name"
            ItemOne="Item 1"
            ItemTwo="Item 2"
            ItemThree="Item 3"
            />
        </>
    );
}

export default Music;