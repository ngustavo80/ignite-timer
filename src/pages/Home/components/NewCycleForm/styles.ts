import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;

  flex-wrap: wrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 1.125rem;
  font-weight: 700;
  color: ${(props) => props.theme['gray-100']};
`
const BaseInput = styled.input`
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  padding: 0 0.5rem;

  background: transparent;
  font-size: 1.125rem;
  color: ${(props) => props.theme['gray-100']};

  &::placeholder {
    color: ${(props) => props.theme['grat-500']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  } /* Tirar a setinha da direita do input */
`
export const MinuteAmountInput = styled(BaseInput)`
  width: 4rem;
`
