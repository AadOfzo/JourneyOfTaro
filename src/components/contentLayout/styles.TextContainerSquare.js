import styled from "styled-components";

const STextcontainerSquare = styled.div`
  display: flex;
  height: 30rem;
  width: 30rem;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 1;
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  border: solid 1px var(--secondary);
 
  .text-outer-container {
      .articleName h2 {
        display: flex;
        justify-content: center;
        margin: 2rem;
        padding: 2rem;
        color: aqua;
      }
    
      .articleText {
        display: flex;
        text-align: center;
        margin: 1rem;
        padding: 1rem;
        color: #eaa733 ;
      }
  }
  `;

export default STextcontainerSquare;