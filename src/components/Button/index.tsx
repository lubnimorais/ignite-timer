import { ButtonContainer, ButtonVariant } from "./styles"

interface ButtonProps {
  variant?: ButtonVariant;
}

const Button = ({ variant = 'primary'}: ButtonProps) => {
  return (
    <ButtonContainer variant={variant}>Enviar</ButtonContainer>
  )
}

export { Button}