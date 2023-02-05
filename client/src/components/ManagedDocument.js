import React from 'react'

const ManagedDocument = (props) => {

    const document = props.document
    console.log(document)
    // const document.
    return (
        <>
            {
                // if authors exists, return the data in a table, if not return Loading...
                document ? (
                    // either "Upload" button if that document does not exist,
                    <h1></h1>
                ) :
                    // if it does exist it should render the document.status, .type, and render Preview and Download buttons using the document.link
                    <p>Please upload a copy of your OPT EAD...</p>
            }
        </>
    )
}

export default ManagedDocument