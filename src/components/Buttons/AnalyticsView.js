import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import buttonHOC from './buttonHOC';

const useStyles = theme => ({
  button: {
    color: '#FFFFFF',
    background: 'transparent',
    borderRadius: '10px',
    borderColor: '#14AFF1',
    textTransform: 'none',
    padding: '0.2rem 1rem',
    marginRight: '0.6rem',
    "&:hover": {
      background: '#14AFF1'
    },
    "&:disabled": {
      background: 'transparent',
      color: '#97A1A9',
      borderColor: '#97A1A9'
    }
  }
});

class AnalyticsView extends React.Component {
  render() {
    const classes = this.props.classes;
    return (
      <>
        <Button
          className={classes.button}
          disableRipple
          variant="outlined"
          onClick={this.props.handleOpen}
        >
          Analytics View
        </Button>
      </>
    )
  }
}

export default buttonHOC(withStyles(useStyles)(AnalyticsView));
