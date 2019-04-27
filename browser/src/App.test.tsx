import React from 'react';
import ReactDOM from 'react-dom';
import App, { displayIslands as coordinatesToStrings } from './App';

describe('App', () => {
  describe('coordinatesToStrings', () => {
    test('empty', () => {
      expect(coordinatesToStrings([])).toEqual([]);
    });

    test('empty sea', () => {
      expect(coordinatesToStrings([[]])).toEqual(['[]']);
    });

    test('single island', () => {
      expect(coordinatesToStrings([[{ x: 0, y: 1 }]])).toEqual(['[0-1]']);
    });

    test('common case 1', () => {
      const islandsCoordinates = [
        [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
        [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 3 }, { x: 2, y: 4 }],
        [{ x: 2, y: 0 }],
        [{ x: 4, y: 0 }],
        [{ x: 4, y: 2 }],
        [{ x: 4, y: 4 }]
      ];

      const expectedDisplay = [
        '[0-0, 0-1, 1-1]',
        '[0-4, 1-4, 2-3, 2-4]',
        '[2-0]',
        '[4-0]',
        '[4-2]',
        '[4-4]'
      ];

      expect(coordinatesToStrings(islandsCoordinates)).toEqual(expectedDisplay);
    });
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
