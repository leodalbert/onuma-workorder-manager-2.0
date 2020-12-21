import React from 'react';
import { connect } from 'react-redux';
import Auth from './components/Auth';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const AuthContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Auth);

export default AuthContainer;
