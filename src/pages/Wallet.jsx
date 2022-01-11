import React from 'react';
import { connect } from 'react-redux';
import ExpenseTable from '../components/ExpenseTable';
import FormWallet from '../components/FormWallet';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormWallet />
        <ExpenseTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailDisplay: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
