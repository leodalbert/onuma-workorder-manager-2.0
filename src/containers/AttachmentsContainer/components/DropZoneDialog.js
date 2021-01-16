import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import { uploadFile } from 'actions/attachments';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnBreak: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  btnRight: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
  marginTopS: {
    marginTop: theme.spacing(2),
  },
  marginS: {
    margin: theme.spacing(2),
  },
}));

const DropZoneDialog = ({ uploadFile, studioId, workorderId, techId }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [fileObjects, setFileObjects] = useState();

  return !expanded ? (
    <div className={classes.btnBreak}>
      <Button
        style={{ width: '190px' }}
        variant='contained'
        color='secondary'
        onClick={() => setExpanded(true)}>
        Add Attachment
      </Button>
    </div>
  ) : (
    <Fragment>
      <DropzoneAreaBase
        onAdd={(fileObjs) => setFileObjects(fileObjs)}
        onDelete={() => setFileObjects()}
        fileObjects={fileObjects}
        filesLimit={1}
        maxFileSize={20000000}
        showFileNames
        showAlerts={['error', 'info']}
        previewGridProps={{
          container: { spacing: 5, justify: 'center' },
          item: { xs: 2 },
        }}
        previewGridClasses={{ item: classes.marginTopS }}
      />
      <div className={classes.btnRight}>
        <Button
          onClick={() => {
            setExpanded(false);
            setFileObjects();
          }}
          className={classes.marginS}
          variant='contained'>
          Cancel
        </Button>
        <Button
          onClick={() => {
            uploadFile(fileObjects[0], studioId, workorderId, techId);
            setExpanded(false);
            setFileObjects();
          }}
          className={classes.marginS}
          color='secondary'
          variant='contained'>
          Upload
        </Button>
      </div>
    </Fragment>
  );
};

DropZoneDialog.propTypes = {
  uploadFile: PropTypes.func.isRequired,
  studioId: PropTypes.string.isRequired,
  workorderId: PropTypes.number,
  techId: PropTypes.number.isRequired,
};

export default connect(null, { uploadFile })(DropZoneDialog);
