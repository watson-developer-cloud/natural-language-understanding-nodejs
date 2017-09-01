import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'watson-react-components';
import { StyleSheet, css } from 'aphrodite/no-important';
import scrollToElement from 'scroll-to-element';
import OutputTemplate from './OutputTemplate.jsx';
import { breakpoint, breakpointsObj as bp } from '../utils/breakpoints';
import { colors } from '../utils/colors';
import { weight } from '../utils/typography';
import { targetedLoading } from '../utils/variables';
import Table from '../Table.jsx';
import Bar from '../Bar.jsx';
import ErrorMessage from '../ErrorMessage.jsx';
import MoreInput from './MoreInput.jsx';
import { analyze } from '../utils/request';

const styles = StyleSheet.create({
  loading: targetedLoading,
});

const tableTheme = {
  table: {
    marginBottom: '2rem',
    [breakpoint(bp.LARGE)]: {
      flexDirection: 'row',
    },
  },
  row: {
    maxWidth: '260px',
    [breakpoint(bp.LARGE)]: {
      width: '20%',
    },
  },
  cell: {
    ':first-child': {
      color: colors.PRIMARY_LIGHT,
      fontWeight: weight.MEDIUM,
    },
    [breakpoint(bp.X_SMALL)]: {
      width: 'calc(100% - 5rem)',
      ':first-child': {
        width: '5rem',
      },
    },
    [breakpoint(bp.LARGE)]: {
      ':first-child': {
        width: 'auto',
      },
    },
  },
};

function EmotionTable(props) {
  return (
    <Table
      columns={['name', 'score']}
      theme={props.theme}
      data={[{
        name: 'Joy',
        score: <Bar score={props.emotion.joy} />,
      }, {
        name: 'Anger',
        score: <Bar score={props.emotion.anger} />,
      }, {
        name: 'Disgust',
        score: <Bar score={props.emotion.disgust} />,
      }, {
        name: 'Sadness',
        score: <Bar score={props.emotion.sadness} />,
      }, {
        name: 'Fear',
        score: <Bar score={props.emotion.fear} />,
      }]}
      disableHeader
    />
  );
}

EmotionTable.propTypes = {
  theme: PropTypes.object.isRequired,
  emotion: PropTypes.object,
};

EmotionTable.defaultProps = {
  emotion: {},
};

export default React.createClass({
  displayName: 'Emotion',

  propTypes: {
    data: PropTypes.shape({
      document: PropTypes.object,
    }),
    language: PropTypes.string,
    query: PropTypes.object,
  },

  getInitialState() {
    return {
      targets: [],
      targetData: null,
      loading: false,
      error: null,
    };
  },

  onTargetSubmit(e) {
    if (this.state.targets.indexOf(e.target.value) !== -1) {
      return;
    }

    this.setState({ loading: true, error: null });
    this.state.targets.push(e.target.value);

    const query = Object.assign({}, this.props.query, {
      features: {
        emotion: {
          targets: this.state.targets,
        },
      },
    });

    analyze(query)
      .then(json =>
        this.setState({ targetData: json.results.emotion.targets, loading: false, error: null }),
      )
      .catch(error => this.setState({ error, loading: false }))
      .then(() =>
        setTimeout(() => { scrollToElement('#anchor-target-emotion', { duration: 300 }, 100); }, 0),
      );
  },

  toggleJson() {
    this.setState({ showJson: !this.state.showJson });
  },

  render() {
    return (
      <div>
        <OutputTemplate
          description={<p className="base--p_small">Analyze the overall <a href="https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#emotion" target="_blank" rel="noopener noreferrer">emotion</a> and the <a href="https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#emotion" target="_blank" rel="noopener noreferrer">targeted emotion</a> of the content.</p>}
          data={{ emotion: this.props.data }}
          showJson={this.state.showJson}
          onExitJson={this.toggleJson}
          onShowJson={this.toggleJson}
        >
          {this.props.data && this.props.data.document ? (
            <div>
              <h4>Overall Emotion</h4>
              <EmotionTable theme={tableTheme} emotion={this.props.data.document.emotion} />
              <div id="anchor-target-emotion" style={{ marginTop: '0rem' }} />
              <h4>Targeted Emotion</h4>
              <MoreInput onSubmit={this.onTargetSubmit} />
              {(this.state.error && !this.state.loading) ?
                <ErrorMessage error={this.state.error} /> : null}
              {(this.state.loading && !this.state.error) ?
                <div className={css(styles.loading)}><Icon type="loader" size="large" /></div>
                : null}
              {this.state.targetData ? (
                this.state.targetData.reverse().map((target, i) => (
                  <div key={`${target.text}-${i}`}>
                    <h5>{target.text}</h5>
                    <EmotionTable theme={tableTheme} emotion={target.emotion} />
                  </div>
                ))) : null
              }
            </div>
          ) : (
            <p>{`No Emotion results returned for ${this.props.language} input.`}</p>
          )}
        </OutputTemplate>
      </div>
    );
  },
});
