export default abstract class Resource  {
    abstract load(): Promise<void>;
}