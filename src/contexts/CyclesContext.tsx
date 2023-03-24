import { createContext, ReactNode, useCallback, useState } from 'react';

interface ICreateCycleData {
  task: string;
  minutesAmount: number;
}

interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
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
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  // FUNCTIONS
  const makeCurrentCycleAsFinished = useCallback(() => {
    setCycles((oldState) =>
      oldState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );
  }, [activeCycleId]);

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

      setCycles((oldState) => [...oldState, newCycle]);
      setActiveCycleId(id);
      setAmountSecondsPassed(0);

      // reset();
      // console.log('Minutes Amount: ', minutesAmount);
    },
    [],
  );

  const interruptCurrentCycle = useCallback(() => {
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
