export interface Settings {
    readonly width: number;
    readonly height: number;
    readonly sphereAmount: number;

    readonly defaultSeeker: string;
    readonly defaultWaypoint: string;
    readonly defaultSphere: string;
}

export type Tileset = string[][] | number[][]

