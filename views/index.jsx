import React from 'react';
import { StyleSheetServer } from 'aphrodite';
import ReactDOMServer from 'react-dom/server';
import HtmlToReact from 'html-to-react';
import Layout from './Layout.jsx';
import Demo from './Demo.jsx';

// Contains the generated html, as well as the generated css and some
// rehydration data.
const { html, css } = StyleSheetServer.renderStatic(() => ReactDOMServer
  .renderToStaticMarkup(<Demo />));

export { html, css };

export default function Index() {
  return (
    <Layout css={css}>
      {(new HtmlToReact.Parser(React)).parse(html)}
    </Layout>
  );
}
