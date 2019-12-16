import PropTypes from 'prop-types';

const columnType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  taskIds: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export default columnType;
