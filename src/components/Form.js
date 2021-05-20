import React, {useRef, useEffect} from "react";
import { connect } from 'react-redux';
import Button from "./Button";
import * as actions from '../actions';
import { bindActionCreators } from 'redux';

const Form = (props) => {
  const { setTodos } = props;
  const addInputRef = useRef();
  const addNewItem = () => {
    if (!props.fetching && addInputRef.current.value.length > 0) {
      const newTodos = {...props.todos}
      const inProgress = [...newTodos.in_progress];
      const newInProgress = {id: inProgress[inProgress.length - 1].id + 1, name: addInputRef.current.value};
      newTodos.in_progress = [...inProgress, newInProgress];

      setTodos(newTodos)
    }
  }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="addInput">New Todo Item: </label>
        <input
          ref={addInputRef}
          id="addInput"
          type="text"
          className="form-control"
          placeholder="New todo name"
        />
      </div>
      <Button classes="btn btn-success pull-right" text="Add New Item" onClickAction={addNewItem}/>
    </form>
  );
};

const mapStateToProps = state => ({
  fetching: state.fetching,
  todos: state.todos,
});

const mapDispatchToProps = dispatch => {
  const { setTodos } = bindActionCreators(
    actions,
    dispatch
  );

  return {
    setTodos: list => setTodos(list),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);