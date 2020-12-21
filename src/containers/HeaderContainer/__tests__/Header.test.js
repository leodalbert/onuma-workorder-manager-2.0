import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Header from '../components/Header';

describe('Header routing', () => {
  const routerProps = {
    initialEntries: [
      '/studio/technicians/techEmail',
      '/studio/requester/requesterEmail',
    ],
    initialIndex: 0,
  };
  const setUpApp = (routerProps) => {
    render(
      <MemoryRouter {...routerProps}>
        <Header />
      </MemoryRouter>
    );
  };
  it('should render TechPageHeader with route /:studio/technicians/:techEmail', () => {
    setUpApp({ ...routerProps, initialIndex: 0 });
    expect(screen.getAllByTestId('tech-header')).toBeTruthy();
  });
  it('should render StatusPageHeader with route /:studio/requester/:requesterEmail', () => {
    setUpApp({ ...routerProps, initialIndex: 1 });
    expect(screen.getAllByTestId('status-header')).toBeTruthy();
  });
});
