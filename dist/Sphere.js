export class Sphere {
    constructor(color) {
        this.render = () => {
            this.sphere = document.createElement('div');
            this.sphere.className = 'sphere';
            this.sphere.style.background = this.color;
            return this.sphere;
        };
        this.color = color;
        this.sphere;
    }
}
