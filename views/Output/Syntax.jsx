import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import OutputTemplate from './OutputTemplate.jsx';
import { breakpoint, breakpointsObj as bp } from '../utils/breakpoints';
import { colors } from '../utils/colors';
import { weight } from '../utils/typography';
import Table from '../Table.jsx';

const tableTheme = {
  row_two: {
    maxWidth: '300px',
    [breakpoint(bp.SMALL)]: {
      maxWidth: '450px',
      borderBottom: `1px solid ${colors.WARM_GRAY}`,
      paddingBottom: '1rem',
      marginBottom: '1rem',
    },
  },
  row_header_two: {
    [breakpoint(bp.SMALL)]: {
      borderBottom: 'none',
    },
  },
  cell_header_two: {
    fontWeight: weight.MEDIUM,
    color: colors.COOL_GRAY,
    ':first-child': {
      fontWeight: weight.MEDIUM,
      color: colors.COOL_GRAY,
    },
    ':nth-of-type(2)': {
      fontWeight: weight.MEDIUM,
      color: colors.COOL_GRAY,
    },
  },
  cell_two: {
    ':first-child': {
      color: colors.PRIMARY_LIGHT,
      fontWeight: weight.MEDIUM,
    },
    ':nth-of-type(2)': {
      fontWeight: weight.MEDIUM,
      color: colors.DARK_GRAY,
    },
    ':before': {
      width: '5rem',
      fontWeight: weight.MEDIUM,
      color: colors.COOL_GRAY,
    },
  },
  inner_two: {
    width: 'calc(100% - 5rem)',
  },
};

export default React.createClass({
  displayName: 'Syntax',

  propTypes: {
    data: PropTypes.shape({
      tokens: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        part_of_speech: PropTypes.string,
        lemma: PropTypes.string,
      })),
    }),
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
    if (this.state.visibleItems < this.props.data.tokens.length) {
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
          description={<p className="base--p_small">Identify <a href="https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#syntax" target="_blank" rel="noopener noreferrer">tokens</a>, part of speech, sentence boundaries and lemmas in the text</p>}
          data={{ syntax: this.props.data }}
          showJson={this.state.showJson}
          onExitJson={this.toggleJson}
          onShowJson={this.toggleJson}
        >
		{console.log(this.props.data)}
          {this.props.data && this.props.data.tokens && this.props.data.tokens.length > 0 ? (
            <div>
              <Table
                columns={['Token', 'Part of Speech', 'Lemma']}
                theme={tableTheme}
                data={this.props.data.tokens.reduce((acc, item) => {
                  acc.push({ Token: item.text,
                    'Part of Speech': item.part_of_speech,
                    Lemma: item.lemma });
                  return acc;
                }, []).filter((val, i) => i <= this.state.visibleItems)}
              />
              <Waypoint onEnter={this.onWaypoint} />
            </div>
          ) : (
            <p>{`No Syntax results returned for ${this.props.language} input.`}</p>
          )}
        </OutputTemplate>
      </div>
    );
  },
});
