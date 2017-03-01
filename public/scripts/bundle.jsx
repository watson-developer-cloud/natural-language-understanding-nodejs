import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from '../../views/Demo.jsx';
import { css } from '../../views/index.jsx';
import { StyleSheet } from 'aphrodite';

StyleSheet.rehydrate(css.renderedClassNames);
ReactDOM.render(<Demo/>, document.getElementById('root'));
