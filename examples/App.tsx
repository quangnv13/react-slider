import React from 'react';
import Slider from '@quangnv13/react-slider';
type Props = {};

export default function App({}: Props) {
  return (
    <div>
      <Slider min={0} max={4}></Slider>
    </div>
  );
}
