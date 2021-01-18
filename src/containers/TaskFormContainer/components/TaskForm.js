import React, { Fragment, useState, useEffect } from 'react';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DescriptionForm from './DescriptionForm';
import CostList from './CostList';
import CostForm from './CostForm';
import WorkorderStatus from './WorkorderStatus';
import SubmitBtn from './SubmitBtn';
import ConfirmDialog from 'components/Common/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
  detailCtr: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0px !important',
      textAlign: 'center',
    },
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
}));

const TaskForm = ({
  workorderId,
  techId,
  techName,
  allOtherTechs,
  workorderStatus,
  workorderTechId,
  workorderTechName,
  studioId,
  addNewTask,
  workOrderStatusChange,
}) => {
  const classes = useStyles();
  const [costs, setCosts] = useState([]);
  const [openCostAlert, setOpenCostAlert] = useState(false);
  const [openSaveAlert, setOpenSaveAlert] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [taskToSubmit, setTaskToSubmit] = useState({});

  useEffect(() => {
    if (submitting) {
      addNewTask(taskToSubmit, costs, studioId);
      setCosts([]);
      setSubmitting(false);
    }
  }, [submitting, addNewTask, costs, studioId, taskToSubmit]);

  let initialFormValues = {
    workorder: workorderId,
    hours: 0,
    hrs: '',
    mins: '',
    status: workorderStatus,
    is_overtime: false,
    assigned_technician: techId,
    description: '',
    costDescription: '',
    cost: '',
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };

  const handlePreSubmit = ({
    workorder,
    assigned_technician,
    hours,
    hrs,
    mins,
    is_overtime,
    description,
    date,
  }) => {
    if (hrs || mins) {
      hours = Number(`${hrs}.${mins}`);
    }
    setTaskToSubmit({
      workorder,
      assigned_technician,
      is_overtime,
      description,
      hours,
      date,
    });
  };

  const handleSave = () => {
    setSubmitting(true);
    setOpenCostAlert(false);
    setOpenSaveAlert(false);
  };

  const handleAddCost = ({
    formik: {
      values: { costDescription, cost, date },
      setFieldValue,
    },
  }) => {
    setCosts((prevCosts) => [
      ...prevCosts,
      { description: costDescription, cost, date },
    ]);
    setFieldValue('cost', '');
    setFieldValue('costDescription', '');
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validateOnChange={true}
      onSubmit={(values, actions) => {
        // commit form to state
        handlePreSubmit(values);

        // warning dialog for unsaved cost
        if (values.cost || values.costDescription) {
          return setOpenCostAlert(true);
        }

        // change workorder_status - only save status if there are no other changes to task form
        if (workorderStatus !== values.status) {
          if (
            _.isEqual(
              _.omit(values, ['status', 'date']),
              _.omit(initialFormValues, ['status', 'date'])
            )
          ) {
            workOrderStatusChange(values.workorder, values.status, studioId);
            return setOpenSaveAlert(false);
          }
          workOrderStatusChange(values.workorder, values.status, studioId);
        }

        // switch stays in whatever possition it was after submit
        let is_overtime = values.is_overtime;
        actions.resetForm();
        actions.setFieldValue('is_overtime', is_overtime);

        handleSave();
      }}>
      {(formik) => {
        // set status to in progress if changes are made - will only save on submit
        if (formik.dirty && formik.values.status === 'Assigned') {
          formik.setFieldValue('status', 'Work In Progress');
        }
        return (
          <Fragment>
            <DescriptionForm
              workorderId={workorderId}
              techId={techId}
              techName={techName}
              allOtherTechs={allOtherTechs}
            />
            <Grid className={classes.labelCtr} item xs={12} sm={3}>
              <Typography
                variant='subtitle1'
                style={{ paddingTop: '15px' }}
                className={classes.labelStyle}>
                Material costs:
              </Typography>
            </Grid>
            <Grid className={classes.detailCtr} item xs={12} sm={9}>
              {costs.length > 0 && (
                <CostList setCosts={setCosts} costs={costs} />
              )}
              <CostForm formik={formik} handleAddCost={handleAddCost} />
            </Grid>
            <WorkorderStatus
              workorderStatus={formik.values.status}
              workorderTechId={workorderTechId}
              techId={techId}
            />

            <SubmitBtn
              workorderTechName={workorderTechName}
              techId={techId}
              workorderStatus={workorderStatus}
              values={formik.values}
              workorderTechId={workorderTechId}
              setOpenSaveAlert={setOpenSaveAlert}
            />

            <ConfirmDialog
              openAlert={openCostAlert}
              setOpenAlert={setOpenCostAlert}
              handleSave={() => formik.handleSubmit()}
              title='You have unsaved material costs!'
              content='Would you like to discard any unsaved materials and save task?'
              confirmBtn='Save task without material cost'
              declineBtn='Go back'
            />
            <ConfirmDialog
              openAlert={openSaveAlert}
              setOpenAlert={setOpenSaveAlert}
              handleSave={() => formik.handleSubmit()}
              title='Are you sure you want to submit the task?'
              content='This will not be editable after submission'
              confirmBtn='Submit'
              declineBtn='Cancel'
            />
          </Fragment>
        );
      }}
    </Formik>
  );
};

TaskForm.propTypes = {
  workorderId: PropTypes.number,
  techId: PropTypes.number,
  techName: PropTypes.string,
  allOtherTechs: PropTypes.array,
  workorderStatus: PropTypes.string,
  workorderTechId: PropTypes.number,
};

export default TaskForm;
