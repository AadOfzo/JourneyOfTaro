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


const UploadPreviewSong = styled.img`
  max-width: 300px;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 36px;
`;

const PreviewSong = styled.div`
  max-width: 100px;
  max-height: 100px;
  padding-right: 24px;
  object-fit: contain;
  border: 2px solid var(--secondary); 
`;

const SongUploadLabel = styled.p`
  padding: 1.2rem;
  font-size: large;
`
const LoadingWheel = styled.div`
  border: 6px solid var(--primary);
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

const SongListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 65vw;
  margin-top: 4rem;
  margin-bottom: 4rem;


  @media (min-width: 1280px) {
    width: 45vw;
  }
`;

const SongList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 2px solid var(--secondary);
  padding: 24px
`;

const SongListTitle = styled.h2`
  margin-bottom: 32px;
  margin-left: 24px;
`;

const SongListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--secondary)
`;

const SongLabel = styled.div`
  display: flex;
  flex-direction: row;
  //align-items: center;
`

const SongTitle = styled.p`
  font-size: 1.2rem;
  padding-right: 24px;
  font-weight: bold;
`;

const ArtistName = styled.p`
  font-size: 1.2rem;
  padding-right: 24px;
  font-weight: bold;
`;

const SongUploadButton = styled.button`
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

const IconButton = styled.button`
    border: 1px solid var(--testColorOne);
    background: var(--secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    border-radius: 50%;

    &:hover {
        background-color: var(--secondary);
    }
`;

const SongActionButtons = styled.div`
  display: flex;
  padding: 1.2rem;
  justify-content: space-evenly;
  border: solid 2px var(--testColorTwo);
`
const SongAddButton = styled.button`
  //align-items: center;
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
    background-color: var(--testColorOne);
  }
`;

const SongDeleteButton = styled.button`
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

const AudioPlayerContainer = styled.div`
  padding-right: 2rem;

  audio {
    outline: solid 2px var(--testColorTwo);

  }
  
  .controls {
    color: #eaa733;
  }
  //
  //audio::-webkit-media-controls-panel {
  //  background-color: #333;
  //}
`;

export {
    Container,
    Form,
    FileInput,
    ChooseFileButton,
    PlusIcon,
    PreviewSong,
    LoadingWheel,
    UploadPreviewSong,
    SongUploadLabel,
    SongTitle,
    ArtistName,
    SongListContainer,
    SongList,
    SongListTitle,
    SongLabel,
    SongListItem,
    SongUploadButton,
    IconButton,
    SongActionButtons,
    SongAddButton,
    SongDeleteButton,
    AudioPlayerContainer,
};
