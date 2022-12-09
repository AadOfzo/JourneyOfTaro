// - Home.js Import voor CategoryItems

//
//
// import CategoryItem from "./CategoryItem";
// import React from "@types/react";
//
// import {useEffect, useState} from "@types/react";
// import axios from "axios";
//
// const [categories, setCategories] = useState([]);
//
// useEffect(() => {
//     async function fetchCategories() {
//         try {
//             const response = await axios.get('https://api.chucknorris.io/jokes/categories');
//             console.log(response.data);
//             setCategories(response.data);
//         } catch (e) {
//             console.error(e);
//         }
//     }
//
//     fetchCategories();
// }, []);
//
// function doThingsOnClick() {
//     console.log('Geliked');
// }
// <div>
// <ul>
//     {categories.length > 0 && categories.map((category) => {
//         if (category === 'dev') {
//             return <CategoryItem
//                 categoryName={category}
//                 item={category}
//                 secondItem={category.secondItem}
//                 buttonType="submit"
//                 clickhandler={doThingsOnClick}
//             />
//         } else {
//             return <CategoryItem
//                 categoryName={category}
//                 buttonType="button"
//                 clickhandler={doThingsOnClick}
//             />
//         }
//
//     })};
// </ul>
//     </div>