import React, { useReducer, memo } from 'react';
import PropTypes from 'prop-types';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';

import ActionBtn from 'components/Common/ActionBtn';

const RenderSelectorFields = memo(({ collaboratorsToAdd }) => {
  return collaboratorsToAdd.map((tech) => (
    <FormControlLabel
      value={Number(tech.id)}
      key={tech.id}
      control={<Radio color='default' />}
      label={`${tech.first_name} ${tech.last_name} (${tech.email})`}
    />
  ));
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'selectTech':
      return action.tech;
    default:
      throw new Error('Unexpected action');
  }
};

const AddCollaboratorDialog = ({
  open,
  setCollaboratorDialog,
  handleAdd,
  collaboratorsToAdd,
}) => {
  const [selectedTech, dispatch] = useReducer(reducer, null);

  const handleCancle = () => {
    dispatch({ type: 'selectTech', tech: null });
    setCollaboratorDialog(false);
  };
  const handleOk = () => {
    dispatch({ type: 'selectTech', tech: null });
    handleAdd(selectedTech);
  };

  return (
    <Dialog
      onClose={() => setCollaboratorDialog(false)}
      maxWidth='xs'
      aria-labelledby='collaborator-dialog-title'
      open={open}>
      <DialogTitle id='collaborator-dialog-title'>
        Add collaborator to workorder
      </DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          aria-label='selected-tech'
          name='tech'
          value={Number(selectedTech)}
          onChange={(e) =>
            dispatch({ type: 'selectTech', tech: e.target.value })
          }>
          <RenderSelectorFields collaboratorsToAdd={collaboratorsToAdd} />
        </RadioGroup>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <ActionBtn
          variant='contained'
          handleClick={handleCancle}
          color='secondary'>
          Cancel
        </ActionBtn>
        <ActionBtn
          disabled={!selectedTech}
          autoFocus={true}
          handleClick={handleOk}>
          Ok
        </ActionBtn>
      </DialogActions>
    </Dialog>
  );
};

AddCollaboratorDialog.propTypes = {
  open: PropTypes.bool,
  setCollaboratorDialog: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  collaboratorsToAdd: PropTypes.array,
};

export default AddCollaboratorDialog;
