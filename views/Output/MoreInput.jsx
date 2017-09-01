import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'watson-react-components';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    width: 'calc(100% - 2rem)',
    maxWidth: '16.5rem',
    position: 'relative',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  button: {
    position: 'absolute',
    top: 'calc(50% - 0.82rem)',
    left: '100%',
    marginTop: '0rem',
    marginLeft: '1rem',
    border: 'none',
    padding: '0rem',
  },
});

let value = '';

function MoreInput(props) {
  return (
    <div className={css(styles.container)}>
      <input
        type="text"
        placeholder="Enter existing phrase from input"
        {...props}
        onKeyUp={(e) => {
          value = e.target.value;
          if (e.keyCode === 13) {
            props.onSubmit.call(this, e);
          }
        }}
      />
      <button
        className={css(styles.button)}
        onClick={(e) => {
          e.target.value = value;
          props.onSubmit.call(this, e);
        }}
      ><Icon type="right" size="small" /></button>
    </div>
  );
}

MoreInput.propTypes = {
  onSubmit: PropTypes.func,
};

MoreInput.defaultProps = {
  onSubmit: () => {},
};

export default MoreInput;
