import styled from "styled-components";

const SMusicPlayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .music-player-top-container {
    display: flex;
    flex-direction: row;
    align-content: center;
    height: 1.5rem;
    width: 40vw;
    margin: 10px;
    background-color: var(--secondary);
  }

  .music-player-bottom-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 10vh;
    width: 50vw;
    margin: 10px;
    background-color: var(--testColorTwo);
  }

`;

export default SMusicPlayer;
