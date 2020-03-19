/** @jsx jsx */

import {css, jsx} from "@emotion/core";
import Loader  from "react-spinners/HashLoader";
import PropTypes from "prop-types";

function PageSpinner(props) {

  const style = css`
      visibility: ${props.loading ? "visible" : "hidden"};
      position: fixed;
      margin-left: -75px;
      margin-bottom: 75px;
      left: 50%;
      bottom: 50%;
      width: 0;
      height: 0;
      z-index: 99;
  `;

  return (

    <div className="loader-container" css={style}>
      <Loader
        size={150}
        color={"#799ca2"}
      />
    </div>

  );
}
export default PageSpinner;

PageSpinner.propTypes = {
  loading: PropTypes.bool
};