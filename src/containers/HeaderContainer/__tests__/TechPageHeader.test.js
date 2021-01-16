import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import TechPageHeader from '../components/TechPageHeader';
const props = {
  name: 'testName',
  match: { params: { studioId: '26' } },
  token: 'testToken',
  email: 'testEmail',
};

describe('tests with static URL', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <TechPageHeader {...props} />
      </Router>
    );
  });

  it('has a logo, the techs name, a get in touch button, and a link', () => {
    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(screen.getByText('testName')).toBeTruthy();
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
        <TechPageHeader {...props} name={'email'} />
      </Router>
    );

    fireEvent.click(screen.getByRole('link', { name: 'email' }));

    expect(history.push).toHaveBeenCalledWith('/26/technicians/testEmail');
  });
});

describe('test changes if route it workorder or dashboar', () => {
  const routerProps = {
    initialEntries: [
      '/studio/technicians/techEmail',
      '/studio/technicians/workorder/number/techEmail',
    ],
    initialIndex: 0,
  };
  const setUpApp = (routerProps) => {
    render(
      <MemoryRouter {...routerProps}>
        <TechPageHeader {...props} />
      </MemoryRouter>
    );
  };

  it('should not display menu button if route is for dashboard', () => {
    setUpApp({ ...routerProps, initialIndex: 0 });
    expect(screen.queryByTestId('menu-button')).toBeNull();
  });
  it('should display menu button if route is for workorder', () => {
    setUpApp({ ...routerProps, initialIndex: 1 });
    expect(screen.getByTestId('menu-button')).toBeTruthy();
  });
});
