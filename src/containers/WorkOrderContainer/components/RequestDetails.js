import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Hidden } from '@material-ui/core';

import OnumaFloorplan from 'components/Common/OnumaFloorplan';
import FloorplanDev from 'components/Common/FloorPlanDev';
import MaintenanceProcedureDialog from './MaintenanceProcedureDialog';
import Components from 'containers/ComponentsContainer';
import {
  MemoRequestNumberGrid as RequestNumberGrid,
  MemoRequestCommentGrid as RequestCommentGrid,
  MemoRequestLocationGrid as RequestLocationGrid,
  MemoRequestPmGrid as RequestPmGrid,
} from './RequestDetailGrid';
import CommentTextBox from './CommentTextBox';
import { inDev } from 'utils/HelperFunctions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  floorPlan: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  marginTopL: {
    marginTop: theme.spacing(5),
  },
  paddingTopS: {
    paddingTop: theme.spacing(2),
  },
}));

const RequestDetails = ({
  studioId,
  workorder,
  sendCommentToRequestor,
  space: { siteId, buildingId, floorId, spaceId },
  readOnly,
}) => {
  const classes = useStyles();
  const [openPmDialog, setOpenPmDialog] = useState(false);

  return (
    <div className={classes.root}>
      <Grid item container xs={12}>
        <Grid item container direction='column' xs={12} lg={7}>
          <Grid item container spacing={3}>
            <RequestNumberGrid workorder={workorder} />
            <Hidden mdDown>
              <RequestLocationGrid workorder={workorder} />
              <RequestPmGrid
                workorder={workorder}
                setOpenPmDialog={setOpenPmDialog}
              />
              <RequestCommentGrid workorder={workorder} />
            </Hidden>
          </Grid>
        </Grid>
        <Grid item container direction='column' justify='center' xs={12} lg={5}>
          {inDev() ? (
            <Grid item>
              <div className={classes.floorPlan}>
                <FloorplanDev
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
              <RequestLocationGrid workorder={workorder} />
              <RequestPmGrid
                workorder={workorder}
                setOpenPmDialog={setOpenPmDialog}
              />
              <RequestCommentGrid workorder={workorder} />
            </Grid>
          </Grid>
        </Hidden>
        <CommentTextBox
          administrator_comment={workorder.administrator_comment}
          studioId={studioId}
          workorderId={workorder.id}
          sendCommentToRequestor={sendCommentToRequestor}
          readOnly={readOnly}
        />
      </Grid>
      <Divider />
      <Components studioId={studioId} readOnly={readOnly} />
      <MaintenanceProcedureDialog
        open={openPmDialog}
        name={workorder.maintenance_procedure_name || 'Maintenance procedure'}
        setOpenPmDialog={setOpenPmDialog}
        procedure={workorder.maintenance_procedures}
      />
    </div>
  );
};

RequestDetails.propTypes = {
  sendCommentToRequestor: PropTypes.func.isRequired,
  studioId: PropTypes.string,
  workorder: PropTypes.object.isRequired,
  space: PropTypes.object.isRequired,
};

export default memo(RequestDetails);
