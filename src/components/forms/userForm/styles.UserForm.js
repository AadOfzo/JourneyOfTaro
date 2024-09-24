import styled from "styled-components";

const SUserForm = styled.div`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
  }

  .success-message {
    font-size: 1.5rem;
    max-width: 400px;
    padding: 20px;
    margin: 20px;
    background-color: var(--secondary);
    color: var(--textSecondary);
    border-radius: 10px;
  }

  h2 {
    padding: 0.2rem;
    margin: 0.2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-evenly;
    padding: 0.2rem;

    p {
      margin: 1.2rem;
      font-size: 1.2rem;
      border-bottom: solid 2px var(--testColorOne);
    }

    label {
      text-align: left;
      margin-right: auto;
      margin-bottom: 0.5rem;
    }

    input,
    select {
      margin: 12px;
      width: 300px;
      appearance: auto;
      padding: 12px;
      border-radius: 3px;

      &:focus::placeholder {
        color: transparent;
      }

      &::placeholder {
        color: gray;
      }
    }

    button {
      height: 2rem;
      width: 360px;
      font-family: "Julius Sans One", sans-serif;
      font-size: 1.5rem;
      background-color: var(--secondary);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      label {
        margin-bottom: 0.5rem;
      }

      select {
        margin: 12px;
        width: 300px;
        appearance: auto;
        padding: 12px;
        border-radius: 3px;
      }
    }
  }
`;

export default SUserForm;
