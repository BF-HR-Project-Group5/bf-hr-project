import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import MaterialTable from "material-table";
import {useLocation} from 'react-router-dom';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SendIcon from '@material-ui/icons/Send';
import fileDownload from '../utils/fileDownload';
import filePreview from '../utils/filePreview';
import { documentApprove, documentReject, sendReminder } from '../redux/actions/index';

const columns = [
        { title: 'ID', field: '_id', editable: 'never'},
        { title: 'Status', field: 'status', editable: 'never'},
        { title: 'Updated Time', field: 'updatedAt', editable: 'never'},
        { title: 'Feedback', field: 'feedback', initialEditValue: 'initial edit value'},
    ]

const HrVisaStatusDoc = (props) => {
    console.log('props',props)
    const location = useLocation();
    const {documentApprove, documentReject, sendReminder} = props
    const profile = location.state.profile
    const [documents, setDocuments] = useState(profile.documents)
    
    // Display Download Button and Preview Button for any current Step 
    const showDownloadButton = ()=> {
        return {
            icon: () => <ArrowDownwardIcon />,
            tooltip: 'Download document',
            onClick: (event, rowData) => {
								const split = rowData.link.split('.');
								const ext = split[split.length - 1];
								console.log({event, rowData});
                fileDownload(rowData.link,`${location.state.name.first}${location.state.name.last}${rowData.type}.${ext}`)
            }
        }
    }

    const showPreviewButton = ()=> {
        return {
            icon: () => <VisibilityIcon />,
            tooltip: 'Preview document',
            onClick: (event, rowData) => {
								// console.log({event, rowData});
                filePreview(rowData.link)
            }
        }
    }

    const showNotifyButton = (newData, oldData)=> {
        if(profile.nextStep.indexOf('UPLOAD') > 0){
            return {
                icon: () => <SendIcon />,
                tooltip: 'Notify employee',
                onClick: (event, rowData) => {
										// console.log({event, rowData});
                    console.log('location',location)
                    const promise = sendReminder(location.state._id);
                    promise.then((res)=>{
                        console.log('res',res)
                    })
                }
            }
        }
    }

    const showApproveButton = ()=> {
        if(profile.nextStep.indexOf('WAIT') > 0){
            return {
                icon: () => <ThumbUpIcon />,
                tooltip: 'Approve',
                onClick: (event, rowData) => {
								// console.log({event, rowData});
                    try {
                        const promise = documentApprove(rowData._id);
                        promise.then((res)=>{
                            const documents_ = [...documents];
                            const index = rowData.tableData.id;
                            documents_[index].status = 'APPROVED'
                            setDocuments(documents_);
                        })
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }
    }
    
    const showRejectButton = (newData, oldData)=> {
        /* If the next step involves submitting the next document, show the 'Send Notification' button
           If the next step involves waiting for HR approval, show the uploaded document that requires approval. Allow the HR to
           view a preview of that document in the browser.
        */
        if(profile.nextStep.indexOf('WAIT') > 0){
            return {
                onRowUpdate: (newData, oldData) =>{
							console.log({newData, oldData});
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...documents];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            const promise = documentReject(newData);
                            promise.then((res)=>{
                                console.log('res',res)
                                setDocuments(dataUpdate);
                            })
                            resolve();
                        }, 1000);
                    })
                }
            }
        }
    }
    
    return (
        <div className='container'>            
            <MaterialTable
            title="Documents"
            columns={columns}
            data={documents}
            actions={[showDownloadButton, showPreviewButton, showNotifyButton, showApproveButton]}
            editable={showRejectButton()}
        />
        </div>
    )
}

const mapStateToProps = ({ auth, house }) => ({
    auth,
    house
});

export default connect(
    mapStateToProps,
    {documentApprove,documentReject,sendReminder}
)(HrVisaStatusDoc);
