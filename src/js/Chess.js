import figuresData from "./figuresData";

export default class Chess {
    constructor() {
        this.rowsList = document.querySelector(".chess__rows");
        this.data = [];
        this.move = "white";
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
                const cell = document.querySelector(`.chess__cell[data-x="${x}"][data-y="${(isWhite ? (7 - y) : y)}"]`);

                cell.dataset.figure = figure;
                cell.dataset.side = isWhite ? "white" : "black";

                cell.innerHTML = `<img src="./images/${filename + (isWhite ? "-white" : "") + ".svg"}" />`;
            });
        });
    }

    init() {
        this._renderRows();
        this._renderFigures();
        this._renderFigures(false);
    }
}