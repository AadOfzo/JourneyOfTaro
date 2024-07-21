import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa'; // Import FaUserCircle

export const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%; /* Make the image circular */
  margin-right: 20px; /* Space between image and details */
`;

export const NoImageContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--secondary);
  border-radius: 50%;
  margin-right: 20px;
  text-align: center;
  font-size: 1rem;
  color: #999;
  position: relative;
  cursor: pointer;
`;

export const NoImageIcon = styled(FaUserCircle)`
  font-size: 3rem;
  color: var(--testColorOne);
`;

export const UploadButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  position: absolute;
  bottom: 10px;

  :hover {
    background-color: #0056b3;
  }
`;

export const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

export const CenteredH2 = styled.h2`
  text-align: center;
  font-size: 3rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-bottom: solid 1px var(--secondary);
`;

export const UserDetailsContainer = styled.div`
  width: 40vw;
  overflow-y: auto;
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%; /* Full width on mobile devices */
  }
`;

export const UserDetail = styled.div`
  margin-bottom: 1.2rem;
`;

export const UserDetailLabel = styled.p`
  margin: 0;
  font-weight: bold;
`;

export const UserDetailValue = styled.p`
  margin: 0;
`;
