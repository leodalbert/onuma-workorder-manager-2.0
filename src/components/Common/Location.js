import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  TextField,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  formControlLocation: {
    margin: 5,
    width: 300,
    [theme.breakpoints.down('md')]: {
      width: '80%',
      maxWidth: 350,
    },
    [theme.breakpoints.down('xs')]: {
      width: '95%',
      maxWidth: '95%',
      textAlign: 'left',
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
  button: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  labelSelectStyle: {
    padding: theme.spacing(1),
    fontWeight: 'bolder',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
      paddingTop: theme.spacing(3),
    },
    color: theme.palette.text.primary,
  },
}));

const Location = ({
  workorder: {
    floor = '',
    building = '',
    space = '',
    location_description = '',
  },
  edit,
  siteBuidlings,
  setTopLocationState,
  handleUpdateLocationClick,
  isTechnicianPage = false,
}) => {
  let initialLocationState = { floor, building, space, location_description };

  if (initialLocationState.location_description === null) {
    initialLocationState.location_description = '';
  }
  if (initialLocationState.space === null) {
    initialLocationState.space = '';
  }
  if (initialLocationState.floor === null) {
    initialLocationState.floor = '';
  }
  const classes = useStyles();
  const [locationState, setLocationState] = useState(initialLocationState);

  useEffect(() => {
    setTopLocationState(locationState);
  }, [locationState, setTopLocationState]);

  const handleChange = (e) => {
    if (e.target.name === 'building') {
      const buildingInfo = siteBuidlings.find(
        (building) => building.id === e.target.value
      );
      setLocationState({
        building: {
          id: e.target.value,
          site: building.site,
          name: buildingInfo.name,
          number: buildingInfo.number,
        },
        space: { id: '' },
        floor: { id: '' },
        location_description: '',
      });
    } else if (e.target.name === 'floor') {
      const floorInfo = siteBuidlings
        .find((building) => building.id === locationState.building.id)
        .floors.find((floor) => floor.id === e.target.value);

      setLocationState({
        ...locationState,
        space: { id: '' },
        location_description: '',
        floor: {
          id: e.target.value,
          name: floorInfo.name,
          number: floorInfo.number,
        },
      });
    } else if (e.target.name === 'space') {
      const spaceInfo = siteBuidlings
        .find((building) => building.id === locationState.building.id)
        .floors.find((floor) => floor.id === locationState.floor.id)
        .spaces.find((space) => space.id === e.target.value);
      setLocationState({
        ...locationState,
        location_description: '',
        space: {
          id: e.target.value,
          name: spaceInfo.name,
          number: spaceInfo.number,
        },
      });
    } else if (e.target.name === 'location_description') {
      setLocationState({
        ...locationState,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <Fragment>
      <Grid className={classes.labelCtr} item xs={12} sm={4} lg={5}>
        <Typography
          variant='subtitle1'
          className={edit ? classes.labelSelectStyle : classes.labelStyle}>
          {isTechnicianPage && (
            <IconButton
              className={classes.button}
              aria-label='edit-location'
              size='small'
              onClick={handleUpdateLocationClick}
              disabled={
                !locationState.space.id && !locationState.location_description
              }>
              {edit ? (
                <SaveIcon fontSize='inherit' />
              ) : (
                <EditIcon fontSize='inherit' />
              )}
            </IconButton>
          )}
          Location:
        </Typography>
      </Grid>
      <Grid className={classes.detailCtr} item xs={12} sm={8} lg={7}>
        {edit ? (
          <Fragment>
            <FormControl className={classes.formControlLocation}>
              <Select
                labelId='building-select'
                id='building-select'
                value={locationState.building.id}
                name='building'
                onChange={handleChange}>
                {siteBuidlings.map((buildings) => {
                  return (
                    <MenuItem key={buildings.id} value={buildings.id}>
                      {`${buildings.number && buildings.number} - 
                    ${buildings.name}`}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControlLocation}>
              <Select
                labelId='floor-select'
                id='floor-select'
                value={locationState.floor ? locationState.floor.id : ''}
                name='floor'
                onChange={handleChange}>
                <MenuItem value=''>Not specified</MenuItem>
                {siteBuidlings
                  .filter(
                    (buildings) => buildings.id === locationState.building.id
                  )[0]
                  .floors.map((floors) => {
                    return (
                      <MenuItem key={floors.id} value={floors.id}>
                        {floors.name
                          ? floors.name
                          : `Floor ${
                              floors.number >= 0
                                ? floors.number + 1
                                : floors.number
                            }`}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControlLocation}>
              <Select
                labelId='space-select'
                id='space-select'
                value={locationState.space ? locationState.space.id : ''}
                name='space'
                onChange={handleChange}>
                <MenuItem value=''>Not specified</MenuItem>
                {locationState.floor &&
                  locationState.floor.id &&
                  siteBuidlings
                    .filter(
                      (buildings) => buildings.id === locationState.building.id
                    )[0]
                    .floors.filter(
                      (floors) => floors.id === locationState.floor.id
                    )[0]
                    .spaces.map((spaces) => {
                      return (
                        <MenuItem key={spaces.id} value={spaces.id}>
                          {`${spaces.number && spaces.number} - 
                  ${spaces.name ? spaces.name : 'Unnamed floor'}`}
                        </MenuItem>
                      );
                    })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControlLocation}>
              <TextField
                error={
                  !locationState.space.id && !locationState.location_description
                }
                value={locationState.location_description}
                id='location-description'
                helperText={
                  !locationState.space.id &&
                  !locationState.location_description &&
                  'if no space is selected, please enter a description'
                }
                placeholder='location description'
                name='location_description'
                multiline
                rowsMax={4}
                variant='standard'
                onChange={handleChange}
              />
            </FormControl>
          </Fragment>
        ) : (
          <Typography variant='body1' className={classes.detailStyle}>
            {[
              locationState.building.number &&
                `${locationState.building.number} - `,
              `${locationState.building.name}`,
              !!locationState.floor && <br key='1' />,
              !!locationState.floor &&
                (!!locationState.floor.name
                  ? `${locationState.floor.name}`
                  : `Floor ${
                      locationState.floor.number >= 0
                        ? locationState.floor.number + 1
                        : locationState.floor.number
                    }`),
              !!locationState.space && <br key='2' />,
              !!locationState.space &&
                locationState.space.number &&
                locationState.space.number,
              ' ',
              !!locationState.space &&
                locationState.space.number &&
                locationState.space.name &&
                '- ',
              !!locationState.space &&
                locationState.space.name &&
                locationState.space.name,
              locationState.location_description && <br key='3' />,
              locationState.location_description &&
                locationState.location_description,
            ]}
          </Typography>
        )}
      </Grid>
    </Fragment>
  );
};

Location.propTypes = {
  edit: PropTypes.bool.isRequired,
  workorder: PropTypes.object,
  siteBuidlings: PropTypes.array,
  setTopLocationState: PropTypes.func.isRequired,
  handleUpdateLocationClick: PropTypes.func,
  isTechnicianPage: PropTypes.bool,
};

export default Location;
