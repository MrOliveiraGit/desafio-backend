import { uuid } from 'uuidv4'

export class Reserva {
    public readonly id: string;
    public nomeApartamento: string;
    public dataCheckin: Date;
    public dataCheckOut: Date;
    public qtdHospedes: number;
    public nomeHospedes: Array<string>;
    public emailHospedes: Array<string>;

    constructor (props: Omit<Reserva, 'id'>, id?: string) {
      Object.assign(this, props)
      if (!id) {
        this.id = uuid()
      }
    }
}
