export interface Settings {
    width: number;
    height: number;

    defaultObstacles: number;

    defaultSeeker: string;
    defaulWaypoint: string;
    defaultObstacleMark: string;
}

export type Tileset = string[][] | number[][]