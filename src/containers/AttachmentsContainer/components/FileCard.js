import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Grid,
  CardContent,
  Typography,
  IconButton,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  attachmentContent: {
    padding: '6px 16px',
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    '&:last-child': {
      paddingBottom: '6px',
    },
  },
  attachmentIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex',
    marginRight: '0px 12px 0px 6px',
  },
  attachmentMedia: {
    height: 'auto',
    width: '100%',
  },
}));

const FileCard = ({ file, techId, id, handleDelete }) => {
  const classes = useStyles();

  const openInNewTab = () => {
    const newWindow = window.open(
      `${file.data.full_url}`,
      '_blank',
      'noopener,noreferrer'
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Grid item xs={12}>
      <Card className={classes.root}>
        <CardContent className={classes.attachmentContent}>
          <Typography
            onClick={() => {
              openInNewTab();
            }}
            variant='subtitle1'
            component='h5'>
            {file.filename_download}
          </Typography>
          <div>
            {techId === file.technician && (
              <IconButton
                onClick={() => handleDelete(id)}
                className={classes.attachmentIcon}
                size='small'>
                <DeleteForeverIcon />
              </IconButton>
            )}
            <IconButton
              className={classes.attachmentIcon}
              onClick={() => {
                openInNewTab();
              }}
              size='small'>
              <GetAppIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

FileCard.propTypes = {
  file: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  techId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default FileCard;
