import React, { useState } from 'react';
import { Paper, ButtonGroup, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import '../../layout/Personal-Information.css';
import '../../layout/hiring-management.css'
import '../../layout/onboarding-app.css';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useLocation} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { rejectProfile, approveProfile } from '../../redux/actions/index';
import { object } from 'yup';

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

const OnboardingViewApp = (props) => {
    const location = useLocation();
    const {rejectProfile,approveProfile} = props
    const [feedback, setFeedback] = useState('feedback');
    const [show, setShow] = useState(false);
    const [data, setData] = useState(location.state);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const classes = useStyles();
    console.log('data',data)

    const handleRejectFeedBack = ()=>{
        const promise = rejectProfile({'userId':data._id,"feedback":feedback});
        promise.then((res)=>{
            console.log('res',res)
            let data_ = Object.assign({},data)
            data_.profile.status = 'REJECTED'
            setData(data_)
            handleClose()
        })
    }

    const handleApproveFeedback = ()=>{
        const promise = approveProfile({'userId':data._id});
        promise.then((res)=>{
            console.log('res',res)
            let data_ = Object.assign({},data)
            data_.profile.status = 'APPROVED'
            setData(data_)
            handleClose()
        })
    }

    const changeFeedback = (e)=>{
         setFeedback(e.target.value)
    }

    return (
        <>
            <div className="sd-title sd-container-modern__title container">
                <div className="sd-header__text">
                    <h2
                        className="sd-title"
                        aria-label="Onboarding Application"
                        role="columnheader"
                    >
                        <span className="sv-string-viewer">View Onboarding Application</span>
                    </h2>
                    <h5 className="sd-description">
                        <span className="sv-string-viewer">Current status: </span>
                        <Chip size="small" label={data.profile.status} />
                        {
                            data.profile.status == 'PENDING' ? (<> 
                            <Button
                                className='approveBtn'
                                variant="contained" 
                                color="primary"
                                onClick={handleApproveFeedback}
                            >
                                Approve  
                            </Button>
                            <Button
                                onClick={handleShow}
                                className='rejectBtn'
                                variant="contained" 
                                color="secondary"
                            >
                                Reject
                            </Button>
                            </>) : 
                            (<></>)
                        }
                    </h5>
                </div>
                <div className="sd-hidden"></div>
            </div>
            <div className="onboarding-detail-container container">
                <div className="row my-3">
                    <div className="title">
                        <h2>Name</h2>
                    </div>
                    <Paper variant="outlined" className="document-container">
                        <div className="col-3 mx-auto">
                            <label>First name:</label>
                            <p>{data.name.first}</p>
                        </div>
                        <div className="col-3 mx-auto">
                            <label>Last name:</label>
                            <p>{data.name.last}</p>
                        </div>
                        <div className="col-3 mx-auto">
                            <label>Middle name:</label>
                            <p>{data.name.middle}</p>
                        </div>
                        <div className="col-3 mx-auto">
                            <label>Preferred name:</label>
                            <p>{data.name.preferred}</p>
                        </div>
                    </Paper>
                </div>
                <div className="row my-3">
                    <div className="title">
                        <h2>Work authorisation</h2>
                    </div>
                    <Paper variant="outlined" className="document-container">
                        <div className="col-3 mx-auto">
                            <label>Title</label>
                            <p>{data.profile.workAuth.title}</p>
                        </div>
                        <div className="col-3 mx-auto">
                            <label>Start date:</label>
                            <p>{data.profile.workAuth.startDate}</p>
                        </div>
                        <div className="col-3 mx-auto">
                            <label>End date:</label>
                            <p>{data.profile.workAuth.endDate}</p>
                        </div>
                        <div className="col-3 mx-auto">
                            <label>Days Remaining:</label>
                            <p>{data.profile.workAuth.daysRemaining}</p>
                        </div>
                    </Paper>
                </div>
                <div className="row my-3">
                    <div className="title">
                        <h2>Address</h2>
                    </div>
                    <Paper variant="outlined" className="document-container">
                        <div className="col-12 mx-auto">
                            {/* <p>
                                {data.profile.address.line1 + ', ' + 
                                 data.profile.address.line2 + ', ' +
                                 data.profile.address.city + ', ' +
                                 data.profile.address.state + ', ' +
                                 data.profile.address.zipcode}
                            </p> */}
														<p>
														{data.profile.address.line1} 
														</p>
														<p>
														{ data.profile.address.line2} 
														</p>
														<p>
															{`${data.profile.address.city}, ${data.profile.address.state} ${data.profile.address.zipcode}`}
														</p>
                        </div>
                    </Paper>
                </div>
                <div className="row my-3">
                    <div className="title">
                        <h2>Phone</h2>
                    </div>
                    <Paper variant="outlined" className="document-container">
                        <div className="col-3 mx-auto">
                            <label>Mobile Phone:</label>
                            <p>{data.profile.phone.mobile}</p>
                        </div>
                        <div className="col-3 mx-auto">
                            <label>Work Phone:</label>
                            <p>{data.profile.phone.work ? data.profile.phone.work : 'N/A'}</p>
                        </div>
                    </Paper>
                </div>
                <div className="row my-3">
                    <div className="title">
                        <h2>Personal information</h2>
                    </div>
                    <Paper variant="outlined" className="document-container">
                        <div className="col-4 mx-auto">
                            <label>Gender:</label>
                            <p>{data.profile.gender}</p>
                        </div>
                        <div className="col-4 mx-auto">
                            <label>Date of Birth:</label>
                            <p>{data.profile.dateOfBirth}</p>
                        </div>
                        <div className="col-4 mx-auto">
                            <label>Social Security Number:</label>
                            <p>{data.profile.ssn}</p>
                        </div>
                        <div className="col-4 mx-auto">
                            <label>Citizen Type:</label>
                            <p>{data.profile.ssn}</p>
                        </div>
                        <div className="col-4 mx-auto">
                            <label>Citizen Type:</label>
                            <p>{data.profile.citizenType}</p>
                        </div>
                    </Paper>
                </div>
                <div className="row my-3">
                    <div className="title">
                        <h2>License</h2>
                    </div>
                    <Paper variant="outlined" className="document-container">
                        <div className="col-6 mx-auto">
                            <label>Number:</label>
                            <p>{data.profile.license.number}</p>
                        </div>
                        <div className="col-6 mx-auto">
                            <label>Expiration:</label>
                            <p>{data.profile.license.expiration}</p>
                        </div>
                        <div className="col-6 mx-auto">
                            <label>Link:</label>
                            <p>{data.profile.license.link}</p>
                        </div>
                    </Paper>
                </div>
                <div className="row my-3">
                    <div className="title">
                        <h2>Reference</h2>
                    </div>
                    <Paper variant="outlined" className="document-container">
                        <div className="col-3 mx-auto">
                            <label>First name:</label>
                            <p>{data.profile.reference.name.first}</p>
                        </div>
                        <div className="col-3 mx-auto">
                            <label>Last name:</label>
                            <p>{data.profile.reference.name.last}</p>
                        </div>
                        <div className="col-3 mx-auto">
                            <label>Middle name:</label>
                            <p>{data.profile.reference.name.middle}</p>
                        </div>
                        <div className="col-3 mx-auto">
                            <label>Email:</label>
                            <p>{data.profile.reference.email}</p>
                        </div>
                        <div className="col-3 mx-auto">
                            <label>Phone:</label>
                            <p>{data.profile.reference.phone}</p>
                        </div>
                        <div className="col-3 mx-auto">
                            <label>Relationship:</label>
                            <p>{data.profile.reference.relationship}</p>
                        </div>
                    </Paper>
                </div>
                <div className="row my-3">
                    <div className="title">
                        <h2>Emergency Contact</h2>
                    </div>
                    {data.profile.emergencyContact?.map((item,index) => {
                        return (
                            <Paper key={index} variant="outlined" className="document-container">
                                <div className="col-3 mx-auto">
                                    <label>First name:</label>
                                    <p>{item.name.first}</p>
                                </div>
                                <div className="col-3 mx-auto">
                                    <label>Last name:</label>
                                    <p>{item.name.last}</p>
                                </div>
                                <div className="col-3 mx-auto">
                                    <label>Middle name:</label>
                                    <p>{item.name.middle}</p>
                                </div>
                                <div className="col-3 mx-auto">
                                    <label>Email:</label>
                                    <p>{item.email}</p>
                                </div>
                                <div className="col-3 mx-auto">
                                    <label>Phone:</label>
                                    <p>{item.phone}</p>
                                </div>
                                <div className="col-3 mx-auto">
                                    <label>Relationship:</label>
                                    <p>{item.relationship}</p>
                                </div>
                            </Paper>
                        )
                    })}
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                    <Modal.Title>Give feedback on the application</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Feedback</Form.Label>
                            <Form.Control 
                            value={feedback} 
                            onChange={changeFeedback} 
                            as="textarea" 
                            rows={3} />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleRejectFeedBack}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps,
    {rejectProfile,approveProfile}
)(OnboardingViewApp);
