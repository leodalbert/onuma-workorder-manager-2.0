import React, { Fragment, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';

import ActionBtn from 'components/Common/ActionBtn';

const useStyles = makeStyles((theme) => ({
  commentField: {
    maxWidth: '700px',
    '& label.Mui-focused': {
      color: theme.palette.common.black,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  commentFieldHelperText: {
    fontWeight: 'bolder',
    fontSize: '1rem',
  },
  commentBtnCtr: {
    padding: '12px 0px',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      paddingBottom: '15px',
    },
  },
}));

const CommentTextBox = ({
  administrator_comment,
  studioId,
  workorderId,
  sendCommentToRequestor,
  readOnly,
}) => {
  const classes = useStyles();
  const [comment, setComment] = useState(administrator_comment);
  return (
    <Fragment>
      <Grid item container direction='column' xs={12} lg={9}>
        <Grid item container spacing={3} justify='flex-end'>
          <Grid item xs={12} sm={8} style={{ margin: '12px 0px' }}>
            <TextField
              disabled={readOnly}
              className={classes.commentField}
              id='commentField'
              label='Comments To Requester'
              multiline
              fullWidth
              rows={4}
              variant='outlined'
              value={comment ? comment : ''}
              onChange={(e) => setComment(e.target.value)}
              FormHelperTextProps={{
                className: classes.commentFieldHelperText,
              }}
              helperText={
                comment !== administrator_comment &&
                'Click "Save + Send" to email your comment to requester'
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.commentBtnCtr} item xs={12} lg={3}>
        {!readOnly && (
          <ActionBtn
            handleClick={() =>
              sendCommentToRequestor(comment, studioId, workorderId)
            }
            disabled={comment === administrator_comment}>
            Save + Send
          </ActionBtn>
        )}
      </Grid>
    </Fragment>
  );
};

CommentTextBox.propTypes = {
  administrator_comment: PropTypes.string,
  studioId: PropTypes.string,
  workorderId: PropTypes.number,
  sendCommentToRequestor: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

export default memo(CommentTextBox);
