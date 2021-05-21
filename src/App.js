import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import List from './components/List';
import ListItem from './components/ListItem';
import Form from './components/Form';
import SearchBar from './components/SearchBar';
import Counter from './components/Counter';
import DoneItems from './components/DoneItems';
import InProgressItems from './components/InProgressItems';
import Button from "./components/Button";
import { bindActionCreators } from 'redux';
import * as actions from './actions';

const App = props => {
  const [todoList, setTodoList] = useState({
    inProgress: [],
    done: [],
  });

  const { setTodos, todos, startLoad, fetching, endLoad, serchText, finishTodos } = props;

  useEffect(() => {
    (async () => {
      startLoad();
      const { in_progress, done } = await fetch('/todos.json').then(res =>
        res.json()
      );
      setTodos({
        in_progress,
        done,
      });
      endLoad();
    })();

    return () => {};
  }, []);

  const loading = <p>Loading...</p>;

  return (
    <div className='container'>
      <h1>Todo React APP</h1>
      <div className='row'>
        <div className='col-xs-12'>
          <SearchBar />
          <Form />
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='col-xs-12 col-sm-6'>
          <h3>Todos in progress</h3>
          {fetching ? (
            loading
          ) : (
            <List>
              {todos.in_progress && todos.in_progress.filter(item => item.name.toLowerCase().includes(serchText)).map((item, index) => {
                const { id, isActive } = item;
                if (index === 0) {
                  item.isActive = true;
                }
                item.isNext = index === +1 ? true : false;
                return (
                  <ListItem
                    key={id}
                    item={item}
                    isActive={isActive}
                    render={InProgressItems}
                  />
                );
              })}
            </List>
          )}
          {(!fetching && todos.in_progress) && <Counter text='Things to do:' count={todos.in_progress.filter(item => item.name.toLowerCase().includes(serchText)).length} />}
          {(!fetching && todos.in_progress?.length === 1) && <Button classes="btn btn-success pull-right" text="Complete" onClickAction={finishTodos}/>}
        </div>
        <div className='col-xs-12 col-sm-6'>
          <h3>Done</h3>

          {fetching ? (
            loading
          ) : (
            <List>
              {todos.done && todos.done.filter(item => item.name.toLowerCase().includes(serchText)).map(({ id, ...item }) => (
                <ListItem key={id} item={item} render={DoneItems} />
              ))}
            </List>
          )}

          {(!fetching && todos.done) && <Counter text='Done:' count={todos.done.filter(item => item.name.toLowerCase().includes(serchText)).length}/>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  fetching: state.fetching,
  todos: state.todos,
  serchText: state.serchText,
});

const mapDispatchToProps = dispatch => {
  const { startLoad, setTodos, endLoad, finishTodos } = bindActionCreators(
    actions,
    dispatch
  );

  return {
    startLoad,
    endLoad,
    setTodos: list => setTodos(list),
    finishTodos,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
