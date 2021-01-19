import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import ComponentList from './ComponentList';
import ComponentSearch from 'containers/ComponentSearchContainer';

const useStyles = makeStyles((theme) => ({
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

const shouldDisplay = (readOnly, workorderComponentIds) => {
  if (readOnly) {
    if (workorderComponentIds.length > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const Components = ({
  workorderComponentIds,
  workOrderComponents,
  spaceComponents,
  studioId,
  componentLoading,
  fillComponentDialog,
  addComponent,
  removeComponent,
  workorderId,
  dialogComponent,
  clearComponentDialog,
  readOnly,
}) => {
  const classes = useStyles();
  return (
    <Grid className={classes.marginTopL} item container xs={12}>
      <Grid item container direction='column' xs={12} lg={7}>
        <Grid item container spacing={3}>
          {shouldDisplay(readOnly, workorderComponentIds) && (
            <ComponentList
              workorderComponentIds={workorderComponentIds}
              spaceComponents={spaceComponents}
              studioId={studioId}
              workOrderComponents={workOrderComponents}
              componentLoading={componentLoading}
              workorderId={workorderId}
              fillComponentDialog={fillComponentDialog}
              dialogComponent={dialogComponent}
              addComponent={addComponent}
              removeComponent={removeComponent}
              clearComponentDialog={clearComponentDialog}
              readOnly={readOnly}
            />
          )}
        </Grid>
      </Grid>
      <Grid item container direction='column' xs={12} lg={5}>
        {!readOnly && <ComponentSearch studioId={studioId} />}
      </Grid>
    </Grid>
  );
};

Components.propTypes = {
  workorderComponentIds: PropTypes.array,
  workOrderComponents: PropTypes.array,
  spaceComponents: PropTypes.array,
  studioId: PropTypes.string,
  componentLoading: PropTypes.bool,
  fillComponentDialog: PropTypes.func.isRequired,
  addComponent: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
  workorderId: PropTypes.number,
  dialogComponent: PropTypes.object,
  clearComponentDialog: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

export default memo(Components);
