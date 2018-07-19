import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'watson-react-components';

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export default React.createClass({
  displayName: 'ErrorMessage',
  propTypes: {
    error: PropTypes.shape({
      error: PropTypes.string,
      code: PropTypes.number,
    }),
  },
  render() {
    const { error } = this.props;
    return (
      <div className="error">
        <Alert type="error" color="red">
          <p>
            {capitalize(error.error || 'There was a problem processing the request, please try again later.')}
          </p>
        </Alert>
      </div>
    );
  },
});
