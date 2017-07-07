import React from 'react';
import PropTypes from 'prop-types';
import OutputTemplate from './OutputTemplate.jsx';
import { StyleSheet, css } from 'aphrodite/no-important';
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

const escapeRegExp = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

class SemSent extends React.Component {
  replacements() {
    let res = ['action','object','subject'].reduce((acc, item) => {
      if (this.props.data[item]) {
        let replaceText = this.props.data[item].text;
        let withText = `<span class=${css(styles.token)}><span class=${css(styles.innerToken)}> ${this.props.data[item].text}&nbsp;</span><span class='${css(styles.label)}'>${item}</span></span>`;
        let regex = new RegExp(`\\b${escapeRegExp(replaceText)}\\b`);
        return acc.replace(regex, withText);
      } else {
        return acc;
      }
    }, this.props.data.sentence);
    return { __html: res};
  }
  render() {
    return (<div className={css(styles.sentence)} ><div dangerouslySetInnerHTML={this.replacements()} /></div>);
  }
}
SemSent.propTypes = {
  data: PropTypes.object,
};

class SemSentences extends React.Component {
  render() {
    return <div className='sentences'>{this.props.data.map((item, i) => <SemSent key={`sem-sent-${i}`} data={item}/>)}</div>;
  }
}

SemSentences.propTypes = {
  data: PropTypes.array,
};

export default React.createClass({
  displayName: 'SemanticRoles',

  propTypes: {
    data: PropTypes.array,
    language: PropTypes.string,
  },

  getInitialState() {
    return {
      showJson: false,
    };
  },

  toggleJson() {
    this.setState({'showJson' :!this.state.showJson});
  },

  render() {
    return (
      <div>
        <OutputTemplate
          description={<p className='base--p_small'>Parse sentences into subject, action, and object form and view additional <a href="https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#semantic-roles" target="_blank">semantic information</a> such as keywords, entities, sentiment, and verb normalization.</p>}
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
  }
});
