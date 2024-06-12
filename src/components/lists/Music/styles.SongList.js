import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    box-shadow: 0 0 0 0 rgba(234, 167, 51, 0);
  }
  to {
    box-shadow: inset 0 0 10px rgba(234, 167, 51, 0.5);
  }
`;

const smoothOpenGlow = keyframes`
  from {
    height: 0;
    opacity: 0;
    box-shadow: 0 0 0 0 rgba(234, 167, 51, 0);
  }
  to {
    height: 100%;
    opacity: 1;
    box-shadow: inset 0 0 10px rgba(234, 167, 51, 0.5);
  }
`;

const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const SongListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-top: 4rem;
  margin-bottom: 4rem;

  @media (min-width: 1280px) {
    width: 60vw;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  table {
    width: 100%;

    thead {
      justify-content: space-between;
      align-items: center;

      tr {
        display: flex;
        flex-direction: row;
        justify-content: center;
        box-shadow: inset 0 0 10px rgb(167, 24, 24);

        th {
          padding: 0.75rem;
          font-size: 1.5rem;
          font-weight: bold;
        }
      }
    }

    tbody {
      display: flex;
      flex-direction: column;
      align-items: center;

      tr {
        padding: 0.75rem;
        td {
          align-items: center;
          padding: 0.75rem;
          font-size: 1.2rem;
          box-shadow: inset 0 0 10px rgba(141, 250, 79, 0.6);
          //border-radius: 25px;
          height: 0;  /* Initially hidden */
          opacity: 0; /* Initially hidden */
          animation: ${smoothOpenGlow} 1.5s forwards; /* Apply smooth opening and glow animation */
        }

        :hover td {
          height: auto; /* Ensure it fills the container on hover */
          opacity: 1;  /* Ensure it becomes fully visible on hover */
        }
      }
    }
  }
`;

const SongTitle = styled.p`
  font-size: 1.2rem;
  padding: 0.75rem;
  font-weight: bold;
`;

const ArtistName = styled.p`
  font-size: 1.2rem;
  padding: 0.75rem;
  font-weight: bold;
`;

const SongListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 50vw;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--secondary);

  :hover {
    cursor: pointer;
    animation: ${fadeIn} 0.5s forwards;
  }
`;

const AudioPlayerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem;
  width: 100%;

  audio {
    display: flex;
    width: 60vw;
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
