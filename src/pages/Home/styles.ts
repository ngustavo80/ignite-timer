import { styled } from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`
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

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  font-weight: 700;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem 0;
  width: 4rem;
  overflow: hidden;
  color: ${(props) => props.theme['green-500']};
`

export const StartButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: 100%;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  border: 0;

  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
