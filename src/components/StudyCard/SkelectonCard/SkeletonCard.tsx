import Skeleton from '@mui/material/Skeleton';
import PhotoIcon from '@mui/icons-material/Photo';
import { MbtiTag } from '@components';

import {
  Article,
  Flex,
  LeftColumn,
  P,
  H3,
  Ul,
  RightColumn,
  Img,
  DefaultBackground,
} from './SklectonCard.style';
// import MoreButton from './MoreButton/MoreButton';

function StudyCard() {
  return (
    <Article>
      <Flex>
        <LeftColumn>
          <div>
            {/* <Skeleton
              variant='rectangular'
              width='75%'
              height='1rem'
              sx={{ mb: '0.25rem' }}
            /> */}
            <Skeleton
              variant='rectangular'
              width='100%'
              height='1.75rem'
              sx={{ mb: '0.25rem' }}
            />
            <Ul>
              {Array.from({ length: 3 }, (_, i) => i).map((i) => (
                <li key={i}>
                  <Skeleton
                    variant='rectangular'
                    width='3.5rem'
                    height='1.5rem'
                    sx={{ borderRadius: '1rem' }}
                  />
                </li>
              ))}
            </Ul>
          </div>
          <div>
            {/* <Skeleton
              variant='rectangular'
              width='100%'
              height='1rem'
              sx={{ mb: '0.25rem' }}
            /> */}
            <Skeleton
              variant='rectangular'
              width='100%'
              height='1rem'
              sx={{ mb: '0.25rem' }}
            />
            <Skeleton variant='rectangular' width='50%' height='1rem' />
          </div>
        </LeftColumn>
        <RightColumn>
          <Skeleton variant='rectangular' width='100%' height='100%' />
        </RightColumn>
      </Flex>
    </Article>
  );
}

export default StudyCard;
