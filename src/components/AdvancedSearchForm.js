import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import { advancedSearchInvoice } from '../actions/invoiceAction';
import { advancedSearch } from '../services/services';
import SnackBar from './SnackBar';

const useStyles = makeStyles((theme) => ({
  edit_main: {
    background: '#2A3E4C',
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    height: 'fit-content',
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    color: '#FFFFFF',
    borderRadius: '10px'
  },
  edit_header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    alignItems: 'center',
    borderBottom: '1.5px solid #283A46'
  },
  edit_body: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1.5px solid #283A46'
  },
  edit_body_inputs: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    alignItems: 'flex-start',
  },
  edit_footer_btns: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    alignItems: 'center',
  },
  label: {
    color: '#97A1A9',
    fontSize: '0.85rem'
  },
  cancelBtn: {
    color: '#14AFF1',
    fontSize: '0.85rem',
    textTransform: 'None',
    border: '10px',
  },
  resetBtn: {
    borderColor: '#14AFF1',
    color: '#ffffff',
    fontSize: '0.85rem',
    textTransform: 'None',
    borderRadius: '10px',
    marginRight: '0.5rem',
  },
  saveBtn: {
    color: '#ffffff',
    fontSize: '0.85rem',
    textTransform: 'None',
    borderRadius: '10px',
    background: '#14AFF1',
    "&:hover": {
      background: '#14AFF1',
    }
  },
  closeIcon: {
    cursor: 'pointer',
    fontSize: '1.3rem'
  },
  error: {
    fontSize: '0.75rem',
    color: 'red',
    margin: 'auto'
  },
  inputRoot: {
    fontSize: '0.85rem',
    color: '#ffffff',
  },
  inputMarginDense: {
    paddingTop: '0.3rem !important',
    paddingBottom: '0.3rem !important',
  },
  inputNotch: {
    borderColor: '#356680 !important',
  }
}))

const AdvancedSearch = React.forwardRef(({ handleClose }, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [documentId, setDocumentId] = React.useState('');
  const [invoiceId, setInvoiceId] = React.useState('');
  const [customerNo, setCustomerNo] = React.useState('');
  const [businessYear, setBusinessYear] = React.useState('');
  const [error, setError] = React.useState(false);

  const [snackbarOpen, setSnackBarOpen] = React.useState(false);

  const handleSBClose = () => {
    setSnackBarOpen(false)
  };



  const handleSave = () => {
    let payload = {
      documentId: documentId ? documentId : '',
      invoiceId: invoiceId ? invoiceId : '',
      customerNo: customerNo ? customerNo : '',
      businessYear: businessYear ? businessYear : ''
    }
    console.log(payload)
    advancedSearch(payload)
      .then(res => {
        dispatch(advancedSearchInvoice(payload));
        setError(false);
        handleClose();
      })
      .catch((error) => {
        setError(true);
        setSnackBarOpen(true);
      })
  }

  const handleReset = () => {
    setInvoiceId('');
    setBusinessYear('');
    setCustomerNo('');
    setDocumentId('');
  }

  return (
    <>
      <div className={classes.edit_main}>
        <div className={classes.edit_header}>
          <h3 style={{ fontWeight: '400' }}>Advanced Search</h3>
          <CloseIcon className={classes.closeIcon} onClick={handleClose} />
        </div>
        <div className={classes.edit_body}>
          <div className={classes.edit_body_inputs}>
            <label className={classes.label}>Document Id</label>
            <OutlinedInput
              id="amount"
              onChange={(e) => setDocumentId(e.target.value)}
              margin="dense"
              style={{
                width: '13rem',
                marginLeft: '1rem',
                height: '2rem',
              }}
              classes={{
                root: classes.inputRoot,
                inputMarginDense: classes.inputMarginDense,
                notchedOutline: classes.inputNotch
              }}

            />
          </div>
          <div className={classes.edit_body_inputs}>
            <label className={classes.label}>Invoice Id</label>
            <OutlinedInput
              id="amount"
              onChange={(e) => setInvoiceId(e.target.value)}

              margin="dense"
              style={{
                width: '13rem',
                marginLeft: '1rem',
                height: '2rem',
              }}
              classes={{
                root: classes.inputRoot,
                inputMarginDense: classes.inputMarginDense,
                notchedOutline: classes.inputNotch
              }}

            />
          </div>

        </div>
        <div className={classes.edit_body}>
          <div className={classes.edit_body_inputs}>
            <label className={classes.label}>Customer No</label>
            <OutlinedInput
              id="amount"
              onChange={(e) => setCustomerNo(e.target.value)}
              margin="dense"
              style={{
                width: '13rem',
                marginLeft: '1rem',
                height: '2rem',
              }}
              classes={{
                root: classes.inputRoot,
                inputMarginDense: classes.inputMarginDense,
                notchedOutline: classes.inputNotch
              }}

            />
          </div>
          <div className={classes.edit_body_inputs}>
            <label className={classes.label}>Business Year</label>
            <OutlinedInput
              id="amount"
              onChange={(e) => setBusinessYear(e.target.value)}

              margin="dense"
              style={{
                width: '13rem',
                marginLeft: '1rem',
                height: '2rem',
              }}
              classes={{
                root: classes.inputRoot,
                inputMarginDense: classes.inputMarginDense,
                notchedOutline: classes.inputNotch
              }}

            />
          </div>

        </div>
        <div >
          <div className={classes.edit_footer_btns}>
            <Button className={classes.cancelBtn} onClick={handleClose}>Cancel</Button>
            <div>
              <Button
                className={classes.resetBtn}
                variant="outlined"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                className={classes.saveBtn}
                variant="contained"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      {error
        ? <SnackBar
          open={snackbarOpen}
          handleClose={handleSBClose}
          error="PLEASE ENTER VALID INPUTS"
        />
        : <></>
      }
    </>
  )
})

export default AdvancedSearch;
