import React from 'react';
import STextcontainerSquare from "./styles.TextContainerSquare";

function TextContainerSquare({articleName, articleText }) {
    return (
        <STextcontainerSquare>
            <div className="text-outer-container">
                <h2 className="article-name">{articleName}</h2>
                <p className="article-text">{articleText}</p>
            </div>
        </STextcontainerSquare>
    );
}

export default TextContainerSquare;