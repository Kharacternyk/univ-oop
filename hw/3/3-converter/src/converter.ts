export class Converter {
    private usd: number;
    private eur: number;

    public constructor(usd: number, eur: number) {
        this.usd = usd;
        this.eur = eur;
    }

    public convertFromUsd(usd: number): number {
        return this.convert(usd, this.usd);
    }

    public convertFromEur(eur: number): number {
        return this.convert(eur, this.eur);
    }

    public convertToUsd(uah: number): number {
        return this.convert(uah, 1 / this.usd);
    }

    public convertToEur(uah: number): number {
        return this.convert(uah, 1 / this.eur);
    }

    private convert(value: number, rate: number): number {
        return value * rate;
    }
}
