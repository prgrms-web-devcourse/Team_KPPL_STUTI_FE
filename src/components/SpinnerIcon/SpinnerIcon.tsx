import { useTheme } from '@mui/material';

function SpinnerIcon() {
  const theme = useTheme();

  return (
    <svg viewBox='0 0 38 38' xmlns='https://www.w3.org/2000/svg' width='2rem'>
      <g fill='none' fillRule='evenodd'>
        <g transform='translate(1 1)'>
          <path
            d='M36 18c0-9.94-8.06-18-18-18'
            stroke={theme.palette.text.secondary}
            strokeWidth='2'
          >
            <animateTransform
              attributeName='transform'
              type='rotate'
              from='0 18 18'
              to='360 18 18'
              dur='0.75s'
              repeatCount='indefinite'
            />
          </path>
        </g>
      </g>
    </svg>
  );
}

export default SpinnerIcon;
