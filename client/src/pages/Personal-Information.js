import { Paper, ButtonGroup, Button } from '@material-ui/core';
import React from "react";
import { connect } from 'react-redux';
import { submitLogin } from '../redux/actions/index';
import Editable from 'react-bootstrap-editable'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../layout/Personal-Information.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const PersonalInformation = (props) => {
  const classes = useStyles();
  return (
    <>
    <div className="container">
        <div className="row mt-3">
            <div className="col-12 mx-auto text-center">
            <h3>
                Welcome to Personal Information Page
            </h3>
            <p>
                You can view and edit all of your information on this page. if you have any question please contact to HR.
            </p>
            </div>
        </div>
        <hr />
        <div className="content">
            <div className="row my-5">
                <div className="title">
                    <h2>Name</h2>
                </div>
                <Paper variant="outlined" className="document-container">
                    <div className="col-3 mx-auto">
                        <label>First name:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="Tao"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="textfield"
                            validate={null}
                        />
                    </div>
                    <div className="col-3 mx-auto">
                        <label>Last name:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="Yang"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="textfield"
                            validate={null}
                        />
                    </div>
                    <div className="col-3 mx-auto">
                        <label>middle name:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="Jack"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="textfield"
                            validate={null}
                        />
                    </div>
                    <div className="col-3 mx-auto">
                        <label>preferred name:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="Justin"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="textfield"
                            validate={null}
                        />
                    </div>
                    <div className="col-3 mx-auto">
                    <label>Email:</label>
                    <Editable
                        ajax={null}
                        alwaysEditing={false}
                        className={null}
                        disabled={false}
                        editText="Edit"
                        id={null}
                        initialValue="y3589358@gmail.com"
                        isValueClickable={false}
                        label={null}
                        mode="inline"
                        onSubmit={null}
                        onValidated={null}
                        options={null}
                        placement="top"
                        renderCancelElement={null}
                        renderConfirmElement={null}
                        showText
                        type="textfield"
                        validate={null}
                    />
                    </div>
                    <div className="col-3 mx-auto">
                        <label>SSN:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="12345678"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="textfield"
                            validate={null}
                        />
                    </div>
                    <div className="col-3 mx-auto">
                        <label>date of birth:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="1900/08/08"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="date"
                            validate={null}
                        />
                    </div>
                    <div className="col-3 mx-auto">
                        <label>gender:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="male"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="textfield"
                            validate={null}
                        />
                    </div>
                </Paper>
            </div>
            <div className="row my-5">
                <div className="title">
                    <h2>Address</h2>
                </div>
                <Paper variant="outlined" className="document-container">
                <div className="col-3 mx-auto">
                    <label>Building/apt:</label>
                    <Editable
                        ajax={null}
                        alwaysEditing={false}
                        className={null}
                        disabled={false}
                        editText="Edit"
                        id={null}
                        initialValue="709"
                        isValueClickable={false}
                        label={null}
                        mode="inline"
                        onSubmit={null}
                        onValidated={null}
                        options={null}
                        placement="top"
                        renderCancelElement={null}
                        renderConfirmElement={null}
                        showText
                        type="textfield"
                        validate={null}
                    />
                </div>
                <div className="col-3 mx-auto">
                    <label>street name:</label>
                    <Editable
                        ajax={null}
                        alwaysEditing={false}
                        className={null}
                        disabled={false}
                        editText="Edit"
                        id={null}
                        initialValue="3388 S Rhodes Ave"
                        isValueClickable={false}
                        label={null}
                        mode="inline"
                        onSubmit={null}
                        onValidated={null}
                        options={null}
                        placement="top"
                        renderCancelElement={null}
                        renderConfirmElement={null}
                        showText
                        type="textfield"
                        validate={null}
                    />
                </div>
                <div className="col-3 mx-auto">
                    <label>city:</label>
                    <Editable
                        ajax={null}
                        alwaysEditing={false}
                        className={null}
                        disabled={false}
                        editText="Edit"
                        id={null}
                        initialValue="Chicago"
                        isValueClickable={false}
                        label={null}
                        mode="inline"
                        onSubmit={null}
                        onValidated={null}
                        options={null}
                        placement="top"
                        renderCancelElement={null}
                        renderConfirmElement={null}
                        showText
                        type="textfield"
                        validate={null}
                    />
                </div>
                <div className="col-3 mx-auto">
                    <label>state:</label>
                    <Editable
                        ajax={null}
                        alwaysEditing={false}
                        className={null}
                        disabled={false}
                        editText="Edit"
                        id={null}
                        initialValue="IL"
                        isValueClickable={false}
                        label={null}
                        mode="inline"
                        onSubmit={null}
                        onValidated={null}
                        options={null}
                        placement="top"
                        renderCancelElement={null}
                        renderConfirmElement={null}
                        showText
                        type="textfield"
                        validate={null}
                    />
                </div>
                <div className="col-3 mx-auto">
                    <label>zip:</label>
                    <Editable
                        ajax={null}
                        alwaysEditing={false}
                        className={null}
                        disabled={false}
                        editText="Edit"
                        id={null}
                        initialValue="60666"
                        isValueClickable={false}
                        label={null}
                        mode="inline"
                        onSubmit={null}
                        onValidated={null}
                        options={null}
                        placement="top"
                        renderCancelElement={null}
                        renderConfirmElement={null}
                        showText
                        type="textfield"
                        validate={null}
                    />
                </div>
                </Paper>
            </div>
            <div className="row my-5">
                <div className="title">
                    <h2>Contact Info</h2>
                </div>
                <Paper variant="outlined" className="document-container">
                <div className="col-3 mx-auto">
                    <label>Cell phone number:</label>
                    <Editable
                        ajax={null}
                        alwaysEditing={false}
                        className={null}
                        disabled={false}
                        editText="Edit"
                        id={null}
                        initialValue="31272451787"
                        isValueClickable={false}
                        label={null}
                        mode="inline"
                        onSubmit={null}
                        onValidated={null}
                        options={null}
                        placement="top"
                        renderCancelElement={null}
                        renderConfirmElement={null}
                        showText
                        type="textfield"
                        validate={null}
                    />
                </div>
                <div className="col-3 mx-auto">
                    <label>work phone number:</label>
                    <Editable
                        ajax={null}
                        alwaysEditing={false}
                        className={null}
                        disabled={false}
                        editText="Edit"
                        id={null}
                        initialValue="42513579417"
                        isValueClickable={false}
                        label={null}
                        mode="inline"
                        onSubmit={null}
                        onValidated={null}
                        options={null}
                        placement="top"
                        renderCancelElement={null}
                        renderConfirmElement={null}
                        showText
                        type="textfield"
                        validate={null}
                    />
                </div>
                </Paper>
            </div>
            <div className="row my-5">
                <div className="title">
                    <h2>Employment</h2>
                </div>
                <Paper variant="outlined" className="document-container">
                <div className="col-3 mx-auto">
                    <label>Visa title:</label>
                    <Editable
                        ajax={null}
                        alwaysEditing={false}
                        className={null}
                        disabled={false}
                        editText="H1B"
                        id={null}
                        initialValue="31272451787"
                        isValueClickable={false}
                        label={null}
                        mode="inline"
                        onSubmit={null}
                        onValidated={null}
                        options={null}
                        placement="top"
                        renderCancelElement={null}
                        renderConfirmElement={null}
                        showText
                        type="textfield"
                        validate={null}
                    />
                </div>
                <div className="col-3 mx-auto">
                    <label>start date:</label>
                    <Editable
                        ajax={null}
                        alwaysEditing={false}
                        className={null}
                        disabled={false}
                        editText="Edit"
                        id={null}
                        initialValue="10/01/2023"
                        isValueClickable={false}
                        label={null}
                        mode="inline"
                        onSubmit={null}
                        onValidated={null}
                        options={null}
                        placement="top"
                        renderCancelElement={null}
                        renderConfirmElement={null}
                        showText
                        type="date"
                        validate={null}
                    />
                </div>
                <div className="col-3 mx-auto">
                    <label>end date:</label>
                    <Editable
                        ajax={null}
                        alwaysEditing={false}
                        className={null}
                        disabled={false}
                        editText="Edit"
                        id={null}
                        initialValue="10/01/2026"
                        isValueClickable={false}
                        label={null}
                        mode="inline"
                        onSubmit={null}
                        onValidated={null}
                        options={null}
                        placement="top"
                        renderCancelElement={null}
                        renderConfirmElement={null}
                        showText
                        type="date"
                        validate={null}
                    />
                </div>
                </Paper>
            </div>
            <div className="row my-5">
                <div className="title">
                    <h2>Emergency contact</h2>
                </div>
                <Paper variant="outlined" className="document-container">
                    <div className="col-3 mx-auto">
                        <label>First name:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="Jack"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="textfield"
                            validate={null}
                        />
                    </div>
                    <div className="col-3 mx-auto">
                        <label>Last name:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="Chen"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="textfield"
                            validate={null}
                        />
                    </div>
                    <div className="col-3 mx-auto">
                        <label>middle name:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="Young"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="textfield"
                            validate={null}
                        />
                    </div>
                    <div className="col-3 mx-auto">
                        <label>phone:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="13159875412"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="textfield"
                            validate={null}
                        />
                    </div>
                    <div className="col-3 mx-auto">
                        <label>email:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="jack@gmail.com"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="textfield"
                            validate={null}
                        />
                    </div>
                    <div className="col-3 mx-auto">
                        <label>relationship:</label>
                        <Editable
                            ajax={null}
                            alwaysEditing={false}
                            className={null}
                            disabled={false}
                            editText="Edit"
                            id={null}
                            initialValue="friend"
                            isValueClickable={false}
                            label={null}
                            mode="inline"
                            onSubmit={null}
                            onValidated={null}
                            options={null}
                            placement="top"
                            renderCancelElement={null}
                            renderConfirmElement={null}
                            showText
                            type="textfield"
                            validate={null}
                        />
                    </div>
                </Paper>
            </div>
            <div className="row my-5">
                <div className="title">
                    <h2>Documents</h2>
                </div>
                <Paper variant="outlined" className="document-container">
                    <div className={classes.root}>
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem button>
                                <ListItemText primary="driver's license" />
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    <Button>download</Button>
                                    <Button>preview</Button>
                                </ButtonGroup>
                            </ListItem>
                            <ListItemLink href="#simple-list">
                                <ListItemText primary="work authorization" />
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    <Button>download</Button>
                                    <Button>preview</Button>
                                </ButtonGroup>
                            </ListItemLink>
                        </List>
                    </div>
                </Paper>
            </div>
        </div>
    </div>
    </>
  )
}

// export default PersonalInformation;
const mapStateToProps = ({ auth }) => ({
    auth
});


export default connect(
    mapStateToProps,
    { submitLogin }
)(PersonalInformation);