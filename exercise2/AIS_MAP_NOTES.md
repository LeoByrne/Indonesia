# Exercise 2 AIS Map Editing Notes

Use this workflow when rebuilding AIS map tracks in `exercise2/data.js`.

## Repo / Renderer Rules

- Edit case-local `map` blocks only unless the runtime override at the bottom of `data.js` would replace the map.
- If a case appears in `rebuiltExerciseMaps`, point it to `rebuiltExerciseMapBases["Case X"]` when the top-level case map should render.
- Supported segment types are `normal`, `loiter`, and `anchor` in data. The app normalizes `normal` to transit and `anchor` to loiter.
- Do not add `gap` or `spoof` to green / false-positive benchmark cases.
- Keep `events: []` and `annotations: []` when the exercise should not add map labels.

## AIS Design Rules

- Start from the teaching goal, then draw the route:
  - Green / legitimate: continuous AIS, ordinary operating context, clean separation.
  - False positive coal area: anchorage/loading-area clutter, bulk carriers, no concealment signal.
  - Red / suspicious: only use gaps/spoofing when the case is meant to teach AIS concealment.
- AIS tracks should look like sampled vessel movement, not geometry exercises:
  - Use uneven spacing and gentle course changes.
  - Avoid mirrored approaches, perfect X crossings, decorative loops, and ruler-straight diagonals through complex coastlines.
  - Use short loiter/anchor segments only where they represent holding, anchorage swing, or brief close operating proximity.

## Geography Workflow

- Anchor the encounter in the correct operating geography before drawing long legs.
- For Muara Pantai / East Kalimantan coal cases, use offshore Celebes Sea / Makassar Strait water east of Kalimantan. Do not draw long routes across Borneo or Sulawesi.
- International route context should come from offshore approaches, not straight diagonal shortcuts:
  - A south Philippines / Celebes Sea approach can come from the northeast/east.
  - A Sabah / Malaysian-side approach should remain offshore and bend around land.
  - Southbound divergence should stay in Makassar Strait / Celebes Sea water, not cut into Sulawesi.

## Validation Checklist

- Parse `exercise2/data.js` with Node after editing.
- Confirm the edited case still has the intended `id`.
- Confirm `events` and `annotations` match the requested state.
- Confirm segment types are only supported values and no unintended `gap` / `spoof` appears.
- Check vessel-to-vessel proper crossings for cases that should not show an X.
- Spot-check the rendered map or run a bounded land-polygon check before finalizing long international routes.

## Useful Bounded Land Check

For difficult regional routes, validate against Natural Earth land polygons with a strict timeout. The goal is only to catch obvious overland points/segments before rendering. Do not turn this into an open-ended research loop.

The key output to look for is empty `pointHits` and `segmentHits` for the zone and each vessel.
