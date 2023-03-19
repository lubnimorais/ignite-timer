import styled from 'styled-components';

export const HomeContainer = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 3.5rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  // quando a tela for menor, quebra
  flex-wrap: wrap;

  gap: 0.5rem;

  font-size: 1.125rem;
  font-weight: bold;
  color: ${({ theme }) => theme['gray-100']};
`;

const BaseInput = styled.input`
  height: 2.5rem;

  background: transparent;

  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};

  font-size: 1.125rem;
  font-weight: bold;
  color: ${({ theme }) => theme['gray-100']};

  padding: 0 0.5rem;

  &:focus {
    box-shadow: none;

    border-color: ${({ theme }) => theme['green-500']};
  }

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;

export const CountDownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background: ${({ theme }) => theme['gray-700']};

    padding: 2rem 1rem;

    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  width: 4rem;

  padding: 2rem 0;

  color: ${({ theme }) => theme['green-500']};

  overflow: hidden;

  display: flex;
  justify-content: center;
`;

export const StartCountDownButton = styled.button`
  width: 100%;

  border: 0;
  border-radius: 8px;

  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  font-weight: bold;

  cursor: pointer;

  background: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme['gray-100']};

  transition: background 0.3s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${({ theme }) => theme['green-700']};
  }
`;
