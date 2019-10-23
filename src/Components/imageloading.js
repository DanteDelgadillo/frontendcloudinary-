import React, { Component } from 'react'
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';




export default class imageloading extends Component {
    constructor() {
        super();
        this.state = {
            getimages: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4000/getAllImages")
            .then(response => {
                this.setState({ getimages: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {
        if (!this.state.getimages.length) {
            return null;
        } else {
            return < Carousel className="" showArrows={true} showThumbs={true} >
                {
                    this.state.getimages.map((image) => (
                        <div key={image._id} >
                            <img src={image.imageURL} alt="" />
                        </div>
                    ))
                }

            </Carousel >
        }
    }
}

