import React, { Component } from 'react'
import axios from "axios";


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
        this.fileUpload(this.state.file).then((response) => {
            console.log(response.data);
        })
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    fileUpload(file) {
        const url = 'http://localhost:4000/images/add';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config)
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


    render() {
        return (
            <React.Fragment>
                <div>
                    {console.log(this.state.allImages)}
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
                                <label className="font">description:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="description"
                                    id="description"
                                    value={this.state.description}
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
                                <tr>
                                    <td>example</td>
                                    <td>example</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FileUpload;

