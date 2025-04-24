import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

vi.mock('../components/tree', () => ({
  default: () => <div data-testid="tree-component">Tree Component</div>,
}));

describe('App', () => {
  it('renders Tree component', () => {
    render(<App />);
    expect(screen.getByTestId('tree-component')).toBeInTheDocument();
  });
});