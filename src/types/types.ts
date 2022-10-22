export interface Settings {
    width: number;
    height: number;
    balls: number;

    defaultSeeker: string;
    defaulWaypoint: string;
    defaultBall: string;
}

export type Tileset = string[][] | number[][]