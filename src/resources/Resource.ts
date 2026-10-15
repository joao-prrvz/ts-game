export abstract class Resource  {
    abstract load(): Promise<void>;
}