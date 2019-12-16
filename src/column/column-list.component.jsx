import React, { memo } from 'react';
import PropTypes from 'prop-types';

import columnType from 'common/proptypes/column.proptype';
import taskType from 'common/proptypes/task.proptype';
import Column from 'column/column.component';

function ColumnList({ column, taskMap, isDropDisabled, index }) {
  const tasks = column.taskIds.map(taskId => taskMap[taskId]);

  return <Column column={column} tasks={tasks} isDropDisabled={isDropDisabled} index={index} />;
}

ColumnList.propTypes = {
  column: columnType.isRequired,
  taskMap: PropTypes.objectOf(taskType).isRequired,
  isDropDisabled: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default memo(ColumnList);
