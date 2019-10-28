import React, { Component } from 'react'
import axios from "axios";
import Pagination from "./pagination";

const Image = props => (
    <tr>

        <td>{props.image.title}</td>
        <td>{props.image.description}</td>
        <td><button type="button" onClick={() => props.deleteimage(props.image._id)} className="btn btn-danger " > Delete </button ></td>
    </tr>
)


class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titleError: "",
            descriptonError: "",
            fileError: "",
            file: null,
            title: "",
            descripton: "",
            allImages: [],
            upLoadPercentage: 0,
            newImage: [],
            searchImage: "",
            currentPage: 1,
            postPerPage: 4,
            hide: true
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file)
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] }, this.validateForm)
    }

    // upolad image    

    fileUpload(file) {
        const isValid = this.validate();

        if (isValid) {
            const description = this.state.descripton;
            const title = this.state.title;

            const url = `${process.env.REACT_APP_API_URL}/images/add`;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('description', description);


            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    this.setState({
                        upLoadPercentage: percentCompleted
                    })
                }

            }

            return axios.post(url, formData, config)
                .then(response => this.setState({
                    newImage: response.data
                }, () => {
                    const newArray = this.state.allImages;
                    const pushArray = newArray.push(this.state.newImage);
                    console.log(pushArray)
                    this.setState({
                        allImages: newArray,
                        titleError: "",
                        descriptonError: "",
                        fileError: "",
                        upLoadPercentage: 0,
                        hide: true,
                        file: null,
                        title: "",
                        descripton: "",


                    })
                }))

        }
    }

    onChange2 = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
            currentPage: 1
        }, this.validateForm)
    };

    validate = () => {
        let titleError = "";
        let descriptonError = "";
        let fileError = null;


        if (!this.state.title) {
            titleError = "Field is Empty";
        }

        if (!this.state.descripton) {
            descriptonError = "Field is Empty";
        }

        if (!this.state.file) {
            fileError = "File is Empty";
        }

        if (titleError || descriptonError || fileError) {
            this.setState({ titleError, descriptonError, fileError });
            return false;
        }
        return true;
    };


    // *****************get all images****************
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/getAllImages`)
            .then(response => {
                this.setState({ allImages: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // ***********Delete image by id *****************

    deleteimage(imageid) {
        const newImage = this.state.allImages.filter(image => image._id !== imageid)

        this.setState({
            allImages: newImage
        })

        axios.delete(`${process.env.REACT_APP_API_URL}/image/delete/` + imageid)
            .then(res => console.log(res.data))
            .catch(function (error) {
                console.log(error);
            })

    }

    handleChange = (e) => {
        this.setState({
            hide: false
        })
    }


    render() {
        // filter array 
        const newArray = this.state.allImages.filter((image) => {
            return image.title.toLowerCase().includes(this.state.searchImage.toLowerCase())
        })

        // get current post paginate
        const indexOfLastPost = this.state.currentPage * this.state.postPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;
        const currentPost = newArray.slice(indexOfFirstPost, indexOfLastPost);

        // change page
        const paginate = (pageNumber) => this.setState({
            currentPage: pageNumber
        })

        const style = this.state.hide ? { display: 'none' } : { display: true }


        return (
            <React.Fragment>
                <div>
                    <form
                        className="SearchBar">
                        <label><h5>Search:</h5></label>
                        <input
                            className="form-control"
                            name="searchImage"
                            type="text"
                            value={this.state.searchImage}
                            onChange={this.onChange2}
                        />
                    </form>
                    <div className="boxOne">
                        <form onSubmit={this.onFormSubmit}>
                            <h2>Create Image Upload:</h2>
                            <section>
                                <label className="font">Title:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.state.title}
                                    onChange={this.onChange2}
                                />
                                <div style={{ fontSize: 14, color: "red" }}>
                                    {this.state.titleError}
                                </div>
                            </section>
                            <section>
                                <label className="font">Descripton:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="descripton"
                                    id="descripton"
                                    value={this.state.descripton}
                                    onChange={this.onChange2}
                                />
                                <div style={{ fontSize: 14, color: "red" }}>
                                    {this.state.descriptonError}
                                </div>
                            </section>
                            <br></br>
                            <input type="file" name='file' onChange={this.onChange} />
                            <button type="submit" onClick={this.handleChange} className="btn btn-primary">Upload</button>
                            <div style={{ fontSize: 14, color: "red" }}>
                                {this.state.fileError}
                            </div>
                        </form>
                        <br />
                        <div className="progress" style={style}>
                            <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{ width: `${this.state.upLoadPercentage}%` }} > {this.state.upLoadPercentage}%</div>
                        </div>
                        <br />
                        {this.state.file ? (
                            <div className="row mt-5">
                                <div className="col-md-6 m-auto">
                                    <img style={{ width: "100%" }} src={this.state.file.name} alt="" />
                                </div>
                            </div>
                        ) : null}

                    </div>
                    <div className="boxTwo">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th >Title</th>
                                        <th>Description</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {currentPost.map((currentImage, i) => {
                                        return <Image image={currentImage} deleteimage={this.deleteimage.bind(this)} key={i} />
                                    })}



                                </tbody>
                            </table>
                        </div>
                        <Pagination postPerPage={this.state.postPerPage} totalPost={this.state.allImages.length} paginate={paginate} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default FileUpload;

