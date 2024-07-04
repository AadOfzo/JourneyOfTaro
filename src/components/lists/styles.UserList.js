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
    height: 0;import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes\`
  from {
    box-shadow: 0 0 0 0 rgba(234, 167, 51, 0);
  }
  to {
    box-shadow: inset 0 0 10px rgba(234, 167, 51, 0.5);
  }
\`;

const expandGlow = keyframes\`
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
\`;

export const UserImage = styled.img\`
  width: 100px;
  height: 100px;
\`;

export const GlowingRow = styled.tr\`
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
\`;

export const UserInfoContainer = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  max-height: 80vh; /* Adjust max height as needed */
  overflow-y: auto; /* Add scrollbars if needed */
\`;

export const UserInfo = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
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
    border-bottom: 1px solid var(--secondary);
    width: 50vw;
    text-align: center;
    cursor: pointer;

    :hover {
      animation: ${fadeIn} 0.5s forwards;
    }
  }
\`;

export const ImageContainer = styled.div\`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: inset 0 0 10px rgba(141, 250, 79, 0.6);
\`;

export const Image = styled.img\`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
\`;

export const ExpandableContent = styled.div\`
  display: ${({expanded}) => (expanded ? 'block' : 'none')};
  width: 100%;
  padding: 20px;
  margin-top: 10px;
  animation: ${fadeIn} 0.5s forwards;
  max-width: 60vw; /* Adjust width as needed */
  overflow: hidden;
\`;

export const ExpandButton = styled.button\`
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
\`;

export const UserListContainer = styled.div\`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  margin-top: 50px;
\`;

export const UserDetailsContainer = styled.div\`
  width: 60vw; /* Adjust width as needed */
  max-height: 80vh; /* Adjust height as needed */
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
\`;

export const CenteredH2 = styled.h2\`
  text-align: center;
  font-size: 3rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
\`;

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
  max-height: 80vh; /* Adjust max height as needed */
  overflow-y: auto; /* Add scrollbars if needed */
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 1280px) {
    width: 30vw; /* Adjust width as needed */
  }

  h2 {
    font-size: 3rem;
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
    border-bottom: 1px solid var(--secondary);
    width: 50vw;
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
  box-shadow: inset 0 0 10px rgba(141, 250, 79, 0.6);
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const ExpandableContent = styled.div`
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
  width: 100%;
  padding: 20px;
  margin-top: 10px;
  animation: ${fadeIn} 0.5s forwards;
  max-width: 60vw; /* Adjust width as needed */
  overflow: hidden;
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
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  margin-top: 50px;
`;

export const UserDetailsContainer = styled.div`
  width: 60vw; /* Adjust width as needed */
  max-height: 80vh; /* Adjust height as needed */
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;
