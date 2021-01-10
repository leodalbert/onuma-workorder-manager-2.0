import { connect } from 'react-redux';
import ComponentSearch from './components/ComponentSearch';

import { makeSelectWorkorderSpaceForComponentSearch } from 'Selectors/workorder';
import { selectDialogComponent } from 'Selectors/componentDialog';
import {
  makeSelectComponentSearchResults,
  selectSearchLoading,
} from 'Selectors/component';
import {
  fillComponentDialog,
  clearComponentDialog,
  addComponent,
  clearSearchState,
  searchComponents,
} from 'actions/component';

const mapStateToProps = (state) => ({
  searchLoading: selectSearchLoading(state),
  searchResults: makeSelectComponentSearchResults(state),
  workorder: makeSelectWorkorderSpaceForComponentSearch(state),
  dialogComponent: selectDialogComponent(state),
});

const mapDispatchToProps = {
  fillComponentDialog,
  clearComponentDialog,
  addComponent,
  clearSearchState,
  searchComponents,
};

const ComponentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentSearch);

export default ComponentsContainer;
