import React from 'react';
import PropTypes from 'prop-types';
import OutputTemplate from './OutputTemplate.jsx';
import { breakpoint, breakpointsObj as bp } from '../utils/breakpoints';
import { colors } from '../utils/colors';
import { weight } from '../utils/typography';
import Table from '../Table.jsx';
import Bar from '../Bar.jsx';

const tableTheme = {
  row: {
    maxWidth: '300px',
    borderBottom: `1px solid ${colors.WARM_GRAY}`,
    paddingBottom: '1rem',
    marginBottom: '1rem',
  },
  row_header: {
    [breakpoint(bp.SMALL)]: {
      borderBottom: 'none',
    },
  },
  cell: {
    ':first-child': {
      fontWeight: weight.MEDIUM,
      color: colors.PRIMARY_LIGHT,
    },
    [breakpoint(bp.X_SMALL)]: {
      width: '7rem',
      ':first-child': {
        width: 'calc(100% - 7rem)',
      },
    },
  },
  cell_header: {
    fontWeight: weight.MEDIUM,
    color: colors.COOL_GRAY,
    ':first-child': {
      fontWeight: weight.MEDIUM,
      color: colors.COOL_GRAY,
    },
  },
};

export default React.createClass({
  displayName: 'Concept',

  propTypes: {
    data: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      relevance: PropTypes.number,
    })),
    language: PropTypes.string,
  },

  getInitialState() {
    return {
      showJson: false,
    };
  },

  toggleJson() {
    this.setState({ showJson: !this.state.showJson });
  },

  render() {
    return (
      <div>
        <OutputTemplate
          description={<p className="base--p_small">Identifies general <a href="https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#concepts" target="_blank" rel="noopener noreferrer">concepts</a> that may not be directly referenced in the text.</p>}
          data={{ concepts: this.props.data }}
          showJson={this.state.showJson}
          onExitJson={this.toggleJson}
          onShowJson={this.toggleJson}
        >
          {this.props.data && this.props.data.length > 0 ? (
            <Table
              columns={['Concept', 'Score']}
              theme={tableTheme}
              data={this.props.data.map(item =>
                ({ Concept: item.text, Score: <Bar score={item.relevance} /> }))
              }
            />
          ) : (
            <p>{`No Concept results returned for ${this.props.language} input.`}</p>
          )}
        </OutputTemplate>
      </div>
    );
  },
});
