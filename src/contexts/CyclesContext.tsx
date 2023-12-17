import { createContext, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  completeDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  passedSeconds: number
  markCurrentCycleAsFinished: () => void
  setSeconds: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interuptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: React.ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [passedSeconds, setPassedSeconds] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setPassedSeconds(0)

    // reset()
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, completeDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function setSeconds(seconds: number) {
    setPassedSeconds(seconds)
  }

  function interuptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycleId,
        passedSeconds,
        activeCycle,
        interuptCurrentCycle,
        createNewCycle,
        markCurrentCycleAsFinished,
        setSeconds,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
