import PropTypes from 'prop-types';

const taskType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
});

export default taskType;
