/** @jsx jsx */

import {css, jsx} from "@emotion/core";

function Home() {

  const styleHeader = css`
    margin: 20px 10px 20px 10px;
  `;

  return (
    <div css={styleHeader}>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
