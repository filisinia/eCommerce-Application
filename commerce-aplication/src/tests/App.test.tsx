import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';

test('renders hello world button', async () => {
  render(<App />);
  const button = screen.getByText(/hello world/i);

  await waitFor(() => {
    expect(button).toBeInTheDocument();
  });
});
