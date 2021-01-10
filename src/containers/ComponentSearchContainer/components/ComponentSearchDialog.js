import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  DialogContent,
  Dialog,
  Grid,
  Slide,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ComponentSearchDialogHeader from './ComponentSearchDialogHeader';
import ComponentSearchDialogResults from './ComponentSearchDialogResults';
import ComponentSearchField from './ComponentSearchField';
import ComponentDetailDialog from 'components/Common/ComponentDetailDialog';

const useStyles = makeStyles((theme) => ({
  searchDialogTextFieldCtr: {
    margin: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      margin: 0,
    },
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ComponentSearchDialog = ({
  open,
  handleClose,
  searchComponents,
  studioId,
  searchResults,
  searchLoading,
  clearComponentDialog,
  fillComponentDialog,
  addComponent,
  clearSearchState,
  setOpenQrReader,
  openQrReader,
  dialogComponent,
  workorder: { workorderId, building, space },
}) => {
  const classes = useStyles();
  const [searchField, setSearchField] = useState('');
  const [openDetailDailog, setOpenDetailDialog] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 750);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 750);
  };
  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const handleSearch = () => {
    setHasSearched(true);
    searchComponents(searchField, building.id, studioId);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleOpenComponentDialog = (component) => {
    fillComponentDialog(component.component);
    setOpenDetailDialog(true);
  };

  const handleCloseComponentDialog = () => {
    setHasSearched(false);
    setOpenDetailDialog(false);
    clearComponentDialog();
  };

  const handleSelectComponent = (componentId) => {
    setOpenDetailDialog(false);
    clearComponentDialog();
    addComponent(componentId, workorderId, studioId);
    setSearchField('');
    handleClose();
    clearSearchState();
  };

  const handleScan = (data) => {
    if (!!data) {
      setHasSearched(true);
      setOpenQrReader(false);
      setSearchField(data);
      searchComponents(data, building.id, studioId);
    }
  };

  const headerLocation = [
    `${building.number} ${(building.number || building.name) && '- '}${
      building.name
    }`,
    <br key='1' />,
    space && space.number && space.number,
    ' ',
    space && space.number && space.name && '- ',
    space && space.name && space.name,
  ];

  return (
    <Dialog
      fullScreen
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}>
      <ComponentSearchDialogHeader
        text={headerLocation}
        handleClose={handleClose}
        isMobile={!isDesktop}
      />

      <DialogContent>
        <Grid container spacing={3}>
          <ComponentSearchField
            searchLoading={searchLoading}
            setOpenQrReader={setOpenQrReader}
            openQrReader={openQrReader}
            handleKeyDown={handleKeyDown}
            handleSearch={handleSearch}
            isDesktop={isDesktop}
            handleScan={handleScan}
            searchField={searchField}
            setSearchField={setSearchField}
          />
          <Grid
            className={classes.searchDialogTextFieldCtr}
            container
            item
            xs={12}>
            {!searchLoading && hasSearched && searchResults.length < 1 ? (
              <Grid style={{ textAlign: 'center' }} item xs={12}>
                <Typography style={{ paddingTop: '20px' }}>
                  No search results found...
                </Typography>
              </Grid>
            ) : (
              <ComponentSearchDialogResults
                searchResults={searchResults}
                handleOpenComponentDialog={handleOpenComponentDialog}
                handleSelectComponent={handleSelectComponent}
              />
            )}
          </Grid>
        </Grid>
        <ComponentDetailDialog
          open={openDetailDailog}
          handleClose={handleCloseComponentDialog}
          dialogComponent={dialogComponent}
        />
      </DialogContent>
    </Dialog>
  );
};

ComponentSearchDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  searchComponents: PropTypes.func.isRequired,
  studioId: PropTypes.string,
  searchResults: PropTypes.array.isRequired,
  searchLoading: PropTypes.bool.isRequired,
  clearComponentDialog: PropTypes.func.isRequired,
  fillComponentDialog: PropTypes.func.isRequired,
  addComponent: PropTypes.func.isRequired,
  clearSearchState: PropTypes.func.isRequired,
  setOpenQrReader: PropTypes.func.isRequired,
  openQrReader: PropTypes.bool.isRequired,
  dialogComponent: PropTypes.object.isRequired,
  workorder: PropTypes.object.isRequired,
};

export default ComponentSearchDialog;
