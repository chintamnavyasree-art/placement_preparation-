import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

test('renders placement preparation portal landing page', () => {
  render(<App />);
  const headingElement = screen.getByText(/Personal Placement Preparation Portal/i);
  expect(headingElement).toBeInTheDocument();
  
  const enterBtn = screen.getByText(/Enter Student Dashboard/i);
  expect(enterBtn).toBeInTheDocument();
});

test('navigates to dashboard and displays modules', async () => {
  render(<App />);
  const enterBtn = screen.getByText(/Enter Student Dashboard/i);
  await act(async () => {
    fireEvent.click(enterBtn);
  });
  
  expect(screen.getByText(/PORTAL MODULES/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Drive Tracker/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Syllabus/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Coding Progress/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Notes Hub/i).length).toBeGreaterThan(0);
});
