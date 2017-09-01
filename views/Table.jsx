/* eslint no-underscore-dangle: off */

import React from 'react';
import PropTypes from 'prop-types';
import { parser } from 'css-math';
import { StyleSheet, css } from 'aphrodite/no-important';
import deepAssign from 'deep-assign';
import { breakpoint, breakpointsObj as bp } from './utils/breakpoints';

/**
 * Generates a table according to state of the table
 *
 * If number of columns is 2 or less, the table will just default to the base
 * styling no matter screen size.
 *
 * If number of columns is greater than 2, then on mobile, table cells will
 * stack on top of each other with header labels on the left of each row.
 * This creates appearance of a two column table.
 *
 * If the disableHeadersOnMobile flag is turned on, then on mobile,
 * table cell elements stack on top of each other with no labels.
 *
 * @param  {Object} properties props object
 * @return {React Element}
 */
function _generateTable(properties) {
  const columnWidth = parser(`100% / ${properties.columns.length}`);

  // regular table
  const base = {
    table: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: '0rem',
    },
    row_header: {
      display: 'flex',
    },
    cell: {
      width: columnWidth,
      marginTop: '0rem',
      display: 'flex',
      alignItems: 'center',
      paddingRight: '1rem',
      ':before': {
        display: 'none',
      },
    },
    cell_header: {},
    inner: {
      display: 'block',
      width: '100%',
    },
  };

  const styles = StyleSheet.create(deepAssign(
    base,
    {
      // responsive to two column state
      table_two: {
        display: 'flex',
        flexDirection: 'column',
        [breakpoint(bp.SMALL)]: base.table,
      },
      row_two: {
        display: 'flex',
        flexDirection: 'column',
        [breakpoint(bp.SMALL)]: base.row,
      },
      row_header_two: {
        display: 'none',
        [breakpoint(bp.SMALL)]: base.row_header,
      },
      cell_two: {
        width: '100%',
        verticalAlign: 'middle',
        marginTop: '0rem',
        ':before': {
          content: 'attr(data-th)',
          width: '50%',
          display: 'inline-block',
          paddingRight: '0.5rem',
          verticalAlign: 'middle',
        },
        [breakpoint(bp.SMALL)]: base.cell,
      },
      inner_two: {
        display: 'inline-block',
        width: '50%',
        verticalAlign: 'middle',
        [breakpoint(bp.SMALL)]: base.inner,
      },
      // responsive to one column
      cell_one: {
        ':before': {
          display: 'none',
        },
      },
      inner_one: {
        width: '100%',
      },
    },
    properties.theme,
  ));

  let suffix = '';

  if (properties.disableHeadersOnMobile || properties.columns.length > 2) {
    suffix = '_two';
  }

  return (
    <div className={css(styles[`table${suffix}`])}>
      {properties.disableHeader ? null : (
        <div className={css(styles[`row${suffix}`], styles[`row_header${suffix}`])}>
          {properties.columns.map((column, i) => (
            <div key={i} className={css(styles[`cell${suffix}`], styles[`cell_header${suffix}`])}>{column}</div>
          ))}
        </div>
      )}
      {properties.data.map((item, i) => (
        <div key={i} className={css(styles[`row${suffix}`])}>
          {properties.columns.map((column, j) => (
            <div
              key={j}
              data-th={column}
              className={css(
                styles[`cell${suffix}`],
                properties.disableHeadersOnMobile || properties.disableHeader ?
                  styles.cell_one : null,
              )}
            >
              <div className={css(styles[`inner${suffix}`], properties.disableHeadersOnMobile || properties.disableHeader ? styles.inner_one : null)}>
                {item[column]}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Table(props) {
  return _generateTable(props);
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired, // string of properties
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  theme: PropTypes.object, // styles
  disableHeadersOnMobile: PropTypes.bool,
  disableHeader: PropTypes.bool,
};

Table.defaultProps = {
  columns: ['name', 'type', 'score'],
  data: [{
    name: 'hello',
    type: 'Person',
    score: 0.22,
  }, {
    name: 'world',
    type: 'Person',
    score: 0.92,
  }, {
    name: 'foo',
    type: 'Company',
    score: 0.25,
  }],
  disableHeadersOnMobile: false,
  disableHeader: false,
};

export default Table;
