import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Clinicians from './../components/Clinicians';
import { describe, it, expect, beforeEach } from 'vitest';

const mockStore = configureStore([]);
const treeData = {
  children: [
    {
      index: 'child-1-1',
      clinicians: {
        people: ['Person 1', 'Person 2'],
      },
    },
  ],
};

describe('Clinicians component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tree: {
        treeData,
        openClinician: 'child-1-1',
      },
    });
  });

  it('renders clinicians list', () => {
    render(
      <Provider store={store}>
        <Clinicians treeData={treeData} openClinician="child-1-1" />
      </Provider>
    );
    expect(screen.getByText('Clinicians in group')).toBeInTheDocument();
    expect(screen.getByText('Person 1')).toBeInTheDocument();
    expect(screen.getByText('Person 2')).toBeInTheDocument();
  });

  it('filter', () => {
    render(
      <Provider store={store}>
        <Clinicians treeData={treeData} openClinician="child-1-1" />
      </Provider>
    );
    const inputLabel = screen.getByText('Find').parentNode;
    const searchInput = within(inputLabel).getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Person 1' } });
    expect(screen.getByText('Person 1')).toBeInTheDocument();
    expect(screen.queryByText('Person 2')).not.toBeInTheDocument();
  });

  it('adds clinician', () => {
    render(
      <Provider store={store}>
        <Clinicians treeData={treeData} openClinician="child-1-1" />
      </Provider>
    );
    const addButton = screen.getByText('Add Clinician');
    fireEvent.click(addButton);
    const input = screen.getByPlaceholderText('Name');
    fireEvent.change(input, { target: { value: 'NewClinician123' } });
    const addClinicianButton = screen.getByText('Add');
    fireEvent.click(addClinicianButton);
    expect(store.getActions()).toContainEqual({
      type: 'tree/addClinician',
      payload: { index: 'child-1-1', name: 'NewClinician123' },
    });
  });

  it('removes clinician', () => {
    const { container } = render(
      <Provider store={store}>
        <Clinicians treeData={treeData} openClinician="child-1-1" />
      </Provider>
    );
    const deleteButton = container.querySelector('.deleteIcon');
    fireEvent.click(deleteButton);
    expect(store.getActions()).toContainEqual({
      type: 'tree/removeClinician',
      payload: { index: 'child-1-1', removeIndex: 0 },
    });
  });
});