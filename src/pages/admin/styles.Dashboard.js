// src/pages/styles.Dashboard.js
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 20px;
  background-color: var(--background);
`;

export const SectionSelect = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const SectionButton = styled.button`
  background: ${props => props.active ? 'var(--primary)' : 'var(--secondary)'};
  color: ${props => props.active ? '#fff' : '#000'};
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: var(--primary-dark);
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
