interface SphereInt {
    sphereClass: string;
}

export class Sphere implements SphereInt {

    static sphereClass: string = 'sphere'

    private readonly color: string;
    protected sphere: HTMLDivElement;
    sphereClass: string;

    constructor(color: string) {
        this.color = color;
        this.sphere;
    }

    render = () => {
        this.sphere = document.createElement('div');
        this.sphere.className = this.sphereClass;
        this.sphere.style.background = this.color;

        return this.sphere;
    };
}
