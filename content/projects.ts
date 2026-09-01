/**
 * The archive.
 *
 * Every entry below was transcribed from MJ's own printed portfolios. See
 * CONTENT-INVENTORY.md for the spread-by-spread source of each fact. Nothing
 * here is invented: no clients that did not exist, no outcomes that were not
 * printed, no awards. Academic work is labelled as academic.
 *
 * Adding work means adding an entry here. No page needs to change.
 */

export type Discipline =
  | 'Landscape Architecture'
  | 'Architecture'
  | 'Urban Design'
  | 'Interior Design'
  | 'Graphic Design'
  | 'Brand Identity'
  | 'Drawing'

/**
 * The three fields the home page offers as a way in. `architecture` has no work
 * in it yet: every surface that lists it derives from `byField`, so the moment a
 * project carries this field the circle on the home page and the section on
 * /work both come alive with nothing else to change.
 */
export type Field = 'landscape' | 'architecture' | 'graphic'

export type Project = {
  slug: string
  title: string
  /** Printed subtitle, where the work has one. */
  subtitle?: string
  /** One line that earns the click. */
  summary: string
  year: number
  /** Overrides `year` in the UI for ranges and in-progress work. */
  yearLabel?: string
  location: string
  field: Field
  disciplines: Discipline[]
  /** Studio and semester for academic work; the client for professional work. */
  context?: string
  /** Overrides the 'Studio' / 'Client' label, e.g. a thesis is neither. */
  contextLabel?: string
  professors?: string[]
  /** e.g. 'Group project'. Stated plainly, never implied to be solo. */
  collaboration?: string
  academic?: boolean
  role: string[]
  tools: string[]
  /** Long-form body, rendered as paragraphs. */
  body: string[]
  cover: string
  coverAlt: string
  /**
   * Which part of the cover the round index thumb should keep. Centre unless
   * said otherwise; sharp's own position strings, e.g. 'left', 'right top'.
   * Set it when the centre of a book page is the gutter or a column of type.
   */
  thumbFocus?: string
  gallery: { src: string; alt: string; caption?: string }[]
  /** Curation only. Nothing renders it right now: see `featuredProjects`. */
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'scars-of-extraction-seeds-of-renewal',
    title: 'Scars of Extraction, Seeds of Renewal',
    subtitle: 'Landscape of the Niger Delta',
    summary:
      'A community-led cleanup for Ogoniland, where recycled oil-field hardware and mangrove nurseries do the remediation.',
    year: 2025,
    location: 'Ogoniland, Niger Delta, Nigeria',
    field: 'landscape',
    disciplines: ['Landscape Architecture', 'Architecture'],
    context: 'Final exam · Politecnico di Milano',
    contextLabel: 'Thesis',
    professors: ['Laura Daglio, supervisor', 'Fyneface Dumnamene Fyneface, co-supervisor'],
    collaboration: 'Individual thesis',
    academic: true,
    role: ['Research', 'Concept design', 'Strategy', 'Masterplan', 'Detail design', 'Drawings and render'],
    tools: ['Rhino', 'Illustrator', 'Photoshop', 'QGIS', 'Twinmotion', 'V-Ray'],
    body: [
      'Oil extraction in the Niger Delta, and particularly in Ogoniland, has produced environmental destruction, social injustice and conflict rather than development. Spills, gas flaring and deforestation have damaged the mangrove ecosystems, threatened the livelihoods built on them, and harmed both health and food security.',
      'The thesis frames that through the resource curse, petro-violence and ecological colonialism, then tests it against the ground: GIS and the Terrestrial Environmental Sensitivity Index show how much of the coastline is highly vulnerable to spills. Phytoremediation and mangrove restoration offer a route back, but the research is explicit that meaningful restoration depends on transparency, accountability and community participation, not on technique alone.',
      'So the proposal replaces slow top-down cleanup with a community-led one. Youth, groups and farmers are trained to run nurseries, to plant and maintain remediation species, to test soil and water with simple kits and to handle contaminated biomass safely. The materials are what the industry left behind: tanks, pipes and scaffolds from abandoned oil facilities, with bamboo, palm fronds, clay and recycled drums, made up into planting beds, floating rafts, fencing and mobile remediation units.',
      'The remediation cycle runs reclaim, plant, monitor, then phase into production. It begins with non-food crops, introduces low-risk food crops as the soil improves, and ends in diversified agriculture and horticulture, so that jobs, food and income fund the next site rather than waiting on a budget. Replanting avoids monoculture: red mangrove at the creek fringe, then black, white and buttonwood landward, raised in nurseries rather than planted directly, and set out in zigzag at 1.2 to 1.5 metre spacing.',
      'Nine pieces are designed and detailed for the site. A work shade and a shade pavilion, a floating filtration unit and a field shower for the people doing the work. A growth frame protecting new planting, propagules bagged into sediment-filled polybags, reclaimed materials, and a seeds hub lifted clear of flooding and contamination. Then filtration, where the mangrove roots themselves take the heavy metals and hydrocarbons up into plant tissue, which is the whole argument of the project in one detail.',
    ],
    cover: '/images/scars-of-extraction-seeds-of-renewal/oil-sheen-aerial.jpg',
    coverAlt:
      'Aerial view of the remediation site: timber platforms, drying racks and scaffolds spread across tidal flats, an oil sheen breaking into rainbow colour across the blue and orange water, and small groups of people working between the structures.',
    gallery: [
      {
        src: '/images/scars-of-extraction-seeds-of-renewal/abstract.jpg',
        alt: 'Title page: a collage of green, ochre and yellow bands over sketched scaffold lines, with a black gradient block and small photographs of timber structures.',
        caption: 'Thesis title and abstract',
      },
      {
        src: '/images/scars-of-extraction-seeds-of-renewal/spill-effects.jpg',
        alt: 'Grey isometric drawing of an oil facility: storage tanks, pipe racks, a flare stack burning, a spherical vessel, dead animals on the ground and workers in yellow suits at the waterline.',
        caption: 'Spill effects: what the industry does to soil, water and animals',
      },
      {
        src: '/images/scars-of-extraction-seeds-of-renewal/strategy.jpg',
        alt: 'Phased strategy map of the delta: waterways in pale teal, mangrove vegetation hatched in pink, wells marked in violet, and four numbered phases of intervention across the creeks.',
        caption: 'Strategy: four phases across the creeks',
      },
      {
        src: '/images/scars-of-extraction-seeds-of-renewal/remediation-model.jpg',
        alt: 'Manifest page setting out the community-led cleanup, with a render of a bamboo and timber platform standing over dark contaminated water beside a bare tree.',
        caption: 'The model: local skills, recycled materials, protected plots',
      },
      {
        src: '/images/scars-of-extraction-seeds-of-renewal/mangrove-nursery.jpg',
        alt: 'Magenta line diagrams of a mangrove propagule in a Reef Ball and Riley Tube, read backwards along a timeline from mature tree to the day it was planted.',
        caption: 'From propagule to mature tree, read backwards',
      },
      {
        src: '/images/scars-of-extraction-seeds-of-renewal/mangrove-ecology.jpg',
        alt: 'Purple mangrove diagram layered from soil contamination through phyto-extraction to cleanup, above a circular section of mangrove roots underwater labelled with a grey heron, mangrove firefly, mud crab and green sea turtle.',
        caption: 'What comes back when the mangroves do',
      },
      {
        src: '/images/scars-of-extraction-seeds-of-renewal/design-management.jpg',
        alt: 'Dark navy board of the nine site structures drawn as pale isometrics: work shade, shade pavilion, floating filtration, field shower, growth frame, propagules, reclaimed materials, seeds hub and filtration.',
        caption: 'Design management: the nine pieces, and the order they arrive in',
      },
      {
        src: '/images/scars-of-extraction-seeds-of-renewal/village-perspective.jpg',
        alt: 'Render of a delta village: brick and corrugated houses on green ground, a conical silo, and a bamboo scaffold walkway carried over the water on stilts.',
        caption: 'The walkway meeting the existing village',
      },
      {
        src: '/images/scars-of-extraction-seeds-of-renewal/benefits.jpg',
        alt: 'Benefits and long-term vision page, with small renders of the timber structures in use and a long panoramic section through the restored shoreline.',
        caption: 'Long-term vision: clean the soil, then keep it healthy',
      },
    ],
    featured: true,
  },

  {
    slug: 'purification-movement',
    title: 'Purification Movement',
    subtitle: 'From waste to living shore',
    summary:
      'Turning the mineral spoil of an Alpine base tunnel into new ground, and a lake shore that cleans its own water.',
    year: 2024,
    location: 'Lugano, Switzerland',
    field: 'landscape',
    disciplines: ['Landscape Architecture', 'Urban Design'],
    context: 'Landscape Design Studio 2 · Semester 3',
    professors: ['Strode Yves Hope', 'Protasoni Sara'],
    collaboration: 'Group project',
    academic: true,
    role: ['Concept design', 'Masterplan', 'Diagrams', 'Render'],
    tools: ['Rhino', 'Illustrator', 'Photoshop', 'QGIS'],
    body: [
      'The Rotterdam–Mediterranean freight corridor has to get through the Alps, and the Alps do not make that easy. The Alptransit projects, the Gotthard and Ceneri base tunnels, solved the topography by going under it, and in doing so produced an enormous quantity of excavated mineral waste.',
      'The studio took that waste as its starting material. If the mountain has already been moved, where should it go, and what could it become in a climate that is shifting and a lake system that is losing biodiversity?',
      'We worked across five distinct areas, each with its own conditions, tailoring the approach to every site rather than repeating one gesture. The central move is to purify water using landforms set at different levels and across different zones: an intervention that filters as a matter of geometry rather than machinery, and that reads as landscape rather than infrastructure.',
      'The waterfront is resolved as three separate states of walkway: a sidewalk built for people to meet on, a pathway for cars, and a third walkway meant only for staying and resting. Along the shore, the design names its moments: an informal garden, the harbours, a renovated parking structure, the junction, and the street sides, each detailed as a small piece of the larger system.',
    ],
    cover: '/images/purification-movement/masterplan.jpg',
    coverAlt:
      'Masterplan of the Lugano lakeshore in tonal greys and blues, showing the town grid, the river corridor and the purifying landforms meeting Lake Lugano.',
    gallery: [
      {
        src: '/images/purification-movement/concept.jpg',
        alt: 'Concept drawing: fine black linework over a magenta and blue wash, mapping the corridor through the Alpine valley.',
        caption: 'Concept: the corridor read as a single line through the valley',
      },
      {
        src: '/images/purification-movement/manifest.jpg',
        alt: 'Dense drawing of the valley in overlapping grey contour lines with a magenta boundary tracing the intervention area.',
        caption: 'Manifest: five areas, one water strategy',
      },
      {
        src: '/images/purification-movement/site-analysis.jpg',
        alt: 'Site analysis: a gridded plan of the contaminated riverside, with sectional terrain models exploded to the right.',
        caption: 'Site analysis: the most polluted and neglected stretch',
      },
      {
        src: '/images/purification-movement/ecology.jpg',
        alt: 'Ecology study: six circular vignettes for woodlands, hedges, canals and rivers, meadows, deep lake water and wetlands, above a row of tree elevations.',
        caption: 'Ecology: habitats and species surveyed before designing',
      },
      {
        src: '/images/purification-movement/walkway-states.jpg',
        alt: 'Perspective views and long sections showing the three states of the walkway and how water responds to the project.',
        caption: 'Three states of the walkway',
      },
      {
        src: '/images/purification-movement/signature-moments.jpg',
        alt: 'Five isometric drawings labelled informal garden, harbours, renovation of parking, the junction and street sides.',
        caption: 'Signature moments of the composition',
      },
    ],
    featured: true,
  },

  {
    slug: 'hidden-illusion-of-bygone-landscape',
    title: 'Hidden Illusion of Bygone Landscape',
    summary:
      'Four paths to an Apennine peak, in a place the twentieth century emptied out.',
    year: 2024,
    location: 'Monte Cimone, Sestola, Italy',
    field: 'landscape',
    disciplines: ['Landscape Architecture'],
    context: 'Built Environment & Landscape Design Studio · Semester 2',
    professors: ['Federico Zanfi'],
    collaboration: 'Group project',
    academic: true,
    role: ['Concept design', 'Masterplan', 'Render'],
    tools: ['Rhino', 'Illustrator', 'Photoshop', 'QGIS', 'Twinmotion'],
    body: [
      'Since the beginning of the twentieth century, and with rising intensity after the Second World War, large parts of the Apennines have lost their population. Cultivated land and productive woods were abandoned and the forest came back on its own. The rural economies that held the place together (agriculture, livestock, crafts) declined, and only seasonal recreation in the highlands partly replaced them.',
      'The project reads Monte Cimone through what is left: ski runs, lifts and trails laid over topography and vegetation, and a mountain whose morphology is best understood by comparing its slopes against each other.',
      'The strategy delineates four distinct paths to the peak, each with its own character, and we called them the four fingers. One is a land-art route. One is a bike path. Two are walking routes at different gradients, so the climb can be chosen rather than endured.',
      'The built elements are deliberately light. Shelters were templated to behave differently at different heights while keeping the least possible contact with the ground, for better flexibility for capturing light, and less damage to what is already growing there. Where the ski run once had its station, we kept the platform and structure instead of demolishing it, and turned it into a gallery for nature-based art.',
    ],
    cover: '/images/hidden-illusion-of-bygone-landscape/cemetery-pathway.jpg',
    coverAlt:
      'Aerial render of a raised walkway threading through dense conifer forest and open meadow on a misty mountainside, with cable-car cabins crossing above.',
    gallery: [
      {
        src: '/images/hidden-illusion-of-bygone-landscape/public-space.jpg',
        alt: 'Desaturated render of a public square with young trees, low white planters and a figure seated at the water edge.',
        caption: 'The square, at the foot of the route',
      },
      {
        src: '/images/hidden-illusion-of-bygone-landscape/territorial-exploration.jpg',
        alt: 'Territorial analysis of Monte Cimone: a sectional diagram of peak elevations above a coloured map of ski runs, lifts and trails.',
        caption: 'Territorial exploration: runs, lifts, trails, elevations',
      },
      {
        src: '/images/hidden-illusion-of-bygone-landscape/four-fingers-strategy.jpg',
        alt: 'Circular strategy diagram with four orange path-forms radiating from the peak across a stippled contour map.',
        caption: 'The four fingers',
      },
      {
        src: '/images/hidden-illusion-of-bygone-landscape/echoes-of-the-land.jpg',
        alt: 'Slope comparison drawings: layered terrain profiles and a west-view elevation study of the mountain.',
        caption: 'Echoes of the land: comparing the slopes',
      },
      {
        src: '/images/hidden-illusion-of-bygone-landscape/masterplan.jpg',
        alt: 'Masterplan on an aerial photograph of forested slopes, annotating the art gallery, bikeway station and cemetery pathway.',
        caption: 'Masterplan',
      },
      {
        src: '/images/hidden-illusion-of-bygone-landscape/bicycle-station-art-gallery.jpg',
        alt: 'Two aerial renders: the bicycle station in a clearing, and the former ski station rebuilt as an open-frame art gallery.',
        caption: 'The bicycle station and the art gallery',
      },
    ],
    featured: true,
  },

  {
    slug: 'to-the-river-and-back',
    title: 'To the River and Back',
    summary:
      'A seasonal calendar for a landscape, and a river a historic town had turned its back on.',
    year: 2024,
    location: 'Magenta, Italy',
    field: 'landscape',
    disciplines: ['Landscape Architecture', 'Urban Design'],
    context: 'Built Environment & Landscape Design Studio · Semester 2',
    professors: ['Darco Pandakovic'],
    collaboration: 'Group project',
    academic: true,
    role: ['Concept design', 'Masterplan', 'Render', 'Strategy'],
    tools: ['Rhino', 'Illustrator', 'Photoshop', 'QGIS', 'Twinmotion', 'V-Ray'],
    body: [
      'Magenta sits in the heart of Italy with a deep-rooted historic centre and a set of very contemporary problems: air pollution, inefficient waste management, and congestion produced by rapid urbanisation pressing against a town that was not built for it. The Ticino runs nearby, and the town has largely stopped using it.',
      'The work is about getting back to the river. It builds a circulation system that makes the riverside reachable from the urban centre, and it treats the farmland in between as part of the design rather than as the gap between two destinations.',
      'The centrepiece is a table we called The Chess, a seasonal landscape programme mapping farmers, ranchers, students, the general public, livestock, winter and spring crops, floral meadows, rice, grass and water across the whole year. It let us align every intervention with the rhythm the place already has, so the landscape stays occupied in February as well as July.',
      'Two structures carry the design. A tower, because the site is flat and the tallest things in it are trees, elevates the view far enough to take in the river on one side and the fields on the other. A bridge crosses a riverbed that is dry for half the year, so it is designed to work wet and dry, less a crossing than an active piece of the terrain.',
      'Before any of it, we made postcards on site: Gridded Memories, a set of drawings recording light, smell and temperature, because the first impression of a place is usually the most accurate one and the easiest to lose.',
    ],
    cover: '/images/to-the-river-and-back/if-we-were-the-creator.jpg',
    coverAlt:
      'Illustrated render of a riverside meadow in flower, a couple walking through it, a willow to one side and mountains beyond a blue river under a cloud-filled sky.',
    gallery: [
      {
        src: '/images/to-the-river-and-back/concept.jpg',
        alt: 'Concept drawing: black linework tracing the river corridor with a red spine and a blue wash where the water widens.',
        caption: 'Concept: the river as a spine',
      },
      {
        src: '/images/to-the-river-and-back/existing-landscape.jpg',
        alt: 'Five stacked section drawings of the existing landscape, naming cypress, poplar, willow and the crop fields between them.',
        caption: 'Existing landscape: the species already there',
      },
      {
        src: '/images/to-the-river-and-back/landscape-strategy.jpg',
        alt: 'Matrix diagram combining hydrology, existing landscape systems and planting strategies, above eight illustrated activity cards.',
        caption: 'Landscape strategy',
      },
      {
        src: '/images/to-the-river-and-back/the-chess.jpg',
        alt: 'Large seasonal programme table charting farmers, ranchers, students, public, livestock, crops, blooms and water month by month across the year.',
        caption: 'The Chess: the landscape programme',
      },
      {
        src: '/images/to-the-river-and-back/the-tower.jpg',
        alt: 'Two renders of a timber viewing tower among trees, its stair spiralling up to stacked platforms.',
        caption: 'The tower',
      },
      {
        src: '/images/to-the-river-and-back/the-bridge.jpg',
        alt: 'Long elevation of a timber and steel bridge spanning a dry riverbed, with figures wading in the shallow water below.',
        caption: 'The bridge: built for a riverbed dry half the year',
      },
      {
        src: '/images/to-the-river-and-back/masterplan.jpg',
        alt: 'Masterplan of Magenta and the Ticino, the river in deep blue, the intervention zones in red hatch and the route picked out in dotted line.',
        caption: 'Masterplan',
      },
      {
        src: '/images/to-the-river-and-back/gridded-memories.jpg',
        alt: 'Eight gridded postcard drawings of roads, tree lines, fields and buildings recording first impressions of the site.',
        caption: 'Gridded Memories: fragments of place and space',
      },
    ],
    featured: true,
  },

  {
    slug: 'to-the-lake-and-back',
    title: 'To the Lake and Back',
    summary:
      'Arguing that the urban periphery is a network of landscapes, not the leftover of a city.',
    year: 2023,
    location: 'Desenzano del Garda, Italy',
    field: 'landscape',
    disciplines: ['Landscape Architecture', 'Urban Design'],
    context: 'Built Environment & Landscape Design Studio · Semester 1',
    professors: ['Secchi Mariadessandra'],
    collaboration: 'Group project',
    academic: true,
    role: ['Concept design', 'Masterplan'],
    tools: ['Rhino', 'Illustrator', 'Photoshop', 'QGIS', 'Twinmotion'],
    body: [
      'European territory is being reshaped by two things at once: urbanisation concentrating in metropolitan regions, and large infrastructure networks expanding across everything else. The usual reading of that is a polarisation: the major cities on one side, the overlooked periphery and the bypassed countryside on the other.',
      'The project argues against the reading. Villages and small towns, whatever their rural origins, often share built forms and urbanisation patterns with metropolitan peripheries; the boundary is far less clear-cut than the diagram suggests. What is actually there is a network of interconnected landscapes, and the interesting relationships are between infrastructure, environmental resources, settlement patterns and emerging activities, tourism among them, that drive social and economic change.',
      'The case study runs across the Po plain between the Chiese and the Oglio, from the first relief of the Pre-Alps in the north to the Apennines in the south, focusing on the stretch between the southern edge of Lake Garda and the Oglio river.',
      'The strategy organises the territory around four fingers: a structure of corridors and nodes where movement axes and key intervention areas are set against each other. Four urban-scale moves carry it into the town: reshaping the waterway, expanding green networks, a pathway to nature, and a reflected canopy that brings trees into the plaza. The final line runs north to south through the gathering space, and the lake is restored.',
    ],
    cover: '/images/to-the-lake-and-back/harmony-of-nature-and-design.jpg',
    coverAlt:
      'Render of a park with mown lawns, mature trees, a still water basin and paved paths, with people sitting and walking through it.',
    thumbFocus: 'top',
    gallery: [
      {
        src: '/images/to-the-lake-and-back/concept.jpg',
        alt: 'Concept drawing: dense black linework with a green mass and a red bar crossing it diagonally.',
        caption: 'Concept',
      },
      {
        src: '/images/to-the-lake-and-back/strategy.jpg',
        alt: 'Territorial strategy map with black infrastructural axes running north to south and orange bikeway and walkway routes.',
        caption: 'Strategy: the importance of the north–south connection',
      },
      {
        src: '/images/to-the-lake-and-back/four-fingers.jpg',
        alt: 'Strategic vision map: circular intervention zones linked by thick black movement axes over a historic survey map.',
        caption: 'Four fingers: a strategic vision for territorial organisation',
      },
      {
        src: '/images/to-the-lake-and-back/urban-isometrics.jpg',
        alt: 'Four isometric blocks titled reshaping the waterway, expanding green networks, pathway to nature and reflected canopy.',
        caption: 'Four moves at the urban scale',
      },
      {
        src: '/images/to-the-lake-and-back/masterplan.jpg',
        alt: 'Masterplan in muted greens and ochres, the connecting route running north to south through the town to the lake.',
        caption: 'Masterplan',
      },
      {
        src: '/images/to-the-lake-and-back/street-perception.jpg',
        alt: 'Two flat-colour street sections studying sightlines, skyline and traffic calming from a driver’s point of view.',
        caption: 'How street design shapes a driver’s perception',
      },
    ],
  },

  {
    slug: 'punta-bianca',
    title: 'Punta Bianca',
    subtitle: 'A customs house returned to the coast',
    summary:
      'A competition entry that keeps the ruin and adds only what is obviously new: a glass stair, a light roof, and water running down the corridor.',
    year: 2025,
    yearLabel: '2023–2026',
    location: 'Sicily, Italy',
    field: 'architecture',
    disciplines: ['Architecture'],
    context: 'Terraviva',
    contextLabel: 'Competition',
    academic: false,
    role: ['Concept', 'Presentation'],
    tools: ['Rhino', 'Illustrator', 'Photoshop'],
    body: [
      'The competition asked what to do with the former customs house at Punta Bianca, standing on the white rock of the Sicilian coast. The building had stopped being a landmark. The proposal returns it to that job: a point of reference read from the sea, and somewhere worth the walk for anyone arriving by land.',
      'The shell is kept and worked with rather than replaced. A glazed stair volume is set against the stone and a light steel and glass roof is laid over the open top floor, so everything added reads as plainly new against masonry left as it is.',
      'The ground floor takes an exhibition space and an art installation space, an entrance, changing rooms and a bar and restaurant. The floor above holds the kitchen and payment counter, a book store, a reception and ticket area, a seating and lounge area, and an ocean view point at the end of the corridor.',
      'Two moves do the work outside. The main entrance is a surface that collects and absorbs water during heavy rain or a surge, rather than shedding it. And the approach corridor runs with water down both sides with the Punta Bianca rock left overhead, so you arrive through the thing the building is there to be looked at from.',
    ],
    cover: '/images/punta-bianca/customs-house.jpg',
    coverAlt:
      'Aerial render at sunset: a two-storey stone customs house on white layered rock above the sea, with a glazed stair volume set against it and a light glass roof over the open top floor.',
    gallery: [
      {
        src: '/images/punta-bianca/concept-exploded.jpg',
        alt: 'Large exploded axonometric of the customs house, with slabs, stairs, screens and the roof structure pulled apart, and four smaller massing studies at the left in pink and grey.',
        caption: 'Concept, and the building taken apart',
      },
      {
        src: '/images/punta-bianca/technical-drawings.jpg',
        alt: 'Ground and first floor plans with numbered rooms, section marks, and a long site section running through the rock terraces below the building.',
        caption: 'Plans and the section through the rock',
      },
      {
        src: '/images/punta-bianca/renders.jpg',
        alt: 'Three interior renders: a cutaway of the exhibition floors with the stair and mesh screens, and two views of the corridor with water running at the sides and rock overhead.',
        caption: 'Inside, and the corridor with water at the sides',
      },
    ],
  },

  {
    slug: 'elahie-urban-playground',
    title: 'Elahie Urban Playground',
    summary:
      'A playground built as one continuous spatial experience rather than a set of installed facilities.',
    year: 2023,
    yearLabel: '2023 · under construction',
    location: 'Tehran, Iran',
    field: 'architecture',
    disciplines: ['Architecture', 'Landscape Architecture'],
    context: 'Professional work',
    academic: false,
    role: ['Design'],
    tools: ['Rhino', 'Illustrator', 'Photoshop', 'Twinmotion'],
    body: [
      'The aim was to fix the relationship between children and the facilities a city offers them, to make somewhere children feel safe enough to play freely, and to treat that as an urban question rather than an equipment question.',
      'The design uses traditional and locally sourced materials, and shapes architectural form rather than installing play structures. Play is handled as an integrated spatial experience: walls, levels, ramps and openings that can be used in more than one way, instead of a fixed set of predefined activities.',
      'A single red element runs through the middle of the plan. It is the heart of the project and also its main circulation, so the thing you move along and the thing you play on are the same object.',
    ],
    cover: '/images/elahie-urban-playground/isometric.jpg',
    coverAlt:
      'Isometric render of a playground in terracotta and yellow: curved walls, ramps, steps and circular openings threaded through with trees and planting.',
    thumbFocus: 'bottom',
    gallery: [
      {
        src: '/images/elahie-urban-playground/concept-sketch.jpg',
        alt: 'Concept sketch of the playground in orange and yellow over loose black linework, with a flat colour elevation below.',
        caption: 'Concept and elevation',
      },
    ],
    featured: true,
  },


  {
    slug: 'milan-interiors',
    title: 'Milan Interiors',
    subtitle: 'Four commissions for GN Architetti',
    summary:
      'Presentation drawings made to settle a decision with a client: two flats, a nail salon and a villa, each drawn to be read by whoever is paying for it.',
    year: 2026,
    yearLabel: 'Jan–Feb 2026',
    location: 'Milan, Italy',
    field: 'architecture',
    disciplines: ['Interior Design', 'Architecture'],
    context: 'GN Architetti',
    academic: false,
    role: ['Presentation', 'Interior design', 'Drawing'],
    tools: ['Illustrator', 'Photoshop', 'Rhino', 'AutoCAD'],
    body: [
      'Four commissions in the same Milan office, each drawn to be understood by a client rather than by another architect. That is the whole brief in this kind of work: make the decision legible before anyone builds it.',
      'The nail salon is a pair of cutaway isometrics, the same room from two sides, so the arched joinery and the seating line can be read against the plan they sit in.',
      'For the first residential house the concept was two clear corridors with long sightlines into the living room: unnecessary walls removed, kitchen and living integrated, contrasting materials marking the zones, and wasted space turned into built-in closets. A before and after plan carries it, with new furniture, pavement and concept picked out in three colours, and two isometrics take the same flat from opposite corners.',
      'The Gegè Miao flat came down to a small room and a hard constraint: the dollhouse needed a home and the drawer had to stay. The shelving was worked until both fitted. Villa Lezhe is a single isometric of the villa, its layout and its outdoor spaces, made for client review.',
      'These took between two and eight hours each. That is what presentation work is, and it is listed here as presentation work.',
    ],
    cover: '/images/gn-architetti/villa-lezhe.jpg',
    coverAlt:
      'Isometric illustration of a three-storey villa in sand and olive tones, with a roof terrace, a pool, planted garden and a road running past between drawn trees.',
    thumbFocus: 'left',
    gallery: [
      {
        src: '/images/gn-architetti/nail-salon.jpg',
        alt: 'Two cutaway isometrics of a nail salon on a tan ground, showing arched joinery, a curved counter and seating from opposite corners.',
        caption: 'Nail salon, the same room from two sides',
      },
      {
        src: '/images/gn-architetti/residential-concept.jpg',
        alt: 'Isometric of a flat with two olive-toned volumes lifted away above the plan on dotted lines, showing the corridors the concept opens up.',
        caption: 'Two corridors, and the walls that had to go',
      },
      {
        src: '/images/gn-architetti/plans-before-after.jpg',
        alt: 'Current and proposed plans side by side on a grey ground, with new furniture, pavement and concept keyed in violet, ochre and olive.',
        caption: 'Current situation, and the solution',
      },
      {
        src: '/images/gn-architetti/residential-isometrics.jpg',
        alt: 'Two wireframe isometrics of the same flat from opposite corners, with solid dark ceiling beams over an otherwise transparent shell.',
        caption: 'The flat from both corners',
      },
      {
        src: '/images/gn-architetti/gege-miao-shelves.jpg',
        alt: 'Interior render of a living room: a stepped stone-veneer shelving unit holding books and plants, beside a pale door and a blue built-in bench.',
        caption: 'Gegè Miao: shelving worked until it fitted',
      },
      {
        src: '/images/gn-architetti/small-room.jpg',
        alt: 'Render of a small room with a wall-mounted dollhouse, floating shelves, a pale chest of drawers and a desk against a blue built-in bed.',
        caption: 'The dollhouse found a home and the drawer stayed',
      },
    ],
  },

  {
    slug: 'four-and-seven-interiors',
    title: 'Indoor Playgrounds and a Boutique',
    subtitle: 'Design and presentation for 4&7',
    summary:
      'Three interiors drawn as cutaway isometrics, where the drawing has to design the space and sell it at the same time.',
    year: 2025,
    yearLabel: '2021–2025',
    location: 'Tehran, Iran',
    field: 'architecture',
    disciplines: ['Interior Design', 'Architecture'],
    context: '4&7 Studio Design',
    academic: false,
    role: ['Design', 'Presentation'],
    tools: ['Rhino', 'Illustrator', 'Photoshop', 'Twinmotion'],
    body: [
      'Three interiors for the same studio, all drawn the same way: the building cut open at an angle so the whole thing can be taken in at once. In this kind of work the drawing is doing two jobs, designing the space and selling it, and the second job is why it is cut open at all.',
      'The first indoor playground stacks nets, stairs, tube slides and mezzanines into a section of a building, in teal, ochre and terracotta, with a small white key isometric alongside placing the play volume inside the shell.',
      'The boutique is drawn by exactly the same method and reads nothing like it: pale stone, vaulted display bays, arched mirrors and a deep green shopfront, with the same key isometric locating it in plan.',
      'The second playground is denser and more sectional, a climbing frame with rope bridges, a maze wall and a slide tower set against a glazed roof. Role on all three was design and presentation.',
    ],
    cover: '/images/four-and-seven-interiors/indoor-playground.jpg',
    coverAlt:
      'Cutaway isometric of an indoor playground in teal, ochre and terracotta: circular nets, spiral stairs, tube slides and mezzanine walkways stacked through several levels.',
    thumbFocus: 'left',
    gallery: [
      {
        src: '/images/four-and-seven-interiors/boutique.jpg',
        alt: 'Cutaway isometric of a boutique in pale stone and violet, with vaulted display bays, arched mirrors and a green shopfront, and a small key isometric at the right.',
        caption: 'The same method, a very different room',
      },
      {
        src: '/images/four-and-seven-interiors/indoor-playground-two.jpg',
        alt: 'Cutaway isometric of a second indoor playground: a rope climbing frame, a maze wall, a slide tower and a cafe terrace under a glazed roof.',
        caption: 'Denser, and more sectional',
      },
    ],
  },

  {
    slug: 'roshano-land',
    title: 'Roshano Land',
    subtitle: 'An amusement park in the Chamran Complex',
    summary:
      'Eleven hundred square metres of movement and skill-based playground, sketched, detailed and built.',
    year: 2021,
    location: 'Chamran Complex, Iran',
    field: 'architecture',
    disciplines: ['Architecture', 'Interior Design'],
    context: 'Karoshan Studio',
    academic: false,
    role: ['Presentation'],
    tools: ['Rhino', 'Illustrator', 'Photoshop', 'Twinmotion'],
    body: [
      'An amusement park of 1,100 square metres in the Chamran Complex, designed in 2021 and built. A movement and skill-based playground rather than a themed one: what is on offer is what a body can do, not a story it is asked to believe.',
      'The board pairs sketch with render twice over. A hand drawing of the entrance masses sits beside the finished space in orange, green and yellow; a line perspective of the long hall sits beside the same view built. Putting them next to each other is the argument, that the drawing and the room are the same thing at two moments.',
      'My part was the presentation.',
    ],
    cover: '/images/roshano-land/sketch-to-space.jpg',
    coverAlt:
      'A strip of four images alternating hand sketch and finished render: entrance masses in line, then the same space in orange and green, then a line perspective of the long hall, then the built hall.',
    gallery: [],
  },

  {
    slug: 'roboteos',
    title: 'Roboteos',
    summary:
      'Full identity for a robotics company, from the mark through the brand book to the website.',
    year: 2024,
    yearLabel: '2023–2025',
    location: 'Iran',
    field: 'graphic',
    disciplines: ['Brand Identity', 'Graphic Design'],
    context: 'Roboteos Inc.',
    academic: false,
    role: ['Logo', 'Brand book', 'Stationery', 'Catalogue', 'UI design', 'Website'],
    tools: ['Illustrator', 'Photoshop', 'InDesign', 'Figma'],
    body: [
      'Roboteos is a technology company working on smart robotic solutions. Its main product, Heliotrope 1.0, is a solar tracking system for recreational vehicles that raises energy efficiency by following the sun.',
      'The identity is built on a single orange mark that reads as both a tracking head and a sun. It runs across stationery, envelopes, business cards, signage and vehicle livery, and is documented in a brand book covering 2023 to 2025.',
      'The same system carries into the product interface and the website, so the assembly screen a technician uses and the letterhead a client receives are recognisably the same company.',
    ],
    cover: '/images/roboteos/identity.jpg',
    coverAlt:
      'Roboteos brand identity laid out in orange and white: logo construction grid, envelope, business cards, letterhead, signage and a black service van.',
    gallery: [
      {
        src: '/images/roboteos/ui-and-website.jpg',
        alt: 'Product interface on a tablet with a large circular GO control, and the Roboteos website shown on a desktop monitor.',
        caption: 'Interface and website',
      },
      {
        src: '/images/roboteos/book-covers.jpg',
        alt: 'A set of printed covers including the Roboteos brand book, a playground design proposal and an institute publication.',
        caption: 'Printed covers',
      },
    ],
    featured: true,
  },

  {
    slug: 'heliotrope',
    title: 'Heliotrope',
    summary:
      'Product campaign and catalogue for a solar tracker built for life on the road.',
    year: 2024,
    location: 'Iran',
    field: 'graphic',
    disciplines: ['Graphic Design'],
    context: 'Roboteos Inc.',
    academic: false,
    role: ['Illustration', 'Catalogue design', 'Campaign'],
    tools: ['Illustrator', 'Photoshop', 'InDesign'],
    body: [
      'Heliotrope 1.0 is Roboteos’ solar tracking system for RVs and camper vans. The campaign had to sell an engineering idea to people whose interest is the trip, not the hardware.',
      'The answer was to draw the trip. A flat isometric desert (highway, power line, cacti, a van parked on the shoulder with the array open) puts the product where it is used rather than on a white studio sweep.',
      'The catalogue then does the technical work: specifications, peak power, extension and rotation ranges, and mounting, laid out so the numbers stay findable inside a document that is still recognisably part of the campaign.',
    ],
    cover: '/images/heliotrope/campaign.jpg',
    coverAlt:
      'Flat isometric illustration of a desert highway in ochre and sand, a white camper van with a roof-mounted solar array, and the word Heliotrope set large below.',
    gallery: [
      {
        src: '/images/heliotrope/catalogue.jpg',
        alt: 'Trifold catalogue spread and a black product brochure showing specifications and a vehicle at night.',
        caption: 'Catalogue and brochure',
      },
    ],
  },

  {
    slug: 'four-and-seven',
    title: 'Four and Seven',
    summary:
      'An identity for an architecture practice that builds for children: sharp colour, held to an architectural grid.',
    year: 2023,
    yearLabel: '2021–2025',
    location: 'Iran',
    field: 'graphic',
    disciplines: ['Brand Identity', 'Graphic Design', 'Architecture'],
    context: 'Four and Seven',
    academic: false,
    role: ['Logo', 'Brand book', 'Stationery', 'Interior design'],
    tools: ['Illustrator', 'Photoshop', 'InDesign', 'Rhino'],
    body: [
      'Four and Seven is an architecture and construction company specialising in children’s architecture. The brief was to stay sensitive to sharp colour while keeping a creative, minimal and architectural approach, playful without becoming a toy.',
      'The mark is drawn on a construction grid and resolves into a form that works at signage size and on a business card. Green does the talking; the geometry keeps it disciplined.',
      'The work did not stop at the identity. The same projects run from sketch to built interior: a drawing of a play space and a photograph of the finished room, arches, colour and joinery included.',
    ],
    cover: '/images/four-and-seven/identity.jpg',
    coverAlt:
      'Four and Seven identity in green and white: logo construction grid, envelope, business cards, letterhead and a looping brand illustration.',
    gallery: [
      {
        src: '/images/four-and-seven/concept-to-built-form.jpg',
        alt: 'Sketches of children’s play interiors paired with photographs of the finished rooms, showing arches, ramps and colour built as drawn.',
        caption: 'From design concept to built form',
      },
    ],
    featured: true,
  },

  {
    slug: 'architectural-graphics',
    title: 'Architectural Graphics',
    summary:
      'The drawings that carry an architectural argument: exploded axonometrics, competition boards, postcards.',
    year: 2024,
    yearLabel: '2019–2025',
    location: 'Milan, Italy',
    field: 'graphic',
    disciplines: ['Graphic Design', 'Architecture', 'Drawing'],
    academic: false,
    role: ['Diagrams', 'Board layout', 'Illustration'],
    tools: ['Illustrator', 'Photoshop', 'InDesign', 'Rhino'],
    body: [
      'This is the seam the rest of the portfolio runs along: architectural thinking presented as graphic design, by the same hand that did the architecture.',
      'The exploded axonometric diagrams take a multi-layered approach to spatial design. One side works through landscape transformation: topography, water management, ecological integration. The other works through architectural and urban space: public space, interior programming, functional relationships. Pulling the layers apart is what makes the composition legible.',
      'The competition and studio boards were made in the role of the group’s graphic designer during university: large-format sheets that have to hold a masterplan, a programme table, sections and photographs in one readable field.',
    ],
    cover: '/images/architectural-graphics/exploded-diagrams.jpg',
    coverAlt:
      'Exploded axonometric diagrams: stacked landscape strata on one side and a coloured children’s play interior pulled apart into layers on the other.',
    thumbFocus: 'right',
    gallery: [
      {
        src: '/images/architectural-graphics/posters.jpg',
        alt: 'Two large-format architectural posters combining maps, aerial photography, isometric details and masterplans.',
        caption: 'Architectural posters',
      },
      {
        src: '/images/architectural-graphics/boards.jpg',
        alt: 'Competition boards including a masterplan titled A Dialogue with Water and a full landscape programme table.',
        caption: 'Boards',
      },
      {
        src: '/images/architectural-graphics/postcards.jpg',
        alt: 'Eight gridded postcard illustrations of roads, poplars, fields and rooflines in muted colour over a drafting grid.',
        caption: 'Postcards',
      },
    ],
  },

  {
    slug: 'selected-sketches',
    title: 'Selected Sketches',
    summary: 'Pen and pencil, 2022–2024. Mountains, hill towns, trees, a viaduct.',
    year: 2024,
    yearLabel: '2022–2024',
    location: 'Italy and Iran',
    field: 'landscape',
    disciplines: ['Drawing'],
    academic: false,
    role: ['Drawing'],
    tools: ['Pen', 'Pencil'],
    body: [
      'Drawing is how the rest of the work starts. These are selected sheets from 2022 to 2024: mountain ranges and rock stacks, hill towns and a monastery, gnarled wood and bare winter trees, a viaduct cut into a cliff.',
      'They are included because they are the most direct evidence of how the projects are thought through before any software is opened.',
    ],
    cover: '/images/selected-sketches/sketches.jpg',
    coverAlt:
      'A loose grid of pen and pencil sketches: mountain ranges, rock formations, a hill town, twisting wood grain, bare trees and a cliffside viaduct.',
    gallery: [
      {
        src: '/images/selected-sketches/sketches-left.jpg',
        alt: 'Pen sketches of isometric building studies, dunes, twisting wood grain, a mountain peak and rock stacks.',
      },
      {
        src: '/images/selected-sketches/sketches-right.jpg',
        alt: 'Pen sketches of a hill town, a monastery, mountain ranges, a coastal headland and a cliffside viaduct.',
      },
    ],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

/**
 * DORMANT. Nothing renders this: the home page offers the three field circles
 * instead of a selected-work run, so setting `featured: true` on a project has
 * no visible effect today. The flags are kept because they record which work MJ
 * put forward, and a future selected strip would want them.
 */
export const featuredProjects = () => projects.filter((p) => p.featured)

export const byField = (field: Field) => projects.filter((p) => p.field === field)

/** Newest first, with the built and professional work ahead of academic at equal year. */
export const sorted = () =>
  [...projects].sort(
    (a, b) => b.year - a.year || Number(a.academic ?? false) - Number(b.academic ?? false),
  )
