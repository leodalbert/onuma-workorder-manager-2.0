import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import TaskForm2 from 'containers/TaskFormContainer';
import AssignedTo from './AssignedTo';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  saveTextBreak: {
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      textAlign: 'right',
    },
  },
  btnWidth: {
    width: '190px',
  },
  btnBreak: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));

const TaskDetails = ({
  collaboratorsToAdd,
  studioId,
  techs,
  techId,
  workorderSpaceName,
  workorderBuildingName,
  workorderId,
  workorderTechId,
  workorderTechEmail,
  workorderTechName,
  workorderCollaborators,
  visCollaborators,
  addCollaborator,
  removeCollaborator,
}) => {
  const classes = useStyles();

  const handleAddCollaborator = (id) => {
    addCollaborator(workorderId, id, studioId);
  };

  return (
    <div className={classes.root}>
      <Grid item container xs={12}>
        <Grid item container spacing={3}>
          <AssignedTo
            workorderTechName={workorderTechName}
            workorderTechEmail={workorderTechEmail}
            workorderSpaceName={workorderSpaceName}
            workorderTechId={workorderTechId}
            workorderBuildingName={workorderBuildingName}
            techs={techs}
            workorderCollaborators={workorderCollaborators}
            removeCollaborator={removeCollaborator}
            handleAddCollaborator={handleAddCollaborator}
            studioId={studioId}
            techId={techId}
            workorderId={workorderId}
            visCollaborators={visCollaborators}
            collaboratorsToAdd={collaboratorsToAdd}
          />
          <TaskForm2 studioId={studioId} />
        </Grid>
      </Grid>
    </div>
  );
};

TaskDetails.propTypes = {
  collaboratorsToAdd: PropTypes.array,
  studioId: PropTypes.string,
  techs: PropTypes.array,
  techId: PropTypes.number,
  workorderSpaceName: PropTypes.string,
  workorderBuildingName: PropTypes.string,
  workorderId: PropTypes.number,
  workorderTechId: PropTypes.number,
  workorderTechEmail: PropTypes.string,
  workorderTechName: PropTypes.string,
  workorderCollaborators: PropTypes.array,
  visCollaborators: PropTypes.array,
  addCollaborator: PropTypes.func.isRequired,
  removeCollaborator: PropTypes.func.isRequired,
};

export default memo(TaskDetails);
