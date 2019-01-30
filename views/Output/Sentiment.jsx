import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'watson-react-components';
import { StyleSheet, css } from 'aphrodite/no-important';
import scrollToElement from 'scroll-to-element';
import { colors } from '../utils/colors';
import { weight } from '../utils/typography';
import Table from '../Table.jsx';
import Bar from '../Bar.jsx';
import MoreInput from './MoreInput.jsx';
import OutputTemplate from './OutputTemplate.jsx';
import ErrorMessage from '../ErrorMessage.jsx';
import { targetedLoading } from '../utils/variables';
import { analyze } from '../utils/request';

const styles = StyleSheet.create({
  loading: targetedLoading,
});

const tableTheme = {
  row: {
    maxWidth: '240px',
  },
  cell: {
    ':first-child': {
      color: colors.PRIMARY_LIGHT,
      fontWeight: weight.MEDIUM,
    },
  },
  cell_two: {
    ':first-child': {
      ':before': {
        color: colors.PRIMARY_LIGHT,
        fontWeight: weight.MEDIUM,
      },
    },
  },
};

function getDataScore(props) {
  try {
    return props.data.document.score;
  } catch (exception) {
    return 0;
  }
}

function getSentimentString(score) {
  if (score === 0) {
    return 'Neutral';
  } else if (score > 0) {
    return 'Positive';
  } else {
    return 'Negative';
  }
}

export default React.createClass({
  displayName: 'Sentiment',

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
        sentiment: {
          targets: this.state.targets,
        },
      },
    });

    analyze(query)
      .then(json => this.setState({ targetData: json.results.sentiment.targets, loading: false, error: null }))
      .catch(error => this.setState({ error, loading: false }))
      .then(() => setTimeout(() => { scrollToElement('#anchor-target-sentiment', { duration: 300 }, 100); }, 0));
  },

  toggleJson() {
    this.setState({ showJson: !this.state.showJson });
  },

  render() {
    return (
      <div>
        <OutputTemplate
          description={<p className="base--p_small">Review the overall <a href="https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#sentiment" target="_blank" rel="noopener noreferrer">sentiment</a> and targeted sentiment of the content.</p>}
          data={{ sentiment: this.props.data }}
          showJson={this.state.showJson}
          onExitJson={this.toggleJson}
          onShowJson={this.toggleJson}
        >
          {this.props.data && this.props.data.document ? (
            <div>
              <h4>Overall Sentiment</h4>
              <Table
                columns={['name', 'score']}
                theme={tableTheme}
                data={[{
                  name: getSentimentString(getDataScore(this.props)),
                  score: <Bar score={getDataScore(this.props)} rangeStart={-1} rangeEnd={1} />,
                }]}
                disableHeader
              />
              <div id="anchor-target-sentiment" style={{ marginTop: '0rem' }} />
              <h4>Targeted Sentiment</h4>
              <MoreInput onSubmit={this.onTargetSubmit} />
              {(this.state.error && !this.state.loading) ?
                <ErrorMessage error={this.state.error} /> : null}
              {(this.state.loading && !this.state.error) ?
                <div className={css(styles.loading)}><Icon type="loader" size="large" /></div> :
                null}
              {this.state.targetData ? (
                this.state.targetData.reverse().map((target, i) => (
                  <div key={`${target.text}-${i}`}>
                    <h5>{target.text}</h5>
                    <Table
                      columns={['name', 'score']}
                      theme={tableTheme}
                      data={[{
                        name: getSentimentString(target.score),
                        score: <Bar score={target.score} rangeStart={-1} rangeEnd={1} />,
                      }]}
                      disableHeader
                    />
                  </div>),
                )) : null
              }
            </div>
          ) : (
            <p>{`No Sentiment results returned for ${this.props.language} input.`}</p>
          )}
        </OutputTemplate>
      </div>
    );
  },
});
