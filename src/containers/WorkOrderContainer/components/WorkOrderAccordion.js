import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import Spinner from 'components/Common/Spinner';

const tasks = [1, 2];
const workOrderStatus = 'Assigned';

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
  console.log(props);
  console.count('workorderAccordion');
  const classes = useStyles();

  return false ? (
    <Spinner />
  ) : (
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
        <AccordionDetails>details go here</AccordionDetails>
      </Accordion>
      {tasks.length > 0 && (
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
            prev tasks go here
          </AccordionDetails>
        </Accordion>
      )}
      {workOrderStatus !== 'Completed' &&
        workOrderStatus !== 'Completion Confirmed' && (
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
            <AccordionDetails>task details go here</AccordionDetails>
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

WorkOrder.propTypes = {
  // match: PropTypes.object.isRequired,
  // getWorkOrderById: PropTypes.func.isRequired,
  // workorderId: PropTypes.number,
};

export default memo(WorkOrder);
