import React from "react";
import Button from "./Button";
import {content, useDispatch, useSelector} from 'react-redux';
import { makeActive, deleteTodo } from '../actions';

const InProgressItems = ({ name, isActive, isNext}) => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos)
  
  const deleteItem = (e) => {
    dispatch(deleteTodo(e.target.parentElement.id));
  }

  const startTask = (e) => {
    dispatch(makeActive(e.target.parentElement.id))
  }
  return (
    <>
      {name}
      {!isActive ? <Button classes="btn btn-danger" text="Del" onClickAction={deleteItem}/> : null}
      {isNext ? <Button classes="btn btn-primary" text="Start" onClickAction={startTask}/> : null}
    </>
  )
}

export default InProgressItems;
