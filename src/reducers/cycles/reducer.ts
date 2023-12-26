import { produce } from 'immer'

import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  completeDate?: Date
}

interface cycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: cycleState, action: any) {
  const currentActiveCycle = state.cycles.findIndex(
    (cycle) => cycle.id === state.activeCycleId,
  )

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      return produce(state, (draft) => {
        draft.cycles[currentActiveCycle].completeDate = new Date()
        draft.activeCycleId = null
      })
    }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null,
      // } METODO SEM O IMMER

      return produce(state, (draft) => {
        draft.cycles[currentActiveCycle].interruptDate = new Date()
        draft.activeCycleId = null
      })

      // MESMA AÇÃO USANDO O IMMER
    }

    default:
      return state
  }
}
