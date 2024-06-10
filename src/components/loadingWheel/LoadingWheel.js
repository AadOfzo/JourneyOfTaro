import styled from "styled-components";

const LoadingWheel = styled.div`
  width: 100px;
  height: 100px;
  margin: 20px;

  svg {
    width: 100%;
    height: 100%;
    animation: spin 7.5s linear infinite;

    .cls-1 {
      stroke: var(--secondary);
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default LoadingWheel;
