import React from 'react';
import PropTypes from 'prop-types';
import {
  ControlsWrapper,
  WraperFlex,
  ControlsInput,
  ControlBtn,
} from './Controls.styles';

const Controls = ({ value, hendelChenge, onDeposit, onWithdrawal, error }) => {
  return (
    <ControlsWrapper>
      <div className="container">
        <WraperFlex>
          <ControlsInput
            err={error}
            value={value === 0 ? '' : value}
            onChange={({ target }) => hendelChenge(target.value)}
            step="10"
            type="number"
            placeholder="Сумма транзакции..."
          />
          <ControlBtn onClick={onDeposit} type="button">
            Deposit
          </ControlBtn>
          <ControlBtn onClick={onWithdrawal} type="button">
            Withdraw
          </ControlBtn>
        </WraperFlex>
      </div>
    </ControlsWrapper>
  );
};

Controls.propTypes = {
  value: PropTypes.number.isRequired,
  hendelChenge: PropTypes.func.isRequired,
  onDeposit: PropTypes.func.isRequired,
  onWithdrawal: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default Controls;
