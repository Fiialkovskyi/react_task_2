const initialState = {
  fetching: true,
  todos: null,
  serchText: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_START':
      return { ...state, fetching: true };
    case 'FETCH_TODOS_END':
      return { ...state, fetching: false };
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'MAKE_ACTIVE': {
      const { todos } = state;
      const id = +action.payload;
      const newTodos = {...todos};
      const newInProgress = [...newTodos.in_progress];
      const newDone = [...newTodos.done];
      const currentActive = todos.in_progress.findIndex(item => item.isActive);
      const itemIdx = todos.in_progress.findIndex(item => item.id === id);

      if (itemIdx === -1) return state;
      
      newInProgress[itemIdx].isActive = true;
      newInProgress[itemIdx].isNext = false;
      newInProgress[itemIdx].startime = new Date().toISOString();
      const itemForDone = newInProgress.splice(currentActive, 1)[0];
      itemForDone.isActive = false;
      itemForDone.finishedTime = new Date().toISOString();
      delete itemForDone.isNext;
      newDone.push(itemForDone);

      newTodos.in_progress = [...newInProgress];
      newTodos.done = [...newDone];
      return { ...state, todos: newTodos };
    }
    
      case 'DELETE_TODO_ITEM': {
        const { todos } = state;
        const id = +action.payload;
        const itemIdx = todos.in_progress.findIndex(item => item.id === id);

        if (itemIdx === -1) return state;

        const newInProgress = todos.in_progress.filter(item => item.id !== id);
        const newTodos = {...todos};
        newTodos.in_progress = [...newInProgress];
        return { ...state, todos: newTodos};
      }

      case 'SET_SEARCH_TEXT':
        return { ...state, serchText: action.payload };
    default:
      return state;
  }
};

export default reducer;
