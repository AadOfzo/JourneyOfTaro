import styled from 'styled-components';

export const PopupButton = styled.button`
  background-color: #eaa733;
  color: black;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  
  p {
    padding: 1.2rem;
  }

  :hover {
    box-shadow: inset 0 0 10px rgb(5, 5, 5);
  }
`;

export const PopupContainerWrapper = styled.div`
  position: relative;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 999; /* Ensure the overlay covers everything */
`;

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #eaa733;
  color: black;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000; /* Ensure content is above the overlay */
`;
