import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import JsonLink from '../JsonLink.jsx';

const styles = StyleSheet.create({
  content: {
    marginTop: '2rem',
  },
});

function OutputTemplate(props) {
  return (
    <div>
      <JsonLink
        json={props.data}
        showJson={props.showJson}
        onExit={props.onExitJson}
        onShow={props.onShowJson}
        description={props.description}
      />
      <div className={css(styles.content)}>
        {props.children}
      </div>
    </div>
  );
}

OutputTemplate.propTypes = {
  showJson: React.PropTypes.bool,
  onExitJson: React.PropTypes.func,
  onShowJson: React.PropTypes.func,
  description: React.PropTypes.element,
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
};

export default OutputTemplate;
