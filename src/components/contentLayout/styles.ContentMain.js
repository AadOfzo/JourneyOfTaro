import styled from "styled-components";

const SContentMain = styled.div`
  width: 100%;
  max-width: 300px; /* Adjust the size according to your needs */
  aspect-ratio: 1 / 1; /* This makes the container square */
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid var(--secondary);
  overflow: hidden;

  .component {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
    max-height: 100px; /* Adjust as needed */
    overflow-y: auto;
    padding: 10px;
    border: 1px solid var(--secondary);
  }

  /* Add any other necessary styling adjustments here */
`;

export default SContentMain;
