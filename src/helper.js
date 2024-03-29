function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        const intersectionX = x1 + (uA * (x2 - x1));
        const intersectionY = y1 + (uA * (y2 - y1));

        return {
            x: intersectionX,
            y: intersectionY,
        };
    }

    return false;
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function bearing(x1, y1, x2, y2) {
    return degrees(Math.atan2(y2 - y1, x2 - x1));
}
