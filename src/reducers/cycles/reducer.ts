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
  switch (action.type) {
    case 'ADD_NEW_CYCLE':
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case 'MARK_CURRENT_CYCLE_AS_FINISHED': {
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, completeDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    }

    case 'INTERRUPT_CURRENT_CYCLE': {
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    }

    default:
      return state
  }
}
