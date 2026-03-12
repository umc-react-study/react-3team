export interface Bounds {
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
}

export function calcBounds(lat: number, lng: number): Bounds {
  return {
    latMin: Number((lat - 0.009).toFixed(5)),
    latMax: Number((lat + 0.009).toFixed(5)),
    lngMin: Number((lng - 0.0114).toFixed(5)),
    lngMax: Number((lng + 0.0114).toFixed(5)),
  };
}
