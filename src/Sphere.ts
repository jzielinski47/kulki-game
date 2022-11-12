
export class Sphere {

    private color: string;
    private sphere: HTMLDivElement;

    constructor(color: string) {
        this.color = color;
        this.sphere;
    }

    render = () => {
        this.sphere = document.createElement('div');
        this.sphere.className = 'sphere';
        this.sphere.style.background = this.color;

        return this.sphere;
    };
}
