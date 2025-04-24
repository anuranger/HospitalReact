import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Options from './../components/Options';
import { describe, it, expect } from 'vitest';

const mockStore = configureStore([]);
const index = 'child-1';
const toggle = vi.fn();
const toggleEdit = vi.fn();
const closeBox = vi.fn();

describe('Options component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    toggle.mockReset();
    toggleEdit.mockReset();
    closeBox.mockReset();
  });

  it('renders options list', () => {
    render(
      <Provider store={store}>
        <Options index={index} toggle={toggle} toggleEdit={toggleEdit} closeBox={closeBox} />
      </Provider>
    );
    expect(screen.getByText('Edit Group')).toBeInTheDocument();
    expect(screen.getByText('Create Child Group')).toBeInTheDocument();
    expect(screen.getByText('Add / Remove Clinicians')).toBeInTheDocument();
    expect(screen.getByText('Remove Group')).toBeInTheDocument();
  });

  it('calls toggleEdit and closeBox when edit group is clicked', () => {
    render(
      <Provider store={store}>
        <Options index={index} toggle={toggle} toggleEdit={toggleEdit} closeBox={closeBox} />
      </Provider>
    );
    const editGroupButton = screen.getByText('Edit Group');
    fireEvent.click(editGroupButton);
    expect(toggleEdit).toHaveBeenCalledTimes(1);
    expect(closeBox).toHaveBeenCalledTimes(1);
  });

  it('dispatches addNode and calls toggle and closeBox when create child group is clicked', () => {
    render(
      <Provider store={store}>
        <Options index={index} toggle={toggle} toggleEdit={toggleEdit} closeBox={closeBox} />
      </Provider>
    );
    const createChildGroupButton = screen.getByText('Create Child Group');
    fireEvent.click(createChildGroupButton);
    expect(store.getActions()).toContainEqual({ type: 'tree/addNode', payload: index });
    expect(toggle).toHaveBeenCalledTimes(1);
    expect(toggle).toHaveBeenCalledWith(true);
    expect(closeBox).toHaveBeenCalledTimes(1);
  });

  it('dispatches showClinicians and calls toggle and closeBox when add/remove clinicians is clicked', () => {
    render(
      <Provider store={store}>
        <Options index={index} toggle={toggle} toggleEdit={toggleEdit} closeBox={closeBox} />
      </Provider>
    );
    const addRemoveCliniciansButton = screen.getByText('Add / Remove Clinicians');
    fireEvent.click(addRemoveCliniciansButton);
    expect(store.getActions()).toContainEqual({ type: 'tree/showClinicians', payload: index });
    expect(toggle).toHaveBeenCalledTimes(1);
    expect(toggle).toHaveBeenCalledWith();
    expect(closeBox).toHaveBeenCalledTimes(1);
  });

  it('dispatches removeNode when remove group is clicked', () => {
    render(
      <Provider store={store}>
        <Options index={index} toggle={toggle} toggleEdit={toggleEdit} closeBox={closeBox} />
      </Provider>
    );
    const removeGroupButton = screen.getByText('Remove Group');
    fireEvent.click(removeGroupButton);
    expect(store.getActions()).toContainEqual({ type: 'tree/removeNode', payload: index });
  });
});