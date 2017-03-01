import React from 'react';
import { Alert } from 'watson-react-components';

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default React.createClass({
  displayName: 'ErrorMessage',
  propTypes: {
    error: React.PropTypes.shape({
      error: React.PropTypes.string,
      code: React.PropTypes.number,
    }),
  },
  render() {
    return (<div className="error">
      <Alert type="error" color="red">
        <p>{capitalize(this.props.error.error || 'There was a problem processing the request, please try again later.')}</p>
      </Alert>
    </div>);
  }
});
