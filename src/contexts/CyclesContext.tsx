import { createContext, useEffect, useReducer, useState } from 'react'

import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  markCurrentCycleAsFinishedAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  passedSeconds: number
  markCurrentCycleAsFinished: () => void
  setSeconds: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: React.ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const localStorageStoredCycleData = localStorage.getItem(
        '@ignite-timer:cycle-state-1.0.0',
      )

      if (localStorageStoredCycleData) {
        return JSON.parse(localStorageStoredCycleData)
      }

      return initialState
    },
  )

  useEffect(() => {
    const cycleStateAsJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycle-state-1.0.0', cycleStateAsJSON)
  }, [cyclesState])

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cyclesState.cycles.find(
    (cycle) => cycle.id === activeCycleId,
  )

  const [passedSeconds, setPassedSeconds] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    // setCycles((state) => [...state, newCycle])

    dispatch(addNewCycleAction(newCycle))

    setPassedSeconds(0)
  }

  function markCurrentCycleAsFinished() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, completeDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )

    dispatch(markCurrentCycleAsFinishedAction())
  }

  function setSeconds(seconds: number) {
    setPassedSeconds(seconds)
  }

  function interruptCurrentCycle() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )

    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycleId,
        passedSeconds,
        activeCycle,
        interruptCurrentCycle,
        createNewCycle,
        markCurrentCycleAsFinished,
        setSeconds,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
