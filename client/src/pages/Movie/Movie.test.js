import React from 'react';
import ReactDOM from 'react-dom';
import MovieResult from './MovieResult';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieResult />, div);
  ReactDOM.unmountComponentAtNode(div);
});
