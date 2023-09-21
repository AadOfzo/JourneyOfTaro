import React from 'react';

const TextComponent = ({text}) => (
    <article className="component text-component">
        {text.title ? <h2>{text.title}</h2> : null}
        <div>{text.content}</div>
    </article>
);

const ImageComponent = ({image}) => (
    <div className="component image-component">
        <img src={image.src} alt={image.alt}/>
    </div>
);

const PlaceholderComponent = ({placeholder}) => (
    <article className="component placeholder-component">
        {placeholder.title ? <h2>{placeholder.title}</h2> : null}
        <div>{placeholder.content}</div>
    </article>
);

export {TextComponent, ImageComponent, PlaceholderComponent};
