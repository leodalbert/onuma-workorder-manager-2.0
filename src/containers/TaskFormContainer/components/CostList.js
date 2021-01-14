import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Grid,
  Button,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backgroundColorMain: {
    backgroundColor: theme.palette.primary.main,
  },
  tableCell: {
    '& .MuiTableCell-root': {
      paddingLeft: '10px',
    },
  },
}));

const CostList = ({ costs, setCosts }) => {
  const classes = useStyles();

  const handleRemoveCost = (index) => {
    setCosts(costs.filter((cost, i) => i !== index));
  };
  return (
    <Fragment>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.tableCell}>
            <TableHead>
              <TableRow
                className={clsx(
                  classes.backgroundColorMain,
                  classes.tableCell
                )}>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell padding='checkbox'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {costs.map((cost, index) => (
                <TableRow key={index}>
                  <TableCell>{cost.description}</TableCell>
                  <TableCell>
                    $&nbsp;
                    {(Math.round(cost.cost * 100) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell padding='checkbox'>
                    <Button
                      onClick={() => handleRemoveCost(index)}
                      variant='text'
                      size='small'>
                      <ClearIcon fontSize='small' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Fragment>
  );
};

CostList.propTypes = {
  costs: PropTypes.array.isRequired,
  setCosts: PropTypes.func.isRequired,
};

export default CostList;
