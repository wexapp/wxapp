export const setGrids = (row, column) => {
    const arr = [];

    for(let i = 0; i < row * column; i++) {
        arr.push({ id: `grid${ i }`, status: 'none' });
    }

    return arr;
};


export const shape = (type, index = 7) => {
    switch(type) {
        case 1:
            return [index, index + 1, index + 2, index + 3];
        case 2:
            return [index, index + 1, index + 2, index + 17];
        case 3:
            return [index, index + 1, index + 2, index + 16];
        case 4:
            return [index, index + 1, index + 16, index + 31];
        case 5:
            return [index, index + 1, index + 16, index + 17];
        case 6:
            return [index, index + 1, index + 15, index + 16];
        case 7:
            return [index, index + 1, index + 15, index + 30];
        case 8:
            return [index, index + 15, index + 30, index + 45];
        case 9:
            return [index, index + 15, index + 30, index + 31];
        case 10:
            return [index, index + 15, index + 16, index + 30];
        case 11:
            return [index, index + 15, index + 16, index + 31];
        case 12:
            return [index, index + 15, index + 16, index + 17];
        default:
            return [index, index + 1, index + 2, index + 3];
    }
};

export const indexToCoordinate = (index) => {
	const x = index % 15;
	const y = Math.floor(index / 15);
	return [x, y];
};

export const coordinateToIndex = ([x, y]) => {
    return 15 * x + y + 1;
};

export const isCross = (arr1, arr2) => {
    for(let i = 0, len = arr2.length; i < len; i++) {
        if(arr2.includes(arr1[i])) {
            return true;
        }
    }
};

export const coordinateChange = (origin, point) => {
    const [a, b] = origin;
    const [x, y] = point;

    return [a + b - y, x - a + b];
};