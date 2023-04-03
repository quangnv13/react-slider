function arrayFromNumber(num: number) {
  return Array.from(Array(num).keys());
}
export function calculatePercentageFromValue(value: number, max: number) {
  return (value / max) * 100;
}

function calculateValueFromPercentage(percentage: number, max: number) {
  return (percentage / 100) * max;
}

export function activeStepClass(active: boolean) {
  return `${active ? 'bg-[#ff8200] border-[#ff8200]' : 'border-[#979797]'}`;
}

export function calculateStep(stepValue: number, max: number) {
  if (max % stepValue !== 0) {
    console.warn(
      `RangeSlider: ${max} division ${stepValue} is not an integer!`,
    );
    return [];
  }
  if (stepValue === 0) {
    return [];
  }
  const stepCount = max / stepValue;
  const originStepArray = arrayFromNumber(stepCount).map(
    (step) => step * stepValue,
  );
  return [...originStepArray, max];
}

export function initDragThumb(
  thumbELement: HTMLElement,
  trackElement: HTMLDivElement,
  valueChangeCallback: (value: number) => void,
  min: number,
  max: number,
  steps: number[],
) {
  let x1 = 0,
    x2 = 0;
  let currentStepValue = min;
  const halfStepValue = steps[1] / 2;
  const trackWidth = trackElement.offsetWidth;
  const stepPositionMap: { [key: number]: number } = steps.reduce(
    (acc, curr) => {
      return {
        ...acc,
        [curr]:
          (calculatePercentageFromValue(curr, max) / 100) *
            trackElement.clientWidth -
          thumbELement.clientWidth / 2,
      };
    },
    {},
  );

  thumbELement.onmousedown = dragMouseDown;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    x2 = e.clientX;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function elementDrag(e: any) {
    const trackLeftPosition = trackElement.getBoundingClientRect().left;
    const thumbLeftPosition =
      thumbELement.offsetLeft + thumbELement.offsetWidth / 2;
    e = e || window.event;
    e.preventDefault();
    if (
      e.clientX < trackElement.offsetLeft ||
      e.clientX > trackElement.offsetLeft + trackElement.offsetWidth
    ) {
      return;
    }

    x1 = x2 - e.clientX;
    x2 = e.clientX;

    const distanceCursorMoved = x2 - trackLeftPosition;
    const value = calculateValueFromPercentage(
      (distanceCursorMoved / trackWidth) * 100,
      max,
    );

    if (steps.length !== 0) {
      const key =
        steps.find(
          (s) =>
            s !== 0 &&
            s - value >= -halfStepValue &&
            s - value <= halfStepValue,
        ) || 0;
      thumbELement.style.left = `${stepPositionMap[key]}px`;

      if (key !== currentStepValue) {
        currentStepValue = key;
        if (stepPositionMap[key] <= 0) {
          valueChangeCallback(min);
        } else if (stepPositionMap[key] >= trackElement.clientWidth) {
          valueChangeCallback(max);
        } else {
          valueChangeCallback(key);
        }
      }
    } else {
      const leftPosition = thumbELement.offsetLeft - x1;
      const leftXCoordinate = leftPosition + thumbELement.offsetWidth / 2;
      const value = calculateValueFromPercentage(
        (leftXCoordinate / trackWidth) * 100,
        max,
      );

      thumbELement.style.left = `${leftPosition}px`;

      if (thumbLeftPosition <= 0) {
        valueChangeCallback(min);
      } else if (thumbLeftPosition >= trackElement.clientWidth) {
        valueChangeCallback(max);
      } else {
        valueChangeCallback(value);
      }
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
