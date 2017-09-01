import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import OutputTemplate from './OutputTemplate.jsx';
import { colors } from '../utils/colors';
import { weight } from '../utils/typography';

const styles = StyleSheet.create({
  sentence: {
    width: '100%',
    fontSize: '1.5rem',
    fontWeight: weight.LIGHT,
    marginBottom: '3rem',
    paddingBottom: '3rem',
    borderBottom: `1px solid ${colors.DARK_GRAY}`,
    ':last-child': {
      borderBottom: 'none',
    },
  },
  token: {
    display: 'inline-block',
    position: 'relative',
    marginTop: '0rem',
    marginBottom: '1.5rem',
    marginRight: '0.5rem',
  },
  innerToken: {
    display: 'inline',
    borderBottom: `1px solid ${colors.PRIMARY_LIGHT}`,
  },
  label: {
    position: 'absolute',
    top: '100%',
    left: '0rem',
    width: '100%',
    textAlign: 'center',
    color: colors.PRIMARY_LIGHT,
    fontSize: '1rem',
    fontStyle: 'italic',
    fontWeight: weight.MEDIUM,
    textTransform: 'capitalize',
    marginTop: '0rem',
  },
});

const escapeRegExp = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

const replacements = (props) => {
  const res = ['action', 'object', 'subject'].reduce((acc, item) => {
    if (props.data[item]) {
      const replaceText = props.data[item].text;
      const withText = `<span class=${css(styles.token)}><span class=${css(styles.innerToken)}> ${props.data[item].text}&nbsp;</span><span class='${css(styles.label)}'>${item}</span></span>`;
      const regex = new RegExp(`\\b${escapeRegExp(replaceText)}\\b`);
      return acc.replace(regex, withText);
    }
    return acc;
  }, props.data.sentence);
  return { __html: res };
};

replacements.propTypes = {
  data: PropTypes.arrayof,
};

replacements.defaultProps = {
  data: [],
};

const SemSent = props => (
  <div className={css(styles.sentence)} >
    <div dangerouslySetInnerHTML={replacements(props)} />
  </div>
);


const SemSentences = props =>
  <div className="sentences">{props.data.map(item => <SemSent key={`sem-sent-${item}`} data={item} />)}</div>;

SemSentences.propTypes = {
  data: PropTypes.arrayof,
};

SemSentences.defaultProps = {
  data: [],
};

export default React.createClass({
  displayName: 'SemanticRoles',

  propTypes: {
    data: PropTypes.arrayOf,
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
          description={<p className="base--p_small">Parse sentences into subject, action, and object form and view additional <a href="https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#semantic-roles" target="_blank" rel="noopener noreferrer">semantic information</a> such as keywords, entities, sentiment, and verb normalization.</p>}
          data={{ semantic_roles: this.props.data }}
          showJson={this.state.showJson}
          onExitJson={this.toggleJson}
          onShowJson={this.toggleJson}
        >
          {this.props.data && this.props.data.length > 0 ? (
            <SemSentences data={this.props.data} />
          ) : (
            <p>{`No Semantic Roles results returned for ${this.props.language} input.`}</p>
          )}
        </OutputTemplate>
      </div>
    );
  },
});
