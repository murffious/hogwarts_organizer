// import React, { Component } from "react";
// import API from "../controller_api/api";
// import Courses from "../components/students/Courses";

// class CoursesContainer extends Component {
//   state = {
//     students: [],
//     courses: [],
//     message: ""
//   };

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };

//   getStudents = () => {
//     API.getCourses()
//       .then(res =>
//         this.setState({
//           courses: res.data,
//           message: !res.data.length ? "No Courses Found, Try a Adding Some" : ""
//         })
//       )
//       .catch(err => console.log(err));
//   };

//   // handleFormSubmit = event => {
//   //   event.preventDefault();
//   //   this.getCourses();
//   // };

//   // handleCoursesave = id => {
//   //   API.saveCourse(course).then(res => this.getCourses());
//   // };

//   render() {
//     return (
//       <div>
//         <Courses courses={this.state.courses} />
//       </div>
//     );
//   }
// }

// export default Home;


import { connect }          from 'react-redux';
import { 
    getFolder, 
    addFolder, 
    deleteFolder, 
    updateFolder, 
    addFile, 
    updateFile,
    deleteFile
} from '../../redux/actions/file_manager';
import FileUpload           from '../../components/account/filemanager/FileUpload';
import File                 from '../../components/account/filemanager/File';
import Folder               from '../../components/account/filemanager/Folder';
import React, { Component } from 'react';
import '../../styles/FileManager.css';
import Modal from '../../components/account/Modal';
import {Helmet} from 'react-helmet';
import $ from 'jquery';


class FileManagerContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            new_folder_name: ""
        }

    }

    componentWillMount() {

        this.props.setInitialFolder(this.props.root_folder);
    }

    componentWillUpdate(next_props) {

        if(!next_props.is_current){
            this.props.onChangeFolder(this.props.current_folder);
        }
    }

    getParentFolder() {
        return (
            <Folder 
                folder={{
                    _id: this.props.current_folder.parent_id,
                    name: 'up a level'
                }}
                onDrop={(dropped, target) => {
                    let file   = dropped.file;
                    let folder = target.folder;
                    file.folder = folder._id;
                    this.props.onFileMove(file, file._id)
                }}
                onOpen={this.props.onChangeFolder}
                onEdit={this.props.onUpdateFolder}
                onDelete={this.props.onDeleteFolder}
            />
        );
    }

    getFolders(){
        if(this.props.current_folder){
            let folder = this.props.current_folder;

            return (
                <div>
                {!folder.parent_id ? '' : this.getParentFolder()}
                {!folder.child_folders ? '' : folder.child_folders.map((folder, index) => {
                    return (
                        <Folder 
                            key={index}
                            folder={{...folder}}
                            onDrop={(dropped, target) => {
                                let file   = dropped.file;
                                let folder = target.folder;
                                file.folder = folder._id;
                                this.props.onFileMove(file, file._id)
                            }}
                            onOpen={this.props.onChangeFolder}
                            onEdit={this.props.onUpdateFolder}
                            onDelete={this.props.onDeleteFolder}
                        />
                    );
                })}
                </div>
            );    
        }
        return null
    }

    getFiles() {
        if(this.props.current_folder && this.props.current_folder.files){
            let folder = this.props.current_folder;
            return (
                <div>
                {folder.files.map((file, index) => {
                    return (
                        <File 
                            key={index}
                            file={{...file}}
                            onFileEdit={this.updateFile}
                            onFileDelete={this.props.onDeleteFile}
                        />
                    );
                })
                }
                </div>
            );
        }
        return null;
    }

    handleDropdownFileUpload(files) {

        this.props.onUploadFile(
            files[0],
            this.props.current_folder._id
        );

    }

    folderNameChanges(event){

        let new_folder_name = event.target.value;
        this.setState({new_folder_name});
    }

    createFolder(){

        let folder = this.props.current_folder;
        let new_folder_name = this.state.new_folder_name;

        console.log('new folder name: ', new_folder_name);

        if( new_folder_name.length > 0 ){
            this.props.onAddFolder(new_folder_name, folder._id);
        }

        $('#add-folder-modal').modal("hide");
        this.setState({new_folder_name: ""});

    }

    render() {    

        let folder = this.props.current_folder;

        return (
            <div>
                <Helmet>
                    <style type="text/css">{`
                        .modal-backdrop {
                            display: none;
                        }
                        [hidden] {
                          display: none !important;
                        }
                    `}</style>
                </Helmet>
                <Modal identifier={'add-folder-modal'} title={'Folder name'} body={
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-4">
                                    <strong>Folder name: </strong>
                                </div>
                                <div className="col-sm-4">
                                    <input type="text" value={this.state.new_folder_name} onChange={this.folderNameChanges.bind(this)}/>

                                </div>
                                <div className="col-sm-4">
                                    <button onClick={this.createFolder.bind(this)}>Create</button>
                                </div>
                            </div>
                        </div>


                    </div>
                } footer={''} />
                <div className="fm-toolbar">

                    <div className="container">
                        <div className="row">
                            <div className="col-md-2">
                                <label className="btn btn-default">
                                    Upload file <input label="Upload Files" type="file" hidden onChange={ (e) => { this.handleDropdownFileUpload(e.target.files) } } />
                                </label>
                            </div>
                            <div className="col-md-2">
                                <button type="button" className="btn btn-default" onClick={() => {
                                    $('#add-folder-modal').modal();
                                }}>New Folder</button>
                            </div>
                        </div>
                    </div>

                </div>
                <FileUpload onUploadFiles={(files) => {
                    if( files.length ){
                        for( let i = 0; i < files.length; i++){
                            let file = files[i];
                            this.props.onUploadFile(file, folder._id);
                        }
                    }
                }}/>
                <div className="row" style={{width: '100%', float: 'left', marginTop: '20px'}}>
                    {this.getFolders()}
                </div>
                <div className="row" style={{width: '100%', float: 'left'}}>
                    {this.getFiles()}
                </div>
            </div>
        )
    }
       
}

function mapStateToProps(state) {


    return {
        current_folder: state.file_manager.current_folder,
        is_current: state.file_manager.is_current,
        user: state.auth.loggedInUser,
        root_folder: state.file_manager.root_folder
    }
}

function mapDispatchToProps(dispatch, own_props){

    return {
        // The only reason this would be undefined is if the root folder request failed on login, or the request hasn't come back yet.
        // It's triggered by the login action creator.
        // @cesar or someone (me when I get time) please test this to make sure it's working with signup instead of just login to make sure the request
        // to get the root folder still happens when we log the user in for the first time and succeeds.
        setInitialFolder: (folder) => {
            if(typeof folder !== 'undefined'){
                dispatch(getFolder(folder));
            } else {
                dispatch(getFolder('5a554d0cf93515004c4c5651'));
            }
        },
        onChangeFolder: (folder) => {
            dispatch(getFolder(folder._id));
        },
        onAddFolder: (name, folder_id) => {
            dispatch(addFolder(name, folder_id));
        },
        onUpdateFolder: (folder_id, folder) => {
            dispatch(updateFolder(folder_id, folder));
        },
        onDeleteFolder: (folder) => {
            dispatch(deleteFolder(folder._id));
        },
        onUploadFile: (file, folder_id) => {
            dispatch(addFile(file, folder_id));
        },
        onFileMove: (file, file_id) => {
            dispatch(updateFile(file, file_id))
        },
        onDeleteFile: (file) => {
            dispatch(deleteFile(file._id))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileManagerContainer)