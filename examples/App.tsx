import React from 'react';
import Slider from '../src/Slider';
type Props = {};

export default function App({}: Props) {
  return (
    <div>
      <Slider min={0} max={4}></Slider>
    </div>
  );
}
