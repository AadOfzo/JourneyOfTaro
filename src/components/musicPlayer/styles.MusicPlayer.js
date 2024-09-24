import styled from "styled-components";

const SMusicPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--primary);
  color: var(--secondary);
  border: 1px solid var(--testColorOne);
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  .music-player-top-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .music-cover {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    margin-bottom: 15px;
  }

  .song-info-container {
    text-align: center;
    margin-bottom: 15px;

    .song-title {
      font-size: 1.5rem;
      margin: 5px 0;
      border-bottom: 1px solid var(--secondary);
    }

    .artist-name {
      font-size: 1.2rem;
      color: var(--testColorTwo);
    }
  }

  .time {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  .timeline {
    width: 100%;
    margin-bottom: 15px;
    cursor: pointer;
  }

  .music-player-icon-container {
    display: flex;
    justify-content: space-around;
    width: 100%;

    .playButton {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--secondary);

      &:hover {
        color: var(--testColorOne);
      }

      &:focus {
        outline: none;
      }
    }
  }

  /* Media queries */
  @media (max-width: 480px) {
    padding: 15px;
    .music-cover {
      width: 150px;
      height: 150px;
    }

    .song-title {
      font-size: 1.3rem;
    }

    .artist-name {
      font-size: 1rem;
    }
  }
`;

export default SMusicPlayer;
