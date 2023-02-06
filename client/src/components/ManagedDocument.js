import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ButtonGroup, Button } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import fileDownload from '../utils/fileDownload';
import filePreview from '../utils/filePreview';

// add image, files, desc to formData and send to server via POST
async function postImage({ doc }) {
    const formData = new FormData();
    formData.append("file", doc)

    const result = await axios.post(
        '/document/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    console.log({result})
    return { resultDoc: result.data.Location }
}

const ManagedDocument = (props) => {
    console.log({props})
    let document = props.document
    console.log(document)


    const [doc, setDoc] = useState("")

    const fileSelectedDoc = e => {
        console.log('e.target.files', e.target.files)
        const docFile = e.target.files[0]
        console.log('file',docFile)
        setDoc(docFile)
    }

    const submit = async e => {
        e.preventDefault()
        const location = await postImage({ doc: doc })
        console.log("location", location)

        setDoc([location.doc, ...doc])
    }

    // useEffect(() => {
    //     if(document.status == "APPROVED") stepToNext();
    // }, [document.status]) 

    return (
        <>
            {
                // if authors exists, return the data in a table, if not return Loading...
                document ? (
                    // if it does exist it should render the document.status, .type, and render Preview and Download buttons using the document.link
                    <div>
                        <div>Status: {document.status}</div>
                        {/* go to next case */}
                        {/* (cond1) ? "something" : (cond2) ? "something2" : "something3" */}
                        { document.status == "PENDING" ? "Waiting for HR to approve" :
                          document.status == "APPROVED" ? "Go To Next Step..." : 
                          document.status == "REJECTED" ?
                            <>
                                <p>{document.feedback}</p><br />

                                <ListItem button>
                                    <ListItemText primary={document.type} />
                                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                let splitLink = document.link.split(".")
                                                // console.log("link", props.link.split("."))
                                                const endTag = splitLink[splitLink.length - 1]
                                                // console.log("endTag",endTag)
                                                // let endTag = link.substring(link.length-4, link.length)
                                                fileDownload(document.link, `${props.user.name.last}${props.user.name.first}${props.user.profile.workAuth.title}.${endTag}`)
                                            }}
                                        >
                                            Download
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                filePreview(document.link)
                                            }}
                                        >
                                            Preview
                                        </Button>
                                    </ButtonGroup>
                                </ListItem>


                            </>
                            : "Pending HR Review"
                        }
                        
                    </div>
                ) :
                    // either "Upload" button if that document does not exist,
                    <form onSubmit={submit}>
                        <p>Please upload a copy of your OPT EAD...</p>
                        <input onChange={fileSelectedDoc} type="file" name="doc"></input>
                        <button type="submit" name="upload">Upload</button>
                    </form>
            }
        </>
    )
}

export default ManagedDocument