// Header.test.js is prop testing
// This is a prop testing file, testing the Header component, which is a functional component that takes a title prop and renders it in an h1 element. The first test checks if the component renders with the default title, and the second test checks if the component renders with a custom title.
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react';
import Header from '../Header';

test('renders Header component with default title', () => {
  render(<Header />);
  const titleElement = screen.getByText('Pause.');
  expect(titleElement).toBeInTheDocument();
});

test('renders Header component with custom title', () => {
  render(<Header title="Menopause Symptom Tracker" />);
  const titleElement = screen.getByText('Menopause Symptom Tracker');
  expect(titleElement).toBeInTheDocument();
});