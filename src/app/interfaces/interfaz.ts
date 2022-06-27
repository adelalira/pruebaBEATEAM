export interface Datos {
    status:  number;
    message: string;
    data:    Pedido[];
}

export interface Pedido {
    id:             string;
    referencia:     string;
    logo:           string;
    usuario:        string;
    observacion:    string;
    cantidad:       string;
    estado:         string;
    fecha:          Date;
    tipo:           string;
    codigo_cliente: string;
    alias_cliente:  string;
}

export interface Tipos {
    status:  number;
    message: string;
    data:    Tipo[];
}

export interface Tipo {
    data:    string;
}


export interface Estados {
    status:  number;
    message: string;
    data:    Estado[];
}

export interface Estado {
    data:    string;
}