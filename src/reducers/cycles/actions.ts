import { ICycle } from './reducer';

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: ICycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  };
}

export function interruptedCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  };
}

// NOTE - TIPANDO O ACTION
// interface newCycleActionProps {
//   type: ActionTypes.ADD_NEW_CYCLE
//   payload: { newCycle: Cycle }
// }

// interface markCurrentCycleFinishedProps {
//   type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED
// }

// interface interruptedCycleActionProps {
//   type: ActionTypes.INTERRUPT_CURRENT_CYCLE
// }

// export type ActionsProp =
//   | newCycleActionProps
//   | markCurrentCycleFinishedProps
//   | interruptedCycleActionProps

// export function addNewCycleAction(newCycle: Cycle): newCycleActionProps{}

// export function markCurrentCycleAsFinishedAction(): markCurrentCycleFinishedProps {}

// export function interruptedCycleAction(): interruptedCycleActionProps {}
