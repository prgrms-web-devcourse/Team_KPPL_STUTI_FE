import Lottie from 'react-lottie-player';
import Typography from '@mui/material/Typography';
import LotttieHighFiveJson from '@assets/imgs/high-five.json';

import { Section, Banner, Title } from './HeroSection.style';

function HeroSection() {
  return (
    <Section>
      <Banner>
        <Title>
          <Typography
            color='primary'
            sx={{
              marginBottom: '0.75rem',
              fontWeight: 500,
              fontSize: '1.25rem',
              lineHeight: 1,
            }}
          >
            MBTI기반 스터디 모집 서비스
          </Typography>
          <Typography
            sx={{
              marginBottom: '2rem',
              fontWeight: 700,
              fontSize: '2.25rem',
              lineHeight: 1,
            }}
          >
            스터티아이
          </Typography>
          <Typography
            sx={{
              lineHeight: 1.75,
            }}
          >
            당신의 성장을 함께할
            <br />딱 맞는 <strong>스터디 단짝</strong>을 찾아보세요
          </Typography>
        </Title>
        <Lottie
          loop
          animationData={LotttieHighFiveJson}
          play
          style={{ width: 280, height: 280 }}
        />
      </Banner>
    </Section>
  );
}
export default HeroSection;
