import { useSelector } from 'react-redux';
import { selectUser } from '@store/slices/user';
import {
  HomeHeroSection,
  HomeStudyListSection,
  HomeStudyCreateButton,
} from '@containers';

import { Position } from './Home.style';
export function Home() {
  const { isLogin } = useSelector(selectUser);
  return (
    <Position>
      <HomeHeroSection />
      <HomeStudyListSection />
      {isLogin && <HomeStudyCreateButton />}
    </Position>
  );
}

export default Home;
