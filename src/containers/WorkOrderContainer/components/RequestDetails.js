import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  Button,
  Divider,
  Tooltip,
  Hidden,
  Typography,
} from '@material-ui/core';

import ActionBtn from 'components/Common/ActionBtn';
import OnumaFloorplan from 'components/Common/OnumaFloorplan';
import FloorplanDev from 'components/Common/FloorPlanDev';
import MaintenanceProcedureDialog from './MaintenanceProcedureDialog';
import {
  MemoRequestNumberGrid as RequestNumberGrid,
  MemoRequestCommentGrid as RequestCommentGrid,
  MemoRequestLocationGrid as RequestLocationGrid,
  MemoRequestPmGrid as RequestPmGrid,
} from './RequestDetailGrid';
import { inDev } from 'utils/HelperFunctions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  floorPlan: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  commentField: {
    maxWidth: '700px',
    '& label.Mui-focused': {
      color: theme.palette.common.black,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  commentFieldHelperText: {
    fontWeight: 'bolder',
    fontSize: '1rem',
  },
  commentBtnCtr: {
    padding: '12px 0px',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      paddingBottom: '15px',
    },
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
  components,
  sendCommentToRequestor,
  space: { siteId, buildingId, floorId, spaceId },
}) => {
  const classes = useStyles();
  const [comment, setComment] = useState(workorder.administrator_comment);
  const [openSearchDailog, setOpenSearchDialog] = useState(false);
  const [openPmDialog, setOpenPmDialog] = useState(false);

  const handleOpenSearchDialog = () => {
    setOpenSearchDialog(true);
  };
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

        <Grid item container direction='column' xs={12} lg={9}>
          <Grid item container spacing={3} justify='flex-end'>
            <Grid item xs={12} sm={8} style={{ margin: '12px 0px' }}>
              <TextField
                className={classes.commentField}
                id='commentField'
                label='Comments To Requester'
                multiline
                fullWidth
                rows={4}
                variant='outlined'
                value={comment ? comment : ''}
                onChange={(e) => setComment(e.target.value)}
                FormHelperTextProps={{
                  className: classes.commentFieldHelperText,
                }}
                helperText={
                  comment !== workorder.administrator_comment &&
                  'Click "Save + Send" to email your comment to requester'
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.commentBtnCtr} item xs={12} lg={3}>
          <ActionBtn
            handleClick={() =>
              sendCommentToRequestor(comment, studioId, workorder.id)
            }
            disabled={comment === workorder.administrator_comment}>
            Save + Send
          </ActionBtn>
        </Grid>
      </Grid>
      <Divider />
      <Grid className={classes.marginTopL} item container xs={12}>
        <Grid item container direction='column' xs={12} lg={7}>
          <Grid item container spacing={3}>
            components
            {
              //     <Components
              //   components={components}
              //   studioId={studioId}
              //   openSearchDailog={openSearchDailog}
              //   setOpenSearchDialog={setOpenSearchDialog}
              // />
            }
          </Grid>
        </Grid>
        <Grid item container direction='column' xs={12} lg={5}>
          <Grid item container spacing={3}>
            <Grid item xs={12} className={classes.commentBtnCtr}>
              <Tooltip
                title='Search for components if the work order is related to components in another location'
                placement='bottom'>
                <Button
                  className={classes.btnWidth}
                  onClick={handleOpenSearchDialog}
                  variant='contained'
                  color='secondary'>
                  Search components
                </Button>
              </Tooltip>
              <Hidden smUp>
                <Typography
                  className={classes.paddingTopS}
                  variant='subtitle2'
                  align='center'
                  color='textPrimary'>
                  Search for components if the work order is related to
                  components in another location
                </Typography>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

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
  studioId: PropTypes.number,
  workorder: PropTypes.object.isRequired,
  space: PropTypes.object.isRequired,
};

export default memo(RequestDetails);
