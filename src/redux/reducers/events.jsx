import React, { useState } from 'react';

const initialState = [];
const [rowCount, setRowCount] = useState(0);
const [isLeft, setIsLeft] = useState(false);

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_EVENTS':
      const events = [];
      let position;

      action.payload.forEach(event => {
        const setPosition = () => {
          setIsLeft(!isLeft);
          if (isLeft) position = 'left';
          if (!isLeft) position = 'right';
        };

        // const setRowCount = () => {

        // }

        events.push({
          id: event.id,
          name: event.name,
          // row: ,
          position: position
        });
      });
      console.log(events);
      return [...state, ...events];
    default:
      return state;
  }
};

export default events;
