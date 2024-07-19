import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: none;
  padding: 10px;
`;

const FileInput = styled.input`
  display: none;
`;

const ChooseFileButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 2px dashed var(--secondary);
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: var(--testColorOne);
  }
`;

const PlusIcon = styled.div`
  font-size: 16px;
  margin-right: 4px;
`;

const UploadPreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
  margin-bottom: 10px;
  box-shadow: inset 0 0 10px rgb(167, 24, 24);
  transition: box-shadow 0.5s ease;

  &.uploaded {
    box-shadow: inset 0 0 10px rgba(141, 250, 79, 0.6);
  }
`;

const PreviewImage = styled.img`
  max-width: 50px;
  max-height: 50px;
  object-fit: contain;
`;

const LoadingWheel = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--secondary);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-top: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ImageListOuterContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 65vw;
  margin-top: 4rem;
  margin-bottom: 4rem;

  @media (min-width: 1280px) {
    width: 45vw;
  }
`;

const ImageListInnerContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 2px solid var(--secondary);
  padding: 24px;
`;

const ImageListTitle = styled.h2`
  margin-bottom: 32px;
  margin-left: 24px;
`;

const ImageListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--secondary);
`;

const ImageLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImageName = styled.p`
  font-size: 1.2rem;
  padding-left: 24px;
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

  &:hover {
    background-color: var(--testColorOne);
  }
`;

const ImageAddButton = styled.button`
  align-items: center;
  background-color: var(--primary);
  border: 2px solid var(--testColorTwo);
  border-radius: 12px;
  box-sizing: border-box;
  color: #ededed;
  cursor: pointer;
  display: inline-flex;
  font-size: 12px;
  font-weight: bold;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  padding: 5px 10px;
  text-decoration: none;
  user-select: none;
  width: auto;

  &:hover {
    background-color: var(--testColorTwo);
  }
`;

// New Styled Components for ImageHandler
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Image = styled.img`
  max-width: 300px;
  max-height: 300px;
  border: 2px solid var(--secondary);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

export {
    Container,
    Form,
    FileInput,
    ChooseFileButton,
    PlusIcon,
    UploadPreviewImage,
    PreviewImage,
    LoadingWheel,
    ImageListOuterContainer,
    ImageListInnerContainer,
    ImageListTitle,
    ImageListItem,
    ImageLabel,
    ImageName,
    ImageDeleteButton,
    ImageAddButton,
    ImageContainer,
    Image
};
