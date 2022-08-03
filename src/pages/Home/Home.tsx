import {
  HomeHeroSection,
  HomeStudyListSection,
  HomeStudyCreateButton,
} from '@containers';

import { Position } from './Home.style';
export function Home() {
  return (
    <Position>
      <HomeHeroSection />
      <HomeStudyListSection />
      <HomeStudyCreateButton />
    </Position>
  );
}

export default Home;
