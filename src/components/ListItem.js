import React from 'react';

export default function ListItem({ item, render }) {
  const content = render(item);
  const {isActive, id} = item;
  const classes = isActive ? 'list-group-item text-primary' : 'list-group-item';

  return <li className={classes} id={id}>{content}</li>;
}
