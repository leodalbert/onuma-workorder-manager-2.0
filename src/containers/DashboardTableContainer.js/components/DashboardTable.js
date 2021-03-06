import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TableFooter,
  Typography,
} from '@material-ui/core';

import SummaryHead from './SummaryHead';
import { getComparator, stableSort } from './summaryFilters';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  dashboardTable: {
    minWidth: 500,
  },
  urgentFont: {
    color: theme.palette.info.main,
  },
}));

const SummaryTable = ({
  workorders,
  history,
  email,
  techId,
  requesterPage,
  requesterEmail,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('request_date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowSelect = (id) => {
    history.push(`workorder/${id}/${email}`);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, workorders.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table
          className={classes.dashboardTable}
          aria-labelledby='tableTitle'
          size='medium'
          aria-label='enhanced table'>
          <SummaryHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={workorders.length}
          />
          <TableBody>
            {stableSort(workorders, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={() => handleRowSelect(row.id)}
                    tabIndex={-1}
                    key={row.id}>
                    <TableCell
                      style={{ paddingRight: '10px', fontWeight: 'bolder' }}
                      id={labelId}
                      align='left'>
                      {dayjs(row.request_date).format('MM/DD/YYYY')}
                    </TableCell>
                    <TableCell align='left'>
                      {row.collaborators.some(
                        (collaborator) => collaborator.collaborator === techId
                      ) && <span>*&nbsp;</span>}
                      {requesterEmail &&
                        row.request_email !== requesterEmail && (
                          <span>*&nbsp;</span>
                        )}

                      {row.status}
                    </TableCell>
                    <TableCell
                      style={{ paddingLeft: 5, paddingRight: 5 }}
                      className={
                        row.assigned_priority === 1 ? classes.urgentFont : ''
                      }
                      align='left'>
                      {row.request_description.split('\r\n')[0]}
                    </TableCell>
                    <TableCell align='left'>{row.request_number}</TableCell>
                    <TableCell align='left'>
                      {row.building.name}
                      {row.space && ' - '}
                      {row.space &&
                        (row.space.number
                          ? row.space.number
                          : row.space.name
                          ? row.space.name
                          : ' ')}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * 5 }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell style={{ borderBottom: 'none' }} colSpan={1}>
                <Typography color='textSecondary'>
                  * You are{' '}
                  {requesterPage ? "CC'd on request" : 'a collaborator'}
                </Typography>
              </TableCell>

              <TablePagination
                colSpan={4}
                rowsPerPageOptions={[10, 25, 50]}
                component='td'
                count={workorders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

SummaryTable.defaultProps = {
  requesterPage: false,
  requesterEmail: '',
};

SummaryTable.propTypes = {
  workorders: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  email: PropTypes.string,
  techId: PropTypes.number,
  requesterPage: PropTypes.bool.isRequired,
  requesterEmail: PropTypes.string.isRequired,
};

export default withRouter(SummaryTable);
