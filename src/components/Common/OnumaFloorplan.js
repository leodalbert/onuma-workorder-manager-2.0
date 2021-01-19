import React, { useEffect, useState } from 'react';
import loadFloorplan from 'utils/loadFloorplan';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spinner: {
    color: theme.palette.secondary.main,
    marginTop: '130px',
    position: 'absolute',
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
    el.addEventListener('svgInitedEmitter', () => {
      setisLoaded(true);
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
        display: 'flex',
        justifyContent: 'center',
      }}
      className='floorplan-component'>
      {!isLoaded && <CircularProgress className={classes.spinner} />}
      {scriptLoaded && floorId ? (
        <onuma-plan
          style={{
            height: '300px',
            width: '100%',
            position: 'inherit',
          }}
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
