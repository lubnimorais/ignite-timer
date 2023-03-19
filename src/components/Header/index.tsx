import { NavLink } from 'react-router-dom';

import { Timer, Scroll } from 'phosphor-react';

import { HeaderContainer } from './styles';

import logoIginte from '../../assets/logo-ignite.svg';

const Header = () => {
  return (
    <HeaderContainer>
      <img src={logoIginte} alt="" />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};

export { Header };
