export interface Settings {
    width: number;
    height: number;
    obstacles: number;
    defaultSeeker: string;
    defaulWaypoint: string;
    defaultObstacle: string;
}

export type Tileset = string[][] | number[][]