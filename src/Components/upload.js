import React, { Component } from 'react'
import axios from "axios";

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
            file: null,
            title: "",
            descripton: "",
            allImages: []
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
        this.setState({ file: e.target.files[0] })
    }
    fileUpload(file) {
        const description = this.state.descripton;
        const title = this.state.title;

        const url = 'http://localhost:4000/images/add';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return axios.post(url, formData, config)
            .then(res => console.log(res.data))


    }

    onChange2 = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    };

    // *****************get all images****************
    componentDidMount() {
        axios.get("http://localhost:4000/getAllImages")
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
        console.log(newImage)
        axios.delete("http://localhost:4000/image/delete/" + imageid)
            .then(res => console.log(res.data))
            .catch(function (error) {
                console.log(error);
            })

    }


    imageList() {
        return this.state.allImages.map((cuurentImage, i) => {
            return <Image image={cuurentImage} deleteimage={this.deleteimage.bind(this)} key={i} />
        })
    }


    render() {
        return (
            <React.Fragment>
                <div>
                    <div className="boxOne">
                        <form onSubmit={this.onFormSubmit}>
                            <h2>Create Image Upload:</h2>
                            <section>
                                <label className="font">title:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.state.title}
                                    onChange={this.onChange2}
                                />
                            </section>
                            <section>
                                <label className="font">descripton:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="descripton"
                                    id="descripton"
                                    value={this.state.descripton}
                                    onChange={this.onChange2}
                                />
                            </section>
                            <br></br>
                            <input type="file" name='file' onChange={this.onChange} />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                    <div className="boxTwo">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th >Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.imageList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FileUpload;

