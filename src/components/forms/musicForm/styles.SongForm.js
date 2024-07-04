    import styled from 'styled-components';

    const SongContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
    `;

    const Form = styled.form`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 65vw;
      border: 2px solid var(--secondary);
      padding: 20px;
    
      @media (min-width: 1280px) {
        width: 45vw;
      }
    `;

    const FileInput = styled.input`
      display: none;
    `;

    const ChooseFileButton = styled.label`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100px;
      border: 2px dashed var(--secondary);
      cursor: pointer;
    
      &:hover {
        background: var(--testColorOne);
      }
      
      @media (min-width: 100px) {
        //background-color: var(--secondary);
      }
    `;

    const PlusIcon = styled.div`
      font-size: 24px;
      margin-right: 8px;
    `;

    const SongUploadLabel = styled.p`
      padding: 1.2rem;
      font-size: large;
    `;

    const LoadingWheel = styled.div`
      border: 6px solid var(--primary);
      border-top: 6px solid var(--secondary);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin-top: 20px;
    
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

    const SongUploadContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      //justify-content: center;
      width: 100vw;
      margin-top: 4rem;
      margin-bottom: 4rem;
    
      @media (min-width: 1280px) {
        width: 60vw;
      }
    
      h1 {
        font-size: 2rem;
        margin-bottom: 2rem;
      }
    
      table {
        width: 100%;
        //border-collapse: collapse;
    
    
        thead {
          background-color: var(--primary);
    
          tr {
            th {
              padding: 0.75rem;
              font-size: 1rem;
              font-weight: bold;
              //color: #ffffff;
            }
          }
        }
    
        tbody {
          tr {
            &:nth-of-type(odd) {
              //background-color: rgba(141, 250, 79, 0.6);
            }
    
            &:nth-of-type(even) {
              //background-color: #a71818;
            }
    
            td {
              padding: 0.75rem;
              font-size: 1.2rem;
              border: 1px solid var(--secondary);
            }
    
            audio {
            }
          }
        }
      }
    `;

    const StyledInput = styled.input`
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 2px solid var(--secondary);
      border-radius: 5px;
      font-size: 1.2rem;
      color: var(--textSecondary);
      background-color: var(--secondary);

      &:focus {
        outline: none;
        border-color: var(--primary);
      }
    `;

    const SongListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-top: 4rem;
  margin-bottom: 4rem;

  @media (min-width: 1280px) {
    width: 60vw;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  table {
    width: 100%;
    thead {
      background-color: var(--primary);

      tr {
        th {
          padding: 0.75rem;
          font-size: 1rem;
          font-weight: bold;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 0.75rem;
          font-size: 1.2rem;
          border: 1px solid var(--secondary);
        }
      }
    }
  }
`;

    const SongList = styled.ul`
      display: flex;
      flex-direction: column;
      gap: 1rem;
      border: 2px solid var(--secondary);
    `;

    const SongListTitle = styled.h2`
      margin-bottom: 32px;
    `;

    const SongListItem = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: stretch;
      align-items: stretch;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--secondary);

      :hover {
        cursor: pointer;
        background-color: var(--testColorTwo);
      }
    `;

    const SongLabel = styled.div`
      display: flex;
      flex-direction: row;
    `;


    const SongTitle = styled.p`
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
    `;

    const ArtistName = styled.p`
      font-size: 1.2rem;
      font-weight: bold;
    `;

    const SongUploadButton = styled.button`
      align-items: center;
      background-color: var(--primary);
      border: 3px solid var(--testColorTwo);
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
    
      :hover {
        background-color: var(--testColorTwo);
      }
    `;

    const IconButton = styled.button`
      border: 1px solid var(--testColorOne);
      background: var(--secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5em;
      border-radius: 50%;
    
      &:hover {
        background-color: var(--secondary);
      }
    `;

    const SongActionButtons = styled.div`
      display: flex;
      padding: 1rem;
      justify-content: space-between;
    `;



    const AudioPlayerContainer = styled.div`
      padding-right: 2rem;
    
      audio {
        outline: solid 2px var(--testColorTwo);
      }
    
      .controls {
        color: #eaa733;
      }
    `;

    export {
        SongContainer,
        Form,
        FileInput,
        ChooseFileButton,
        PlusIcon,
        LoadingWheel,
        SongUploadLabel,
        SongTitle,
        ArtistName,
        SongUploadContainer,
        SongListContainer,
        StyledInput,
        SongList,
        SongListTitle,
        SongLabel,
        SongListItem,
        SongUploadButton,
        IconButton,
        SongActionButtons,
        AudioPlayerContainer,
    };
