import Slider from '@quangnv13/react-slider';
import '@quangnv13/react-slider/dist/default.css';
import './index.css';
import { useState } from 'react';
type Props = {};

export default function App({}: Props) {
  const [currentValue, setCurrentValue] = useState(0);
  return (
    <div className="max-w-[1000px] py-2 px-5">
      <h1 className="text-gray-800 font-bold text-2xl">
        Accessible react slider demo
      </h1>
      <div className="mt-5">
        <p className="mb-3">Default style</p>
        <div className="w-80 inline-block">
          <Slider min={0} max={4} onChange={setCurrentValue}></Slider>
        </div>
        <span className="ml-10">{currentValue}</span>
      </div>
      <div className="mt-10">
        <p className="mb-3">Default style with step</p>
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
    </div>
  );
}
