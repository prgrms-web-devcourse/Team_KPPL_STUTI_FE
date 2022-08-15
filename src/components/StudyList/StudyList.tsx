import { forwardRef } from 'react';
import { StudyListType, RoleType } from '@interfaces/studyList';
import { StudyCard, SkeletonStudyCard, ItemCard } from '@components';

import { Ul } from './StudyList.style';

interface Props {
  studyList: StudyListType;
  error: boolean;
  loading: boolean;
  role?: RoleType;
  onStudyDelete: (studyId: number) => void;
}

export type Ref = HTMLLIElement;

const StudyList = forwardRef<Ref, Props>(function StudyList(
  { studyList, loading, error, role, onStudyDelete },
  ref,
) {
  return (
    <Ul>
      {studyList.length !== 0 &&
        studyList.map((studyItem, index) =>
          index === studyList.length - 1 ? (
            <li ref={ref} key={studyItem.studyGroupId}>
              <StudyCard
                study={studyItem}
                role={role}
                onStudyDelete={onStudyDelete}
              />
            </li>
          ) : (
            <li key={studyItem.studyGroupId}>
              <StudyCard
                study={studyItem}
                role={role}
                onStudyDelete={onStudyDelete}
              />
            </li>
          ),
        )}
      {!loading && !error && studyList.length === 0 && (
        <li>
          <ItemCard>스터디 목록이 없습니다.</ItemCard>
        </li>
      )}
      {error && (
        <li>
          <ItemCard>
            서버로부터 스터디 정보를 불러오지 못했습니다. 잠시 후 다시 시도해
            주세요.
          </ItemCard>
        </li>
      )}
      {loading && (
        <li>
          <SkeletonStudyCard />
        </li>
      )}
    </Ul>
  );
});

export default StudyList;
