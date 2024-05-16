// styles.ImageForm.js
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65vw;
  border: 2px solid var(--secondary);
  padding: 20px;

  @media (min-width: 1280px) {
    width: 45vw;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ChooseFileButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  border: 2px dashed var(--secondary);
  cursor: pointer;

  &:hover {
    background: var(--testColorOne);
  }
`;

const PlusIcon = styled.div`
  font-size: 24px;
  margin-right: 8px;
`;

const UploadPreviewImage = styled.img`
  max-width: 300px;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 36px;
`;

const PreviewImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  padding-right: 24px;
  object-fit: contain;
`;

const LoadingWheel = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid var(--secondary);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-top: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ImageListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 65vw;
  margin-top: 4rem;
  margin-bottom: 4rem;


  @media (min-width: 1280px) {
    width: 45vw;
  }
`;

const ImageList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 2px solid var(--secondary);
  padding: 24px
`;

const ImageListTitle = styled.h2`
    margin-bottom: 32px;
    margin-left: 24px;
`

const ImageListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--secondary)
`;

const ImageLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ImageName = styled.p`
  font-size: 1.2rem;
  padding-right: 24px;
  font-weight: bold;
`;

const ImageDeleteButton = styled.button`
    align-items: center;
    background-color: var(--primary);
    border: 3px solid var(--testColorOne);
    border-radius: 24px;
    box-sizing: border-box;
    color: #ededed;
    cursor: pointer;
    display: inline-flex;
    font-size: 1rem;
    font-weight: bold;
    justify-content: center;
    line-height: 1.25;
    margin: 0;
    min-height: 3rem;
    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    text-decoration: none;
    user-select: none;
    width: auto;

  :hover {
    background-color: var(--testColorOne);
  }
`;

const ImageAddButton = styled.button`
    align-items: center;
    background-color: var(--primary);
    border: 3px solid var(--testColorTwo);
    border-radius: 24px;
    box-sizing: border-box;
    color: #ededed;
    cursor: pointer;
    display: inline-flex;
    font-size: 1rem;
    font-weight: bold;
    justify-content: center;
    line-height: 1.25;
    margin: 0;
    min-height: 3rem;
    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    text-decoration: none;
    user-select: none;
    width: auto;

  :hover {
    background-color: var(--testColorTwo);
  }
`;

export {
    Container,
    Form,
    FileInput,
    ChooseFileButton,
    PlusIcon,
    PreviewImage,
    LoadingWheel,
    UploadPreviewImage,
    ImageListItem,
    ImageName,
    ImageDeleteButton,
    ImageListContainer,
    ImageList,
    ImageListTitle,
    ImageLabel,
    ImageAddButton,
};
