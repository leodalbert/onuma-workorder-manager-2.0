import React, { Fragment, useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { filterComponents } from 'utils/HelperFunctions';

import ComponentButtons from './ComponentButtons';
import ComponentDetailDialog from 'components/Common/ComponentDetailDialog';
import ComponentSelector from './ComponentSelector';
import ConfirmDialog from 'components/Common/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
  detailCtr: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0px !important',
      textAlign: 'center',
    },
  },
  detailSelectCtr: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(1),
    },
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
  labelStyle: {
    padding: theme.spacing(1),
    fontWeight: 'bolder',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
    color: theme.palette.text.primary,
  },
  labelStyleSelect: {
    textAlign: 'left',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },

    '& .MuiFilledInput-input': {
      padding: '8.5px 14px',
      backgroundColor: theme.palette.primary.main,
      boxShadow:
        '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    },
    '& .MuiSelect-select': {
      borderRadius: '4px',
    },
  },
  marginTopS: {
    marginTop: theme.spacing(2),
  },
  marginBottomS: {
    marginBottom: theme.spacing(2),
  },
  spinnerDiv: {
    position: 'relative',
    top: '45%',
    left: '45%',
  },
  spinner: {
    color: theme.palette.secondary.main,
  },
}));

const ComponentList = ({
  studioId,
  workorderComponentIds,
  spaceComponents,
  workOrderComponents,
  workorderId,
  componentLoading,
  fillComponentDialog,
  dialogComponent,
  clearComponentDialog,
  addComponent,
  removeComponent,
}) => {
  const classes = useStyles();

  const [filteredComponents, setFilteredComponents] = useState([]);
  const [openDetailDailog, setOpenDetailDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [deleteComponent, setDeleteComponent] = useState('');

  // remove components in workorder from component select
  useEffect(() => {
    spaceComponents &&
      workorderComponentIds &&
      setFilteredComponents(
        filterComponents(spaceComponents, workorderComponentIds)
      );
  }, [spaceComponents, workorderComponentIds]);

  const handleOpenComponentDialog = (component) => {
    fillComponentDialog(component);
    console.log(component);
    setOpenDetailDialog(true);
  };

  const handleCloseComponentDialog = () => {
    setOpenDetailDialog(false);
    clearComponentDialog();
  };

  const handleAddComponent = (componentId) => {
    addComponent(componentId, workorderId, studioId);
  };

  return (
    <Fragment>
      <Grid
        className={clsx(classes.detailCtr, classes.marginTopS)}
        item
        xs={12}
        sm={4}
        lg={5}>
        <div justify='center' className={classes.labelStyle}>
          Components:
        </div>
      </Grid>
      <Grid
        className={clsx(
          classes.detailCtr,
          classes.marginTopS,
          classes.marginBottomS
        )}
        item
        xs={12}
        sm={8}
        lg={7}>
        <Grid>
          {workOrderComponents && (
            <ComponentButtons
              handleOpenComponentDialog={handleOpenComponentDialog}
              components={workOrderComponents}
              setOpenDeleteAlert={setOpenDeleteAlert}
              setDeleteComponent={setDeleteComponent}
            />
          )}
          {componentLoading && (
            <div className={classes.spinnerDiv}>
              <CircularProgress className={classes.spinner} />
            </div>
          )}
        </Grid>
        {filteredComponents.length > 0 && (
          <ComponentSelector
            filteredComponents={filteredComponents}
            handleAddComponent={handleAddComponent}
          />
        )}
      </Grid>

      <ComponentDetailDialog
        open={openDetailDailog}
        handleClose={handleCloseComponentDialog}
        dialogComponent={dialogComponent}
      />
      <ConfirmDialog
        openAlert={openDeleteAlert}
        setOpenAlert={setOpenDeleteAlert}
        handleSave={() => {
          setOpenDeleteAlert(false);
          removeComponent(deleteComponent, studioId);
        }}
        title='Remove Component?'
        content='Are you sure you would like to remove component from work order?'
        confirmBtn='Remove'
        declineBtn='Cancel'
      />
    </Fragment>
  );
};

ComponentList.propTypes = {
  studioId: PropTypes.string,
  workorderComponentIds: PropTypes.array,
  spaceComponents: PropTypes.array,
  workOrderComponents: PropTypes.array,
  workorderId: PropTypes.number,
  componentLoading: PropTypes.bool,
  fillComponentDialog: PropTypes.func.isRequired,
  dialogComponent: PropTypes.object,
  clearComponentDialog: PropTypes.func.isRequired,
  addComponent: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
};

export default memo(ComponentList);
