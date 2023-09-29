import figuresData from "./figuresData";

export default class Chess {
    constructor() {
        this.rowsList = document.querySelector(".chess__rows");
        this.moveSideCircleEl = document.querySelector(".wrapper__circle");
        this.moveSide = "white";
    }

    _renderRows() {
        for (let i = 0; i < 8; i++) {
            const row = document.createElement("li");

            row.classList.add("chess__row");

            for (let j = 0; j < 8; j++) {
                const cell = document.createElement("div");

                cell.classList.add("chess__cell");

                cell.dataset.x = j;
                cell.dataset.y = i;

                row.appendChild(cell);
            }

            this.rowsList.appendChild(row);
        }
    }

    _renderFigures(isWhite = true) {
        figuresData.forEach(({ figure, filename, defaultPlaces, }) => {
            defaultPlaces.forEach(({ x, y, }) => {
                const side = isWhite ? "white" : "black";
                const src = `./images/${filename + (isWhite ? "-white" : "") + ".svg"}`;
                const coordinateY = (isWhite ? (7 - y) : y);

                this._addFigureOnCell(x, coordinateY, side, src, figure);
            });
        });
    }

    _fillSideCircle() {
        this.moveSideCircleEl.dataset.move = this.moveSide;
    }

    _clearDataCells() {
        const cells = document.querySelectorAll(".chess__cell");

        cells.forEach((cell) => {
            cell.removeAttribute("data-area-move");
            cell.removeAttribute("data-active-figure");
            cell.removeAttribute("data-area-enemy");
        });
    }

    _viewMovesByClickOnFigure() {
        const cells = document.querySelectorAll(".chess__cell");

        cells.forEach((cell) => {
            cell.addEventListener("click", () => {
                if (!cell.hasAttribute("data-figure") || cell.hasAttribute("data-area-enemy")) {
                    return;
                }

                const figure = cell.dataset.figure;
                const side = cell.dataset.side;

                if (side !== this.moveSide) {
                    return;
                }

                const onceMoved = cell.hasAttribute("data-once-moved");
                const moves = figuresData.find((figData) => figData.figure === figure).moves.filter((move) => {
                    if (onceMoved) {
                        return !move.once;
                    }

                    return move;
                });
                const figureX = parseInt(cell.dataset.x);
                const figureY = parseInt(cell.dataset.y);

                this._clearDataCells();

                for (let i = 0; i < moves.length; i++) {
                    const { x, y, destroy, destroyAndMove, } = moves[i];

                    for (let j = 0; j < x.length; j++) {
                        const defCoordinateX = x[j];
                        const defCoordinateY = y[j];
                        const coordinateY = figureY + ((figure === "pawn" && side === "white") ? -1 * defCoordinateY : defCoordinateY);
                        const coordinateX = defCoordinateX + figureX;
                        const cellMove = document.querySelector(`.chess__cell[data-x="${coordinateX}"][data-y="${coordinateY}"]`);

                        cell.dataset.activeFigure = "";

                        if (cellMove && cellMove.dataset.side !== side && cellMove.dataset.figure && (destroy || destroyAndMove)) {
                            cellMove.dataset.areaMove = "";
                            cellMove.dataset.areaEnemy = "";
                            break;
                        }

                        if (!cellMove || cellMove.dataset.side === side) {
                            // Заканчиваем искать доступные ячейки для хода
                            // так как есть преграда или же ячейки вообще не 
                            // существует
                            break;
                        }

                        if (!destroy && !cellMove.hasAttribute("data-figure")) {
                            cellMove.dataset.areaMove = "";
                        }
                    }
                }
            });
        });
    }

    _addFigureOnCell(x, y, side, src, figure, oldCell) {
        const cell = document.querySelector(`.chess__cell[data-x="${x}"][data-y="${y}"]`)

        cell.dataset.figure = figure;
        cell.dataset.side = side;

        if (oldCell && figure === "pawn") {
            cell.dataset.onceMoved = "";
        }

        cell.innerHTML = `<img src="${src}" />`;

        this.moveSide = side === "white" ? "black" : "white";
        this._fillSideCircle();
    }

    _removeFigureOnCell(x, y) {
        const cell = document.querySelector(`.chess__cell[data-x="${x}"][data-y="${y}"]`)

        cell.removeAttribute("data-figure");
        cell.removeAttribute("data-side");

        this._clearDataCells();

        cell.innerHTML = "";
    }

    _moveFigure() {
        const cells = document.querySelectorAll(".chess__cell");

        cells.forEach((cell) => {
            cell.addEventListener("click", () => {
                const activeFigure = document.querySelector(".chess__cell[data-active-figure]");
                const side = activeFigure ? activeFigure.dataset.side : "";

                if (!cell.hasAttribute("data-area-move") || side !== this.moveSide) {
                    return;
                }

                const newFigureX = parseInt(cell.dataset.x);
                const newFigureY = parseInt(cell.dataset.y);
                const oldFigureX = parseInt(activeFigure.dataset.x);
                const oldFigureY = parseInt(activeFigure.dataset.y);
                const figure = activeFigure.dataset.figure;
                const src = activeFigure.querySelector("img").src;

                this._addFigureOnCell(newFigureX, newFigureY, side, src, figure, activeFigure);
                this._removeFigureOnCell(oldFigureX, oldFigureY);
            });
        });
    }

    _destroyFigure() {
        const cells = document.querySelectorAll(".chess__cell");

        cells.forEach((cell) => {
            cell.addEventListener("click", () => {
                const activeFigure = document.querySelector(".chess__cell[data-active-figure]");
                const side = activeFigure ? activeFigure.dataset.side : "";

                if (!cell.hasAttribute("data-area-enemy") || side !== this.moveSide) {
                    return;
                }

                const newFigureX = parseInt(cell.dataset.x);
                const newFigureY = parseInt(cell.dataset.y);
                const oldFigureX = parseInt(activeFigure.dataset.x);
                const oldFigureY = parseInt(activeFigure.dataset.y);
                const figure = activeFigure.dataset.figure;
                const src = activeFigure.querySelector("img").src;

                this._addFigureOnCell(newFigureX, newFigureY, side, src, figure, activeFigure);
                this._removeFigureOnCell(oldFigureX, oldFigureY);
            });
        });
    }

    init() {
        this._renderRows();
        this._renderFigures();
        this._renderFigures(false);
        this._fillSideCircle();
        this._viewMovesByClickOnFigure();
        this._moveFigure();
        this._destroyFigure();
    }
}