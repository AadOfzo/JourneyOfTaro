import React from 'react';
import ApiService from "../../../configs/utilities/axios/ApiService";

function SongCollectionManager({ collection, onVisibilityChange }) {
    if (!collection) {
        return <div>Loading...</div>; // or another appropriate fallback
    }

    // Check if `collection` has `isPublic`
    if (typeof collection.isPublic !== 'boolean') {
        console.error('Collection does not have `isPublic` property:', collection);
        return <div>Error: Collection data is invalid.</div>;
    }

    const handleToggleVisibility = async () => {
        try {
            const updatedCollection = await ApiService.toggleSongCollectionVisibility(collection.id, !collection.isPublic);
            onVisibilityChange(updatedCollection);
        } catch (error) {
            console.error('Error toggling visibility:', error);
        }
    };

    return (
        <div>
            <button onClick={handleToggleVisibility}>
                {collection.isPublic ? 'Make Private' : 'Make Public'}
            </button>
        </div>
    );
}

export default SongCollectionManager;
