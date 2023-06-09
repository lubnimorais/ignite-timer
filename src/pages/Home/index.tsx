import { useCallback, useContext } from 'react';

import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';

import { CyclesContext } from '../../contexts/CyclesContext';

import { HandPalm, Play } from 'phosphor-react';

import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O intervalor precisa ser de no mínimo 5 minutos')
    .max(60, 'O intervalor precisa ser de no máximo 60 minutos'),
});

type INewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const Home = () => {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<INewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  // const { errors } = formState;
  let isSubmitDisabled = true;

  const task = watch('task');
  if (task) {
    isSubmitDisabled = !task.trim();
  }

  // FUNCTIONS
  const handleCreateNewCycle = useCallback(
    ({ task, minutesAmount }: INewCycleFormData) => {
      createNewCycle({ task, minutesAmount });

      reset();
    },
    [createNewCycle, reset],
  );
  // FUNCTIONS

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
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

export { Home, CyclesContext };
