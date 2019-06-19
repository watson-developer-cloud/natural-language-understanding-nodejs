import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    bottom: '4rem',
    right: '2rem',
    paddingRight: '3em',
    paddingLeft: '3em',
    paddingTop: '0.2em',
    paddingBottom: '0.2em',
    backgroundColor: '#9855d4',
    borderColor: '#9855d4',
    borderRadius: '45px',
    zIndex: 9999,
  },
  hidden: {
    display: 'none',
    opacity: 0,
  },
  visible: {
    display: 'block',
    opacity: 1,
  },
  ctalabel: {
    color: '#FFFFFF',
  },
});

const FloatingCta = ({
  link,
  label,
  isVisible,
}) => {
  const combinedVisibleStyles = (isVisible)
    ? css(styles.container, styles.visible)
    : css(styles.container, styles.hidden);

  return (
    <a className={combinedVisibleStyles} href={link} rel="noreferrer noopener" target="_blank">
      <p className={css(styles.ctalabel)}>{label}</p>
    </a>
  );
};

FloatingCta.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FloatingCta;
