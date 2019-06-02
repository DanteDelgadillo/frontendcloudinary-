import React from "react";
import { Route } from "react-router-dom";
import Upload from "../Components/upload"
import imageshomepage from "../Components/imageloading";

const Main = () => (
    <React.Fragment>
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/" component={imageshomepage} />
    </React.Fragment>
);

export default Main;
