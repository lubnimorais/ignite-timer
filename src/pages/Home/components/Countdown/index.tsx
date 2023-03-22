import { useContext, useEffect, useState } from 'react';

import { differenceInSeconds } from 'date-fns';

import { CyclesContext } from '../..';

import { CountdownContainer, Separator } from './styles';

const Countdown = () => {
  const { activeCycle, activeCycleId, makeCurrentCycleAsFinished } =
    useContext(CyclesContext);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutosAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutosAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer [${minutes}:${seconds}]`;
    }
  }, [activeCycle, minutes, seconds]);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        );

        if (secondsDifference >= totalSeconds) {
          makeCurrentCycleAsFinished();
          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId, makeCurrentCycleAsFinished]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
};

export { Countdown };
