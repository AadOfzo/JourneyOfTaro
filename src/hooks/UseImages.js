import {useEffect, useState} from "react";
import axios from "axios";

const UseImages = (imageUrl) => {

    const [images, setImages] = useState([]);

    useEffect(() => {

        async function fetchImages() {
            try {
                const response = await axios.get(imageUrl);

                setImages(response.data);
                console.log(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchImages()
    }, []);
    return { images }
};

export default UseImages;