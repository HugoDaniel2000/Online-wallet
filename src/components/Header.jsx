import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { emailDisplay } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          {`Email:${emailDisplay}`}
        </p>
        <p>Despesa Total</p>
        <p data-testid="total-field"> 0 </p>
        <p data-testid="header-currency-field"> BRL </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailDisplay: state.user.email,
});

Header.propTypes = {
  emailDisplay: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
