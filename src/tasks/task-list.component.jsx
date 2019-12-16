import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Droppable } from 'react-beautiful-dnd';

import taskType from 'common/proptypes/task.proptype';
import InnerList from 'tasks/inner-list.component';

const Container = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
`;

function TaskList({ columnId, isDropDisabled, tasks }) {
  return (
    <Droppable droppableId={columnId} isDropDisabled={isDropDisabled} type="task">
      {(provided, snapshot) => {
        const { innerRef, droppableProps, placeholder } = provided;
        const { isDraggingOver } = snapshot;

        return (
          <Container
            ref={innerRef}
            data-rbd-droppable-context-id={droppableProps['data-rbd-droppable-context-id']}
            data-rbd-droppable-id={droppableProps['data-rbd-droppable-id']}
            isDraggingOver={isDraggingOver}
          >
            <InnerList tasks={tasks} />
            {placeholder}
          </Container>
        );
      }}
    </Droppable>
  );
}

TaskList.propTypes = {
  columnId: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(taskType).isRequired,
  isDropDisabled: PropTypes.bool.isRequired,
};

export default TaskList;
