import styled from 'styled-components';

export const UploadImageButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const AssignImageButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ImageCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f8f9fa;
`;

export const ImageTitle = styled.h4`
  margin: 10px 0;
  font-size: 1.2rem;
  text-align: center;
`;

export const UploadPreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 5px;
  margin-bottom: 10px;
`;