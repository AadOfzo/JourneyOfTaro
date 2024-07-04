import styled from "styled-components";
import LoginPopupMainComponent from "./LoginPopupMainComponent";

const SLoginPopupMainComponent = styled.div`
  background-color: var(--secondary);
  color: var(--textSecondary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  span {
    font-size: 1.2rem;
    color: solid 1px var(--testColorOne);
  }

  button {
    background-color: transparent;
    border: none;
    color: var(--textSecondary);
    font-size: 1.2rem;
    cursor: pointer;
  }

  button:hover {
    color: #a71818;
  }

  .spacer {
    flex-grow: 1;
  }
`;
export default SLoginPopupMainComponent