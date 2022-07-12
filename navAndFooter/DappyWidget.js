import React, { Fragment } from "react";
import 'owl.carousel';
import "./DappyWidget.css";

export default class DappyWidget extends React.Component {
  render() {
    return (
      <Fragment>
          <div class="project">
            <div class="project-title">
              <h1> dappy </h1>
              <h4> by FABCO </h4>
            </div>
            <div class="ScreenshotContainer">
              <img src="/assets/showcase/dappybrowser.png" alt="" />
            </div>
            <div class="project-dappy"> ... </div>
          </div>
      </Fragment>
    );
  }
}
