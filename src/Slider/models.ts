import { ReactNode } from 'react';

export type MarkProps = {
  stepIndex: number;
  stepValue: number;
  isActive: boolean;
  rangeSliderStepId: string;
  stepLeftPos: string;
  bgColor: string;
};

export type SliderProps = {
  min: number;
  max: number;
  step?: number;
  onChange?: (value: number) => void;
  value?: number;
  trackWidth?: number;
  trackColor?: string;
  marks?: boolean;
  hiddenMarks?: number[];
  children?: ReactNode;
  renderMark?: (props: MarkProps) => ReactNode;
  renderThumb?: (value?: number) => ReactNode;
};
