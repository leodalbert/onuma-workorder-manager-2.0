import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  TextField,
  Button,
  Container,
  ButtonGroup,
  Typography,
  LinearProgress,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import QrReader from './QrReader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  searchDialogTextFieldCtr: {
    margin: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      margin: 0,
    },
  },
  searchDialogTextFieldtitle: {
    color: theme.palette.grey[800],
    margin: theme.spacing(1.5),
  },
  searchDialogTextField: {
    minWidth: '90%',
    maxWidth: '90%',
    paddingRight: 0,
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
    '& .MuiOutlinedInput-adornedEnd ': {
      paddingRight: 0,
    },
    '& .MuiButton-outlinedSizeLarge ': {
      padding: '14px 16px',
    },
  },
}));

const ComponentSearchField = ({
  searchLoading,
  setOpenQrReader,
  openQrReader,
  handleSearch,
  isDesktop,
  handleScan,
  setSearchField,
  searchField,
  handleKeyDown,
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid className={classes.searchDialogTextFieldCtr} item xs={12}>
        <Typography className={classes.searchDialogTextFieldtitle}>
          Component Search:
        </Typography>

        <TextField
          className={classes.searchDialogTextField}
          id='component_serach_field'
          onChange={(e) => setSearchField(e.target.value)}
          value={searchField}
          onKeyDown={handleKeyDown}
          label={
            isDesktop
              ? 'Name / Barcode / Manufacturer / Model Number / etc...'
              : 'Name / Manufacturer / etc...'
          }
          variant='outlined'
          InputProps={{
            endAdornment: (
              <ButtonGroup
                variant='outlined'
                size='large'
                aria-label='large outlined primary button group'>
                <Button onClick={() => handleSearch(searchField)}>
                  <SearchIcon />
                  {isDesktop && ' Search'}
                </Button>
                <Button onClick={() => setOpenQrReader(!openQrReader)}>
                  <i className='fas fa-qrcode'></i>
                </Button>
              </ButtonGroup>
            ),
          }}
        />
        {searchLoading && (
          <LinearProgress
            style={{ marginTop: '5px' }}
            className={classes.searchDialogTextField}
            color='secondary'
          />
        )}
      </Grid>
      {openQrReader && (
        <Grid item xs={12}>
          <Container disableGutters maxWidth='sm'>
            <QrReader handleScan={handleScan} />
          </Container>
        </Grid>
      )}
    </Fragment>
  );
};

ComponentSearchField.propTypes = {
  searchLoading: PropTypes.bool.isRequired,
  setOpenQrReader: PropTypes.func.isRequired,
  openQrReader: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  handleScan: PropTypes.func.isRequired,
  setSearchField: PropTypes.func.isRequired,
  searchField: PropTypes.string,
  handleKeyDown: PropTypes.func.isRequired,
};

export default memo(ComponentSearchField);
