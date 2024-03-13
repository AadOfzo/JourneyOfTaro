// styles.SongForm.js
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
  width: 300px;
  border: 2px solid var(--secondary);
  padding: 20px;
  margin-top: 20px;
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

const PreviewSongs = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 20px;
  border: 2px solid var(--secondary); /* Add border for consistency */
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

export {
    Container,
    Form,
    FileInput,
    ChooseFileButton,
    PlusIcon,
    PreviewSongs,
    LoadingWheel,
};
