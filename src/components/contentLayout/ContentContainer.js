import React from "react";
import { TextComponent, ImageComponent, PlaceholderComponent } from "./Content"
import TextContainerSquare from "./styles.TextContainerSquare";

const ContentContainer= ({ layout, text, image, placeholder }) => {
    if (layout === "text") {
        return (
            <div className="container">
                <TextComponent text={text}/>
                <ImageComponent image={image}/>
                <PlaceholderComponent placeholder={placeholder}/>
            </div>
        )
    }

    if (layout === "image") {
        return (
            <div className="container">
                <ImageComponent image={image} />
                <TextComponent text={text} />
                <PlaceholderComponent placeholder={placeholder} />
            </div>
        );
    }

    if (layout === "placeholder") {
        return (
            <div className="container">
                <PlaceholderComponent placeholder={placeholder} />
                <TextComponent text={text} />
                <ImageComponent image={image} />
            </div>
        );
    }
};

export default ContentContainer;