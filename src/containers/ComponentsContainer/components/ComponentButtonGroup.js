import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  btnGroup: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
}));

const ComponentButtonGroup = ({
  component,
  handleOpenComponentDialog,
  setOpenDeleteAlert,
  setDeleteComponent,
  readOnly,
}) => {
  const classes = useStyles();

  const handleClickComponent = () => {
    handleOpenComponentDialog(component);
  };

  const handleClickDelete = () => {
    setDeleteComponent(component.instanceId);
    setOpenDeleteAlert(true);
  };
  return (
    <ButtonGroup
      fullWidth
      className={classes.btnGroup}
      color='primary'
      variant='contained'
      aria-label='split button'>
      <Button style={{ justifyContent: 'left' }} onClick={handleClickComponent}>
        {component.name +
          (component.instance_name && ` -  ${component.instance_name}`)}
      </Button>
      {!readOnly && (
        <Button
          style={{ width: '36px' }}
          onClick={handleClickDelete}
          size='small'>
          <ClearIcon fontSize='small' />
        </Button>
      )}
    </ButtonGroup>
  );
};

ComponentButtonGroup.propTypes = {
  component: PropTypes.object,
  setDeleteComponent: PropTypes.func.isRequired,
  setOpenDeleteAlert: PropTypes.func.isRequired,
  handleOpenComponentDialog: PropTypes.func.isRequired,
};
const areEqual = (prevProps, nextProps) => {
  return prevProps.component === nextProps.component;
};
export default memo(ComponentButtonGroup, areEqual);
