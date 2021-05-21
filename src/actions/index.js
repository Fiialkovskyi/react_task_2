export const setTodos = todoItems => {
  return {
    type: 'SET_TODOS',
    payload: todoItems,
  };
};

export const makeActive = id => ({
  type: 'MAKE_ACTIVE',
  payload: id,
});

export const startLoad = () => ({
  type: 'FETCH_TODOS_START',
});

export const endLoad = () => ({
  type: 'FETCH_TODOS_END',
});

export const setSerchText = searchText => {
  return {
    type: 'SET_SEARCH_TEXT',
    payload: searchText,
  };
};

export const deleteTodo = id => ({
  type: 'DELETE_TODO_ITEM',
  payload: id,
});

export const finishTodos = () => ({
  type: 'FINISH_TODOS',
});