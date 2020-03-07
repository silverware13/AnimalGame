/** @jsx jsx */

import {css, jsx} from "@emotion/core";

function Home() {

  const style = css`
    margin: 20px 10px 20px 10px;
  `;

  return (
    <div css={style}>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
