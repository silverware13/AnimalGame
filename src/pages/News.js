/** @jsx jsx */

import {css, jsx} from "@emotion/core";
import Article from '../components/Article';
import news from '../data/news.json';

function News() {

  const styleHeader = css`
    margin: 20px 10px 20px 10px;
  `;

  const styleContainer = css`
    margin: 10px;
    border: 2px solid #808080;
    border-radius: 5px;
    padding: 5px;
  `;

  return (
    <div>
      <h1 css={styleHeader}>News</h1>
      <div>
        {news.map((newsItem, i) =>
          <div key={i + "a"} css={styleContainer}>
            <Article key={i + "b"} {...newsItem} />
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
