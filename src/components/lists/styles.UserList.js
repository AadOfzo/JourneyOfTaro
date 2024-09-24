import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    box-shadow: 0 0 0 0 rgba(234, 167, 51, 0);
  }
  to {
    box-shadow: inset 0 0 10px rgba(234, 167, 51, 0.5);
  }
`;

const fadeOutEffect = keyframes`
  from {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  to {
    box-shadow: 0 0 10px 5px var(--testColorTwo);
  }
`;

const fadeOutEffectDelete = keyframes`
  from {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  to {
    box-shadow: 0 0 10px 5px var(--testColorOne);
  }
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const UserListInnerContainer = styled.div`
  display: flex;
  height: 40vh;
`;

export const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-top: 20px; /* Reduce the margin-top */
`;

export const UserDetailsContainer = styled.div`
  width: 100%;
  max-width: 60vw; /* Set max width */
  padding: 20px;
  text-align: center;
  border: 2px solid #ddd; /* Add border */
  border-radius: 5px;
  overflow-y: auto; /* Enable vertical scrolling */
  box-sizing: border-box; /* Ensure padding and border are included in the width */

  @media (max-width: 768px) {
    width: 100%; /* Full width on mobile devices */
  }
`;

export const CenteredH2 = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-bottom: solid 1px var(--secondary);
`;

export const UserSelect = styled.div`
  width: 20vw;
  border: 2px solid var(--secondary);
  border-radius: 5px;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const UserSelectHeader = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px;
  border-bottom: 2px solid #a71818;
`;

export const UserSelectList = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const UserSelectItem = styled.tr`
  cursor: pointer;
  background-color: transparent;
  box-shadow: ${({ isActive }) =>
    isActive ? "inset 0 0 10px rgba(234, 167, 51, 0.5)" : "none"};
  animation: ${({ isActive }) => (isActive ? fadeIn : "none")} 0.5s forwards;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #80532f;
  }

  td {
    padding: 10px;
    border-bottom: 1px solid #80532f;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; /* Space between buttons */
  margin-top: 20px;
`;

export const AddAdminButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: var(--testColorTwo);
  color: var(--textSecondary);
  border: 2px solid var(--testColorTwo);
  border-radius: 5px;
  font-size: 0.9rem;
  transition: border 0.3s, box-shadow 0.3s;
  margin-right: 10px;

  :hover {
    cursor: pointer;
    color: var(--textPrimary);
    animation: ${fadeOutEffect} 0.3s forwards;
  }
`;

export const UserDeleteButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: var(--testColorOne);
  color: white;
  border: 2px solid var(--testColorOne);
  border-radius: 5px;
  font-size: 0.9rem;
  transition: border 0.3s, box-shadow 0.3s;
  margin-right: 10px;

  :hover {
    cursor: pointer;
    background-color: #0056b3;
    animation: ${fadeOutEffectDelete} 0.3s forwards;
  }
`;
