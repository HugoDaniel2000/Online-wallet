import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditFormWallet from '../components/EditFormWallet';
import ExpenseTable from '../components/ExpenseTable';
import FormWallet from '../components/FormWallet';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { editModeOn } = this.props;
    return (
      <div>
        <Header />
        {editModeOn === true
          ? <EditFormWallet />
          : <FormWallet />}
        <ExpenseTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailDisplay: state.user.email,
  editModeOn: state.wallet.editModeOn,
});

Wallet.propTypes = {
  editModeOn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
