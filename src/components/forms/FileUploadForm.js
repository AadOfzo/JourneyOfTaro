import React from 'react';

import {
    Form as SongForm,
    FileInput as SongFileInput,
    ChooseFileButton as SongChooseFileButton,
    PlusIcon as SongPlusIcon,
    LoadingWheel as SongLoadingWheel,
    SongUploadButton as SongUploadButton,
    SongContainer,
} from './musicForm/styles.SongForm'; // Import styled components from SongForm
import {
    Form as ImageForm,
    FileInput as ImageFileInput,
    ChooseFileButton as ImageChooseFileButton,
    PlusIcon as ImagePlusIcon,
    LoadingWheel as ImageLoadingWheel,
    UploadPreviewImage as ImageUploadPreview,
    ImageAddButton as ImageUploadButton,
} from './imageForm/styles.ImageForm'; // Import styled components from ImageForm

const FileUploadForm = ({ onSubmit, onFileChange, file, loading }) => {
    return (
        <div>
            <SongContainer>
                <SongForm onSubmit={onSubmit}>
                    <SongFileInput type="file" onChange={onFileChange} />
                    <SongChooseFileButton htmlFor="file">
                        <SongPlusIcon>+</SongPlusIcon> Choose File
                    </SongChooseFileButton>
                    {file && <SongUploadButton type="submit">Upload</SongUploadButton>}
                    {loading && <SongLoadingWheel />}
                </SongForm>
            </SongContainer>

            <ImageForm onSubmit={onSubmit}>
                <ImageFileInput type="file" onChange={onFileChange} />
                <ImageChooseFileButton htmlFor="file">
                    <ImagePlusIcon>+</ImagePlusIcon> Choose File
                </ImageChooseFileButton>
                {file && <ImageUploadButton type="submit">Upload</ImageUploadButton>}
                {loading && <ImageLoadingWheel />}
                {file && <ImageUploadPreview src={URL.createObjectURL(file)} alt="Preview" />}
            </ImageForm>
        </div>
    );
};

export default FileUploadForm;
