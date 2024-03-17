import Dropzone from 'react-dropzone'
import { ImageUp } from 'lucide-react';
function DropZone(props) {
  return (
    <div>
      <Dropzone 
         accept={{
       image: [".png", ".jpg", ".jpeg"],
     }}
         onDrop={(acceptedFiles) => {
        props.onFileChange(acceptedFiles[0])
      }}>
        {({ getRootProps, getInputProps }) => (
          <section className='Drag-files'>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="Drag-files-text">
                <ImageUp style={{ "color": "gray", "margin-right": "5px" }} />
                <p>Click or Drag here to select image</p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
}
export default DropZone
