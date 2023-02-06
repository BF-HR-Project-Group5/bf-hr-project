import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ButtonGroup, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import fileDownload from '../utils/fileDownload';
import filePreview from '../utils/filePreview';

// add image, files, desc to formData and send to server via POST
// async function postImage({ doc }) {
//     const formData = new FormData();
//     formData.append("file", doc)

//     const result = await axios.post(
//         '/document/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } }
//     )
//     // console.log({ result })
//     return { resultDoc: result.data.document.link }
// }

const ManagedDocument = (props) => {
    console.log({ props })
    let document = props.document
    console.log(document)


    const [file, setFile] = useState("")
    const [clicked, setClicked] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState("")

    // useEffect(() => {
    //     let timer;
    //     if (message !== '') {
    //         timer = setTimeout(() => setMessage(''), 8000) // set timer to reset message to empty after 8 secs
    //     }
    //     return () => clearTimeout(timer); // cleanup func
    // }, [message]); // watch message

    const fileSelectedDoc = e => {
        // console.log('e.target.files', e.target.files)
        console.log('e', e.target)
        const file = e.target.files[0]
        setFile(file)
        console.log('file', file)

    }

    const submit = async e => {
        e.preventDefault()
        // const location = await postImage({ doc: doc })
        // console.log("location", location)
        // if (!location) setError("Please Try Again.")
        const formData = new FormData();
        formData.append("file", file)

        await axios.post('/document/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                setMessage('Upload Success, Wait for HR Review');
                setFile(null);
                // reset file input
                e.target.files = null;
            })
            .catch((e) => setMessage('Error uploading:', e))


        // is now empty
        console.log(e.target.files);
    }

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
                        {document.status == "PENDING" ? "Waiting for HR to approve" :
                            document.status == "APPROVED" ?
                                <>
                                    <ListItem button>
                                        <ListItemText primary={document.type} />
                                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    let splitLink = document.link.split(".")
                                                    const endTag = splitLink[splitLink.length - 1]
                                                    fileDownload(document.link, `${props.user.name.last}${props.user.name.first}${props.user.profile.workAuth.title}.${endTag}`)
                                                }}
                                            >
                                                Download
                                            </Button>
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    filePreview(document.link)
                                                    setClicked(!clicked)
                                                }}
                                            >
                                                Preview
                                            </Button>
                                        </ButtonGroup>
                                    </ListItem>
                                    {clicked == true &&
                                        <iframe
                                            src={document.link}

                                            height="300%"
                                            width="100%"
                                        ></iframe>}

                                </>
                                :
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
                                                        const endTag = splitLink[splitLink.length - 1]
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
                (

                    <>
                        <form onSubmit={submit}>
                            {/* <Input onChange={fileSelectedDoc} type="file" name="doc" /> */}
                            <input type="file" id="chooseFile" style="display:none;" />
                                <label class="upload_bp" for="fileinp">
                                    <p onChange={fileSelectedDoc} type="file" name="doc">upload</p>
                                </label>

                                <ButtonGroup>

                                    <Button
                                        type="submit"
                                        name="upload"
                                    >
                                        Upload
                                    </Button>
                                </ButtonGroup>
                        </form>
                        <p>{message}</p>
                    </>
                )
            }
        </>
    )
}

export default ManagedDocument