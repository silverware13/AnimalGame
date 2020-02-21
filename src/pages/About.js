/** @jsx jsx */

import {css, jsx} from "@emotion/core";

function About() {

  const styleHeader = css`
  margin: 20px 10px 20px 10px;
`;

  return (
    <div css={styleHeader}>
      <h1>About</h1>
    </div>
  );
}

export default About;
