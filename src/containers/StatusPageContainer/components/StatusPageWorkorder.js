import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Divider,
  Typography,
  Hidden,
  Button,
} from '@material-ui/core';

import ConfirmCompleted from './ConfirmCompleted';
import Location from './Location';
import RequestDescription from './RequestDescription';
import {
  StatusRequestDetailGrid1,
  StatusRequestDetailGrid2,
} from './StatusRequestDetailGrid';
import OnumaFloorplan from 'components/Common/OnumaFloorplan';
import FloorPlanDev from 'components/Common/FloorPlanDev';
import { inDev } from 'utils/HelperFunctions';

// TODO optimize renders

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  btnBreak: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  btnWidth: {
    width: '190px',
  },
  floorPlan: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  marginTopL: {
    marginTop: theme.spacing(5),
  },
  paddingM: {
    padding: theme.spacing(3),
  },
  paddingTopS: {
    paddingTop: theme.spacing(2),
  },
  paddingTopL: {
    paddingTop: theme.spacing(5),
  },
  paddingBottomL: {
    paddingBottom: theme.spacing(5),
  },
  statusCtrSpacing: {
    margin: '20px 10%',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  statusHeader: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));

const StatusPageWorkorder = ({
  match: {
    params: { studioId, id: workorderId },
  },
  spaceInfo: { siteId, buildingId, floorId, spaceId, location_description },
  workorder: { floor, building, space },
  status,
  setStatus,
  requestEmail,
  workorder,
  siteBuidlings,
  updateWorkorder,
  user,
}) => {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [topLocationState, setTopLocationState] = useState({});
  const initialLocationState = { floor, building, space, location_description };

  const handleClick = () => {
    if (edit) {
      let updateObj = {};
      if (!_.isEqual(initialLocationState, topLocationState)) {
        updateObj.building = topLocationState.building.id;
        updateObj.floor =
          topLocationState.floor.id === '' ? null : topLocationState.floor.id;
        updateObj.space =
          topLocationState.space.id === '' ? null : topLocationState.space.id;
        updateObj.location_description = topLocationState.location_description;
      }
      if (newDescription) {
        updateObj.request_description = newDescription;
      }
      if (!_.isEmpty(updateObj)) {
        updateWorkorder(studioId, workorderId, updateObj);
      }
      setNewDescription('');
      setEdit(false);
    } else {
      setEdit(true);
    }
  };
  return (
    <div className={classes.statusCtrSpacing}>
      <Paper elevation={2} className={classes.root}>
        <Grid item xs={12} className={classes.statusHeader}>
          <Typography variant='h6'>
            Work order request by {requestEmail}
          </Typography>
        </Grid>
        <Divider />
        <Grid item className={classes.paddingM}>
          <Grid
            className={clsx(classes.paddingTopL, classes.paddingBottomL)}
            item
            container
            xs={12}>
            {status === 'Completed' && user === requestEmail && (
              <Grid item container direction='column' xs={12}>
                <ConfirmCompleted
                  setStatus={setStatus}
                  studioId={Number(studioId)}
                  workorderId={Number(workorderId)}
                />
                <Divider />
              </Grid>
            )}
            <Grid item container direction='column' xs={12} lg={7}>
              <Grid item container spacing={3}>
                <StatusRequestDetailGrid1 workorder={workorder} />
                <Hidden mdDown>
                  <Location
                    workorder={workorder}
                    edit={edit}
                    siteBuidlings={siteBuidlings}
                    setTopLocationState={setTopLocationState}
                  />
                  <RequestDescription
                    workorder={workorder}
                    edit={edit}
                    newDescription={newDescription}
                    setNewDescription={setNewDescription}
                  />
                  <StatusRequestDetailGrid2 workorder={workorder} />
                </Hidden>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction='column'
              justify='center'
              xs={12}
              lg={5}>
              {inDev() ? (
                <Grid
                  item
                  className={clsx(classes.paddingTopL, classes.paddingBottomL)}>
                  <div className={classes.floorPlan}>
                    <FloorPlanDev
                      studioId={studioId}
                      siteId={siteId}
                      buildingId={buildingId}
                      floorId={floorId}
                      spaceId={spaceId}
                    />
                  </div>
                </Grid>
              ) : (
                <Grid item>
                  <div className={classes.floorPlan}>
                    <OnumaFloorplan
                      studioId={studioId}
                      siteId={siteId}
                      buildingId={buildingId}
                      floorId={floorId}
                      spaceId={spaceId}
                    />
                  </div>
                </Grid>
              )}
            </Grid>
            <Hidden lgUp>
              <Grid item container direction='column' xs={12} lg={7}>
                <Grid item container spacing={3}>
                  <Location
                    workorder={workorder}
                    edit={edit}
                    siteBuidlings={siteBuidlings}
                    setTopLocationState={setTopLocationState}
                  />
                  <RequestDescription
                    workorder={workorder}
                    edit={edit}
                    newDescription={newDescription}
                    setNewDescription={setNewDescription}
                  />
                  <StatusRequestDetailGrid2 workorder={workorder} />
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
          {status !== 'Completed' &&
            status !== 'Completion Confirmed' &&
            user === requestEmail && (
              <Grid item xs={12}>
                <div className={classes.btnBreak}>
                  <Button
                    className={classes.btnWidth}
                    style={
                      edit
                        ? { backgroundColor: '#fdd835' }
                        : { backgroundColor: '#d3e6df' }
                    }
                    disabled={
                      edit &&
                      !topLocationState.location_description &&
                      !topLocationState.space.id
                    }
                    variant='contained'
                    color={edit ? 'inherit' : 'secondary'}
                    onClick={handleClick}>
                    {edit ? 'Save Changes' : 'Edit Details'}
                  </Button>
                </div>
              </Grid>
            )}
        </Grid>
      </Paper>
    </div>
  );
};

StatusPageWorkorder.propTypes = {
  match: PropTypes.object.isRequired,
  spaceInfo: PropTypes.object.isRequired,
  workorder: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  requestEmail: PropTypes.string,
  siteBuidlings: PropTypes.array.isRequired,
  updateWorkorder: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default StatusPageWorkorder;
