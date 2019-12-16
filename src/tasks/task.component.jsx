import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Draggable } from 'react-beautiful-dnd';

import taskType from 'common/proptypes/task.proptype';

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ isDragDisabled, isDragging }) => {
    if (isDragDisabled) {
      return 'lightgray';
    }
    if (isDragging) {
      return 'lightgreen';
    }
    return 'white';
  }};
`;

function Task({ index, task }) {
  const isDragDisabled = useMemo(() => task.id === 'task-1', [task.id]);

  return (
    <Draggable draggableId={task.id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => {
        const { innerRef, dragHandleProps, draggableProps } = provided;
        const { isDragging } = snapshot;

        return (
          <Container
            ref={innerRef}
            aria-labelledby={dragHandleProps?.['aria-labelledby']}
            data-rbd-drag-handle-context-id={dragHandleProps?.['data-rbd-drag-handle-context-id']}
            data-rbd-drag-handle-draggable-id={
              dragHandleProps?.['data-rbd-drag-handle-draggable-id']
            }
            draggable={dragHandleProps?.draggable}
            onDragStart={dragHandleProps?.onDragStart}
            tabIndex={dragHandleProps?.tabIndex}
            data-rbd-draggable-context-id={draggableProps['data-rbd-draggable-context-id']}
            data-rbd-draggable-id={draggableProps['data-rbd-draggable-id']}
            onTransitionEnd={draggableProps.onTransitionEnd}
            style={draggableProps.style}
            isDragging={isDragging}
            isDragDisabled={isDragDisabled}
            aria-roledescription="Press space bar to lift the task"
          >
            {task.content}
          </Container>
        );
      }}
    </Draggable>
  );
}

Task.propTypes = {
  index: PropTypes.number.isRequired,
  task: taskType.isRequired,
};

export default Task;
