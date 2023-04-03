import React, { useEffect, useMemo, useRef, useState } from 'react';
import { defaultThumbBase64 } from './constants';
import {
  activeStepClass,
  calculatePercentageFromValue,
  calculateStep,
  initDragThumb,
} from './functions';
import { SliderProps } from './models';
import useWindowSize from 'src/hooks/useWindowSize';

export default function Slider(props: SliderProps) {
  const steps = useMemo(() => calculateStep(props.step || 0, props.max), []);
  const trackColor = props.trackColor || '#979797';

  const thumbButtonRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(props.value || props.min);

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  function initSlider() {
    if (thumbButtonRef.current && trackRef.current) {
      const thumbWidth = thumbButtonRef.current.clientWidth;
      thumbButtonRef.current.style.left = `${-thumbWidth / 2}px`;
      initDragThumb({
        thumbELement: thumbButtonRef.current,
        trackElement: trackRef.current,
        valueChangeCallback: (value) => {
          setValue(value);
          if (props.onChange) {
            props.onChange(value);
          }
        },
        min: props.min,
        max: props.max,
        steps,
        value,
      });
    }
  }

  useEffect(() => {
    initSlider();
  }, [value]);

  useWindowSize(() => {
    initSlider();
  });

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        className="w-full relative hover:cursor-pointer"
        style={{
          height: props.trackWidth || 2,
          backgroundColor: trackColor,
        }}
      >
        {props.children}
        {steps.map((stepValue, index) => {
          const stepLeftPos = calculatePercentageFromValue(
            stepValue,
            props.max,
          );
          const rangeSliderStepId = 'range-slider-step-' + index;
          return (
            <React.Fragment key={rangeSliderStepId}>
              {props.marks &&
                !props.renderMark &&
                !props.hiddenMarks?.includes(stepValue) && (
                  <>
                    <div
                      id={rangeSliderStepId}
                      className="absolute top-1/2 -translate-y-1/2 h-5 w-0.5"
                      style={{
                        backgroundColor: trackColor,
                        left: `${stepLeftPos}%`,
                      }}
                    ></div>
                    <div
                      className="absolute text-[#393939] text-xl font-bold top-8 -translate-x-1/2"
                      style={{ left: `${stepLeftPos}%` }}
                    >
                      {stepValue}
                    </div>
                  </>
                )}
              {props.marks &&
                props.renderMark &&
                !props.hiddenMarks?.includes(stepValue) &&
                props.renderMark({
                  stepIndex: index,
                  isActive: stepValue === value,
                  rangeSliderStepId,
                  stepLeftPos: `${stepLeftPos}%`,
                  stepValue,
                  bgColor: trackColor,
                })}
            </React.Fragment>
          );
        })}
        {!props.renderThumb && (
          <div
            ref={thumbButtonRef}
            className="absolute top-1/2 -translate-y-1/2 w-[50px] h-[50px] hover:scale-125 cursor-grabbing transition-transform bg-contain"
            style={{ backgroundImage: `url(${defaultThumbBase64})` }}
          ></div>
        )}
        {props.renderThumb && (
          <div
            ref={thumbButtonRef}
            className="absolute top-1/2 -translate-y-1/2"
          >
            {props.renderThumb(value)}
          </div>
        )}
      </div>
    </div>
  );
}
