export function init(initialList) {
  return initialList;
}

function listReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'changeTaskColumnIndex': {
      const taskColumnIndex = state.columnOrder.indexOf(payload.droppableId);

      return {
        ...state,
        taskColumnIndex,
      };
    }
    case 'resetTaskColumnIndex': {
      return {
        ...state,
        taskColumnIndex: null,
      };
    }
    case 'dragColumn': {
      const { destination, draggableId, source } = payload;

      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      return {
        ...state,
        columnOrder: newColumnOrder,
      };
    }
    case 'dragTask': {
      const { destination, draggableId, source } = payload;

      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        return {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        };
      }

      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      return {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
    }
    case 'reset': {
      return init(payload);
    }
    default: {
      throw new Error();
    }
  }
}

export default listReducer;
