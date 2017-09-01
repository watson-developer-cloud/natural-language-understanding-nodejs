import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Colors, Code } from 'watson-react-components';
import { StyleSheet, css } from 'aphrodite/no-important';
import { z } from './utils/zIndices';
import { breakpoint, breakpointsObj as bp } from './utils/breakpoints';
import { colors } from './utils/colors';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    [breakpoint(bp.MEDIUM)]: {
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  },
  desc: {
    [breakpoint(bp.MEDIUM)]: {
      width: 'calc(100% - 6rem)',
      marginBottom: '1rem',
    },
  },
  spacer: {
    flexGrow: '1',
    margin: '0rem',
  },
  link: {
    display: 'inline-block',
    [breakpoint(bp.MEDIUM)]: {
      marginTop: '0rem',
      width: '4rem',
      marginLeft: '1rem',
      marginBottom: '1rem',
      textAlign: 'right',
    },
  },
  span: {},
  icon1: {
    [breakpoint(bp.MEDIUM)]: {
      display: 'none',
    },
  },
  icon2: {
    display: 'none',
    transition: '0.3s',
    [breakpoint(bp.MEDIUM)]: {
      display: 'inline-block',
      marginTop: '0rem',
      transform: 'rotate(90deg) scale(0.5)',
    },
  },
  icon2_show: {
    transform: 'rotate(-90deg) scale(0.5)',
  },
  overlay: {
    position: 'fixed',
    top: '0rem',
    left: '0rem',
    margin: '0rem',
    height: '100%',
    width: '100%',
    opacity: '0',
    backgroundColor: colors.CODE_BG,
    visibility: 'hidden',
    transition: '0.2s',
    zIndex: z.OVERLAY,
    overflow: 'auto',
    '–webkit-overflow-scrolling': 'touch',
    [breakpoint(bp.MEDIUM)]: {
      position: 'static',
      opacity: '1',
      maxHeight: '0px',
      overflow: 'hidden',
      transition: '0.3s',
    },
  },
  show: {
    visibility: 'visible',
    opacity: '1',
    [breakpoint(bp.MEDIUM)]: {
      maxHeight: '16rem',
      overflow: 'auto',
      transition: '0.3s',
    },
  },
  button: {
    position: 'fixed',
    right: '1rem',
    top: '1rem',
    padding: '0rem',
    border: 'none',
    margin: '0rem',
    [breakpoint(bp.MEDIUM)]: {
      display: 'none',
    },
  },
});

export default function JsonLink(props) {
  // return a js object
  const normalizeJson = json => (typeof json === 'string' ? JSON.parse(json) : json);

  return (
    <div className={`results--json ${css(styles.container)}`}>
      <div className={css(styles.desc)}>
        {props.description}
      </div>
      <div className={css(styles.spacer)} />
      <a
        onClick={(e) => {
          e.preventDefault();
          props.onShow.call(this, e);
        }}
        className={`json-link base--a ${css(styles.link)}`}
        rel="noopener noreferrer"
        href={null}
      >
        <span className={`json-link--span ${css(styles.span)}`}>{props.children || 'JSON'}</span>
        <span className={css(styles.icon1)}>
          <Icon type="link-out" size="small" fill={Colors.blue_50} />
        </span>
        <span className={`${css(styles.icon2)} ${props.showJson ? css(styles.icon2_show) : ''}`}>
          <Icon type="right" size="small" fill={Colors.blue_50} />
        </span>
      </a>
      <div className={`${css(styles.overlay)} ${props.showJson ? css(styles.show) : ''}`}>
        <Code language="json">
          {JSON.stringify(normalizeJson(props.json), null, 1)}
        </Code>
        <button
          className={css(styles.button)}
          onClick={(e) => {
            props.onExit.call(this, e);
          }}
        >
          <Icon type="close" fill="#333" />
        </button>
      </div>
    </div>
  );
}

JsonLink.propTypes = {
  json: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  showJson: PropTypes.bool,
  onExit: PropTypes.func,
  onShow: PropTypes.func,
  description: PropTypes.element,
};

JsonLink.defaultProps = {
  showJson: false,
  onExit: () => {},
  onShow: () => {},
  children: null,
  description: null,
};
