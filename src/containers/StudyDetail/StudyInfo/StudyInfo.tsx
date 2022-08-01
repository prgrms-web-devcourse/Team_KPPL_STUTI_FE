import {
  StudyInfoContainer,
  StudyInfoIconWrapper,
  StudyInfoWrapper,
} from '@src/containers/StudyDetail/StudyInfo/style';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LaptopIcon from '@mui/icons-material/Laptop';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { detailStudyPeriodType } from '@interfaces/studyDetail';

interface Props {
  isOnline: boolean;
  region: string;
  studyPeriod: detailStudyPeriodType;
  numberOfMembers: number;
  numberOfRecruits: number;
}

function StudyInfo({
  isOnline,
  region,
  studyPeriod,
  numberOfMembers,
  numberOfRecruits,
}: Props) {
  return (
    <StudyInfoContainer>
      {isOnline ? (
        <StudyInfoWrapper>
          <StudyInfoIconWrapper>
            <LaptopIcon fontSize='small' />
            <div>진행방식</div>
          </StudyInfoIconWrapper>
          <div>온라인</div>
        </StudyInfoWrapper>
      ) : (
        <StudyInfoWrapper>
          <StudyInfoIconWrapper>
            <LocationOnIcon fontSize='small' />
            <div>모임지역</div>
          </StudyInfoIconWrapper>
          <div>{region}</div>
        </StudyInfoWrapper>
      )}
      <StudyInfoWrapper>
        <StudyInfoIconWrapper>
          <CalendarTodayIcon fontSize='small' />
          <div>예상기간</div>
        </StudyInfoIconWrapper>
        <div>{`${studyPeriod.startDate} ~ ${studyPeriod.endDate}`}</div>
      </StudyInfoWrapper>
      <StudyInfoWrapper>
        <StudyInfoIconWrapper>
          <PersonOutlineIcon fontSize='small' />
          <div>모집인원</div>
        </StudyInfoIconWrapper>
        <div>{`${numberOfMembers}/${numberOfRecruits}`}</div>
      </StudyInfoWrapper>
    </StudyInfoContainer>
  );
}

export default StudyInfo;
