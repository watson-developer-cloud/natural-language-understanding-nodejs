import React from 'react';
import Layout from './Layout.jsx';
import Demo from './Demo.jsx';
import { StyleSheetServer } from 'aphrodite';
import ReactDOMServer from 'react-dom/server';
import HtmlToReact from 'html-to-react';

// Contains the generated html, as well as the generated css and some
// rehydration data.
const {html, css} = StyleSheetServer.renderStatic(() => ReactDOMServer.renderToStaticMarkup(<Demo/>));

export {html, css};

export default function index() {
  return (<Layout css={css}>{(new HtmlToReact.Parser(React)).parse(html)}</Layout>);
}
