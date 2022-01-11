import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormWallet from '../components/FormWallet';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormWallet />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailDisplay: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
