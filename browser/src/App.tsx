import React from 'react';
import { findIslands } from '@finding-islands/core';
import { SeaParser } from '@finding-islands/parsers';
import { Coordinate } from '@finding-islands/core/dist/types';
import './App.css';

export function displayIslands(islands: Coordinate[][]): string[] {
  return islands.map(row => {
    return `${JSON.stringify(
      row.map(coordinate => {
        return `${coordinate.x}-${coordinate.y}`;
      })
    )
      .replace(/"/g, '')
      .replace(/,/g, ', ')}`;
  });
}

type AppState = {
  grid: string;
  islands: string[];
};

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state: AppState = {
    grid: '',
    islands: []
  };

  private handleChange(event: { target: { value: string } }) {
    console.log(this);
    const grid = event.target.value;
    const sea = SeaParser.parseGrid(grid);
    const islandsCoordinates = findIslands(sea);
    const islands = displayIslands(islandsCoordinates);
    this.setState({
      grid,
      islands
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Finding Islands</h1>
        </div>
        <div>
          <p>
            Below you can write a 2d grid map of '1's (land) and '0's (water),
            and the algorithm will return you an array of islands. Every island
            is represented by an array of the X-Y coordinates of its tiles. An
            island is surrounded by water and is formed by connecting adjacent
            lands horizontally or vertically.
          </p>
          <p>
            Only the characters '0', '1' and newlines are considered. Other
            characters will be dismissed.
          </p>
          <p>
            The coordinates system's origin, 0-0, is at the top-left corner and
            increments by going on both right and down directions.
          </p>
        </div>
        <div>
          <form>
            <label>
              <textarea value={this.state.grid} onChange={this.handleChange} />
            </label>
          </form>
        </div>
        <div>
          <code>
            [
            {this.state.islands.map(island => (
              <pre> {island}</pre>
            ))}
            ]
          </code>
        </div>
        <div>
          <a href="https://github.com/marcusmonteirodesouza/finding-islands">
            Source Code
          </a>
        </div>
      </div>
    );
  }
}

export default App;
