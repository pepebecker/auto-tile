'use strict'

import { getCoords, getWallCoords, SurroudingGrid } from './coords'

export type Grid = any[][]
export type DrawCallback = (cell: any, xs: number, xy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) => void
export type MapSurroundingsFn = (cell: any, surroudings: SurroudingsMap) => SurroudingGrid
export type MapIsRoofFn = (cell: any) => boolean
export type MapIsWallFn = (cell: any) => boolean
export type MapIsFloorFn = (cell: any) => boolean
export type DrawGridOptions = {
	mapIsRoof?: MapIsRoofFn,
	mapIsWall?: MapIsWallFn,
	mapIsFloor?: MapIsFloorFn,
	mapSurroundings?: MapSurroundingsFn,
}

export interface SurroudingsMap {
	N?: any;
	W?: any;
	E?: any;
	S?: any;
	NW?: any;
	NE?: any;
	SW?: any;
	SE?: any;
}

export const draw = (cell: any, drawCallback: DrawCallback, x: number, y: number, sw: number, sh: number, dw: number, dh: number, grid: SurroudingGrid, isWall = false) => {
	const drawCorner = (sx: number, sy: number, dx: number, dy: number) => {
		drawCallback(cell, sx, sy, sw / 2, sh / 2, dx, dy, dw / 2, dh / 2)
	}

	const { NW, NE, SW, SE } = isWall ? getWallCoords(grid) : getCoords(grid)
	drawCorner(NW.x * sw, NW.y * sh, x, y)
	drawCorner(NE.x * sw, NE.y * sh, x + dw / 2, y)
	drawCorner(SW.x * sw, SW.y * sh, x, y + dh / 2)
	drawCorner(SE.x * sw, SE.y * sh, x + dw / 2, y + dh / 2)
}

export const getSurroundings = (grid: Grid, col: number, row: number): SurroudingsMap => {
	const get = (g: Grid, c: number, r: number) => {
		if (g == null || c < 0 || r < 0 || r >= g.length || c >= g[r].length) {
			return null
		} else {
			return g[r][c]
		}
	}
	return {
		N: get(grid, col, row - 1),
		E: get(grid, col + 1, row),
		W: get(grid, col - 1, row),
		S: get(grid, col, row + 1),
		NE: get(grid, col + 1, row - 1),
		NW: get(grid, col - 1, row - 1),
		SE: get(grid, col + 1, row + 1),
		SW: get(grid, col - 1, row + 1),
	}
}

const createMapSurroundings = (mapIsFloor: MapIsFloorFn, mapIsWall: MapIsWallFn, mapIsRoof: MapIsRoofFn): MapSurroundingsFn => {
	return (cell: any, surr: SurroudingsMap): SurroudingGrid => {
		const isWall = mapIsWall(cell)
		const isFloor = mapIsFloor(cell)
		return {
			N: (surr.N == null && !isWall) || surr.N == cell || (mapIsRoof(surr.N) && isFloor),
			E: (surr.E == null && !isWall) || surr.E == cell || (mapIsRoof(surr.E) && isFloor),
			W: (surr.W == null && !isWall) || surr.W == cell || (mapIsRoof(surr.W) && isFloor),
			S: (surr.S == null && !isWall) || surr.S == cell || (mapIsRoof(surr.S) && isFloor),
			NE: (surr.NE == null && !isWall) || surr.NE == cell || (mapIsRoof(surr.NE) && isFloor),
			NW: (surr.NW == null && !isWall) || surr.NW == cell || (mapIsRoof(surr.NW) && isFloor),
			SE: (surr.SE == null && !isWall) || surr.SE == cell || (mapIsRoof(surr.SE) && isFloor),
			SW: (surr.SW == null && !isWall) || surr.SW == cell || (mapIsRoof(surr.SW) && isFloor),
		}
	}
}

export const drawGrid = (grid: Grid, drawCallback: DrawCallback, sw: number, sh: number, dw: number, dh: number, options?: DrawGridOptions ) => {
	const mapIsRoof = options && options.mapIsRoof || (_ => false)
	const mapIsWall = options && options.mapIsWall || (_ => false)
	const mapIsFloor = options && options.mapIsFloor || (_ => false)
	const mapSurroundings = options && options.mapSurroundings || createMapSurroundings(mapIsFloor, mapIsWall, mapIsRoof)
	for (const r in grid) {
		for (const c in grid[r]) {
			const col = parseInt(c)
			const row = parseInt(r)
			const surroudings = getSurroundings(grid, col, row);
			const cell = grid[r][c]
			draw(cell, drawCallback, col * dw, row * dh, sw, sh, dw, dh, mapSurroundings(cell, surroudings), mapIsWall(cell))
		}
	}
}
