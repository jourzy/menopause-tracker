// ButtonOpenLogSymptoms.test.js unit tests the ButtonOpenLogSymptoms component using Jest and React Testing Library. The component is a functional component that renders a button element with the text "Log Symptoms". The component takes an onClick prop that is called when the button is clicked. The test suite includes three tests: Button Rendering, Button Text, and Button Click Event. The Button Rendering test checks if the button is rendered in the document. The Button Text test checks if the button has the correct text content. The Button Click Event test checks if the onClick prop is called when the button is clicked.
// based on https://www.geeksforgeeks.org/how-to-test-react-components-using-jest/
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonOpenLogSymptoms from '../ButtonOpenLogSymptoms';

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe('ButtonOpenLogSymptoms Component', () => {
  const handleClick = jest.fn();

  // Render the component before each test
  beforeEach(() => {
    render(<ButtonOpenLogSymptoms onClick={handleClick} value="Log Symptoms" />);
  });

  // Test 1: Button Rendering
  test('Button Rendering', () => {
    const button = screen.getByRole('button', { name: /log symptoms/i });
    expect(button).toBeInTheDocument();
  });

  // Test 2: Button Text
  test('Button Text', () => {
    const button = screen.getByRole('button', { name: /log symptoms/i });
    expect(button).toHaveTextContent('Log Symptoms');
  });

  // Test 3: Button Click Event
  test('Button Click Event', () => {
    const button = screen.getByRole('button', { name: /log symptoms/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
