import React from 'react';
import { render } from '@testing-library/react';
import ControlPanel from './index';

describe('Control Panel functionality', () => {
  it('Renders without crashing', () => {
    const component = render(<ControlPanel />);
  });
});
