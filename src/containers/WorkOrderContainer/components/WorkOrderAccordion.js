import React, { memo } from 'react';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import RequestDetails from 'containers/WorkOrderContainer/components/RequestDetails';
import PreviousTasks from 'containers/PreviousTasksContainer';
import TaskDetails from 'containers/TaskDetailsContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 10%',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  accordionHeader: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    height: '30px',
  },
  accordionHeading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const WorkOrder = (props) => {
  // console.log(props);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion square defaultExpanded>
        <AccordionSummary
          className={classes.accordionHeader}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='requestDetails-content'
          id='requestDetails-header'>
          <Typography className={classes.accordionHeading}>
            Request Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RequestDetails
            workorder={props.workorder}
            space={props.space}
            studioId={props.match.params.studioId}
            sendCommentToRequestor={props.sendCommentToRequestor}
          />
        </AccordionDetails>
      </Accordion>
      {props.tasks.length > 0 && (
        <Accordion square defaultExpanded>
          <AccordionSummary
            className={classes.accordionHeader}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='taskDetails-content'
            id='taskDetails-header'>
            <Typography className={classes.accordionHeading}>
              Previous Tasks
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <PreviousTasks studioId={props.match.params.studioId} />
          </AccordionDetails>
        </Accordion>
      )}
      {(props.status === 'Work In Progress' || props.status === 'Assigned') && (
        <Accordion square defaultExpanded>
          <AccordionSummary
            className={classes.accordionHeader}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='taskDetails-content'
            id='taskDetails-header'>
            <Typography className={classes.accordionHeading}>
              Task Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TaskDetails studioId={props.match.params.studioId} />
          </AccordionDetails>
        </Accordion>
      )}
      <Accordion square defaultExpanded>
        <AccordionSummary
          className={classes.accordionHeader}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='attachment-content'
          id='attachment-header'>
          <Typography className={classes.accordionHeading}>
            Attachments
          </Typography>
        </AccordionSummary>
        <AccordionDetails>attachment page goes here</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default memo(WorkOrder);
