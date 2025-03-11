interface Direccion {
    calle: string | number,
    num: number | string,
    cd: string,
    cp: number | string
};
export interface Usuario {
    _id: string,
    twitter: string | undefined,
    nombre: string,
    descripcion: string,
    telefono: Array<number> | number,
    direccion: Array<Direccion>
};