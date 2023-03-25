import React from 'react';
import PropTypes from 'prop-types';

function ErrorModal({title, subTitle, actionButtons}) {
  return (
    <div>ErrorModal</div>
  )
}

ErrorModal.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  actionButtons: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    classNames: PropTypes.array,
    clickHandler: PropTypes.func
  })).isRequired
};

export default ErrorModal;
