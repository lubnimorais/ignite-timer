import { useCallback } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';

import { Play } from 'phosphor-react';

import {
  HomeContainer,
  FormContainer,
  TaskInput,
  MinutesAmountInput,
  CountDownContainer,
  Separator,
  StartCountDownButton,
} from './styles';

type IFormSubmit = {
  task: string;
  minutesAmount: string;
};

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O intervalor precisa ser de no mínimo 5 minutos')
    .max(60, 'O intervalor precisa ser de no máximo 60 minutos'),
});

const Home = () => {
  const { register, handleSubmit, watch } = useForm<IFormSubmit>({
    resolver: zodResolver(newCycleFormValidationSchema),
  });

  // const { errors } = formState;
  let isSubmitDisabled = true;
  const task = watch('task');
  if (task) {
    isSubmitDisabled = !task.trim();
  }

  // FUNCTIONS
  const handleCreateNewCycle: SubmitHandler<IFormSubmit> = useCallback(
    (data) => {
      console.log('Task: ', data);
      // console.log('Minutes Amount: ', minutesAmount);
    },
    [],
  );
  // FUNCTIONS

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Melancia" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
};

export { Home };
