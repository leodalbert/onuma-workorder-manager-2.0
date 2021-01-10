import { connect } from 'react-redux';
import Components from './components/Components';
import {
  makeSelectWorkorderComponentIds,
  selectWorkorderId,
} from 'Selectors/workorder';
import { selectDialogComponent } from 'Selectors/componentDialog';
import {
  makeSelectSpaceComponents,
  makeSelectWorkorderComponents,
  selectComponentLoading,
} from 'Selectors/component';
import {
  fillComponentDialog,
  clearComponentDialog,
  addComponent,
  removeComponent,
} from 'actions/component';

const mapStateToProps = (state) => ({
  workorderComponentIds: makeSelectWorkorderComponentIds(state),
  workOrderComponents: makeSelectWorkorderComponents(state),
  workorderId: selectWorkorderId(state),
  spaceComponents: makeSelectSpaceComponents(state),
  componentLoading: selectComponentLoading(state),
  dialogComponent: selectDialogComponent(state),
});

const mapDispatchToProps = {
  fillComponentDialog,
  addComponent,
  removeComponent,
  clearComponentDialog,
};

const ComponentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Components);

export default ComponentsContainer;
