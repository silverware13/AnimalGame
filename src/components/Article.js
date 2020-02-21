/** @jsx jsx */

import {css, jsx} from "@emotion/core";

function Article({ title, author, date, text }) {

  const styleArticle = css`
    h2, h3 {
      margin: 0;
    }
    h3 {
      color: #777;
    }
  `;

  return (
    <article css={styleArticle}>
      <h2>{title}</h2>
      <h3>{author} &ndash; {new Date(date).toLocaleString()}</h3>
      <p>{text}</p>
    </article>
  );
}

export default Article;
