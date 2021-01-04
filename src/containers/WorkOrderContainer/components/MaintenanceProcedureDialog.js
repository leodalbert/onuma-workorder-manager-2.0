import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  DialogTitle,
  DialogContent,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  btnClose: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogContentDivider: {
    [theme.breakpoints.down('xs')]: {
      padding: '16px 6px',
    },
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const MaintenanceProcedureDialog = ({
  open,
  setOpenPmDialog,
  procedure,
  name,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      aria-labelledby='component-dialog-title'
      open={open}>
      <DialogTitle id='component-dialog-title'>
        {name}
        <IconButton
          aria-label='close'
          className={classes.btnClose}
          onClick={() => setOpenPmDialog(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        style={{ padding: 0 }}
        dividers
        classes={{ dividers: classes.dialogContentDivider }}>
        <TableContainer>
          <Table aria-label='PmTable'>
            <TableBody>
              {procedure.map((procedure, index) => (
                <StyledTableRow key={index}>
                  <TableCell
                    style={{ padding: '12px 10px' }}
                    component='th'
                    scope='row'>
                    <Typography
                      component={procedure.file ? 'a' : ''}
                      style={procedure.file ? { color: '#0645AD' } : {}}
                      target='_blank'
                      rel='noopener noreferrer'
                      href={procedure.file}>
                      {procedure.description}
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

MaintenanceProcedureDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpenPmDialog: PropTypes.func.isRequired,
  procedure: PropTypes.array,
  name: PropTypes.string,
};

export default MaintenanceProcedureDialog;
