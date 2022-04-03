import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LeftSection from '../index';

test('check status button', () => {
  render(<LeftSection />);
  const buttonAvailableElement = screen.getByText(/available/i);
  expect(buttonAvailableElement).toBeInTheDocument();
  fireEvent.click(buttonAvailableElement)
  const buttonBusyElement = screen.getByText(/busy/i);
  expect(buttonBusyElement).toBeInTheDocument();
});
