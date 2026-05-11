import { http, HttpResponse } from "msw"
import type { Duck } from "../types/duck"

const sampleDucks: Duck[] = [
  { id: "1", name: "청둥오리", species: "Anas platyrhynchos" },
  { id: "2", name: "원앙", species: "Aix galericulata" },
  { id: "3", name: "흰죽지", species: "Anser caerulescens" },
]

export const handlers = [http.get("*/api/ducks", () => HttpResponse.json(sampleDucks))]

export const emptyDucksHandler = http.get("*/api/ducks", () => HttpResponse.json([]))

export const errorDucksHandler = http.get("*/api/ducks", () => HttpResponse.json({ message: "server error" }, { status: 500 }))
