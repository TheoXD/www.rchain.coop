import React, { Fragment } from "react";
import { ReactVideo } from "reactjs-media";
import Dropzone from 'react-dropzone';
import FileUploadProgress  from 'react-fileupload-progress';

import 'owl.carousel';
import "./RDriveWidget.css";

const styles = {
  progressWrapper: {
    height: '20px',
    marginTop: '10px',
    width: '300px',
    float:'left',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)'
  },
  progressBar: {
    float: 'left',
    width: '0',
    height: '100%',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'white',
    WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    WebkitTransition: 'width .6s ease',
    Otransition: 'width .6s ease',
    transition: 'width .6s ease'
  },
  cancelButton: {
    marginTop: '5px',
    WebkitAppearance: 'none',
    padding: 0,
    cursor: 'pointer',
    background: '0 0',
    border: 0,
    float: 'left',
    fontSize: '21px',
    fontWeight: 700,
    lineHeight: 1,
    color: '#000',
    textShadow: '0 1px 0 #fff',
    filter: 'alpha(opacity=20)',
    opacity: '.2'
  }
};

export default class RDriveWidget extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef(null);
    this.inputRef = React.createRef(null);
    this.files = [];

    this.state = {
      date: new Date(),
      mediaUrl: "http://localhost:8080/api/public/dl/9kDWpc8G?inline=true",
      poster: "/assets/showcase/sintel_trailer_1080.jpg",
      currentStep: 1
    };
  }

  customProgressRenderer = (progress, hasError, cancelHandler)  => {
    if (hasError || progress > -1 ) {
      let barStyle = Object.assign({}, styles.progressBar);
      barStyle.width = progress + '%';

      let message = (<span>{barStyle.width}</span>);
      if (hasError) {
        barStyle.backgroundColor = '#d9534f';
        message = (<span style={{'color': '#a94442'}}>Failed to upload ...</span>);
      }
      if (progress === 100){
        message = (<span >Done</span>);
      }

      return (
        <div style={{position: "absolute", bottom: 0, left: 0}}>
          <div style={styles.progressWrapper}>
            <div style={barStyle}></div>
          </div>
          <button style={styles.cancelButton} onClick={cancelHandler}>
            <span>&times;</span>
          </button>
          <div style={{'clear':'left'}}>
            {message}
          </div>
        </div>
      );
    } else {
      return;
    }
  }

  customFormRenderer = (onSubmit) => {
    return (
      <Dropzone noClick={this.state.currentStep !== 1} noDrag={this.state.currentStep !== 1} maxFiles={1}  multiple={false} onDrop={(acceptedFiles) => {
        acceptedFiles.map(file => this.files = [...this.files, file] );
        this.formRef.current.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true })
        )
      }}> 
                {({getRootProps, getInputProps, open}) => (
                  <section>
                    <form ref={this.formRef} onSubmit={onSubmit} id='customForm' style={{marginBottom: '15px'}}>
                    <div {...getRootProps()}>
                        
                          <input  {...{...getInputProps()}} ref={this.inputRef} style={{display: 'none'}} type="file" name="file" id="exampleInputFile"/>
                          <div htmlFor="exampleInputFile" style={{marginRight: "2.8em"}}>
                            {this.state.currentStep === 1 ? <img src="/assets/showcase/step1.png" alt="" />
                              : undefined
                            }
                            {this.state.currentStep === 2 ? <img src="/assets/showcase/step2.png" alt="" />
                              : undefined
                            }
                            {this.state.currentStep === 3 ? <img src="/assets/showcase/step3.png" alt="" />
                              : undefined
                            }
                          </div>
                        
                    </div>
                    </form>
          </section>
        )}
      </Dropzone>

    );
  }

  formGetter = () => {
    const formData = new FormData();
    this.files.map(file => {
      formData.append("file", file);
    });
    return formData;

  }

  render() {
    return (
      <Fragment>
          <div class="project">
            <div class="project-title">
              <h1> RDrive </h1>
              <h4> by RChain Publishing </h4>
            </div>
            <div class="VideoContainer">
              <ReactVideo
                  key={this.state.mediaUrl}
                  src={this.state.mediaUrl}
                  poster={this.state.poster}
                  className="VideoPlayer"
                  primaryColor="#ffffff78"
              />
            </div>
            <div class="project-rdrive">
              <p class="rdrive-info">
                RDrive allows you to store files directly on the blockchain.
              </p>
              <div style={{display: "flex"}}>
                    <div class="rdrive-info-detail">
                      <p>Go ahead, try it yourself!</p>
                    </div>
                    <FileUploadProgress key='ex2' url='http://localhost:3000/api/upload' method='post'
                      onProgress={(e, request, progress) => {
                        console.log('progress', e, request, progress);
                        this.setState({
                          ...this.state,
                          currentStep: 2
                        });
                      }}
                      onLoad={ (e, request) => {
                        console.log('load', e, request);
                        const links = JSON.parse(request.responseText);
                        setTimeout(() => {
                          this.setState({
                            ...this.state,
                            mediaUrl: links.src,
                            poster: links.poster,
                            currentStep: 3
                          });
                        }, 2000)
                      }}
                      onError={ (e, request) => {console.log('error', e, request);}}
                      onAbort={ (e, request) => {console.log('abort', e, request);}}
                      formGetter={this.formGetter.bind(this)}
                      formRenderer={this.customFormRenderer.bind(this)}
                      progressRenderer={this.customProgressRenderer.bind(this)}
                    />
              </div>

            </div>
          </div>
      </Fragment>
    );
  }
}
