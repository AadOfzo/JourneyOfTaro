import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    box-shadow: 0 0 0 0 rgba(234, 167, 51, 0);
  }
  to {
    box-shadow: inset 0 0 10px rgba(234, 167, 51, 0.5);
  }
`;

const expandGlow = keyframes`
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
`;

export const UserImage = styled.img`
  width: 100px;
  height: 100px;
`;

export const GlowingRow = styled.tr`
  td {
    padding: 0.75rem;
    height: 0;
    opacity: 0;
    transform: scaleX(0);
    animation: ${expandGlow} 1s forwards;
    transition: height 1s, opacity 1s, transform 1s;
    position: relative;
  }

  :hover td {
    cursor: pointer;
    height: auto;
    opacity: 1;
    transform: scaleX(1);
  }

  :before,
  :after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 10px;
    background: linear-gradient(to right, transparent 0%, #eaa733 50%, transparent 100%);
    animation: ${fadeIn} 1s forwards;
  }

  :before {
    left: -10px;
  }

  :after {
    right: -10px;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  overflow-y: auto; /* Add scrollbars if needed */
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;

  @media (min-width: 1280px) {
    width: 30vw; /* Adjust width as needed */
  }

  h2 {
    font-size: 3rem;
    text-align: center; /* Center the h2 text */
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    padding: 1rem;

    :hover {
      cursor: pointer;
      animation: ${fadeIn} 0.5s forwards;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 1.2rem;
    padding: 0.75rem;
    font-weight: bold;
    width: 40vw;
    text-align: center;
    cursor: pointer;

    :hover {
      animation: ${fadeIn} 0.5s forwards;
    }
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const ExpandableContent = styled.div`
  display: block; /* Always display the content block */
  width: 100%;
  padding: 20px;
  margin-top: 10px;
  animation: ${fadeIn} 0.5s forwards;
  max-width: 40vw; /* Adjust width as needed */
  overflow: hidden;
  justify-content: center;

  @media (max-width: 768px) {
    display: ${({ expanded }) => (expanded ? 'block' : 'none')}; /* Only expandable on mobile devices */
  }
`;

export const ExpandButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;

  :hover {
    background-color: #0056b3;
  }
`;

export const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-top: 20px; /* Reduce the margin-top */
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

export const CenteredH2 = styled.h2`
  text-align: center;
  font-size: 3rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-bottom: solid 1px var(--secondary);
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
