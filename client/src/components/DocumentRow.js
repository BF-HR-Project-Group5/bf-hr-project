import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import fileDownload from '../utils/fileDownload';
import filePreview from '../utils/filePreview';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const DocumentRow = (props) => {

    return (
        <>
            <ListItem button>
                <ListItemText primary={props.title} />
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            let splitLink = props.link.split(".")
                            // console.log("link", props.link.split("."))
                            const endTag = splitLink[splitLink.length - 1]
                            // console.log("endTag",endTag)
                            // let endTag = link.substring(link.length-4, link.length)
                            fileDownload(props.link, `${props.user.name.last}${props.user.name.first}${props.title}.${endTag}`)
                        }}
                    >
                        Download
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            filePreview(props.link)
                        }}
                    >
                        Preview
                    </Button>
                </ButtonGroup>
            </ListItem>
            
        </>
    )
}

export default DocumentRow