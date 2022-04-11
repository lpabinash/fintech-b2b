import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { KeyboardDatePicker } from '@material-ui/pickers';
import SnackBar from './SnackBar';
import { analyticsViewInvoice } from '../actions/invoiceAction';
import { analyticsView } from '../services/services';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  add_main: {
    background: '#2A3E4C',
    display: 'flex',
    flexDirection: 'column',
    width: '95vw',
    height: 'fit-content',
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    color: '#FFFFFF',
    borderRadius: '10px'
  },
  add_header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    alignItems: 'center',
    borderBottom: '1.5px solid #283A46'
  },
  add_body: {
    borderBottom: '1.5px solid #283A46'
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem',
  },
  add_body_inputs: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    justifyContent: 'space-between',
    marginLeft: '1rem'
  },
  formField: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  add_footer_btns: {
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
  clearBtn: {
    borderColor: '#14AFF1',
    color: '#ffffff',
    fontSize: '0.85rem',
    textTransform: 'None',
    borderRadius: '10px',
    marginRight: '0.5rem',
  },
  addBtn: {
    color: '#ffffff',
    fontSize: '0.85rem',
    textTransform: 'None',
    borderRadius: '10px',
    background: '#14AFF1',
    "&:hover": {
      background: '#14AFF1',
    },
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
  labelRoot: {
    fontSize: '0.85rem !important',
    color: '#C0C6CA !important'
  },
  asterisk: {
    color: '#FF5B5B'
  },
  inputMarginDense: {
    paddingTop: '0.4rem !important',
    paddingBottom: '0.4rem !important',
  },
  inputRoot: {
    fontSize: '0.85rem !important',
    color: '#ffffff !important',
    background: '#283A46',
  },
  inputNotch: {
    borderColor: '#356680 !important',
    borderRadius: '10px'
  },
  inputNotchError: {
    borderColor: '#FF5B5B !important'
  },
  popoverPaper: {
    height: '20rem !important',
    width: '16rem'
  },
  iconBtn: {
    color: "#ffffff !important",
    padding: '0px'
  },
  popoverStyle: {
    "& .MuiPickersBasePicker-container .MuiPickersToolbar-toolbar": {
      background: '#223746',

    },
    "& .MuiPickersBasePicker-container .MuiPickersBasePicker-pickerView": {
      background: '#2A3E4C',
      "& div .MuiPickersCalendarHeader-switchHeader": {
        color: '#97A1A9',
      },
      "& div .MuiPickersCalendarHeader-switchHeader .MuiPickersCalendarHeader-iconButton": {
        background: 'none',
        color: '#97A1A9',
      },
      "& .MuiPickersCalendarHeader-daysHeader > .MuiPickersCalendarHeader-dayLabel": {
        color: '#97A1A9',
      },
      "& .MuiPickersCalendar-transitionContainer div .MuiPickersCalendar-week div .MuiPickersDay-day": {
        color: '#C0C6CA !important'
      },
      "& .MuiPickersCalendar-transitionContainer div .MuiPickersCalendar-week div .MuiPickersDay-daySelected": {
        background: '#14AFF1',
        color: '#ffffff !important',
        "&:hover": {
          background: '#14AFF1',
          color: '#ffffff',
        }
      },
      "& .MuiPickersYearSelection-container .MuiPickersYear-root": {
        color: '#C0C6CA'
      },
      "& .MuiPickersYearSelection-container .MuiPickersYear-yearSelected": {
        color: '#ffffff !important'
      }
    },

  }
}))

