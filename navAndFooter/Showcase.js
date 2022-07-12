import React, { Fragment } from "react";
import 'owl.carousel';
import DappyWidget from "./DappyWidget";
import RDriveWidget from "./RDriveWidget";
import RChainWalletWidget from "./RChainWalletWidget";

export default class extends React.Component {
  componentDidMount() {
      $(document).ready(function(){
        $('.owl-carousel').owlCarousel({
          margin: 24,
          autoplay:false,
          autoplayTimeout:10000,
          autoplayHoverPause:true,
          loop: true,
          responsive:{
            0:{
              items:1
            },
            700:{
              items:2
            },
            1000:{
              items:3
            }
          }
        });
      });
  }
  render() {
    return (
      <Fragment>
        <div class="owl-carousel owl-theme">
          <DappyWidget></DappyWidget>
          <RDriveWidget></RDriveWidget>
          <RChainWalletWidget></RChainWalletWidget>
        </div>
      </Fragment>
    );
  }
}
