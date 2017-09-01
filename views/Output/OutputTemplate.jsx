import React from 'react';
import PropTypes from 'prop-types';
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
  showJson: PropTypes.bool,
  onExitJson: PropTypes.func,
  onShowJson: PropTypes.func,
  description: PropTypes.element.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

OutputTemplate.defaultProps = {
  showJson: false,
  onExitJson: () => {},
  onShowJson: () => {},
  data: {},
  children: {},
};

export default OutputTemplate;
