import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet } from 'aphrodite';
import Demo from '../../views/Demo.jsx';
import { css } from '../../views/index.jsx';


StyleSheet.rehydrate(css.renderedClassNames);
ReactDOM.render(<Demo />, document.getElementById('root'));
