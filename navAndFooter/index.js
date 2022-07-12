import React, {Suspense} from "react";
import ReactDOM from "react-dom";

import { Nav } from "./Nav";
import { Footer } from "./Footer";

import LazyLoad from 'react-lazy-load';
const Showcase = React.lazy(() => import('./Showcase'));


document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Nav />, document.getElementsByTagName("header")[0]);
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Footer />, document.getElementById("footer"));
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <LazyLoad>
      <Suspense fallback={<div id="showcase-loading"><div class="spinner"></div></div>}>
        <Showcase />
      </Suspense>
    </LazyLoad>
  , document.getElementById("showcase"));
});
