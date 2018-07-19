import React from 'react';
import PropTypes from 'prop-types';
import OutputTemplate from './OutputTemplate.jsx';
import { breakpoint, breakpointsObj as bp } from '../utils/breakpoints';
import { colors } from '../utils/colors';
import { weight } from '../utils/typography';
import Table from '../Table.jsx';
import Bar from '../Bar.jsx';

const tableTheme = {
  row_two: {
    marginBottom: '1rem',
    // maxWidth: '300px',
    [breakpoint(bp.SMALL)]: {
      borderBottom: `1px solid ${colors.WARM_GRAY}`,
      paddingBottom: '1rem',
      marginBottom: '1rem',
    },
  },
  row_header_two: {
    [breakpoint(bp.SMALL)]: {
      borderBottom: 'none',
      paddingBottom: '0rem',
    },
  },
  cell_header_two: {
    fontWeight: weight.MEDIUM,
    color: colors.COOL_GRAY,
    ':first-child': {
      fontWeight: weight.MEDIUM,
      color: colors.COOL_GRAY,
    },
  },
  cell_two: {
    marginBottom: '0.5rem',
    ':first-child': {
      color: colors.PRIMARY_LIGHT,
      fontWeight: weight.BOLD,
    },
    [breakpoint(bp.SMALL)]: {
      marginBottom: '0.5rem',
      width: 'calc(100% - 7rem)',
      ':nth-of-type(2)': {
        width: '7rem',
      },
    },
  },
};


export default React.createClass({
  displayName: 'Categories',

  propTypes: {
    data: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      score: PropTypes.number,
    })),
    language: PropTypes.string,
  },

  getInitialState() {
    return {
      showJson: false,
    };
  },

  toggleJson() {
    this.setState(prevState => ({ showJson: !prevState.showJson }));
  },

  render() {
    const { data, language } = this.props;
    const { showJson } = this.state;
    return (
      <div>
        <OutputTemplate
          description={<p className="base--p_small">Classify content into a <a href="https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#categories" target="_blank" rel="noopener noreferrer">hierarchy</a> that&apos;s five levels deep with a score.</p>}
          data={{ categories: data }}
          showJson={showJson}
          onExitJson={this.toggleJson}
          onShowJson={this.toggleJson}
        >
          {data && data.length > 0 ? (
            <Table
              disableHeadersOnMobile
              columns={['Hierarchy', 'Score']}
              theme={tableTheme}
              data={data.reduce((acc, item) => {
                acc.push({ Hierarchy: item.label.split('/').join(' / '), Score: <Bar score={item.score} /> });
                return acc;
              }, [])}
            />
          ) : (
            <p>
              {`No Categories results returned for ${language} input.`}
            </p>
          )}
        </OutputTemplate>
      </div>
    );
  },
});
