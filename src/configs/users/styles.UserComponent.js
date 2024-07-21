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
