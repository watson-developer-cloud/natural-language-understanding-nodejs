import React from 'react';
import PropTypes from 'prop-types';
import lang from 'language-list';
import { parser } from 'css-math';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Tabs, Pane } from 'watson-react-components';
import ErrorMessage from './ErrorMessage.jsx';
import { colors } from './utils/colors';
import { weight, size } from './utils/typography';
import { breakpoint } from './utils/breakpoints';
import { MAX_CONTENT_WIDTH } from './utils/variables';

const languages = lang();
let index = 0;
let currentInput;
const buttonBreakpoint = '400px';

const TERMS_OF_USE_URL = 'https://watson-developer-cloud.github.io/terms?name=Natural%20Language%20Understanding%20Demo';

const styles = StyleSheet.create({
  container: {
    maxWidth: parser(`${MAX_CONTENT_WIDTH} - 1rem`),
  },
  header: {
    marginTop: '3rem',
    marginBottom: '2rem',
    color: colors.PRIMARY,
    fontWeight: weight.NORMAL,
  },
  textarea: {
    border: 'none',
    borderWidth: '1px',
    padding: '0rem',
    resize: 'none',
    height: '6rem',
    ':focus': {
      border: 'none',
      outline: 'none',
    },
  },
  buttonContainer: {
    display: 'block',
    marginTop: '2rem',
    marginBottom: '3rem',
    [breakpoint(buttonBreakpoint)]: {
      display: 'flex',
      alignItems: 'center',
      alignContent: 'flex-start',
    },
  },
  button: {
    padding: '0.2em 3em',
    fontWeight: weight.NORMAL,
    width: '100%',
    marginBottom: '2rem',
    [breakpoint(buttonBreakpoint)]: {
      width: 'auto',
      margin: '0rem 1rem 0rem 0rem',
    },
    ':disabled': {
      backgroundColor: colors.LIGHT_GRAY,
      borderColor: colors.LIGHT_GRAY,
    },
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 10rem)',
    marginTop: '0rem',
  },
  footnote: {
    fontSize: size.SMALL,
  },
  language: {
    fontSize: size.SMALL,
    float: 'right',
    marginLeft: '3rem',
    fontStyle: 'italic',
  },
});

const Input = React.createClass({
  displayName: 'Input',

  propTypes: {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    language: PropTypes.string,
    changeRequestType: PropTypes.func,
    disableButton: PropTypes.bool,
    onSubmit: PropTypes.func,
    onTabChange: PropTypes.func,
    onInputChange: PropTypes.func,
    error: PropTypes.shape({
      error: PropTypes.string,
      code: PropTypes.number,
    }),
  },

  getDefaultProps() {
    return {
      onSubmit() {},
      onTabChange() {},
      onInputChange() {},
      disableButton: false,
    };
  },

  getInitialState() {
    return {
      text: this.props.text,
      url: this.props.url,
    };
  },

  onAnalyzeClick() {
    currentInput = index === 0 ? this.state.text : this.state.url;
    this.props.onSubmit(currentInput);
  },

  render() {
    const { onTabChange, onInputChange, changeRequestType } = this.props;
    const { text } = this.state;
    return (
      <div className={css(styles.container)}>
        <h3 className={css(styles.header)}>
          Examine a news article or other content
        </h3>
        <Tabs
          selected={index}
          onChange={(i) => {
            index = i;
            onTabChange.call(this);
            changeRequestType(index);
          }}
        >
          <Pane label="Text">
            {/* hack to render textarea properly */}
            <div style={{ visibility: 'hidden', margin: '0rem 0rem -1rem', height: '0rem', overflow: 'hidden' }} />
            <textarea
              className={css(styles.textarea)}
              defaultValue={text}
              rows="7"
              onChange={(e) => {
                this.setState({ text: e.target.value });
                onInputChange.call(this, e);
              }}
            />
          </Pane>
          <Pane label="URL">
            <textarea
              className={css(styles.textarea)}
              defaultValue={this.state.url}
              onChange={(e) => {
                this.setState({ url: e.target.value });
                this.props.onInputChange.call(this, e);
              }}
            />
          </Pane>
        </Tabs>
        <p
          style={{ visibility: this.props.language ? 'visible' : 'hidden' }}
          className={css(styles.language)}
        >{this.props.language ? languages.getLanguageName(this.props.language) : null}</p>
        <p className={css(styles.footnote)}>For results unique to your business needs consider building a <a href="https://www.ibm.com/watson/services/knowledge-studio/" target="_blank" rel="noopener noreferrer" >custom model</a>.</p>
        <p className={css(styles.footnote)}>
          * This system is for demonstration purposes only and is not intended to
          process Personal Data. No Personal Data is to be entered into this system as it may not have the
          necessary controls in place to meet the requirements of the General Data Protection Regulation (EU)
          2016/679.
        </p>
        <div className={css(styles.footnote)}>
          By using this application, you agree to the&nbsp;
          <a target="_blank" rel="noreferrer noopener" href={TERMS_OF_USE_URL}>
            Terms of Use
          </a>
        </div>
        <div className={css(styles.buttonContainer)}>
          <button
            disabled={this.props.disableButton}
            className={`base--button_fill ${css(styles.button)}`}
            onClick={this.onAnalyzeClick}
          >
              Analyze
          </button>
          {this.props.error ? <ErrorMessage error={this.props.error} /> : null}
        </div>
      </div>
    );
  },
});

export default Input;
