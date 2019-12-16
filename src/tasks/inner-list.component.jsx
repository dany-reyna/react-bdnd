import React, { memo } from 'react';
import PropTypes from 'prop-types';

import taskType from 'common/proptypes/task.proptype';

import Task from 'tasks/task.component';

function InnerList({ tasks }) {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={task.id} index={index} task={task} />
      ))}
    </>
  );
}

InnerList.propTypes = {
  tasks: PropTypes.arrayOf(taskType).isRequired,
};

export default memo(InnerList);
