import React, { Component } from 'react';
import shortId from 'shortid';
import { validate } from 'indicative/validator';
import { toast } from 'react-toastify';
import { DashbobrdWrapper } from './Dashbobrd.styles';
import Controls from '../Controls';
import Balance from '../Balance';
import TransactionHistory from '../TransactionHistory';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  draggable: true,
  pauseOnHover: false,
});

const rules = {
  transactionAmount: 'integer|accepted|above:9',
};

const messages = {
  integer: 'Должно бытьцелым числом',
  accepted: 'Введите сумму для проведения операции!',
  above: 'Cумма должна быть положительной и не меннее 10',
};

const dataNow = function dataNow() {
  const date = new Date();
  const day = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  const hoasjd = date.getHours();
  const minijs = date.getMinutes();

  return `${day}/${monthIndex}/${year} ${hoasjd}:${minijs}`;
};

class Dashbobrd extends Component {
  TransactionType = {
    DEPOSIT: 'deposit',
    WITHDRAWAL: 'withdrawal',
  };

  state = {
    transactionList: [],
    transactionAmount: 0,
    depositBalance: 0,
    withdrawalBalance: 0,
    hasError: '',
  };

  componentDidMount() {
    let historyTransaction;
    try {
      historyTransaction = localStorage.getItem('transactionList');
    } catch (e) {
      this.setState({ hasError: 'Unknown error localStorage' });
    }
    if (historyTransaction) {
      this.setState({ transactionList: JSON.parse(historyTransaction) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactionList, hasError } = this.state;
    if (prevState.transactionList !== transactionList) {
      try {
        localStorage.setItem(
          'transactionList',
          JSON.stringify(transactionList),
        );
      } catch (e) {
        throw new Error('Unknown error localStorage');
      }
      this.calculateTransactionBalance();
    }
    if (prevState.hasError !== hasError) {
      toast.error(hasError);
    }
  }

  calculateTransactionBalance = () => {
    const { transactionList } = this.state;

    const resultDeposit = transactionList.reduce((acum, ob) => {
      const summ =
        ob.type === this.TransactionType.DEPOSIT ? acum + ob.amount : acum;
      return summ;
    }, 0);

    const resultWithdrawal = transactionList.reduce((acum, ob) => {
      const summ =
        ob.type === this.TransactionType.WITHDRAWAL ? acum + ob.amount : acum;
      return summ;
    }, 0);

    this.setState({
      depositBalance: resultDeposit,
      withdrawalBalance: resultWithdrawal,
    });
  };

  hendelChenge = val => {
    this.setState({ transactionAmount: Number(val) });
  };

  pushNewTranzaction = transactionType => {
    const { transactionAmount } = this.state;
    validate({ transactionAmount }, rules, messages)
      .then(() => {
        this.setState(prevState => ({
          transactionList: [
            ...prevState.transactionList,
            this.createsTransactionObject(transactionType),
          ],
          hasError: '',
        }));
      })
      .catch(error => {
        this.setState({ hasError: error[0].message });
      })
      .finally(() => this.setState({ transactionAmount: 0 }));
  };

  createsTransactionObject = transactionType => {
    const { transactionAmount } = this.state;
    return {
      id: shortId(),
      type: transactionType,
      amount: transactionAmount,
      date: dataNow(),
    };
  };

  onDeposit = () => this.pushNewTranzaction(this.TransactionType.DEPOSIT);

  onWithdrawal = () => {
    const { transactionAmount, depositBalance, withdrawalBalance } = this.state;
    if (transactionAmount - (depositBalance - withdrawalBalance) < 0) {
      this.pushNewTranzaction(this.TransactionType.WITHDRAWAL);
    } else {
      this.setState({
        hasError: 'На счету недостаточно средств для проведения операции!',
      });
    }
  };

  render() {
    const {
      transactionList,
      transactionAmount,
      depositBalance,
      withdrawalBalance,
      hasError,
    } = this.state;
    return (
      <DashbobrdWrapper>
        <Controls
          value={transactionAmount}
          hendelChenge={this.hendelChenge}
          onDeposit={this.onDeposit}
          onWithdrawal={this.onWithdrawal}
          error={hasError}
        />
        <Balance
          depositBalance={depositBalance}
          withdrawalBalance={withdrawalBalance}
        />
        <TransactionHistory transactionList={transactionList} />
      </DashbobrdWrapper>
    );
  }
}

export default Dashbobrd;
