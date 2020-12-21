import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import TechPageHeader from '../components/TechPageHeader';

beforeEach(() => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <TechPageHeader name={'test'} />
    </Router>
  );
});

it('has a logo, the techs name, a get in touch button, and a link', () => {
  expect(screen.getAllByRole('img')).toHaveLength(1);
  expect(screen.getByText('test')).toBeTruthy();
  expect(screen.getAllByRole('link')).toHaveLength(1);
  expect(screen.getByText('Get In Touch')).toBeTruthy();
});

it('opens popup with help window when get in touch button is clicked', () => {
  window.open = jest.fn();
  fireEvent.click(screen.getByText('Get In Touch'));
  expect(window.open).toBeCalled();
});

it('redirects to tech dashboard on Link click', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();
  render(
    <Router history={history}>
      <TechPageHeader name='techname' />
    </Router>
  );
  fireEvent.click(screen.getByRole('link', { name: 'techname' }));

  expect(history.push).toHaveBeenCalledWith('/26/technicians/lm@onuma.com');
});
