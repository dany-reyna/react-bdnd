import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Draggable } from 'react-beautiful-dnd';

import columnType from 'common/proptypes/column.proptype';
import taskType from 'common/proptypes/task.proptype';
import TaskList from 'tasks/task-list.component';

const Container = styled.div`
  margin: 8px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;

function Column({ column, tasks, isDropDisabled, index }) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => {
        const { innerRef, dragHandleProps, draggableProps } = provided;

        return (
          <Container
            ref={innerRef}
            data-rbd-draggable-context-id={draggableProps['data-rbd-draggable-context-id']}
            data-rbd-draggable-id={draggableProps['data-rbd-draggable-id']}
            onTransitionEnd={draggableProps.onTransitionEnd}
            style={draggableProps.style}
          >
            <Title
              aria-labelledby={dragHandleProps?.['aria-labelledby']}
              data-rbd-drag-handle-context-id={dragHandleProps?.['data-rbd-drag-handle-context-id']}
              data-rbd-drag-handle-draggable-id={
                dragHandleProps?.['data-rbd-drag-handle-draggable-id']
              }
              draggable={dragHandleProps?.draggable}
              onDragStart={dragHandleProps?.onDragStart}
              tabIndex={dragHandleProps?.tabIndex}
            >
              {column.title}
            </Title>
            <TaskList columnId={column.id} isDropDisabled={isDropDisabled} tasks={tasks} />
          </Container>
        );
      }}
    </Draggable>
  );
}

Column.propTypes = {
  column: columnType.isRequired,
  tasks: PropTypes.arrayOf(taskType).isRequired,
  isDropDisabled: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default Column;
