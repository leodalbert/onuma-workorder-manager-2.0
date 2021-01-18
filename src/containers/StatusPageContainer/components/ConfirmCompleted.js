import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Button,
  Collapse,
  FormControl,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnCompletion: {
    width: 100,
    margin: '0px 10px',
  },
  declineTextFormCtrl: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    width: '40%',
    minWidth: '350px',
    [theme.breakpoints.down('xs')]: {
      minWidth: '95%',
    },
  },
  paddingBottomL: {
    paddingBottom: theme.spacing(5),
  },
}));

const ConfirmCompleted = ({ setStatus, studioId, workorderId }) => {
  const classes = useStyles();

  const [declineText, setDeclineText] = useState('');
  const [showDeclineText, setShowDeclineText] = useState(false);

  const handleDecline = () => {
    if (showDeclineText) {
      setStatus(
        workorderId,
        { completion_description: declineText, status: 'Completion Declined' },
        studioId
      );
    }
    setShowDeclineText(!showDeclineText);
  };

  const handleConfirm = () => {
    showDeclineText
      ? setShowDeclineText(false)
      : setStatus(workorderId, { status: 'Completion Confirmed' }, studioId);
  };

  return (
    <Grid item container spacing={3} className={classes.paddingBottomL}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant='subtitle1' style={{ fontSize: '120%' }}>
          Please confirm if the work order has been completed
        </Typography>
        <Collapse in={showDeclineText}>
          <FormControl className={classes.declineTextFormCtrl}>
            <TextField
              value={declineText}
              id='location-description'
              label='Why is the confirmation being declined?'
              name='location_description'
              multiline
              rows={4}
              variant='outlined'
              onChange={(e) => setDeclineText(e.target.value)}
            />
          </FormControl>
        </Collapse>
        <Grid item>
          <Button
            disabled={showDeclineText && !declineText}
            onClick={handleDecline}
            className={classes.btnCompletion}
            style={
              showDeclineText
                ? { backgroundColor: '#fdd835' }
                : { backgroundColor: '#d3e6df' }
            }
            variant='contained'>
            {!showDeclineText ? 'Decline' : 'Submit'}
          </Button>
          <Button
            // disabled={showDeclineText}
            onClick={handleConfirm}
            className={classes.btnCompletion}
            color={showDeclineText ? 'primary' : 'secondary'}
            variant='contained'>
            {showDeclineText ? 'Back' : 'Confirm'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

ConfirmCompleted.propTypes = {
  setStatus: PropTypes.func.isRequired,
  studioId: PropTypes.number,
  workorderId: PropTypes.number,
};

export default ConfirmCompleted;
