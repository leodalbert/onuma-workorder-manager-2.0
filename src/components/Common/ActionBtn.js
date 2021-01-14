import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  btnWidth: {
    width: '190px',
  },
}));

const ActionBtn = ({
  children,
  handleClick,
  disabled = false,
  autoFocus = false,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      variant='contained'
      className={classes.btnWidth}
      color='secondary'
      autoFocus={autoFocus}
      {...rest}>
      {children}
    </Button>
  );
};

ActionBtn.propTypes = {
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ActionBtn;
