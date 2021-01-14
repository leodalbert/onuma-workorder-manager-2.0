import React, { Fragment, useState, memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, List, ListItem, Typography, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';

import ActionBtn from 'components/Common/ActionBtn';
import AddCollaboratorDialog from './AddCollaboratorDialog';
import { TechEmail } from 'utils/HelperFunctions';

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
  detailCtr: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0px !important',
      textAlign: 'center',
    },
  },
  detailStyle: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    textAlign: 'left',
    paddingTop: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  labelCtr: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '0px !important',
    },
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

  noPadding: {
    padding: 0,
  },
}));

const AssignedTo = ({
  workorderTechName,
  workorderTechEmail,
  workorderSpaceName,
  workorderTechId,
  workorderBuildingName,
  techs,
  workorderCollaborators,
  removeCollaborator,
  handleAddCollaborator,
  studioId,
  techId,
  workorderId,
  visCollaborators,
  collaboratorsToAdd,
}) => {
  const classes = useStyles();
  const [collaboratorDialog, setCollaboratorDialog] = useState(false);

  const handleAdd = (selectedTechId) => {
    setCollaboratorDialog(false);
    handleAddCollaborator(selectedTechId);
  };

  return (
    <Fragment>
      <Grid className={classes.labelCtr} item xs={12} sm={3}>
        <Typography variant='subtitle1' className={classes.labelStyle}>
          Assigned to:
        </Typography>
      </Grid>
      <Grid className={classes.detailCtr} item xs={12} sm={4}>
        <Typography variant='body1' className={classes.detailStyle}>
          {TechEmail(
            workorderTechName,
            workorderTechEmail,
            workorderSpaceName,
            workorderBuildingName,
            workorderId
          )}
        </Typography>
        {workorderCollaborators.length > 0 && !_.isEmpty(techs) && (
          <div style={{ paddingLeft: '25px' }}>
            <Typography variant='subtitle1' style={{ fontWeight: 'bolder' }}>
              Other collaborators:
            </Typography>
            <List dense className={classes.noPadding}>
              {workorderCollaborators.map((collaborator) => {
                let tech = visCollaborators.filter(
                  (tech) => tech.id === collaborator.collaborator.id
                );
                return (
                  <ListItem key={tech[0].id}>
                    {TechEmail(
                      `${tech[0].first_name} ${tech[0].last_name}`,
                      tech[0].email,
                      workorderSpaceName,
                      workorderBuildingName,
                      workorderId
                    )}
                    {workorderTechId === techId && (
                      <Button
                        onClick={() =>
                          removeCollaborator(collaborator.id, studioId)
                        }
                        variant='text'
                        size='small'>
                        <ClearIcon fontSize='small' />
                      </Button>
                    )}
                  </ListItem>
                );
              })}
            </List>
          </div>
        )}
      </Grid>
      <Grid className={classes.commentBtnCtr} item xs={12} sm={5}>
        <ActionBtn
          handleClick={() => setCollaboratorDialog(true)}
          color='secondary'
          variant='contained'>
          Add collaborator
        </ActionBtn>
      </Grid>
      <AddCollaboratorDialog
        open={collaboratorDialog}
        setCollaboratorDialog={setCollaboratorDialog}
        handleAdd={handleAdd}
        collaboratorsToAdd={collaboratorsToAdd}
      />
    </Fragment>
  );
};

AssignedTo.propTypes = {
  workorderTechName: PropTypes.string,
  workorderTechEmail: PropTypes.string,
  workorderSpaceName: PropTypes.string,
  workorderTechId: PropTypes.number,
  workorderBuildingName: PropTypes.string,
  techs: PropTypes.array,
  workorderCollaborators: PropTypes.array,
  removeCollaborator: PropTypes.func.isRequired,
  handleAddCollaborator: PropTypes.func.isRequired,
  studioId: PropTypes.string,
  techId: PropTypes.number,
  workorderId: PropTypes.number,
  visCollaborators: PropTypes.array,
  collaboratorsToAdd: PropTypes.array,
};

export default memo(AssignedTo);
