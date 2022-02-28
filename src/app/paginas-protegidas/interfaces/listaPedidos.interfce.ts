// To parse this data:
//
//   import { Convert } from "./file";
//
//   const listaPedidos = Convert.toListaPedidos(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ListaPedidos {
  fechaPack:         Date;
  direccion:         string;
  telefono:          string;
  correoElectronico: string;
  tipopado:          string;
  codigotarjeta:     string;
  tarjeta:           string;
  dueniotarjeta:     string;
  id:                number;
  ordenador:         Ordenador;
}

export interface Ordenador {
  id:                   number;
  nombre:               string;
  ram:                  RAM;
  procesador:           Procesador;
  discoduro:            Discoduro;
  grafica:              Grafica;
  fuente:               Fuente;
  imagenes:             string;
  descripcion:          string;
  descripcionDetallada: string;
  precio:               number;
}


export interface Procesador {
  id:     number;
  nombre: string;
  marca:  string;
  modelo: string;
  socket: string;
  precio: number;
}

export interface Discoduro {
  id:        number;
  nombre:    string;
  tipo:      string;
  capacidad: string;
  precio:    number;
}

export interface Fuente {
  id:            number;
  nombre:        string;
  certificacion: string;
  potencia:      string;
  precio:        number;
}

export interface Grafica {
  id:      number;
  nombre:  string;
  marca:   string;
  modelo:  string;
  precio:  number;
  socket?: string;
}

export interface RAM {
  id:        number;
  nombre:    string;
  tipo:      string;
  formato:   string;
  capacidad: string;
  kit:       string;
  precio:    number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toListaPedidos(json: string): ListaPedidos[] {
      return cast(JSON.parse(json), a(r("ListaPedidos")));
  }

  public static listaPedidosToJson(value: ListaPedidos[]): string {
      return JSON.stringify(uncast(value, a(r("ListaPedidos"))), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
      throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
      typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
      typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
      if (typeof typ === typeof val) return val;
      return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
      // val must validate against one typ in typs
      const l = typs.length;
      for (let i = 0; i < l; i++) {
          const typ = typs[i];
          try {
              return transform(val, typ, getProps);
          } catch (_) {}
      }
      return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
      if (cases.indexOf(val) !== -1) return val;
      return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
      // val must be an array with no invalid elements
      if (!Array.isArray(val)) return invalidValue("array", val);
      return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
      if (val === null) {
          return null;
      }
      const d = new Date(val);
      if (isNaN(d.valueOf())) {
          return invalidValue("Date", val);
      }
      return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
      if (val === null || typeof val !== "object" || Array.isArray(val)) {
          return invalidValue("object", val);
      }
      const result: any = {};
      Object.getOwnPropertyNames(props).forEach(key => {
          const prop = props[key];
          const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
          result[prop.key] = transform(v, prop.typ, getProps, prop.key);
      });
      Object.getOwnPropertyNames(val).forEach(key => {
          if (!Object.prototype.hasOwnProperty.call(props, key)) {
              result[key] = transform(val[key], additional, getProps, key);
          }
      });
      return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
      if (val === null) return val;
      return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
      typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
      return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
          : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
          : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "ListaPedidos": o([
      { json: "fechaPack", js: "fechaPack", typ: Date },
      { json: "direccion", js: "direccion", typ: "" },
      { json: "telefono", js: "telefono", typ: "" },
      { json: "correoElectronico", js: "correoElectronico", typ: "" },
      { json: "tipopado", js: "tipopado", typ: "" },
      { json: "codigotarjeta", js: "codigotarjeta", typ: "" },
      { json: "tarjeta", js: "tarjeta", typ: "" },
      { json: "dueniotarjeta", js: "dueniotarjeta", typ: "" },
      { json: "id", js: "id", typ: 0 },
      { json: "ordenador", js: "ordenador", typ: r("Ordenador") },
  ], false),
  "Ordenador": o([
      { json: "id", js: "id", typ: 0 },
      { json: "nombre", js: "nombre", typ: "" },
      { json: "ram", js: "ram", typ: r("RAM") },
      { json: "procesador", js: "procesador", typ: r("Grafica") },
      { json: "discoduro", js: "discoduro", typ: r("Discoduro") },
      { json: "grafica", js: "grafica", typ: r("Grafica") },
      { json: "fuente", js: "fuente", typ: r("Fuente") },
      { json: "imagenes", js: "imagenes", typ: "" },
      { json: "descripcion", js: "descripcion", typ: "" },
      { json: "descripcionDetallada", js: "descripcionDetallada", typ: null },
      { json: "precio", js: "precio", typ: 0 },
  ], false),
  "Discoduro": o([
      { json: "id", js: "id", typ: 0 },
      { json: "nombre", js: "nombre", typ: "" },
      { json: "tipo", js: "tipo", typ: "" },
      { json: "capacidad", js: "capacidad", typ: "" },
      { json: "precio", js: "precio", typ: 3.14 },
  ], false),
  "Fuente": o([
      { json: "id", js: "id", typ: 0 },
      { json: "nombre", js: "nombre", typ: "" },
      { json: "certificacion", js: "certificacion", typ: "" },
      { json: "potencia", js: "potencia", typ: "" },
      { json: "precio", js: "precio", typ: 3.14 },
  ], false),
  "Grafica": o([
      { json: "id", js: "id", typ: 0 },
      { json: "nombre", js: "nombre", typ: "" },
      { json: "marca", js: "marca", typ: "" },
      { json: "modelo", js: "modelo", typ: "" },
      { json: "precio", js: "precio", typ: 3.14 },
      { json: "socket", js: "socket", typ: u(undefined, "") },
  ], false),
  "RAM": o([
      { json: "id", js: "id", typ: 0 },
      { json: "nombre", js: "nombre", typ: "" },
      { json: "tipo", js: "tipo", typ: "" },
      { json: "formato", js: "formato", typ: "" },
      { json: "capacidad", js: "capacidad", typ: "" },
      { json: "kit", js: "kit", typ: "" },
      { json: "precio", js: "precio", typ: 3.14 },
  ], false),
};
