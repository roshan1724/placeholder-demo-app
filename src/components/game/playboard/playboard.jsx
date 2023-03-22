import React from 'react';
import OptionState from '../../../context/options/option-state';
import UserState from '../../../context/user/user-state';
import Container from './Container/Container';

function Playboard() {
  return (
    <UserState>
      <OptionState>
        <Container />
      </OptionState>
    </UserState>
  );
}

export default Playboard;