import React, { useEffect } from "react";
import SImagePage from "./styles.ImagePage";

import ImageGallery from "../../components/images/ImageGallery";
import ImageHandler from "../../components/fileHandling/ImageHandler";
import ImageComponent from "../../components/images/ImageComponent";
import ImageForm from "../../components/forms/imageForm/ImageForm";
import ImageListBase64 from "../../components/images/ImageListBase64";
import ImageGalleryWithUrls from "../../components/images/ImageGalleryWithUrls";
import { useAuth } from "../../components/authentication/Auth";

function ImagePage() {
    const { user } = useAuth();

    useEffect(() => {
        console.log('User data:', user);
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const isAdmin = user.roles.includes('ADMIN');
    const isUser = user.roles.includes('USER');

    return (
        <div className="pages-main-container">
            <SImagePage>
                {isAdmin ? (
                    <>
                        <ImageListBase64 />
                    </>
                ) : (
                    isUser && (
                        <>
                            <ImageForm />
                            <ImageGallery />
                        </>
                    )
                )}
                {/* Uncomment these if needed */}
                {/* <ImageComponent /> */}
                {/* <ImageGalleryWithUrls /> */}
                {/* <ImageHandler /> */}
            </SImagePage>
        </div>
    );
}

export default ImagePage;
