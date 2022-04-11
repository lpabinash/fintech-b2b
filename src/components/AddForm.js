import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { KeyboardDatePicker } from '@material-ui/pickers';
import SnackBar from './SnackBar';
import { addInvoice } from '../actions/invoiceAction';
import { addInvoiceAPI } from '../services/services';
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

const AddForm = React.forwardRef(({ handleClose }, ref) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [values, setValues] = React.useState({
        required: {
            cust_number: '',
            invoice_id: '',
            total_open_amount: '',
            due_in_date: null,
            business_code: '',
            clear_date: null,
            business_year: '',
            document_id: '',
            posting_date: null,
            invoice_currency: '',
            baseline_create_date: null,
            document_type: '',
            customer_payment_terms: '',
            posting_id: '',
            document_create_date: null

        }
    });

    const [errors, setErrors] = React.useState({
        cust_number: false,
        invoice_id: false,
        total_open_amount: false,
        due_in_date: false,
        business_code: false,
        clear_date: false,
        business_year: false,
        document_id: false,
        posting_date: false,
        invoice_currency: false,
        baseline_create_date: false,
        document_type: false,
        customer_payment_terms: false,
        posting_id: false,
        document_create_date: false
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
                    due_in_date: moment(e),
                },
            })
        }
    }

    const handleChange2 = (e) => {
        setValues({
            ...values,
            required: {
                ...values.required,
                posting_date: moment(e),
            },
        })
    }
    const handleChange3 = (e) => {
        setValues({
            ...values,
            required: {
                ...values.required,
                clear_date: moment(e),
            },
        })
    }
    const handleChange4 = (e) => {
        setValues({
            ...values,
            required: {
                ...values.required,
                document_create_date: moment(e),
            },
        })
    }

    const handleChange5 = (e) => {
        setValues({
            ...values,
            required: {
                ...values.required,
                baseline_create_date: moment(e),
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
                business_code: '',
                cust_number: '',
                invoice_id: '',
                total_open_amount: '',
                due_in_date: null,
                clear_date: null,
                posting_date: null,
                baseline_create_date: null,
                document_create_date: null,
                business_year: '',
                document_id: '',
                invoice_currency: '',
                document_type: '',
                customer_payment_terms: '',
                posting_id: '',
            }
        })
    }

    const validate = () => {
        setErrors({
            business_code: values.required.business_code ? false : true,
            cust_number: values.required.cust_number ? false : true,
            invoice_id: values.required.invoice_id ? false : true,
            total_open_amount: values.required.total_open_amount ? false : true,
            due_in_date: values.required.due_in_date ? false : true,
            posting_date: values.required.posting_date ? false : true,
            clear_date: values.required.clear_date ? false : true,
            document_create_date: values.required.document_create_date ? false : true,
            baseline_create_date: values.required.baseline_create_date ? false : true,
            document_id: values.required.document_id ? false : true,
            invoice_currency: values.required.invoice_currency ? false : true,
            document_type: values.required.document_type ? false : true,
            customer_payment_terms: values.required.customer_payment_terms ? false : true,
            posting_id: values.required.posting_id ? false : true,
            business_year: values.required.business_year ? false : true
        });
    }

    const handleAdd = () => {
        validate();
        if (!Object.values(values.required).every(x => x)) {
            setSnackBarOpen(true);
        } else {
            setSnackBarOpen(false);
            // console.log({...values, ...values.required})
            const body = {
                ...values.required,
                invoice_id: values.required.invoice_id,
                due_in_date: moment(values.required.due_in_date).format('yyyy-MM-DD'),
                clear_date: moment(values.required.clear_date).format('yyyy-MM-DD'),
                posting_date: moment(values.required.posting_date).format('yyyy-MM-DD'),
                document_create_date: moment(values.required.document_create_date).format('yyyy-MM-DD'),
                baseline_create_date: moment(values.required.baseline_create_date).format('yyyy-MM-DD'),
                business_code: values.required.business_code,
                cust_number: values.required.cust_number,
                total_open_amount: values.required.total_open_amount,
                business_year: values.required.business_year,
                document_id: values.required.document_id,
                invoice_currency: values.required.invoice_currency,
                document_type: values.required.document_type,
                customer_payment_terms: values.required.customer_payment_terms,
                posting_id: values.required.posting_id,
            }
            // console.log(body);
            addInvoiceAPI(body)
                .then((res) => {
                    console.log(body);
                    dispatch(addInvoice(body));
                    handleClose();
                })
                .catch((err) => console.log(err));
        }
    }

    const handlePickerClose = () => {
        if (values.required.due_in_date) {
            setErrors({ ...errors, due_in_date: false })
        } else {
            setErrors({ ...errors, due_in_date: true })
        }

    }

    const handlePickerClose2 = () => {
        if (values.required.posting_date) {
            setErrors({ ...errors, posting_date: false })
        } else {
            setErrors({ ...errors, posting_date: true })
        }
    }
    const handlePickerClose3 = () => {
        if (values.required.clear_date) {
            setErrors({ ...errors, clear_date: false })
        } else {
            setErrors({ ...errors, clear_date: true })
        }
    }
    const handlePickerClose4 = () => {
        if (values.required.baseline_create_date) {
            setErrors({ ...errors, baseline_create_date: false })
        } else {
            setErrors({ ...errors, baseline_create_date: true })
        }
    }
    const handlePickerClose5 = () => {
        if (values.required.document_create_date) {
            setErrors({ ...errors, document_create_date: false })
        } else {
            setErrors({ ...errors, document_create_date: true })
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
                                    Business Code
                                </InputLabel>
                                <TextField
                                    InputProps={{
                                        classes: {
                                            ...inputStyles,
                                            notchedOutline: errors.business_code ? classes.inputNotchError : classes.inputNotch
                                        }
                                    }}
                                    value={values.required.business_code}
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleBlur(e)}
                                    name="business_code"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    Customer No.
                                </InputLabel>
                                <TextField
                                    InputProps={{
                                        classes: {
                                            ...inputStyles,
                                            notchedOutline: errors.cust_number ? classes.inputNotchError : classes.inputNotch
                                        }
                                    }}
                                    value={values.required.cust_number}
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleBlur(e)}
                                    name="cust_number"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    Invoice Id
                                </InputLabel>
                                <TextField
                                    InputProps={{
                                        classes: {
                                            ...inputStyles,
                                            notchedOutline: errors.invoice_id ? classes.inputNotchError : classes.inputNotch
                                        }
                                    }}
                                    value={values.required.invoice_id}
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleBlur(e)}
                                    name="invoice_id"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    Bill Amount
                                </InputLabel>
                                <TextField
                                    InputProps={{
                                        classes: {
                                            ...inputStyles,
                                            notchedOutline: errors.total_open_amount ? classes.inputNotchError : classes.inputNotch
                                        }
                                    }}
                                    value={values.required.total_open_amount}
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleBlur(e)}
                                    name="total_open_amount"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div className={classes.add_body_inputs}>
                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    Due Date
                                </InputLabel>
                                <KeyboardDatePicker
                                    margin="dense"
                                    variant="inline"
                                    inputVariant="outlined"
                                    id="date-picker-dialog"
                                    format="DD/MM/yyyy"
                                    value={values.required.due_in_date}
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
                                            notchedOutline: errors.due_in_date ? classes.inputNotchError : classes.inputNotch,
                                        },
                                        onBlur: (e) => handleBlur(e),
                                        name: 'due_in_date'
                                    }}
                                />
                            </div>

                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    Clear Date
                                </InputLabel>
                                <KeyboardDatePicker
                                    margin="dense"
                                    variant="inline"
                                    inputVariant="outlined"
                                    id="date-picker-dialog"
                                    format="DD/MM/yyyy"
                                    value={values.required.clear_date}
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
                                            notchedOutline: errors.clear_date ? classes.inputNotchError : classes.inputNotch,
                                        },
                                        onBlur: (e) => handleBlur(e),
                                        name: 'clear_date'
                                    }}
                                />
                            </div>
                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    Posting Date
                                </InputLabel>
                                <KeyboardDatePicker
                                    margin="dense"
                                    variant="inline"
                                    inputVariant="outlined"
                                    id="date-picker-dialog"
                                    format="DD/MM/yyyy"
                                    value={values.required.posting_date}
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
                                            notchedOutline: errors.posting_date ? classes.inputNotchError : classes.inputNotch,
                                        },
                                        onBlur: (e) => handleBlur(e),
                                        name: 'posting_date'
                                    }}
                                />
                            </div>
                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    Document Create Date
                                </InputLabel>
                                <KeyboardDatePicker
                                    margin="dense"
                                    variant="inline"
                                    inputVariant="outlined"
                                    id="date-picker-dialog"
                                    format="DD/MM/yyyy"
                                    value={values.required.document_create_date}
                                    onChange={(date) => handleChange4(date)}
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
                                            notchedOutline: errors.document_create_date ? classes.inputNotchError : classes.inputNotch,
                                        },
                                        onBlur: (e) => handleBlur(e),
                                        name: 'document_create_date'
                                    }}
                                />
                            </div>


                        </div>
                        <div className={classes.add_body_inputs} style={{ marginRight: '1rem' }}>
                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    Document Id
                                </InputLabel>
                                <TextField
                                    InputProps={{
                                        classes: {
                                            ...inputStyles,
                                            notchedOutline: errors.document_id ? classes.inputNotchError : classes.inputNotch
                                        }
                                    }}
                                    value={values.required.document_id}
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleBlur(e)}
                                    name="document_id"
                                    margin="dense"
                                    variant="outlined"
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
                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    Document Type
                                </InputLabel>
                                <TextField
                                    InputProps={{
                                        classes: {
                                            ...inputStyles,
                                            notchedOutline: errors.document_type ? classes.inputNotchError : classes.inputNotch
                                        }
                                    }}
                                    value={values.required.document_type}
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleBlur(e)}
                                    name="document_type"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    Customer Payment Term
                                </InputLabel>
                                <TextField
                                    InputProps={{
                                        classes: {
                                            ...inputStyles,
                                            notchedOutline: errors.customer_payment_terms ? classes.inputNotchError : classes.inputNotch
                                        }
                                    }}
                                    value={values.required.customer_payment_terms}
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleBlur(e)}
                                    name="customer_payment_terms"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div className={classes.add_body_inputs} style={{ marginRight: '1rem' }}>
                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    Posting Id
                                </InputLabel>
                                <TextField
                                    InputProps={{
                                        classes: {
                                            ...inputStyles,
                                            notchedOutline: errors.posting_id ? classes.inputNotchError : classes.inputNotch
                                        }
                                    }}
                                    value={values.required.posting_id}
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleBlur(e)}
                                    name="posting_id"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    Business Year
                                </InputLabel>
                                <TextField
                                    InputProps={{
                                        classes: {
                                            ...inputStyles,
                                            notchedOutline: errors.business_year ? classes.inputNotchError : classes.inputNotch
                                        }
                                    }}
                                    value={values.required.business_year}
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleBlur(e)}
                                    name="business_year"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.formField}>
                                <InputLabel
                                    classes={{ root: classes.labelRoot, asterisk: classes.asterisk }}
                                    required
                                >
                                    BaseLine Create Date
                                </InputLabel>
                                <KeyboardDatePicker
                                    margin="dense"
                                    variant="inline"
                                    inputVariant="outlined"
                                    id="date-picker-dialog"
                                    format="DD/MM/yyyy"
                                    value={values.required.baseline_create_date}
                                    onChange={(date) => handleChange5(date)}
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
                                            notchedOutline: errors.baseline_create_date ? classes.inputNotchError : classes.inputNotch,
                                        },
                                        onBlur: (e) => handleBlur(e),
                                        name: 'baseline_create_date'
                                    }}
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
                                onClick={handleAdd}
                            >
                                Add
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

export default AddForm;
