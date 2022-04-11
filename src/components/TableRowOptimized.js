import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { formatter, dateFormatter, checkDueDate } from '../utils/formatter';
import { setChecked } from '../actions/invoiceAction';
import { connect } from 'react-redux';


const columns = [
    { id: 'checkbox', minWidth: 10 },
    { id: 'serial', label: 'Sl_No', minWidth: 10 },
    { id: 'business_code', label: 'Business Code', minWidth: 140 },
    { id: 'cust_number', label: 'Customer \u0023', minWidth: 70 },
    { id: 'clear_date', label: 'CLear Date', minWidth: 70, format: (value) => dateFormatter(value) },
    { id: 'business_year', label: 'Business Year', minWidth: 70, format: (value) => dateFormatter(value) },
    { id: 'document_id', label: 'Document ID', minWidth: 70, format: (value) => value, },
    { id: 'posting_date', label: 'Posting Date', minWidth: 70, format: (value) => dateFormatter(value) },
    { id: 'document_date', label: 'Document Create Date', minWidth: 70, format: (value) => dateFormatter(value) },
    {
        id: 'due_in_date',
        label: 'Due Date',
        minWidth: 80,
        align: 'right',
        format: (value) => dateFormatter(value),
    },
    {
        id: 'invoice_currency',
        label: 'Invoice Currency',
        minWidth: 80,
        align: 'right',

    },
    {
        id: 'document_type',
        label: 'Document Type',
        minWidth: 80,
        align: 'right',
    },
    {
        id: 'posting_id',
        label: 'Posting Id',
        minWidth: 70,
        align: 'right',
        format: (value) => value,
    },
    {
        id: 'total_open_amount',
        label: 'Bill Amount',
        minWidth: 100,
        align: 'right',
        format: (value) => formatter(value),
    },

    {
        id: 'baseline_create_date',
        label: 'Baseline Create Date',
        minWidth: 150,
        align: 'right',
        format: (value) => dateFormatter(value),
    },

];

const CustomCheckbox = withStyles({
    root: {
        color: "#97A1A9",
        "&$checked": {
            color: "#14AFF1",
        },
        "&:hover": {
            background: "none",
        }
    },
    checked: {

    }
})(Checkbox);


const tableRowStyles = () => ({
    tableCell: {
        borderBottom: '1px solid #283A46'
    }
})

class TableRowOptimized extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.checked.includes(this.props.data.doc_id) || this.props.checked.includes(this.props.data.doc_id)) {
            return true;
        }
        return false;
    }

    handleToggle = (value) => () => {
        const currentIndex = this.props.checked.indexOf(value);
        const newChecked = [...this.props.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.props.setChecked(newChecked);
        console.log(this.props.checked);
    };

    render() {
        const { data, index, checked, classes } = this.props;
        return (
            <>
                <TableRow
                    role="checkbox"
                    tabIndex={-1}
                    key={data.doc_id}
                    style={{
                        background: checked.includes(data.doc_id)
                            ? '#2A5368'
                            : (index + 1) % 2 === 0 ? '#283A46' : ''
                    }}
                >
                    {columns.map((column) => {
                        if (column.id === 'checkbox') {
                            return (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        paddingTop: '0.2rem',
                                        paddingBottom: '0.2rem',
                                        color: '#ffffff'
                                    }}
                                    classes={{ root: classes.tableCell }}
                                >
                                    <CustomCheckbox
                                        key={data.doc_id}
                                        edge="end"
                                        onChange={this.handleToggle(data["doc_id"])}
                                        checked={checked.indexOf(data["doc_id"]) !== -1}
                                        disableRipple
                                        size="small"
                                    />
                                </TableCell>
                            )
                        } else {
                            const value = data[column.id] ? data[column.id] : "--"
                            return (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        color: column.id === "due_in_date" ?
                                            checkDueDate(data["due_in_date"]) ?
                                                "#FF5B5B" : "#ffffff"
                                            : '#ffffff',
                                        paddingTop: '0.2rem',
                                        paddingBottom: '0.2rem'
                                    }}
                                    classes={{ root: classes.tableCell }}
                                >
                                    {column.format && data[column.id]
                                        ? column.format(value)
                                        : value
                                    }
                                </TableCell>
                            )
                        }
                    })}
                </TableRow>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setChecked: (value) => dispatch(setChecked(value))
})

export default connect(null, mapDispatchToProps)(withStyles(tableRowStyles)(TableRowOptimized));