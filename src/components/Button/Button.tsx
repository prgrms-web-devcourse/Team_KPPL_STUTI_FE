import React from 'react';
import { CustomButton } from '@src/components/Button/style';

export interface styleProps {
  backgroundColor?: string;
  fontcolor?: string;
  width?: string;
  height?: string;
  hoverColor?: string;
}

export interface props extends styleProps {
  content: string;
  click: () => void;
}

function Button({
  content,
  backgroundColor,
  fontcolor,
  width,
  height,
  hoverColor,
  click,
}: props) {
  return (
    <CustomButton
      backgroundColor={backgroundColor}
      fontcolor={fontcolor}
      width={width}
      height={height}
      hoverColor={hoverColor}
      onClick={click}
    >
      {content}
    </CustomButton>
  );
}

export default Button;
