import React from 'react';
import PropTypes from 'prop-types';
import {
  BalanceWrapper,
  BalanceContent,
  CellBalanse,
  Icon,
} from './Balance.styles';

const Balance = ({ depositBalance, withdrawalBalance }) => {
  return (
    <BalanceWrapper>
      <div className="container">
        <BalanceContent>
          <p>
            <CellBalanse>
              <Icon color="green"> ⬆ </Icon> {depositBalance}$
            </CellBalanse>
            <CellBalanse>
              <Icon> ⬇ </Icon> {withdrawalBalance}$
            </CellBalanse>
            <CellBalanse>
              Balance: <strong>{depositBalance - withdrawalBalance}</strong>$
            </CellBalanse>
          </p>
        </BalanceContent>
      </div>
    </BalanceWrapper>
  );
};

Balance.propTypes = {
  depositBalance: PropTypes.number.isRequired,
  withdrawalBalance: PropTypes.number.isRequired,
};

export default Balance;
