import React, { useState } from 'react'
import axios from 'axios';

// add image, files, desc to formData and send to server via POST
async function postImage({ image, doc1, doc2, description }) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("doc1", doc1)
  formData.append("doc2", doc2)
  formData.append("description", description)

  const result = await axios.post(
    'http://localhost:8080/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  // console.log('result', result)
  // console.log('result', result.data.result1.Location)

  return { resultImg: result.data.resultImg.Location, resultDoc1: result.data.result1.Location, resultDoc2: result.data.result2.Location }
}


function App() {

  // const [file, setFile] = useState()
  const [file, setFile] = useState([])

  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const [doc1, setDoc1] = useState([])
  const [doc2, setDoc2] = useState([])


  const submit = async e => {
    e.preventDefault()
    const location = await postImage({ image: file, doc1: doc1, doc2: doc2, description })
    console.log("location", location)

    setImages([location.resultImg, ...images])
    setDoc1([location.doc1, ...doc1])
    setDoc2([location.doc2, ...doc2])

  }

  // adds the image file to e.target.files
  const imgSelected = e => {
    // console.log('e.target.files', e.target.files)
    const imgfile = e.target.files[0]
    // console.log('file', imgfile)
    setFile(imgfile)

  }

  // adds doc1 to e.target.files
  const fileSelectedDoc1 = e => {
    // console.log('e.target.files', e.target.files)
    const doc1file = e.target.files[0]
    // console.log('file', file)
    setDoc1(doc1file)
  }

   // adds doc2 to e.target.files
  const fileSelectedDoc2 = e => {
    // console.log('e.target.files', e.target.files)
    const doc2file = e.target.files[0]
    // console.log('file', file)
    setDoc2(doc2file)
  }

  return (
    <>
      <div>
        <form onSubmit={submit}>

          {/* IMAGE */}
          <input onChange={imgSelected} type="file" name="image" accept="image/*"></input>

          {/* DOCUMENT */}
          <input onChange={fileSelectedDoc1} type="file" name="doc1"></input>

          <input onChange={fileSelectedDoc2} type="file" name="doc2"></input>

          <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
          <button type="submit">Submit</button>
        </form>

        {images.map((image, i) => (
          <div key={i}>
            <div key={image}>
              <img src={image} />
              
              {/* PDF VIEWER */}
            </div>
          </div>
        ))}
        {/* {doc1.map((doc, i) => (
          <div key={i}>
            <div key={doc}>
              <div id='viewer' style={{"width":"1024px","height":"600px","margin":"0 auto"}}>{doc}</div>
            </div>
          </div>
        ))}
        https://pdfjs.express/blog/how-embed-pdf-in-html-website */}
      </div>
    </>
  );
}

export default App;