const AnalyticsView = React.forwardRef(({ handleClose }, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    required: {
      end_due_in_date: null,
      start_due_in_date: null,
      end_clear_date: null,
      start_clear_date: null,
      invoice_currency: '',
      end_baseline_create_date: null,
      start_baseline_create_date: null,
    }
  });

  const [errors, setErrors] = React.useState({
    end_due_in_date: false,
    start_due_in_date: false,
    end_clear_date: false,
    start_clear_date: false,
    invoice_currency: false,
    end_baseline_create_date: false,
    start_baseline_create_date: false,
  });

  const [snackbarOpen, setSnackBarOpen] = React.useState(false);

  const handleSBClose = () => {
    setSnackBarOpen(false)
  };

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      if (name !== 'notes') {
        setValues({
          ...values,
          required: {
            ...values.required,
            [name]: value
          }
        })
      } else {
        setValues({
          required: {
            ...values.required
          },
          [name]: value
        })
      }
    } else {
      setValues({
        ...values,
        required: {
          ...values.required,
          end_due_in_date: moment(e),
        },
      })
    }
  }

  const handleChange2 = (e) => {
    setValues({
      ...values,
      required: {
        ...values.required,
        start_due_in_date: moment(e),
      },
    })
  }
  const handleChange3 = (e) => {
    setValues({
      ...values,
      required: {
        ...values.required,
        end_clear_date: moment(e),
      },
    })
  }
  const handleChange4 = (e) => {
    setValues({
      ...values,
      required: {
        ...values.required,
        start_clear_date: moment(e),
      },
    })
  }

  const handleChange5 = (e) => {
    setValues({
      ...values,
      required: {
        ...values.required,
        end_baseline_create_date: moment(e),
      },
    })
  }
  const handleChange6 = (e) => {
    setValues({
      ...values,
      required: {
        ...values.required,
        start_baseline_create_date: moment(e),
      },
    })
  }
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: value ? false : true
    })
  }

  const handleClear = () => {
    setValues({
      required: {
        end_due_in_date: null,
        start_due_in_date: null,
        end_clear_date: null,
        start_clear_date: null,
        invoice_currency: '',
        end_baseline_create_date: null,
        start_baseline_create_date: null,
      }
    })
  }

  const validate = () => {
    setErrors({
      end_due_in_date: values.required.end_due_in_date ? false : true,
      start_due_in_date: values.required.start_due_in_date ? false : true,
      end_clear_date: values.required.end_clear_date ? false : true,
      start_clear_date: values.required.start_clear_date ? false : true,
      invoice_currency: values.required.invoice_currency ? false : true,
      end_baseline_create_date: values.required.end_baseline_create_date ? false : true,
      start_baseline_create_date: values.required.start_baseline_create_date ? false : true,
    });
  }

  const handleSubmit = () => {
    validate();
    if (!Object.values(values.required).every(x => x)) {
      setSnackBarOpen(true);
    } else {
      setSnackBarOpen(false);
      // console.log({...values, ...values.required})
      const body = {
        ...values.required,
        end_due_in_date: moment(values.required.end_due_in_date).format('yyyy-MM-DD'),
        end_clear_date: moment(values.required.end_clear_date).format('yyyy-MM-DD'),
        start_due_in_date: moment(values.required.start_due_in_date).format('yyyy-MM-DD'),
        start_clear_date: moment(values.required.start_clear_date).format('yyyy-MM-DD'),
        end_baseline_create_date: moment(values.required.end_baseline_create_date).format('yyyy-MM-DD'),
        start_baseline_create_date: moment(values.required.start_baseline_create_date).format('yyyy-MM-DD'),
        invoice_currency: values.required.invoice_currency,

      }
      // console.log(body);
      analyticsView(body)
        .then((res) => {
          console.log(body);
          dispatch(analyticsViewInvoice(body));
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  }

  const handlePickerClose = () => {
    if (values.required.end_due_in_date) {
      setErrors({ ...errors, end_due_in_date: false })
    } else {
      setErrors({ ...errors, end_due_in_date: true })
    }

  }

  const handlePickerClose2 = () => {
    if (values.required.start_due_in_date) {
      setErrors({ ...errors, start_due_in_date: false })
    } else {
      setErrors({ ...errors, start_due_in_date: true })
    }
  }
  const handlePickerClose3 = () => {
    if (values.required.end_clear_date) {
      setErrors({ ...errors, end_clear_date: false })
    } else {
      setErrors({ ...errors, end_clear_date: true })
    }
  }
  const handlePickerClose5 = () => {
    if (values.required.end_baseline_create_date) {
      setErrors({ ...errors, end_baseline_create_date: false })
    } else {
      setErrors({ ...errors, end_baseline_create_date: true })
    }
  }
  const handlePickerClose6 = () => {
    if (values.required.start_baseline_create_date) {
      setErrors({ ...errors, start_baseline_create_date: false })
    } else {
      setErrors({ ...errors, start_baseline_create_date: true })
    }
  }
  const handlePickerClose4 = () => {
    if (values.required.start_clear_date) {
      setErrors({ ...errors, start_clear_date: false })
    } else {
      setErrors({ ...errors, start_clear_date: true })
    }
  }

  const inputStyles = {
    root: classes.inputRoot,
    inputMarginDense: classes.inputMarginDense,
    focused: classes.inputFocus,
  }

  return (
    <>
      <div className={classes.add_main}>
        <div className={classes.add_header}>
          <h3 style={{ fontWeight: '400' }}>Add Invoice</h3>
          <CloseIcon className={classes.closeIcon} onClick={handleClose} />
        </div>
        <div className={classes.add_body}>
          <form className={classes.form}>
            <div className={classes.add_body_inputs} style={{ marginRight: '1rem' }}>
              <div className={classes.formField}>
                <InputLabel
                  classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                  required
                >
                  Start Due Date
                </InputLabel>
                <KeyboardDatePicker
                  margin="dense"
                  variant="inline"
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  format="DD/MM/yyyy"
                  value={values.required.start_due_in_date}
                  onChange={(date) => handleChange2(date)}
                  onClose={handlePickerClose2}
                  style={{ width: '15rem' }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                    disableRipple: true,
                    classes: {
                      root: classes.iconBtn
                    }
                  }}
                  PopoverProps={{
                    classes: {
                      // paper: classes.popoverPaper
                    },
                    className: classes.popoverStyle,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left"
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left"
                    },
                    getContentAnchorEl: null
                  }}
                  InputProps={{
                    classes: {
                      ...inputStyles,
                      notchedOutline: errors.start_due_in_date ? classes.inputNotchError : classes.inputNotch,
                    },
                    onBlur: (e) => handleBlur(e),
                    name: 'start_due_in_date'
                  }}
                />
              </div>
              <div className={classes.formField}>
                <InputLabel
                  classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                  required
                >
                  End Due Date
                </InputLabel>
                <KeyboardDatePicker
                  margin="dense"
                  variant="inline"
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  format="DD/MM/yyyy"
                  value={values.required.end_due_in_date}
                  onChange={(date) => handleChange(date)}
                  onClose={handlePickerClose}
                  style={{ width: '15rem' }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                    disableRipple: true,
                    classes: {
                      root: classes.iconBtn
                    }
                  }}
                  PopoverProps={{
                    classes: {
                      // paper: classes.popoverPaper
                    },
                    className: classes.popoverStyle,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left"
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left"
                    },
                    getContentAnchorEl: null
                  }}
                  InputProps={{
                    classes: {
                      ...inputStyles,
                      notchedOutline: errors.end_due_in_date ? classes.inputNotchError : classes.inputNotch,
                    },
                    onBlur: (e) => handleBlur(e),
                    name: 'end_due_in_date'
                  }}
                />
              </div>
              <div className={classes.formField}>
                <InputLabel
                  classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                  required
                >
                  Start BaseLine Create Date
                </InputLabel>
                <KeyboardDatePicker
                  margin="dense"
                  variant="inline"
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  format="DD/MM/yyyy"
                  value={values.required.start_baseline_create_date}
                  onChange={(date) => handleChange6(date)}
                  onClose={handlePickerClose6}
                  style={{ width: '15rem' }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                    disableRipple: true,
                    classes: {
                      root: classes.iconBtn
                    }
                  }}
                  PopoverProps={{
                    classes: {
                      // paper: classes.popoverPaper
                    },
                    className: classes.popoverStyle,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left"
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left"
                    },
                    getContentAnchorEl: null
                  }}
                  InputProps={{
                    classes: {
                      ...inputStyles,
                      notchedOutline: errors.start_baseline_create_date ? classes.inputNotchError : classes.inputNotch,
                    },
                    onBlur: (e) => handleBlur(e),
                    name: 'start_baseline_create_date'
                  }}
                />
              </div>
              <div className={classes.formField}>
                <InputLabel
                  classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                  required
                >
                  End BaseLine Create Date
                </InputLabel>
                <KeyboardDatePicker
                  margin="dense"
                  variant="inline"
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  format="DD/MM/yyyy"
                  value={values.required.end_baseline_create_date}
                  onChange={(date) => handleChange5(date)}
                  onClose={handlePickerClose5}
                  style={{ width: '15rem' }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                    disableRipple: true,
                    classes: {
                      root: classes.iconBtn
                    }
                  }}
                  PopoverProps={{
                    classes: {
                      // paper: classes.popoverPaper
                    },
                    className: classes.popoverStyle,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left"
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left"
                    },
                    getContentAnchorEl: null
                  }}
                  InputProps={{
                    classes: {
                      ...inputStyles,
                      notchedOutline: errors.end_baseline_create_date ? classes.inputNotchError : classes.inputNotch,
                    },
                    onBlur: (e) => handleBlur(e),
                    name: 'end_baseline_create_date'
                  }}
                />
              </div>


            </div>
            <div className={classes.add_body_inputs}>
              <div className={classes.formField}>
                <InputLabel
                  classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                  required
                >
                  Start Clear Date
                </InputLabel>
                <KeyboardDatePicker
                  margin="dense"
                  variant="inline"
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  format="DD/MM/yyyy"
                  value={values.required.start_clear_date}
                  onChange={(date) => handleChange4(date)}
                  onClose={handlePickerClose4}
                  style={{ width: '15rem' }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                    disableRipple: true,
                    classes: {
                      root: classes.iconBtn
                    }
                  }}
                  PopoverProps={{
                    classes: {
                      // paper: classes.popoverPaper
                    },
                    className: classes.popoverStyle,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left"
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left"
                    },
                    getContentAnchorEl: null
                  }}
                  InputProps={{
                    classes: {
                      ...inputStyles,
                      notchedOutline: errors.start_clear_date ? classes.inputNotchError : classes.inputNotch,
                    },
                    onBlur: (e) => handleBlur(e),
                    name: 'start_clear_date'
                  }}
                />
              </div>

              <div className={classes.formField}>
                <InputLabel
                  classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                  required
                >
                  End Clear Date
                </InputLabel>
                <KeyboardDatePicker
                  margin="dense"
                  variant="inline"
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  format="DD/MM/yyyy"
                  value={values.required.end_clear_date}
                  onChange={(date) => handleChange3(date)}
                  onClose={handlePickerClose3}
                  style={{ width: '15rem' }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                    disableRipple: true,
                    classes: {
                      root: classes.iconBtn
                    }
                  }}
                  PopoverProps={{
                    classes: {
                      // paper: classes.popoverPaper
                    },
                    className: classes.popoverStyle,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left"
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left"
                    },
                    getContentAnchorEl: null
                  }}
                  InputProps={{
                    classes: {
                      ...inputStyles,
                      notchedOutline: errors.end_clear_date ? classes.inputNotchError : classes.inputNotch,
                    },
                    onBlur: (e) => handleBlur(e),
                    name: 'end_clear_date'
                  }}
                />
              </div>
              <div className={classes.formField}>
                <InputLabel
                  classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                  required
                >
                  Invoice Currency
                </InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      ...inputStyles,
                      notchedOutline: errors.invoice_currency ? classes.inputNotchError : classes.inputNotch
                    }
                  }}
                  value={values.required.invoice_currency}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  name="invoice_currency"
                  margin="dense"
                  variant="outlined"
                />
              </div>

            </div>

          </form>
        </div>
        <div >
          <div className={classes.add_footer_btns}>
            <Button className={classes.cancelBtn} onClick={handleClose}>Cancel</Button>
            <div>
              <Button
                className={classes.clearBtn}
                variant="outlined"
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                className={classes.addBtn}
                variant="contained"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
      {snackbarOpen
        ? <SnackBar
          open={snackbarOpen}
          handleClose={handleSBClose}
          error="Mandatory fields can't be empty"
        />
        : <></>
      }
    </>
  )
})

export default AnalyticsView;
