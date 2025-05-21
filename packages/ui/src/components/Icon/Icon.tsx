import { SVGProps } from 'react';
import clsx from 'clsx';
import styled from '@emotion/styled';
import { icons } from './assets';

type IconName = keyof typeof icons;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  fill?: string;
  stroke?: string;
  size?: number;
  width?: number | string;
  height?: number | string;
}

const IconContainer = styled.svg<IconProps>`
  width: ${({ width, size }) =>
    typeof width !== 'undefined'
      ? typeof width === 'number'
        ? `${width}px`
        : width
      : size
        ? `${size}px`
        : 'auto'};

  height: ${({ height, size }) =>
    typeof height !== 'undefined'
      ? typeof height === 'number'
        ? `${height}px`
        : height
      : size
        ? `${size}px`
        : 'auto'};

  path {
    fill: ${({ fill }) => fill};
    stroke: ${({ stroke }) => stroke || 'none'};
  }
`;

const Icon = ({
  name,
  fill,
  stroke,
  size,
  width,
  height,
  className,
  ...rest
}: IconProps) => {
  const SVG = icons[name];

  return (
    <IconContainer
      className={clsx(className)}
      fill={fill}
      stroke={stroke}
      size={size}
      width={width}
      height={height}
      name={name}
      {...rest}
    >
      <SVG width="100%" height="100%" />
    </IconContainer>
  );
};

export { Icon };
