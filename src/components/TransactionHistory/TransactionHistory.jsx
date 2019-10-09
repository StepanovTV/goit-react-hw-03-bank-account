import React from 'react';
import PropTypes from 'prop-types';
import {
  TransactionHistoryWrapper,
  TableTransaction,
} from './TransactionHistory.styles';

const TransactionHistory = ({ transactionList }) => {
  return (
    <TransactionHistoryWrapper>
      <div className="container">
        <TableTransaction>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionList.map(ele => (
              <tr key={ele.id}>
                <td>{ele.type}</td>
                <td>{ele.amount}$</td>
                <td>{ele.date}</td>
              </tr>
            ))}
          </tbody>
        </TableTransaction>
      </div>
    </TransactionHistoryWrapper>
  );
};

TransactionHistory.propTypes = {
  transactionList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TransactionHistory;
