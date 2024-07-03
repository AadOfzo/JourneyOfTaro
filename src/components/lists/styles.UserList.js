import styled, { keyframes } from "styled-components";

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

const UserImage = styled.img`
  width: 100px;
  height: 100px;
`;

const GlowingRow = styled.tr`
  td {
    padding: 0.75rem;
    height: 0;
    opacity: 0;
    transform: scaleY(0);
    animation: ${expandGlow} 1.5s forwards;
    transition: height 1.5s, opacity 1.5s, transform 1.5s;
  }

  :hover td {
    height: auto;
    opacity: 1;
    transform: scaleY(1);
  }
`;

export {
    UserImage,
    GlowingRow,
};
