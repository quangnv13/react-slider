import React, { useState } from 'react';
import Slider from '@quangnv13/react-slider';

type Props = {};

export default function DefaultWithStep({}: Props) {
  const [currentValue, setCurrentValue] = useState(0);
  return (
    <>
      <div className="mt-5">
        <p className="mb-3">Default style</p>
        <div className="w-80 inline-block">
          <Slider
            min={0}
            max={4}
            onChange={setCurrentValue}
            step={1}
            marks
          ></Slider>
        </div>
        <span className="ml-10">{currentValue}</span>
      </div>
    </>
  );
}
