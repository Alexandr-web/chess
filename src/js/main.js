import figures from './figures';

const chess = () => {
  const createBlocks = () => {
    const list_rows = document.querySelector('.wrapper__rows');

    for (let i = 0; i < 8; i++) {
      const row = document.createElement('div');
      row.classList.add('wrapper__rows-list');
      list_rows.appendChild(row);

      for (let j = 0; j < 8; j++) {
        const lists = document.querySelectorAll('.wrapper__rows-list');
        const block = document.createElement('li');

        block.classList.add('wrapper__rows-list-item');
        block.dataset.y = i + 1;
        block.dataset.x = j + 1;

        if ((i + 1) % 2 === 0) {
          block.style.background = (j + 1) % 2 === 0 ? '#DBDBDB' : '#B4BFBE';
        } else {
          block.style.background = (j + 1) % 2 === 0 ? '#B4BFBE' : '#DBDBDB';
        }

        lists[i].appendChild(block);
      }
    }
  }

  createBlocks();

  const setFiguresOnBlocks = () => {
    const cells = document.querySelectorAll('.wrapper__rows-list-item');

    cells.forEach(cell => {
      const x = parseInt(cell.dataset.x);
      const y = parseInt(cell.dataset.y);

      for (let i in figures.default) {
        if (i === 'enemy') {
          if (y < 3) {
            for (let j in figures.default[i].figures) {
              const { x: x_default, y: y_default } = figures.default[i].figures[j].default_place;

              if (x_default === x && y_default === y) {
                cell.innerHTML = figures.default[i].figures[j].figure_html;
                cell.dataset.figure = j;
                cell.dataset.team = i;
              }

              switch (j) {
                case 'rook':
                  if (x === x_default + 7 && y === y_default) {
                    cell.innerHTML = figures.default[i].figures[j].figure_html;
                    cell.dataset.figure = j;
                    cell.dataset.team = i;
                  } break;
                case 'horse':
                  if (x === x_default + 5 && y === y_default) {
                    cell.innerHTML = figures.default[i].figures[j].figure_html;
                    cell.dataset.figure = j;
                    cell.dataset.team = i;
                  } break;
                case 'elephant':
                  if (x === x_default + 3 && y === y_default) {
                    cell.innerHTML = figures.default[i].figures[j].figure_html;
                    cell.dataset.figure = j;
                    cell.dataset.team = i;
                  } break;
                case 'pawn':
                  for (let o = x_default; o < 8; o++) {
                    if (x === x_default + o && y === y_default) {
                      cell.innerHTML = figures.default[i].figures[j].figure_html;
                      cell.dataset.figure = j;
                      cell.dataset.team = i;
                    }
                  }
              }
            }
          }
        } else if (i === 'my') {
          if (y > 6) {
            for (let j in figures.default[i].figures) {
              const { x: x_default, y: y_default } = figures.default[i].figures[j].default_place;

              if (x_default === x && y_default === y) {
                cell.innerHTML = figures.default[i].figures[j].figure_html;
                cell.dataset.figure = j;
                cell.dataset.team = i;
              }

              switch (j) {
                case 'rook':
                  if (x === x_default + 7 && y === y_default) {
                    cell.innerHTML = figures.default[i].figures[j].figure_html;
                    cell.dataset.figure = j;
                    cell.dataset.team = i;
                  } break;
                case 'horse':
                  if (x === x_default + 5 && y === y_default) {
                    cell.innerHTML = figures.default[i].figures[j].figure_html;
                    cell.dataset.figure = j;
                    cell.dataset.team = i;
                  } break;
                case 'elephant':
                  if (x === x_default + 3 && y === y_default) {
                    cell.innerHTML = figures.default[i].figures[j].figure_html;
                    cell.dataset.figure = j;
                    cell.dataset.team = i;
                  } break;
                case 'pawn':
                  for (let o = x_default; o < 8; o++) {
                    if (x === x_default + o && y === y_default) {
                      cell.innerHTML = figures.default[i].figures[j].figure_html;
                      cell.dataset.figure = j;
                      cell.dataset.team = i;
                    }
                  }
              }
            }
          }
        }
      }
    });
  }

  setFiguresOnBlocks();

  const stepsOfFigures = () => {
    const cells = document.querySelectorAll('.wrapper__rows-list-item');

    const showActiveCell = num => {
      if (cells[num].dataset.figure) {
        cells[num].classList.add('active-cell');
      }
    };
    const hideActiveCell = (className, num) => {
      cells.forEach(item => {
        if (cells[num].dataset.figure) {
          item.classList.remove(className);
          item.style.boxShadow = '';
        }
      });
    };

    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => {
        const figure = cell.dataset.figure;
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        const team = cell.dataset.team;

        hideActiveCell('active-cell', index);
        hideActiveCell('green-cell', index);
        hideActiveCell('cell-step', index);
        hideActiveCell('attack-cell', index);
        showActiveCell(index);
        foundSteps(x, y, figure, team);
      });
    });

    const moveFigures = () => { 
      let active_cell;
  
      cells.forEach(cell => {
        cell.addEventListener('click', () => {
          if (cell.classList.contains('active-cell')) {
            active_cell = cell;
          }
          if (cell.classList.contains('green-cell')) {
            const figure = active_cell.dataset.figure;
            const team = active_cell.dataset.team;
  
            cell.dataset.figure = figure;
            cell.dataset.team = team;
            cell.innerHTML = active_cell.innerHTML;
  
            active_cell.innerHTML = '';
            active_cell.dataset.figure = '';
            active_cell.dataset.team = '';
  
            cells.forEach(item => item.classList.remove('green-cell'));
            cells.forEach(item => item.classList.remove('active-cell'));
            cells.forEach(item => item.classList.remove('cell-step'));
            cells.forEach(item => item.classList.remove('attack-cell'));
          }
        });
      });
    }
  
    moveFigures();

    function foundSteps(x, y, figure, team) {
      for (let i in figures.default) {
        for (let j in figures.default[i].figures) {
          if (figure === j) {
            figures.default[i].figures[j].coordinates.map(coordinate => {
              cells.forEach(cell => {
                if ((coordinate.x + x) === parseInt(cell.dataset.x) &&
                    (coordinate.y + y) === parseInt(cell.dataset.y)) {
                  cell.classList.add('cell-step');
  
                  if (!cell.dataset.figure) {
                    cell.classList.add('green-cell');
                  }

                  if (cell.dataset.figure && cell.dataset.team !== team) {
                    cell.classList.add('attack-cell');
                  }
                }
              });
            });
          }
        }
      }
    }
  }

  stepsOfFigures();
}

chess();