import { Observable, Observer } from "../utils/Observable/observable";

export class ImageObservable extends Observable {
    private imageWidth: number = 0;
    private imageHeight: number = 0;
    private imageData: Uint8ClampedArray = new Uint8ClampedArray();

    constructor() {
        super()
    }

    updateImage(imageData: Uint8ClampedArray, imageWidth: number, imageHeight: number): void {
        this.imageData = imageData;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.notifyObservers();
    }

    public notifyObservers(): void {
        console.log("ImageObservable is notifying observers...");
        this.observers.forEach(observer => observer.update());
    }
}

export type ImageObserverFunction = (imageData: Uint8ClampedArray, imageWidth: number, imageHeight: number) => void;

export class ImageObserver extends Observer {
    private updateFunction: ImageObserverFunction | undefined;

    constructor(updateFunction: ImageObserverFunction) {
        super();
        this.updateFunction = updateFunction;
    }

    public update(imageData: Uint8ClampedArray, imageWidth: number, imageHeight: number): void {
        this.updateFunction!(imageData, imageWidth, imageHeight);
    }
}
