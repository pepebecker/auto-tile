'use strict'

export interface SurroudingGrid {
	N?: boolean;
	W?: boolean;
	E?: boolean;
	S?: boolean;
	NW?: boolean;
	NE?: boolean;
	SW?: boolean;
	SE?: boolean;
}

export const getCoords = (grid: SurroudingGrid) => {
	const coords = {
		NW: { x: 0, y: 1 },
		NE: { x: 1.5, y: 1 },
		SW: { x: 0, y: 2.5 },
		SE: { x: 1.5, y: 2.5 }
	};
	if (grid.W && grid.NW && grid.N) {
		coords.NW.x = 0.5;
		coords.NW.y = 1.5;
	}
	else if (grid.W && grid.N) {
		coords.NW.x = 1;
		coords.NW.y = 0;
	}
	else if (grid.W) {
		coords.NW.x = 0.5;
		coords.NW.y = 1;
	}
	else if (grid.N) {
		coords.NW.x = 0;
		coords.NW.y = 1.5;
	}
	if (grid.N && grid.NE && grid.E) {
		coords.NE.x = 1;
		coords.NE.y = 1.5;
	}
	else if (grid.N && grid.E) {
		coords.NE.x = 1.5;
		coords.NE.y = 0;
	}
	else if (grid.E) {
		coords.NE.x = 1;
		coords.NE.y = 1;
	}
	else if (grid.N) {
		coords.NE.x = 1.5;
		coords.NE.y = 1.5;
	}
	if (grid.W && grid.SW && grid.S) {
		coords.SW.x = 0.5;
		coords.SW.y = 2;
	}
	else if (grid.W && grid.S) {
		coords.SW.x = 1;
		coords.SW.y = 0.5;
	}
	else if (grid.W) {
		coords.SW.x = 0.5;
		coords.SW.y = 2.5;
	}
	else if (grid.S) {
		coords.SW.x = 0;
		coords.SW.y = 2;
	}
	if (grid.S && grid.SE && grid.E) {
		coords.SE.x = 1;
		coords.SE.y = 2;
	}
	else if (grid.E && grid.S) {
		coords.SE.x = 1.5;
		coords.SE.y = 0.5;
	}
	else if (grid.E) {
		coords.SE.x = 1;
		coords.SE.y = 2.5;
	}
	else if (grid.S) {
		coords.SE.x = 1.5;
		coords.SE.y = 2;
	}
	return coords;
}

export const getWallCoords = (grid: SurroudingGrid) => {
	const coords = {
		NW: { x: 0, y: 0 },
		NE: { x: 1.5, y: 0 },
		SW: { x: 0, y: 1.5 },
		SE: { x: 1.5, y: 1.5 }
	};
	if (grid.N && grid.W && grid.SW && !grid.S) {
		coords.NW.x = 0;
		coords.NW.y = 1;
	}
	else if (grid.S && grid.W && grid.NW && !grid.N) {
		coords.NW.x = 0;
		coords.NW.y = 0;
	}
	else if (grid.W && grid.N) {
		coords.NW.x = 1;
		coords.NW.y = 1;
	}
	else if (grid.W) {
		coords.NW.x = 1;
		coords.NW.y = 0;
	}
	else if (grid.N) {
		coords.NW.x = 0;
		coords.NW.y = 1;
	}
	if (grid.N && grid.E && grid.SE && !grid.S) {
		coords.NE.x = 1.5;
		coords.NE.y = 1;
	}
	else if (grid.S && grid.E && grid.NE && !grid.N) {
		coords.NE.x = 1.5;
		coords.NE.y = 0;
	}
	else if (grid.N && grid.E) {
		coords.NE.x = 0.5;
		coords.NE.y = 1;
	}
	else if (grid.E) {
		coords.NE.x = 0.5;
		coords.NE.y = 0;
	}
	else if (grid.N) {
		coords.NE.x = 1.5;
		coords.NE.y = 1;
	}
	if (grid.S && grid.W && grid.NW && !grid.N) {
		coords.SW.x = 0;
		coords.SW.y = 1;
	}
	else if (grid.N && grid.W && grid.SW && !grid.S) {
		coords.NW.x = 0;
		coords.NW.y = 1;
	}
	else if (grid.S && grid.W) {
		coords.SW.x = 1;
		coords.SW.y = 0.5;
	}
	else if (grid.W) {
		coords.SW.x = 1;
		coords.SW.y = 1.5;
	}
	else if (grid.S) {
		coords.SW.x = 0;
		coords.SW.y = 0.5;
	}
	if (grid.S && grid.E && grid.NE && !grid.N) {
		coords.SE.x = 1.5;
		coords.SE.y = 1;
	}
	else if (grid.N && grid.E && grid.SE && !grid.S) {
		coords.NE.x = 1.5;
		coords.NE.y = 1;
	}
	else if (grid.E && grid.S) {
		coords.SE.x = 0.5;
		coords.SE.y = 0.5;
	}
	else if (grid.E) {
		coords.SE.x = 0.5;
		coords.SE.y = 1.5;
	}
	else if (grid.S) {
		coords.SE.x = 1.5;
		coords.SE.y = 0.5;
	}
	return coords;
}
