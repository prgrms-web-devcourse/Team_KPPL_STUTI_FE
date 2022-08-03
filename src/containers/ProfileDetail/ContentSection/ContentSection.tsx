import { useState, MouseEvent } from 'react';

import StudyTab from '../StudyTab/StudyTab';
import PostTab from '../PostTab/PostTab';

import { Nav, Button } from './ContentSection.style';

function ContentSection() {
  const [tab, setTab] = useState<'study' | 'post'>('study');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const newTab = e.currentTarget.dataset.value as 'study' | 'post';
    setTab(newTab);
  };
  return (
    <>
      <Nav>
        <Button
          selected={tab === 'study'}
          data-value='study'
          onClick={handleClick}
        >
          스터디
        </Button>
        <Button
          selected={tab === 'post'}
          data-value='post'
          onClick={handleClick}
        >
          게시물
        </Button>
      </Nav>
      <>
        {tab === 'study' && <StudyTab />}
        {tab === 'post' && <PostTab />}
      </>
    </>
  );
}

export default ContentSection;
