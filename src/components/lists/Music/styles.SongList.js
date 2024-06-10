import styled, { keyframes } from "styled-components";

// Define the fade-in animation for the box-shadow
const fadeIn = keyframes`
  from {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  to {
    box-shadow: inset 0 0 10px rgb(237, 174, 65);
  }
`;

const SongContainer = styled.div`
  padding: 10px;
`;

const SongListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  table {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60vw;
    border: 1px solid var(--secondary);

    thead {
      tr {
        th {
          padding: 0.75rem;
          font-size: 1.2rem;
          font-weight: bold;
        }
      }
    }

    tbody {
      tr {
        td {
          display: flex;
          flex-direction: column;
          padding: 0.75rem;
          border: 2px dashed var(--secondary);
        }
      }
    }
  }
`;

const SongTitle = styled.p`
  font-size: 1.2rem;
  padding: 0.75rem;
`;

const ArtistName = styled.p`
  font-size: 1.2rem;
  padding: 0.75rem;
`;

const SongListItem = styled.div`
  display: flex;
  justify-content: center;

  :hover {
    cursor: pointer;
    //background-color: var(--testColorTwo); /* Maintain the same background color */
    animation: ${fadeIn} 0.5s forwards; /* Apply the fade-in animation */
  }
`;

const AudioPlayerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem;
  width: 100%;
  border: solid 1px var(--testColorOne);
  audio {
  }
`;

export {
    SongContainer,
    SongListContainer,
    SongTitle,
    ArtistName,
    SongListItem,
    AudioPlayerContainer,
};
