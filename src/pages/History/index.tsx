import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { CyclesContext } from '../../contexts/CyclesContext'

import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        {cycles.length <= 0 ? (
          <h1>Não há nenhum histórico de ciclos</h1>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Início</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {cycles.map((cycle) => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount}</td>
                    <td>
                      {formatDistanceToNow(cycle.startDate, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </td>
                    <td>
                      {cycle.completeDate && (
                        <Status statusColor={'green'}>Concluído</Status>
                      )}

                      {cycle.interruptDate && (
                        <Status statusColor={'red'}>Interrompido</Status>
                      )}

                      {!cycle.completeDate && !cycle.interruptDate && (
                        <Status statusColor={'yellow'}>Em andamento</Status>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </HistoryList>
    </HistoryContainer>
  )
}
