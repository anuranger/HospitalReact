import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TreeNodeFunction from './../components/TreeNodeFunction';

const mockStore = configureStore([]);
const node = {
  index: 'test-index',
  name: 'Test Node',
  children: [],
};

describe('TreeNodeFunction component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('renders tree node', () => {
    render(
      <Provider store={store}>
        <TreeNodeFunction node={node} />
      </Provider>
    );
    expect(screen.getByText('Test Node')).toBeInTheDocument();
  });

  it('toggles floater when ellipsis is clicked', () => {
    render(
      <Provider store={store}>
        <TreeNodeFunction node={node} />
      </Provider>
    );
    const ellipsisButton = document.querySelector('.verticalEllipsis');
    fireEvent.click(ellipsisButton);
    expect(document.querySelector('.floaterClass')).toBeInTheDocument();
  });

  it('renders input field when edit is clicked', () => {
    render(
      <Provider store={store}>
        <TreeNodeFunction node={node} />
      </Provider>
    );
    const ellipsisButton = document.querySelector('.verticalEllipsis');
    fireEvent.click(ellipsisButton);
    const optionsComponent = document.querySelector('.floaterClass');
    expect(optionsComponent).toBeInTheDocument();
  });
});