import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import OutputTemplate from './OutputTemplate.jsx';
import { breakpoint, breakpointsObj as bp } from '../utils/breakpoints';
import { colors } from '../utils/colors';
import { weight } from '../utils/typography';
import Table from '../Table.jsx';

const styles = StyleSheet.create({
  sentence: {
    fontWeight: weight.LIGHT,
    color: colors.WARM_GRAY_2,
    fontSize: '1.25rem',
    maxWidth: '530px',
  },
});

const tableTheme = {
  row_two: {
    maxWidth: '300px',
    [breakpoint(bp.SMALL)]: {
      maxWidth: '530px',
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
    ':nth-of-type(3)': {
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
      fontWeight: weight.LIGHT,
      color: colors.DARK_GRAY,
    },
    ':nth-of-type(3)': {
      color: colors.PRIMARY_LIGHT,
      fontWeight: weight.MEDIUM,
    },
    ':before': {
      width: '8rem',
      fontWeight: weight.NORMAL,
      color: colors.COOL_GRAY,
    },
  },
  inner_two: {
    width: 'calc(100% - 8rem)',
  },
};

function RelationSentence(props) {
  const reorderArgs = props.arguments.map(arg =>
    arg.entities.map(ent =>
      ({
        'Relation 1': arg.text,
        Type: ent.type,
        'Relation 2': ent.text,
      }),
    ));

  const result = [].concat.spread([], reorderArgs);
  return (
    <div>
      <p className={css(styles.sentence)}>{props.sentence}</p>
      <Table
        columns={['Relation 1', 'Type', 'Relation 2']}
        theme={tableTheme}
        data={result}
      />
    </div>
  );
}

RelationSentence.propTypes = {
  sentence: PropTypes.string,
  arguments: PropTypes.arrayOf,
};

RelationSentence.defaultProps = {
  sentence: null,
  arguments: [],
};

const Relations = props => (
  <div>
    <OutputTemplate
      description={<p className="base--p_small">View <a href="https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#relations" target="_blank" rel="noopener noreferrer">relations</a> between different entities.</p>}
      data={props.data}
      showJson={props.showJson}
      onExitJson={props.onExitJson}
      onShowJson={props.onShowJson}
    >
      {props.data && props.data.length > 0 ? (
        <div>
          {props.data.map(relation => (<RelationSentence
            sentence={relation.sentence}
            arguments={relation.arguments}
          />))}
        </div>
      ) : (
        <p>{`No Relations results returned for ${props.language} input.`}</p>
      )}
    </OutputTemplate>
  </div>
);

Relations.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  language: PropTypes.string,
  showJson: PropTypes.bool,
  onExitJson: PropTypes.func,
  onShowJson: PropTypes.func,
};

Relations.defaultProps = {
  data: null,
  language: 'en',
  showJson: false,
  onExitJson: () => {},
  onShowJson: () => {},
};

export default Relations;
