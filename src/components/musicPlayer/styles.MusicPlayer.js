import styled from "styled-components";

const SMusicPlayer = styled.div`
  display: flex;
  justify-content: center;
  color: #050505;
  background-color: #e5e5e5;

  .music-player-top-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
    background-color: var(--secondary);

    .music-cover {
      display: flex;
      border-radius: 5%;
    }

    .song-info-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 0.2rem;
      color: #4f4f4f;
      border: solid 1px var(--primary);
      border-radius: 10%;
    }
    
    .music-player-icon-container {
      //padding: 1rem;
      //border: solid 2px var(--primary);
      border-radius: 10%;

      .playButton {
        background: none;
        border: none;
        align-items: center;
        justify-content: center;
      }
    }
    
    .time {
      margin: 0.2rem auto;
      padding: 0.2rem;
      width: 80%;
      display: flex;
      justify-content: space-evenly;
      color: #0e0e0e;
      font-size: smaller;
    }

    .timeline {
      //padding: 1rem;
      width: 80%;
    }

    input[type="range"] {
    }
  }


  @media (max-width: 900px) {
    .component {
      width: 50%;
    }
  }

`;

export default SMusicPlayer;
