import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

export const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const NoImageContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid ${props => props.hasImage ? 'var(--testColorTwo)' : 'var(--testColorOne)'};
  border-radius: 50%;
  margin-right: 20px;
  text-align: center;
  font-size: 1rem;
  color: ${props => props.hasImage ? '#fff' : '#999'};
  position: relative;
  cursor: pointer;
  background: ${props => props.hasImage ? `url(${props.imageUrl}) center/cover` : 'none'};
  transition: border 0.3s, color 0.3s;
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
  border: 2px solid ${props => props.file ? 'var(--testColorTwo)' : 'var(--testColorOne)'};
  border-radius: 5px;
  font-size: 0.9rem;
  position: absolute;
  bottom: 10px;
  transition: border 0.3s;

  :hover {
    background-color: #0056b3;
  }
`;

export const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

export const CenteredH2 = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-bottom: solid 1px var(--secondary);
`;


export const UserDetailsContainer = styled.div`
  width: 100%;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const UserDetail = styled.div`
  padding: 1.2rem;
  margin-bottom: 1.2rem;
`;

export const UserDetailLabel = styled.p`
  text-align: left;
  margin: 0;
  font-weight: bold;
`;

export const UserDetailValue = styled.p`
  text-align: left;
  padding-left: 1.2rem;
  margin: 0px;
`;

export const ActionButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: 2px solid var(--testColorOne);
  border-radius: 5px;
  font-size: 0.9rem;
  transition: border 0.3s;
  margin-right: 10px;

  :hover {
    background-color: #0056b3;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;
