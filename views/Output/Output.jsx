import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Tabs, Pane, Icon } from 'watson-react-components';
import lang from 'language-list';
import Sentiment from './Sentiment.jsx';
import Emotion from './Emotion.jsx';
import Keywords from './Keywords.jsx';
import Entities from './Entities.jsx';
import Categories from './Categories.jsx';
import Concept from './Concept.jsx';
import Syntax from './Syntax.jsx';
import SemanticRoles from './SemanticRoles.jsx';
import { MAX_CONTENT_WIDTH } from '../utils/variables';

const languages = lang();

const styles = StyleSheet.create({
  outputSection: {
    marginTop: '6rem',
    maxWidth: MAX_CONTENT_WIDTH,
    paddingBottom: '3rem',
  },
  loader: {
    textAlign: 'center',
    padding: '0rem 0rem 5rem',
    marginTop: '0rem',
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
  },
});

function Output(props) {
  const { loading, data, language, query } = props;
  return (
    <div>
      {loading ? (
        <div className={css(styles.loader)}>
          <Icon type="loader" size="large" />
        </div>
      ) : null}
      {data !== null && !loading ? (
        <div className={`output-section ${css(styles.outputSection)}`}>
          <Tabs selected={0}>
            <Pane label="Sentiment">
              <Sentiment
                data={data.results.sentiment}
                language={languages.getLanguageName(language)}
                query={query}
              />
            </Pane>
            <Pane label="Emotion">
              <Emotion
                data={data.results.emotion}
                language={languages.getLanguageName(language)}
                query={query}
              />
            </Pane>
            <Pane label="Keywords">
              <Keywords
                data={data.results.keywords}
                language={languages.getLanguageName(language)}
              />
            </Pane>
            <Pane label="Entities">
              <Entities
                data={data.results.entities}
                language={languages.getLanguageName(language)}
              />
            </Pane>
            <Pane label="Categories">
              <Categories
                data={data.results.categories}
                language={languages.getLanguageName(language)}
              />
            </Pane>
            <Pane label="Concept">
              <Concept
                data={data.results.concepts}
                language={languages.getLanguageName(language)}
              />
            </Pane>
            <Pane label="Syntax">
              <Syntax data={data.results.syntax} language={languages.getLanguageName(language)} />
            </Pane>
            <Pane label="Semantic Roles">
              <SemanticRoles
                data={data.results.semantic_roles}
                language={languages.getLanguageName(language)}
              />
            </Pane>
          </Tabs>
        </div>
      ) : null}
    </div>
  );
}

Output.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  query: PropTypes.object,
  language: PropTypes.string,
};

Output.defaultProps = {
  data: {},
  loading: false,
  query: {},
  language: 'en',
};

export default Output;
