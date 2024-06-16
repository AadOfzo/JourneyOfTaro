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
    transform: scaleY(0);
    box-shadow: 0 0 0 0 rgba(234, 167, 51, 0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
    box-shadow: inset 0 0 10px rgba(234, 167, 51, 0.5);
  }
`;

export const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export const SongListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 1280px) {
    width: 60vw;
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
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: inset 0 0 10px rgb(167, 24, 24);
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
