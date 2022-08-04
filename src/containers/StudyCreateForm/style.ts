import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import styled from '@emotion/styled';

export const StudyCreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 1rem;
  gap: 2rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TopicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LocationWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

export const PeopleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MbtiWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MbtiHeadingWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 296px;
  height: 200px;
  border-radius: 0.5rem;
  border: 1px solid;
  border-color: ${({ theme }) => theme.palette.grey[300]};
  align-items: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
`;

export const CameraIcon = styled(CameraAltOutlinedIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StudyDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.palette.error.main};
`;
