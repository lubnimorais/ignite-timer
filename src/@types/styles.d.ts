import 'styled-components';

import { defaultThemes } from '../styles/themes/default';

type ThemeType = typeof defaultThemes;

/**
 * Estamos criando uma tipagem para o módulo 'styles-components'
 * Então todos os arquivos que utilizar o 'styled-component' a tipagem que ele vai puxar
 * vai ser a que estamos definindo aqui
 * Como estamos somente sobrescrever algo de dentro e não criar toda uma tipagem nova,
 * importamos o 'styled-components' e declaramos ele.
 * Se não tivesse importado, estaríamos meio que criando do zero a definição de tipos
 * do pacote 'styled-components'
 * Mas queremos pegar o que já tem e colocar uma coisa nova, sobrescrever algo
 */
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
