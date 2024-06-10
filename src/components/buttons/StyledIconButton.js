import React from 'react';
import styled from 'styled-components';

const StyledIconButton = styled.button`
  align-items: center;
  background-color: ${(props) => props.backgroundColor || 'var(--primary)'};
  border: 3px solid ${(props) => props.borderColor || 'var(--testColorTwo)'};
  border-radius: 24px;
  box-sizing: border-box;
  color: #ededed;
  cursor: pointer;
  display: inline-flex;
  font-size: 1rem;
  font-weight: bold;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  text-decoration: none;
  user-select: none;
  width: auto;

  &:hover {
    background-color: ${(props) => props.hoverColor || 'var(--testColorOne)'};
  }
`;

const IconButton = ({ onClick, backgroundColor, borderColor, hoverColor, children }) => {
    return (
        <StyledIconButton
            onClick={onClick}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            hoverColor={hoverColor}
        >
            {children}
        </StyledIconButton>
    );
};

export default IconButton;
