import { connect } from 'react-redux';
import Attachments from './components/Attachments';
import { selectWorkorderFiles } from 'Selectors/attachments';
import { selectWorkorderId } from 'Selectors/workorder';
import { selectTechId } from 'Selectors/tech';
import { deleteAttachment } from 'actions/attachments';

const mapStateToProps = (state) => ({
  files: selectWorkorderFiles(state),
  workorderId: selectWorkorderId(state),
  techId: selectTechId(state),
});

const mapDispatchToProps = { deleteAttachment };

const AttachmentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Attachments);

export default AttachmentsContainer;
