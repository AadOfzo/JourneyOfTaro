import React, { useEffect } from "react";
import SImagePage from "./styles.ImagePage";

import ImageGallery from "../../components/images/ImageGallery";
import ImageForm from "../../components/forms/imageForm/ImageForm";
import ImageListBase64 from "../../components/images/ImageListBase64";
import ImageGalleryWithUrls from "../../components/images/ImageGalleryWithUrls";
import { useAuth } from "../../components/authentication/Auth";
import LoadingComponent from "../../components/loadingWheel/LoadingComponent";

function ImagePage() {
    const { user } = useAuth();

    useEffect(() => {
        console.log('User data:', user);
    }, [user]);

    if (!user) {
        return <LoadingComponent/>;
    }

    const isAdmin = user.roles.includes('ROLE_ADMIN');
    const isUser = user.roles.includes('ROLE_USER');

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
                            <h2>Upload Images</h2>
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
