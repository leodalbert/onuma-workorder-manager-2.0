import React, { useEffect, useState } from 'react';
import loadFloorplan from 'utils/loadFloorplan';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spinnerDiv: {
    position: 'relative',
    top: '45%',
    left: '45%',
  },
  spinner: {
    color: theme.palette.secondary.main,
  },
}));

const FloorPlan = ({ studioId, siteId, buildingId, floorId, spaceId }) => {
  const classes = useStyles();

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    loadFloorplan(() => {
      setScriptLoaded(true);
    });
  }, [floorId]);
  if (document.querySelector('onuma-plan')) {
    const el = document.querySelector('onuma-plan');
    el.addEventListener('svgInitedEmitter', (event) => {
      setisLoaded(event.returnValue);
    });
  }

  return (
    <div
      style={{
        height: '300px',
        maxWidth: '500px',
        width: '90%',
        border: '1px solid lightgrey',
        margin: 'auto',
        overflow: 'hidden',
      }}
      className='floorplan-component'>
      {!isLoaded && (
        <div className={classes.spinnerDiv}>
          <CircularProgress className={classes.spinner} />
        </div>
      )}
      {scriptLoaded && floorId ? (
        <onuma-plan
          style={{ height: '300px', width: '300px', background: 'lightgray' }}
          studio-id={studioId}
          site-id={siteId}
          building-id={buildingId}
          floor-id={floorId}
          space-id={spaceId}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default FloorPlan;
