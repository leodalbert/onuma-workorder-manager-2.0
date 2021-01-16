import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  Grid,
  CardContent,
  Typography,
  IconButton,
} from '@material-ui/core';
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

const ImageCard = ({ file, techId, id, handleDelete }) => {
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
        <CardActionArea
          style={{ textAlign: 'center' }}
          onClick={() => {
            openInNewTab();
          }}>
          <img
            alt={file.title}
            className={classes.attachmentMedia}
            style={{ maxWidth: file.width }}
            src={
              file.data.thumbnails.find(
                (obj) => obj.key === 'directus-large-contain'
              ).url
            }
            title='image-display'
          />
        </CardActionArea>
        <CardContent className={classes.attachmentContent}>
          <Typography
            onClick={() => {
              openInNewTab();
            }}
            variant='subtitle1'
            component='h5'>
            {file.title}
          </Typography>
          {techId === file.technician && (
            <IconButton
              onClick={() => handleDelete(id)}
              className={classes.attachmentIcon}
              size='small'>
              <DeleteForeverIcon />
            </IconButton>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

ImageCard.propTypes = {
  file: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  techId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default ImageCard;
