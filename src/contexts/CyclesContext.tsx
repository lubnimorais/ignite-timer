import {
  createContext,
  ReactNode,
  useCallback,
  useReducer,
  useState,
} from 'react';

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

interface CyclesState {
  cycles: ICycle[];
  activeCycleId: string | null;
}

const CyclesContext = createContext({} as ICycleContextData);

const CyclesContextProvider = ({ children }: ICyclesContextProps) => {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };
        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };
        default:
          return state;
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  // FUNCTIONS
  const makeCurrentCycleAsFinished = useCallback(() => {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    });
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

      dispatch({
        type: 'ADD_NEW_CYCLE',
        payload: {
          newCycle,
        },
      });

      setAmountSecondsPassed(0);
    },
    [],
  );

  const interruptCurrentCycle = useCallback(() => {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    });

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
