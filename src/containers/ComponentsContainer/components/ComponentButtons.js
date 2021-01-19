import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import ComponentButtonGroup from './ComponentButtonGroup';

const ComponentButtons = ({
  components,
  handleOpenComponentDialog,
  setOpenDeleteAlert,
  setDeleteComponent,
  readOnly,
}) => {
  return (
    <Fragment>
      {components.map((component, index) => {
        return (
          <Grid key={index}>
            <ComponentButtonGroup
              component={component}
              setOpenDeleteAlert={setOpenDeleteAlert}
              setDeleteComponent={setDeleteComponent}
              handleOpenComponentDialog={handleOpenComponentDialog}
              readOnly={readOnly}
            />
          </Grid>
        );
      })}
    </Fragment>
  );
};

ComponentButtons.propTypes = {
  components: PropTypes.array.isRequired,
  handleOpenComponentDialog: PropTypes.func.isRequired,
  setOpenDeleteAlert: PropTypes.func.isRequired,
  setDeleteComponent: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.components === nextProps.components;
};
export default memo(ComponentButtons, areEqual);
