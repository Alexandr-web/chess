export default [
    {
        figure: "pawn",
        moves: [
            { x: [0], y: [1], },
            { x: [0], y: [2], once: true, },
            { x: [-1], y: [1], destroy: true, },
            { x: [1], y: [1], destroy: true, },
        ],
        filename: "pawn",
        defaultPlaces: [
            { x: 0, y: 1, },
            { x: 1, y: 1, },
            { x: 2, y: 1, },
            { x: 3, y: 1, },
            { x: 4, y: 1, },
            { x: 5, y: 1, },
            { x: 6, y: 1, },
            { x: 7, y: 1, },
        ],
    },
    {
        figure: "rook",
        moves: [
            { x: [0, 0, 0, 0, 0, 0, 0], y: [-1, -2, -3, -4, -5, -6, -7], destroyAndMove: true, },
            { x: [1, 2, 3, 4, 5, 6, 7], y: [0, 0, 0, 0, 0, 0, 0], destroyAndMove: true, },
            { x: [-1, -2, -3, -4, -5, -6, -7], y: [0, 0, 0, 0, 0, 0, 0], destroyAndMove: true, },
            { x: [0, 0, 0, 0, 0, 0, 0], y: [1, 2, 3, 4, 5, 6, 7], destroyAndMove: true, },
        ],
        filename: "rook",
        defaultPlaces: [{ x: 0, y: 0, }, { x: 7, y: 0, }],
    },
    {
        figure: "horse",
        moves: [
            { x: [1], y: [2], destroyAndMove: true, },
            { x: [-1], y: [2], destroyAndMove: true, },
            { x: [-2], y: [1], destroyAndMove: true, },
            { x: [-2], y: [-1], destroyAndMove: true, },
            { x: [2], y: [1], destroyAndMove: true, },
            { x: [2], y: [-1], destroyAndMove: true, },
            { x: [-1], y: [-2], destroyAndMove: true, },
            { x: [1], y: [-2], destroyAndMove: true, },
        ],
        filename: "horse",
        defaultPlaces: [{ x: 1, y: 0, }, { x: 6, y: 0, }],
    },
    {
        figure: "elephant",
        moves: [
            { x: [1, 2, 3, 4, 5, 6, 7], y: [1, 2, 3, 4, 5, 6, 7], destroyAndMove: true, },
            { x: [-1, -2, -3, -4, -5, -6, -7], y: [1, 2, 3, 4, 5, 6, 7], destroyAndMove: true, },
            { x: [-1, -2, -3, -4, -5, -6, -7], y: [-1, -2, -3, -4, -5, -6, -7], destroyAndMove: true, },
            { x: [1, 2, 3, 4, 5, 6, 7], y: [-1, -2, -3, -4, -5, -6, -7], destroyAndMove: true, },
        ],
        filename: "elephant",
        defaultPlaces: [{ x: 2, y: 0, }, { x: 5, y: 0, }],
    },
    {
        figure: "queen",
        moves: [
            { x: [1, 2, 3, 4, 5, 6, 7], y: [1, 2, 3, 4, 5, 6, 7], destroyAndMove: true, },
            { x: [-1, -2, -3, -4, -5, -6, -7], y: [1, 2, 3, 4, 5, 6, 7], destroyAndMove: true, },
            { x: [-1, -2, -3, -4, -5, -6, -7], y: [-1, -2, -3, -4, -5, -6, -7], destroyAndMove: true, },
            { x: [1, 2, 3, 4, 5, 6, 7], y: [-1, -2, -3, -4, -5, -6, -7], destroyAndMove: true, },
            { x: [0, 0, 0, 0, 0, 0, 0], y: [-1, -2, -3, -4, -5, -6, -7], destroyAndMove: true, },
            { x: [1, 2, 3, 4, 5, 6, 7], y: [0, 0, 0, 0, 0, 0, 0], destroyAndMove: true, },
            { x: [-1, -2, -3, -4, -5, -6, -7], y: [0, 0, 0, 0, 0, 0, 0], destroyAndMove: true, },
            { x: [0, 0, 0, 0, 0, 0, 0], y: [1, 2, 3, 4, 5, 6, 7], destroyAndMove: true, },
        ],
        filename: "queen",
        defaultPlaces: [{ x: 3, y: 0, }],
    },
    {
        figure: "king",
        moves: [
            { x: [0], y: [-1], destroyAndMove: true, },
            { x: [1], y: [-1], destroyAndMove: true, },
            { x: [1], y: [0], destroyAndMove: true, },
            { x: [1], y: [1], destroyAndMove: true, },
            { x: [0], y: [1], destroyAndMove: true, },
            { x: [-1], y: [1], destroyAndMove: true, },
            { x: [-1], y: [0], destroyAndMove: true, },
            { x: [-1], y: [-1], destroyAndMove: true, },
        ],
        filename: "king",
        defaultPlaces: [{ x: 4, y: 0, }],
    }
];