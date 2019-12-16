import React, { useCallback, useReducer } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import listReducer, { init } from 'app/state/list.reducer';
import initialState from 'app/state/list.data';

import ColumnList from 'column/column-list.component';

const Container = styled.div`
  display: flex;
`;

function App() {
  const [state, dispatch] = useReducer(listReducer, initialState, init);

  const handleDragStart = useCallback((start, provided) => {
    const { source } = start;
    const { droppableId, index } = source;

    const { announce } = provided;
    announce(`You have lifted the task in position ${index + 1}`);

    dispatch({ type: 'changeTaskColumnIndex', payload: { droppableId } });
  }, []);

  const handleDragUpdate = useCallback((update, provided) => {
    const { destination } = update;
    const { announce } = provided;

    const position = destination?.index + 1;
    const message = position
      ? `You have moved the task to position ${position}`
      : 'You are currently not over a droppable area';
    announce(message);
  }, []);

  const handleDragEnd = useCallback((result, provided) => {
    dispatch({ type: 'resetTaskColumnIndex' });

    const { destination, source, draggableId, type } = result;
    const { announce } = provided;
    const origin = source.index + 1;

    if (
      destination === null ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      announce(`The task has been returned to its starting position of ${origin}`);
      return;
    }

    const newPosition = destination.index + 1;
    announce(`You have moved the task from position ${origin} to ${newPosition}`);

    if (type === 'column') {
      dispatch({ type: 'dragColumn', payload: { destination, draggableId, source } });
    } else if (type === 'task') {
      dispatch({ type: 'dragTask', payload: { destination, draggableId, source } });
    }
  }, []);

  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
      onDragEnd={handleDragEnd}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {provided => {
          const { innerRef, droppableProps, placeholder } = provided;

          return (
            <Container
              ref={innerRef}
              data-rbd-droppable-context-id={droppableProps['data-rbd-droppable-context-id']}
              data-rbd-droppable-id={droppableProps['data-rbd-droppable-id']}
            >
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];

                const isDropDisabled = index < state.taskColumnIndex;

                return (
                  <ColumnList
                    key={column.id}
                    column={column}
                    taskMap={state.tasks}
                    isDropDisabled={isDropDisabled}
                    index={index}
                  />
                );
              })}
              {placeholder}
            </Container>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
