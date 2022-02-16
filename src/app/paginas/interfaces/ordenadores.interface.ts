// To parse this data:
//
//   import { Convert } from "./file";
//
//   const ordenadores = Convert.toOrdenadores(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Ordenadores {
  id:                   number;
  nombre:               string;
  ram:                  RAM;
  procesador:           Grafica;
  discoduro:            Discoduro;
  grafica:              Grafica;
  fuente:               Fuente;
  imagenes:             string;
  descripcion:          Descripcion;
  descripcionDetallada: DescripcionDetallada;
  cantidad:             number;
  precio:               number;
}

export enum Descripcion {
  DescripciónBasica = "Descripción basica",
}

export enum DescripcionDetallada {
  PCConTalesCaracterísticasPreparadoParaUsarEnXSectores = "Pc con tales características preparado para usar en x sectores",
}

export interface Discoduro {
  id:        number;
  nombre:    DiscoduroNombre;
  tipo:      DiscoduroTipo;
  capacidad: DiscoduroCapacidad;
  precio:    number;
}

export enum DiscoduroCapacidad {
  The1TB = "1TB",
  The2TB = "2TB",
}

export enum DiscoduroNombre {
  KingstonA400 = "Kingston A400",
  SeagateBarraCuda = "Seagate BarraCuda",
}

export enum DiscoduroTipo {
  HDD = "HDD",
  SSD = "SSD",
}

export interface Fuente {
  id:            number;
  nombre:        FuenteNombre;
  certificacion: Certificacion;
  potencia:      Potencia;
  precio:        number;
}

export enum Certificacion {
  The80PlusGold = "80 Plus Gold",
  The80PlusSilver = "80 Plus Silver",
}

export enum FuenteNombre {
  NfortecSagitta = "Nfortec Sagitta",
}

export enum Potencia {
  The650W = "650w",
  The850W = "850w",
}

export interface Grafica {
  id:      number;
  nombre:  string;
  marca:   Marca;
  modelo:  Modelo;
  precio:  number;
  socket?: string;
}

export enum Marca {
  AMD = "AMD",
  Intel = "Intel",
  Nvidia = "Nvidia",
}

export enum Modelo {
  Core510400 = "Core 5-10400",
  CoreI712700K = "Core i7-12700K",
  RTX3070TI = "RTX 3070 Ti",
  Rx6600 = "RX 6600",
  Ryzen55600G = "Ryzen 5 5600G",
  Ryzen75700G = "Ryzen 7 5700G",
}

export interface RAM {
  id:        number;
  nombre:    RAMNombre;
  tipo:      RAMTipo;
  formato:   Formato;
  capacidad: RAMCapacidad;
  kit:       Kit;
  precio:    number;
}

export enum RAMCapacidad {
  The16GB = "16GB",
  The8GB = "8GB",
}

export enum Formato {
  DIMM = "DIMM",
}

export enum Kit {
  The1X16 = "1x16",
  The1X8 = "1x8",
  The2X8 = "2x8",
}

export enum RAMNombre {
  KingstonFURY = "Kingston FURY",
  KingstonHyperX = "Kingston HyperX",
}

export enum RAMTipo {
  Ddr4 = "DDR4",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toOrdenadores(json: string): Ordenadores[] {
      return cast(JSON.parse(json), a(r("Ordenadores")));
  }

  public static ordenadoresToJson(value: Ordenadores[]): string {
      return JSON.stringify(uncast(value, a(r("Ordenadores"))), null, 2);
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
  "Ordenadores": o([
      { json: "id", js: "id", typ: 0 },
      { json: "nombre", js: "nombre", typ: "" },
      { json: "ram", js: "ram", typ: r("RAM") },
      { json: "procesador", js: "procesador", typ: r("Grafica") },
      { json: "discoduro", js: "discoduro", typ: r("Discoduro") },
      { json: "grafica", js: "grafica", typ: r("Grafica") },
      { json: "fuente", js: "fuente", typ: r("Fuente") },
      { json: "imagenes", js: "imagenes", typ: "" },
      { json: "descripcion", js: "descripcion", typ: r("Descripcion") },
      { json: "descripcionDetallada", js: "descripcionDetallada", typ: r("DescripcionDetallada") },
      { json: "cantidad", js: "cantidad", typ: 0 },
      { json: "precio", js: "precio", typ: 3.14 },
  ], false),
  "Discoduro": o([
      { json: "id", js: "id", typ: 0 },
      { json: "nombre", js: "nombre", typ: r("DiscoduroNombre") },
      { json: "tipo", js: "tipo", typ: r("DiscoduroTipo") },
      { json: "capacidad", js: "capacidad", typ: r("DiscoduroCapacidad") },
      { json: "precio", js: "precio", typ: 3.14 },
  ], false),
  "Fuente": o([
      { json: "id", js: "id", typ: 0 },
      { json: "nombre", js: "nombre", typ: r("FuenteNombre") },
      { json: "certificacion", js: "certificacion", typ: r("Certificacion") },
      { json: "potencia", js: "potencia", typ: r("Potencia") },
      { json: "precio", js: "precio", typ: 3.14 },
  ], false),
  "Grafica": o([
      { json: "id", js: "id", typ: 0 },
      { json: "nombre", js: "nombre", typ: "" },
      { json: "marca", js: "marca", typ: r("Marca") },
      { json: "modelo", js: "modelo", typ: r("Modelo") },
      { json: "precio", js: "precio", typ: 3.14 },
      { json: "socket", js: "socket", typ: u(undefined, "") },
  ], false),
  "RAM": o([
      { json: "id", js: "id", typ: 0 },
      { json: "nombre", js: "nombre", typ: r("RAMNombre") },
      { json: "tipo", js: "tipo", typ: r("RAMTipo") },
      { json: "formato", js: "formato", typ: r("Formato") },
      { json: "capacidad", js: "capacidad", typ: r("RAMCapacidad") },
      { json: "kit", js: "kit", typ: r("Kit") },
      { json: "precio", js: "precio", typ: 3.14 },
  ], false),
  "Descripcion": [
      "Descripción basica",
  ],
  "DescripcionDetallada": [
      "Pc con tales características preparado para usar en x sectores",
  ],
  "DiscoduroCapacidad": [
      "1TB",
      "2TB",
  ],
  "DiscoduroNombre": [
      "Kingston A400",
      "Seagate BarraCuda",
  ],
  "DiscoduroTipo": [
      "HDD",
      "SSD",
  ],
  "Certificacion": [
      "80 Plus Gold",
      "80 Plus Silver",
  ],
  "FuenteNombre": [
      "Nfortec Sagitta",
  ],
  "Potencia": [
      "650w",
      "850w",
  ],
  "Marca": [
      "AMD",
      "Intel",
      "Nvidia",
  ],
  "Modelo": [
      "Core 5-10400",
      "Core i7-12700K",
      "RTX 3070 Ti",
      "RX 6600",
      "Ryzen 5 5600G",
      "Ryzen 7 5700G",
  ],
  "RAMCapacidad": [
      "16GB",
      "8GB",
  ],
  "Formato": [
      "DIMM",
  ],
  "Kit": [
      "1x16",
      "1x8",
      "2x8",
  ],
  "RAMNombre": [
      "Kingston FURY",
      "Kingston HyperX",
  ],
  "RAMTipo": [
      "DDR4",
  ],
};
