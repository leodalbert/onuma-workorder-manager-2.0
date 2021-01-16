import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import ImageCard from './ImageCard';
import FileCard from './FileCard';
import DropZoneDialog from './DropZoneDialog';
import { sortFilesByType } from 'utils/HelperFunctions';

const AttachmentPage = ({
  files,
  studioId,
  workorderId,
  techId,
  deleteAttachment,
}) => {
  const handleDelete = (id) => {
    deleteAttachment(id, studioId);
  };
  console.count('attachments');

  return (
    <Grid container alignItems='stretch' spacing={2}>
      {files &&
        files.length > 0 &&
        [...files].sort(sortFilesByType).map(({ directus_files: file, id }) => {
          if (file.type.split('/')[0] === 'image') {
            return (
              <ImageCard
                key={file.id}
                file={file}
                id={id}
                techId={techId}
                handleDelete={handleDelete}
              />
            );
          } else {
            return (
              <FileCard
                key={file.id}
                file={file}
                id={id}
                techId={techId}
                handleDelete={handleDelete}
              />
            );
          }
        })}
      <Grid style={{ textAlign: 'center' }} item xs={12}>
        <DropZoneDialog
          studioId={studioId}
          workorderId={workorderId}
          files={files}
          techId={techId}
        />
      </Grid>
    </Grid>
  );
};

AttachmentPage.propTypes = {
  files: PropTypes.array.isRequired,
  studioId: PropTypes.string.isRequired,
  workorderId: PropTypes.number,
  techId: PropTypes.number.isRequired,
  deleteAttachment: PropTypes.func.isRequired,
};

export default AttachmentPage;
