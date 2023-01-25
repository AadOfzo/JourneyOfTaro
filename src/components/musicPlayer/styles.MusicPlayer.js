import styled from "styled-components";

const SMusicPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .music-player-top-container {
    display: flex;
    flex-direction: row;
    height: 2rem;
    width: 100%;
    margin: 10px;
    background-color: var(--secondary);
  }

  .music-player-bottom-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 10vh;
    width: 60vw;
    margin: 10px;
    border-radius: 20px;
    background-color: var(--testColorTwo);
  }

`;

export default SMusicPlayer;
