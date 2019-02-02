import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    right: '5%',
    bottom: '5%',
    background: '#84dcc6',
    '&:hover': {
      color: '#E0F2E9',
    	background: '#165041'
    }
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function FloatingActionButton(props) {
  const { classes, label, onClick } = props;
  return (
    <div>
      <Fab variant="extended" aria-label="Delete" onClick={onClick} className={classes.fab}>
        <AddIcon className={classes.extendedIcon} />
        {label}
      </Fab>
    </div>
  );
}

FloatingActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(FloatingActionButton);
