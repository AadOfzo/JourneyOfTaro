import styled from "styled-components";

const SUserForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 1;
  margin: 1rem;
  padding: 1rem;

  .demo-upload-form-outer-container {
    background-color: var(--testColorOne);
  }

  .demo-upload-form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: solid 1px var(--secondary);

    .form-item {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      text-align: center;
      padding: 2px;
      margin: 3px;
      border: solid 1px var(--secondary);

      .label {
        display: flex;
        .input {
          display: flex;
          height: 1.5rem;
          border: solid 1px var(--testColorTwo);
        }
      }
    }

    .form-submit {
      display: flex;
      text-align: center;
      background-color: var(--primary);
      height: 1.5rem;
    }
  }

\`     ;
`;

export default SUserForm;
