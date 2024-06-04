import styled from "styled-components";

const LoadingWheel = styled.div`
  border: 6px solid var(--primary);
  border-top: 6px solid var(--secondary);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-top: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;