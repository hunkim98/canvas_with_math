export abstract class Observable {
    protected observers: Observer[] = [];

    public subscribe(observer: Observer) {
        this.observers.push(observer);
    }

    public unsubscribe(observer: Observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public abstract notifyObservers(): void;
}

export abstract class Observer {
    public abstract update(...args: any[]): void;
}