import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import ActionBtn from 'components/Common/ActionBtn';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  saveTextBreak: {
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      textAlign: 'right',
    },
  },
  btnWidth: {
    width: '190px',
  },
  btnBreak: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));
const SubmitBtn = ({
  workorderTechId,
  techId,
  workorderStatus,
  values,
  setOpenSaveAlert,
  workorderTechName,
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid className={classes.saveTextBreak} item xs={12} lg={9}>
        <Typography style={{ marginBottom: '15px' }}>
          {workorderTechId === techId
            ? `You can keep on adding new tasks until you set the work order status
          as "Completed".`
            : `You can keep on adding new tasks until the assigned technician, ${workorderTechName}, sets the work order as "Completed".`}
        </Typography>
      </Grid>
      <Grid className={classes.btnBreak} item xs={12} lg={3}>
        <ActionBtn
          disabled={
            !values.mins &&
            !values.hrs &&
            !values.description &&
            !(workorderStatus === 'Completed')
          }
          onClick={() => setOpenSaveAlert(true)}>
          Save Task
        </ActionBtn>
      </Grid>
    </Fragment>
  );
};

SubmitBtn.propTypes = {
  workorderTechId: PropTypes.number,
  techId: PropTypes.number,
  workorderStatus: PropTypes.string,
  values: PropTypes.object,
  setOpenSaveAlert: PropTypes.func.isRequired,
  workorderTechName: PropTypes.string,
};

export default memo(SubmitBtn);
