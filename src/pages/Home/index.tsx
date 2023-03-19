import { useCallback, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { differenceInSeconds } from 'date-fns';

import { HandPalm, Play } from 'phosphor-react';

import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';

// type INewCycleFormData = {
//   task: string;
//   minutesAmount: number;
// };

interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

const Home = () => {
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  // const { errors } = formState;
  let isSubmitDisabled = true;
  const task = watch('task');
  if (task) {
    isSubmitDisabled = !task.trim();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutosAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutosAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  // FUNCTIONS
  const handleCreateNewCycle: SubmitHandler<TNewCycleFormData> = useCallback(
    ({ task, minutesAmount }) => {
      const id = String(new Date().getTime());

      const newCycle: ICycle = {
        id,
        task,
        minutesAmount,
        startDate: new Date(),
      };

      setCycles((oldState) => [...oldState, newCycle]);
      setActiveCycleId(id);
      setAmountSecondsPassed(0);

      reset();
      // console.log('Minutes Amount: ', minutesAmount);
    },
    [reset],
  );

  const handleInterruptCycle = useCallback(() => {
    setCycles((oldState) =>
      oldState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );

    setActiveCycleId(null);
    document.title = 'Ignite Timer';
  }, [activeCycleId]);
  // FUNCTIONS

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer [${minutes}:${seconds}]`;
    }
  }, [activeCycle, minutes, seconds]);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />

        <Countdown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
};

export { Home };
