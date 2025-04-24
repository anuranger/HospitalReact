import React from 'react';
import { render, screen } from '@testing-library/react';
import Tree from '../components/tree';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { describe, it, expect, vi } from 'vitest';


vi.mock('../Tree', () => ({
  default: () => <div >Tree</div>,
}));
vi.mock('../Clinicians', () => ({
  default: () => <div>Clinicians</div>,
}));


const mockStore = configureStore([]);
const renderWithStore = (state) => {
  const store = mockStore(state);
  return render(
    <Provider store={store}>
      <Tree />
    </Provider>
  );
};

describe('Tree Component', () => {
  it('renders TreeNodeFunction when treeData is present', () => {
    renderWithStore({ tree: { treeData: { id: 1, name: 'Test Node', children:[] }, openClinician: '', }, } );
    const treeContainer = document.querySelector('.treeContainer');
    expect(treeContainer).toBeInTheDocument();
    expect(screen.queryByTestId('clinicians')).not.toBeInTheDocument();
  });

  it('renders Clinicians when openClinician and treeData are present', () => {
    renderWithStore({ tree: { treeData: { id: 1, name: 'Test Node',children:[] }, openClinician: 'child-1-1', }, } );
    const clinician = document.querySelector('.box-clinic');
    expect(clinician).toBeInTheDocument();
  });

  it('renders nothing when treeData is null', () => {
    renderWithStore({ tree: { treeData: undefined, openClinician: '', }, });
    const treeContainer = document.querySelector('.myTree');
    expect(treeContainer).not.toBeInTheDocument();
  });
});