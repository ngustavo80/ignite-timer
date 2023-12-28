import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { CyclesContext } from '../../contexts/CyclesContext'

import { EmptyHistory, HistoryContainer, HistoryList, Status } from './styles'
import { BookOpen } from 'phosphor-react'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        {cycles.length <= 0 ? (
          <EmptyHistory>
            <div>
              <span>Nenhum histórico a ser exibido</span>
              <BookOpen size={48} />
            </div>
          </EmptyHistory>
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
                    <td>{cycle.minutesAmount} minutos</td>
                    <td>
                      {formatDistanceToNow(new Date(cycle.startDate), {
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
