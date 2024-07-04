import styled from "styled-components";

const StartButton = styled.button`
  position: fixed; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); /* Centreert component */
  z-index: 1000; /* Knop komt bovenop */
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: var(--primary);
  color: #fff;
  border: solid 2px var(--testColorTwo);
  cursor: pointer;
  border-radius: 8px;
  
  :hover {
    box-shadow: 0 2px 5px rgba(141, 250, 79, 0.6);
  }
`;

const SongActionButtons = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
`;

const SongAddButton = styled.button`
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

export {
    StartButton,
    SongActionButtons,
    SongAddButton,
    SongDeleteButton,
};
