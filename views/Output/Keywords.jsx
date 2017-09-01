import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import OutputTemplate from './OutputTemplate.jsx';
import { breakpoint, breakpointsObj as bp } from '../utils/breakpoints';
import { colors } from '../utils/colors';
import { weight } from '../utils/typography';
import Table from '../Table.jsx';
import Bar from '../Bar.jsx';

const tableTheme = {
  row: {
    maxWidth: '360px',
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
  displayName: 'Keywords',

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
      visibleItems: 10,
    };
  },

  toggleJson() {
    this.setState({ showJson: !this.state.showJson });
  },

  onWaypoint() {
    if (this.state.visibleItems < this.props.data.length) {
      setTimeout(() => {
        this.setState({
          visibleItems: this.state.visibleItems + 10,
        });
      }, 150);
    }
  },

  render() {
    return (
      <div>
        <OutputTemplate
          description={<p className="base--p_small">Determine important <a href="https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#keywords" target="_blank" rel="noopener noreferrer">keywords</a> ranked by relevance.</p>}
          data={{ keywords: this.props.data }}
          showJson={this.state.showJson}
          onExitJson={this.toggleJson}
          onShowJson={this.toggleJson}
        >
          {this.props.data && this.props.data.length > 0 ? (
            <div>
              <Table
                columns={['Text', 'Relevance']}
                theme={tableTheme}
                data={this.props.data.map(item => ({
                  Text: item.text,
                  Relevance: <Bar score={item.relevance} />,
                })).filter((val, i) => i <= this.state.visibleItems)}
              />
              <Waypoint onEnter={this.onWaypoint} />
            </div>
          ) : (
            <p>{`No Keywords results returned for ${this.props.language} input.`}</p>
          )}
        </OutputTemplate>
      </div>
    );
  },
});
