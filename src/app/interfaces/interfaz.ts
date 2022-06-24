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