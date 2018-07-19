import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import map from 'map-range';
import { parser } from 'css-math';
import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from './utils/colors';

const barColor = colors.GRAY;
const scoreLabelWidth = '1.5rem';
const scorePadding = '0.5rem';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '6rem',
  },
  fullBar: {
    height: '0.5rem',
    border: `1px solid ${barColor}`,
    position: 'relative',
    width: `calc(100% - ${parser(`${scoreLabelWidth} + ${scorePadding}`)})`,
    marginRight: scorePadding,
  },
  fullBar_barOnly: {
    width: '100%',
  },
  bar: {
    backgroundColor: barColor,
    height: '100%',
    position: 'absolute',
    top: '0rem',
    left: '0rem',
  },
  score: {
    width: scoreLabelWidth,
    textAlign: 'right',
    marginTop: '0rem',
    verticalAlign: 'right',
    fontSize: '0.8rem',
  },
});

function Bar(props) {
  const {
    rangeEnd, rangeStart, score, withScore,
  } = props;
  const mapped = map(x => x, rangeStart, rangeEnd, 0, 1);
  return (withScore
    ? (
      <div className={css(styles.container)}>
        <div className={css(styles.fullBar)}>
          <div className={css(styles.bar)} style={{ width: `${Math.round(mapped(score) * 100)}%` }} />
        </div>
        <div className={css(styles.score)}>
          {numeral(score).format('0.00')}
        </div>
      </div>
    )
    : (
      <div className={css(styles.fullBar, styles.fullBar_barOnly)}>
        <div className={css(styles.bar)} style={{ width: `${Math.round(mapped(score) * 100)}%` }} />
      </div>
    )
  );
}

Bar.propTypes = {
  score: PropTypes.number, // percentage number from 0 - 100
  withScore: PropTypes.bool, // show score or not
  rangeStart: PropTypes.number,
  rangeEnd: PropTypes.number,
};

Bar.defaultProps = {
  score: 0,
  withScore: true,
  rangeStart: 0,
  rangeEnd: 1,
};

export default Bar;
