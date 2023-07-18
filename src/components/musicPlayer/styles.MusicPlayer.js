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
    height: 20px;
    width: 625px;
    margin: 10px;
    background-color: var(--secondary);
  }

  .music-player-bottom-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 100px;
    width: 700px;
    margin: 10px;
    background-color: var(--testColorTwo);
    border-radius: 10px;
  }

`;

export default SMusicPlayer;
