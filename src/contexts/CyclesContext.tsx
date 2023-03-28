import {
  createContext,
  ReactNode,
  useCallback,
  useReducer,
  useState,
} from 'react';

import { cyclesReducer, ICycle } from '../reducers/cycles/reducer';
import {
  addNewCycleAction,
  interruptedCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions';

interface ICreateCycleData {
  task: string;
  minutesAmount: number;
}

interface ICycleContextData {
  cycles: ICycle[];
  activeCycle: ICycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  makeCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: ({ task, minutesAmount }: ICreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface ICyclesContextProps {
  children: ReactNode;
}

const CyclesContext = createContext({} as ICycleContextData);

const CyclesContextProvider = ({ children }: ICyclesContextProps) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  // FUNCTIONS
  const makeCurrentCycleAsFinished = useCallback(() => {
    dispatch(markCurrentCycleAsFinishedAction());
  }, []);

  const setSecondsPassed = useCallback((seconds: number) => {
    setAmountSecondsPassed(seconds);
  }, []);

  const createNewCycle = useCallback(
    ({ task, minutesAmount }: ICreateCycleData) => {
      const id = String(new Date().getTime());

      const newCycle: ICycle = {
        id,
        task,
        minutesAmount,
        startDate: new Date(),
      };

      dispatch(addNewCycleAction(newCycle));

      setAmountSecondsPassed(0);
    },
    [],
  );

  const interruptCurrentCycle = useCallback(() => {
    dispatch(interruptedCurrentCycleAction());

    document.title = 'Ignite Timer';
  }, []);
  // END FUNCTIONS

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        makeCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export { CyclesContext, CyclesContextProvider };
