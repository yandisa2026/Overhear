// Overhear — destination data
// Each destination is broken into timed narration sections (like an audio track).
// durationSec is an estimate used to drive the timestamp labels and progress UI.

const DESTINATIONS = [
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    continent: "Asia",
    lat: 35.0116,
    lng: 135.7681,
    tags: ["temples", "slow living", "seasons"],
    teaser: "A city that still runs on the sound of wooden sandals and temple bells.",
    accent: "#C96A3E",
    sections: [
      {
        time: "00:00",
        title: "Landscape",
        durationSec: 42,
        text: "Kyoto sits in a shallow bowl of hills, which is why summers hang heavy and humid, and winters bring a damp cold that gets into your coat. The Kamo River splits the city in two, and locals walk it the way other cities use a park. In the hills to the east and west, over a thousand temples and shrines are folded into the maple forests, so the skyline you notice isn't towers, it's pagoda roofs breaking through the trees."
      },
      {
        time: "00:42",
        title: "Daily life",
        durationSec: 48,
        text: "Most Kyoto residents you'll pass are not in kimono, they're in office clothes, riding one-speed bicycles with a child seat on the back. Small family shops still open at dawn to steam bean paste or slice tofu that will be sold within the hour. Convenience stores sit directly across from three-hundred-year-old wooden merchant houses, and nobody finds that strange, because in Kyoto the old and the ordinary have always shared the same street."
      },
      {
        time: "01:30",
        title: "Culture & ritual",
        durationSec: 45,
        text: "Tea ceremony, ikebana flower arranging, and Noh theatre were refined here, and you can still study any of them from a working teacher, not a museum display. Shrine festivals called matsuri close streets for portable floats carried on shoulders, drums setting the pace. Even a simple bow at a shrine gate follows an order: coins, bow twice, clap twice, pray, bow once, and most visitors are welcome to try it."
      },
      {
        time: "02:15",
        title: "Before you go",
        durationSec: 40,
        text: "Cash still matters more than cards in small shops and temple ticket booths. Many famous sights are quietest right at opening, before tour buses arrive. And a wooden ryokan inn with a shared bath will teach you more about Kyoto in one night than a week of temple-hopping."
      }
    ]
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    continent: "Africa",
    lat: 31.6295,
    lng: -7.9811,
    tags: ["markets", "desert edge", "family life"],
    teaser: "The medina never really goes quiet, it just changes what it's selling.",
    accent: "#B5622A",
    sections: [
      {
        time: "00:00",
        title: "Landscape",
        durationSec: 40,
        text: "Marrakech sits where the fertile Haouz plain runs up against the snow-capped Atlas Mountains, close enough that on a clear winter morning you can see snow from a rooftop terrace in a city that rarely drops below fifteen degrees. The old medina is walled in red clay-colored stone, and that colour, a dusty terracotta, is protected by local building codes, so almost everything you see, old or new, matches."
      },
      {
        time: "00:40",
        title: "Daily life",
        durationSec: 46,
        text: "Family life is loud in the warmest sense, extended families often share a riad courtyard house across generations, and doors opening onto blank alley walls hide gardens and fountains inside. Men gather in cafes over mint tea and football, women run much of the household economy from home-based textile and food work. The call to prayer, five times a day, is the closest thing the city has to a shared clock."
      },
      {
        time: "01:26",
        title: "Culture & ritual",
        durationSec: 44,
        text: "Jemaa el-Fnaa square turns from orange juice stalls and snake charmers by day into a vast open-air food market by night, with the same families running the same stalls for generations. Hospitality is a near-sacred duty, refusing offered tea can read as an insult. Haggling in the souks isn't rudeness, it's the expected conversation, a fair price is one both sides feel good about, not the lowest possible number."
      },
      {
        time: "02:10",
        title: "Before you go",
        durationSec: 38,
        text: "Modest dress is appreciated even though the city is used to tourists. Fridays are quieter, many shops close for midday prayer. And it is genuinely easy to get lost in the medina's alleys, which locals will tell you is half the point."
      }
    ]
  },
  {
    id: "cusco",
    name: "Cusco",
    country: "Peru",
    continent: "South America",
    lat: -13.5320,
    lng: -71.9675,
    tags: ["mountains", "living tradition", "altitude"],
    teaser: "An Inca capital where the old stonework is still load-bearing.",
    accent: "#2F6B5E",
    sections: [
      {
        time: "00:00",
        title: "Landscape",
        durationSec: 40,
        text: "Cusco sits at over three thousand four hundred metres in the Andes, high enough that most visitors feel it in their lungs for the first day or two. The city was built as the ceremonial center of the Inca empire, and colonial buildings were literally constructed on top of Inca stone foundations, so a wall can shift from tightly fitted, mortar-free Inca stonework at the base to Spanish brick above it, in a single glance."
      },
      {
        time: "00:40",
        title: "Daily life",
        durationSec: 46,
        text: "Quechua, the language of the Inca, is still spoken daily alongside Spanish, especially in surrounding villages. Markets like San Pedro run on barter-adjacent trust, a vendor will let a regular customer pay tomorrow. Coca leaf, chewed or brewed as tea, is a normal part of daily life here, both a mild stimulant and a traditional remedy for the altitude, not a novelty for visitors."
      },
      {
        time: "01:26",
        title: "Culture & ritual",
        durationSec: 44,
        text: "Inti Raymi, the Festival of the Sun, reenacts an Inca ceremony each June and is one of the largest indigenous festivals in South America. Offerings to Pachamama, mother earth, are still made before construction, planting, or big decisions, poured onto the ground rather than spoken alone. Textile weaving carries encoded stories and family identity in its patterns, passed from mother to daughter."
      },
      {
        time: "02:10",
        title: "Before you go",
        durationSec: 38,
        text: "Spend a day or two adjusting to altitude before hiking, coca tea genuinely helps. Many archaeological sites require a tourist ticket bought in advance. And prices in the historic center rise fast near festival dates, so surrounding neighborhoods are often the better base."
      }
    ]
  },
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    lat: -33.9249,
    lng: 18.4241,
    tags: ["ocean", "mountains", "contrast"],
    teaser: "A city where two oceans, a mountain, and a complicated history all meet at once.",
    accent: "#1E6E8C",
    sections: [
      {
        time: "00:00",
        title: "Landscape",
        durationSec: 42,
        text: "Cape Town sits where the Atlantic and Indian Ocean currents nearly meet, which is why one beach can be numbingly cold and another, twenty minutes away, comfortably warm. Table Mountain rises flat-topped directly behind the city center, often capped by a rolling cloud locals call the tablecloth. The wind, a strong summer southeasterly known as the Cape Doctor, shapes everything from surf conditions to which side of the mountain restaurants build their terraces on."
      },
      {
        time: "00:42",
        title: "Daily life",
        durationSec: 48,
        text: "The city is still shaped by apartheid-era planning, and that's visible in daily commutes, many residents travel long distances from townships like Khayelitsha into the city for work. Braai, a slow wood or charcoal barbecue, is closer to a weekly ritual than a meal, gathering extended family and neighbours regardless of income level. Minibus taxis, privately run and route-flexible, move more people daily than the formal bus system."
      },
      {
        time: "01:30",
        title: "Culture & ritual",
        durationSec: 45,
        text: "Cape Malay cuisine, brought by enslaved and indentured people from Southeast Asia centuries ago, shows up in dishes like bobotie and remains a distinct culinary thread from the rest of South African cooking. The Bo-Kaap neighbourhood's brightly painted houses are tied to that same Cape Malay community, not a design choice made for tourists. Township tours run by residents themselves have become a way to see a fuller, more honest version of the city than the waterfront alone shows."
      },
      {
        time: "02:15",
        title: "Before you go",
        durationSec: 40,
        text: "Weather changes fast, layers matter more than a forecast. Table Mountain's cable car closes in high wind, so build in a spare day if it's a priority. And a guided township visit, booked through a community-run operator, tends to be far more worthwhile than a drive-through version."
      }
    ]
  },
  {
    id: "reykjavik",
    name: "Reykjavík",
    country: "Iceland",
    continent: "Europe",
    lat: 64.1466,
    lng: -21.9426,
    tags: ["geothermal", "small-town", "extreme light"],
    teaser: "A capital small enough that the mayor might be in the pool lane next to you.",
    accent: "#3E5C76",
    sections: [
      {
        time: "00:00",
        title: "Landscape",
        durationSec: 40,
        text: "Reykjavík is a small, low-rise capital, colourful corrugated-metal houses spread along a harbour, with volcanic hills and the sea never far from view. The entire city is heated by geothermal water pumped up from underground, so radiators and swimming pools run hot with almost no fossil fuel involved. In summer the sun barely sets, and in deep winter it barely rises, both of which reshape how people structure a day."
      },
      {
        time: "00:40",
        title: "Daily life",
        durationSec: 46,
        text: "Public geothermal pools, not bars, are the real social centre of the city, people of every age soak in hot tubs called heitir pottar and talk politics before work. The population is small enough, around a third of a million nationally, that public figures and neighbours genuinely cross paths in daily errands. Coffee culture runs deep and slow, a single cup can anchor an hour-long conversation."
      },
      {
        time: "01:26",
        title: "Culture & ritual",
        durationSec: 42,
        text: "Belief in hidden folk, elves and huldufólk tied to the landscape, still occasionally influences road planning around certain rock formations, taken seriously enough to matter, half-seriously enough to smile about. Sagas, centuries-old family and adventure stories, are still widely read and quoted. Naming follows patronymics, most people are known by their first name even formally, since surnames simply mean child of their father or mother."
      },
      {
        time: "02:08",
        title: "Before you go",
        durationSec: 36,
        text: "Tap water is some of the cleanest on earth and safe everywhere. Renting a car opens up far more than the city itself. And pack layers for all four seasons regardless of the month, the weather can turn within an hour."
      }
    ]
  },
  {
    id: "bali",
    name: "Ubud",
    country: "Indonesia (Bali)",
    continent: "Asia",
    lat: -8.5069,
    lng: 115.2625,
    tags: ["rice terraces", "ceremony", "community"],
    teaser: "A town where a temple ceremony can reroute traffic without anyone minding.",
    accent: "#4C7A3E",
    sections: [
      {
        time: "00:00",
        title: "Landscape",
        durationSec: 40,
        text: "Ubud sits inland among terraced rice paddies carved into the hills, fed by a centuries-old irrigation system called subak that's cooperatively managed by farmer collectives, not individual landowners. Rivers cut steep jungle gorges through the town, and the air stays a few degrees cooler here than on Bali's coast. Roosters, temple bells, and gamelan practice are the actual soundtrack, more than traffic."
      },
      {
        time: "00:40",
        title: "Daily life",
        durationSec: 46,
        text: "Small offerings called canang sari, palm-leaf trays of flowers and rice, appear on doorsteps and sidewalks each morning, placed fresh daily regardless of tourist foot traffic. Balinese Hinduism shapes the calendar more than the Gregorian one, with its own 210-day ritual cycle. Extended families often live in a single family compound with its own household temple, generations sharing the same walled property."
      },
      {
        time: "01:26",
        title: "Culture & ritual",
        durationSec: 46,
        text: "Ceremonies, from cremations to temple anniversaries called odalan, are frequent and can shut down a street with a procession, an event locals treat as ordinary life rather than a show. Gamelan orchestras and Legong dance are still taught village to village, not staged solely for visitors. Purification and blessing rituals, sometimes involving holy water from a specific spring, remain a normal part of major life events."
      },
      {
        time: "02:12",
        title: "Before you go",
        durationSec: 38,
        text: "A sarong is required at most temples and easy to rent at the entrance. Ceremony days can close roads without warning, so it helps to build slack into plans. And tipping isn't required but is genuinely appreciated for guides and drivers."
      }
    ]
  },
  {
    id: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    continent: "Asia",
    lat: 21.0278,
    lng: 105.8342,
    tags: ["street food", "lakes", "old quarter"],
    teaser: "A city that eats breakfast on tiny plastic stools, standing room only.",
    accent: "#A63D40",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Hanoi wraps around Hoan Kiem Lake and West Lake, with the Red River flowing past a city that still floods seasonally, shaping where people build and how they move. The Old Quarter's 36 streets are each historically named for the single trade once sold there, silk street, tin street, and many still specialize today." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Motorbikes outnumber cars by a huge margin, and crossing the street means walking steadily so drivers can predict your path, stopping halfway is the actual danger. Street food stalls, often just a cart and low stools, open at specific hours for specific dishes, a pho stall in the morning becomes something else by evening." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Ancestor worship shapes daily life, small altars with fruit and incense sit in homes and shops alike, refreshed regularly. Water puppetry, performed in a pool of water with puppeteers hidden behind a screen, began centuries ago in flooded rice paddies. Tet, the lunar new year, empties the city as families travel to ancestral villages." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Bargaining is expected in markets but not in restaurants with printed menus. Traffic looks chaotic but has its own rhythm, watch locals cross first. And plastic stool street food is often better than the restaurant next to it." }
    ]
  },
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    continent: "Asia",
    lat: 26.9124,
    lng: 75.7873,
    tags: ["forts", "color", "markets"],
    teaser: "An entire old city painted the same shade of pink, by royal decree.",
    accent: "#D9642C",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Jaipur sits on the edge of the Thar Desert, ringed by the Aravalli hills where forts like Amber and Nahargarh sit on ridgelines overlooking the city. The old city, painted a uniform terracotta pink since 1876 to welcome a royal visitor, is still required by law to keep that color today." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"The old city runs on tightly packed bazaars, each specializing in one craft, jewelry lane, textile lane, spice lane, largely unchanged in layout for centuries. Family-run workshops still hand-block print textiles and cut gemstones in the same buildings their grandparents used. Chai stalls anchor most street corners as informal meeting points." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Jaipur is part of Rajasthan's living royal culture, the City Palace's royal family still resides there, and festivals like Teej and Gangaur fill streets with processions and traditional dress. Block printing, gemstone cutting, and blue pottery are recognized crafts passed within families for generations, not revived for tourism." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Bargaining hard in bazaars is normal and expected. Forts are best visited early to avoid both heat and crowds. And modest dress is appreciated when visiting temples within the old city." }
    ]
  },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    continent: "Europe",
    lat: 41.0082,
    lng: 28.9784,
    tags: ["bridges of continents", "markets", "layered history"],
    teaser: "The only city where you can have breakfast in Europe and lunch in Asia.",
    accent: "#2D5F6B",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Istanbul straddles the Bosphorus strait, physically split between Europe and Asia, with ferries functioning as daily commuter transport rather than tourist novelty. Seven hills on the European side shape a skyline of domes and minarets visible from almost anywhere on the water." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Ferry commuting is routine, many residents cross continents twice a day for work, tea in small tulip-shaped glasses served constantly in shops and offices. The Grand Bazaar and Spice Bazaar are still working markets for locals, not just visitors, alongside newer malls and delivery apps." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Istanbul carries layers from Byzantine, Ottoman, and modern Turkish history often within a single building, the Hagia Sophia has been a church, mosque, museum, and mosque again. The call to prayer from hundreds of mosques overlaps audibly across the city five times daily, a genuine part of the ambient soundscape." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"A ferry ride across the Bosphorus is one of the cheapest, best things to do, not just a tourist boat tour. Modest dress is needed to enter active mosques. And the public tram and ferry network is easy and cheap once you get an Istanbulkart transit card." }
    ]
  },
  {
    id: "seoul",
    name: "Seoul",
    country: "South Korea",
    continent: "Asia",
    lat: 37.5665,
    lng: 126.9780,
    tags: ["palaces", "night life", "tech culture"],
    teaser: "Five-hundred-year-old palaces sit blocks from twenty-four-hour convenience culture.",
    accent: "#5B4B8A",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Seoul sits along the Han River, ringed by granite mountains that stay surprisingly close to the dense downtown, several are an easy subway ride and short hike from skyscraper districts. The city rebuilt almost entirely after the Korean War, so old palaces sit directly among modern high-rises." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Convenience stores function as informal late-night cafes with seating, students and office workers alike use them for a quick meal at any hour. The subway is exceptionally fast, cheap, and used by nearly everyone regardless of income. Skincare and coffee culture both run deep, a good cafe is treated seriously." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Confucian-influenced respect for age and hierarchy still shapes speech, with different verb endings used depending on who you're addressing. Palace changing-of-the-guard ceremonies at Gyeongbokgung reenact Joseon dynasty routines daily. K-pop and gaming culture are taken seriously as both industry and civic pride, not treated as a fad." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"A T-money transit card works on subways, buses, and even some convenience store purchases. Tipping isn't expected anywhere. And many palaces are free to enter if you wear a rented traditional hanbok outfit." }
    ]
  },
  {
    id: "chiang-mai",
    name: "Chiang Mai",
    country: "Thailand",
    continent: "Asia",
    lat: 18.7883,
    lng: 98.9853,
    tags: ["temples", "mountains", "slow pace"],
    teaser: "Over three hundred temples inside a city that still feels unhurried.",
    accent: "#7A8B4A",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Chiang Mai sits in a mountain valley in northern Thailand, cooler and greener than Bangkok, ringed by forested hills including Doi Suthep, topped with a golden temple visible from parts of the city. A square moat and old brick wall still mark the boundaries of the original walled city." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Life moves noticeably slower than in Bangkok, morning alms-giving to monks still happens on residential streets. Weekend walking street markets turn entire roads into food and craft stalls run by local families. Songthaew shared pickup trucks function as informal shared taxis throughout the city." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Lanna culture, the historic northern Thai kingdom, shows up in distinct temple architecture, dialect, and cuisine different from central Thailand. Yi Peng and Loy Krathong festivals fill the sky and rivers with lanterns and floating offerings, a genuine spiritual practice as much as spectacle. Monks are a visible, respected daily presence, not a photo backdrop." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Burning season, around February to April, brings heavy smoke haze from agricultural fires, worth checking before booking. Modest dress matters at temples. And a scooter is the easiest way to reach surrounding mountain villages, though traffic norms differ from home." }
    ]
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    continent: "Europe",
    lat: 38.7223,
    lng: -9.1393,
    tags: ["hills", "tiles", "ocean light"],
    teaser: "A city of seven hills where every tram ride is also a viewpoint.",
    accent: "#D98E3B",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Lisbon is built across steep hills above the Tagus River estuary, close enough to the Atlantic that ocean light and sea breeze shape the whole city. Historic yellow trams climb grades too steep for regular buses, still used as real public transport, not just a tourist ride." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Pasteis de nata, custard tarts, are a genuine daily habit alongside strong coffee, sold at neighborhood bakeries rather than only tourist shops. Hand-painted azulejo tiles cover building facades citywide, both decorative and once used for house numbering and street names. Fado music, melancholic and sung in small clubs, remains a living tradition, not a museum piece." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Fado, recognized by UNESCO, is performed in small intimate tascas where silence is expected during a song. Saint Anthony's Festival in June fills neighborhoods with grilled sardines and street parties, a genuinely communal, unpretentious celebration. Portugal's history of maritime exploration is a point of national identity still reflected in monuments and museums." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"The steep hills mean comfortable shoes matter more than in most cities. Tram 28 is scenic but pickpocket-prone, hold belongings carefully. And many miradouro viewpoints are free and better than paid attractions." }
    ]
  },
  {
    id: "prague",
    name: "Prague",
    country: "Czech Republic",
    continent: "Europe",
    lat: 50.0755,
    lng: 14.4378,
    tags: ["castles", "beer culture", "gothic streets"],
    teaser: "A castle complex large enough to be its own small town, still in daily use.",
    accent: "#5C4A72",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Prague sits along the Vltava River, overlooked by Prague Castle, one of the largest ancient castle complexes in the world and still the seat of the Czech president. The city largely escaped bombing in World War Two, so its gothic and baroque old town survives mostly intact." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Beer is genuinely cheaper than bottled water in many pubs, and beer gardens function as normal social spaces for all ages, not just nightlife. Trams and a clean, deep metro system move most residents daily. Small neighborhood pubs called hospodas serve as informal community centers." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"The Astronomical Clock in Old Town Square, working since the 1400s, still draws a small crowd on the hour for its mechanical figures. Czech puppet theatre and marionette-making are a recognized craft tradition. Beer brewing traditions in the region predate the modern Czech state itself by centuries." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Old Town gets crowded fast, mornings are noticeably quieter. Tipping around ten percent is appreciated but not obligatory. And a short trip up the Vltava on a local ferry beats a paid river cruise for the price." }
    ]
  },
  {
    id: "athens",
    name: "Athens",
    country: "Greece",
    continent: "Europe",
    lat: 37.9838,
    lng: 23.7275,
    tags: ["ancient ruins", "island gateway", "long meals"],
    teaser: "A three-thousand-year-old hill sits in the middle of a modern working city.",
    accent: "#2E7D6B",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Athens spreads across a basin ringed by mountains, with the Acropolis rising directly from the center, visible from most neighborhoods. The city is a gateway to the Aegean islands, with a busy port at Piraeus moving both locals and ferry travelers daily." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Meals run long and social, dinner rarely starts before nine at night, and cafes are used for hours-long conversation, not quick coffee. Neighborhood markets called laiki set up on specific streets on fixed weekdays, a genuine grocery habit for residents. Economic hardship in past years reshaped parts of the city, visible alongside its ancient core." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Orthodox Easter is a bigger celebration than Christmas, with midnight services and fireworks across neighborhoods. Ancient sites like the Acropolis and Agora remain active archaeological and civic touchpoints, not sealed museum pieces. Greek coffee, thick and unfiltered, is still made and served the traditional way in most cafes." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Ancient sites are far less crowded at opening time. A combined ticket covers most major archaeological sites cheaply. And August sees many small local shops close as owners take traditional summer holidays." }
    ]
  },
  {
    id: "edinburgh",
    name: "Edinburgh",
    country: "Scotland, UK",
    continent: "Europe",
    lat: 55.9533,
    lng: -3.1883,
    tags: ["castle city", "festivals", "closes and wynds"],
    teaser: "A volcano-topped castle overlooks a city built on hidden underground streets.",
    accent: "#4A5568",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Edinburgh Castle sits atop an extinct volcanic plug overlooking the city, with narrow alleyways called closes and wynds branching off the Royal Mile, some leading to genuinely underground former streets, buried when the city built over them centuries ago." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"The city splits into the medieval Old Town and the planned, grid-like Georgian New Town, each with a distinct daily rhythm. Weather changes fast enough that locals rarely fully trust a forecast, layers are standard year-round. Pub culture is social and unhurried, often the actual living room for a neighborhood." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"The Edinburgh Festival Fringe each August turns the entire city into the world's largest arts festival, performers filling every spare room and basement. Hogmanay, New Year's Eve, is treated as seriously as Christmas, with its own distinct traditions. Scottish traditions like ceilidh dancing remain genuinely practiced, not staged solely for visitors." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Book festival-season accommodation months ahead if visiting in August. Comfortable waterproof shoes matter more than style. And underground vault and close tours are genuinely worth it, not just tourist gimmicks." }
    ]
  },
  {
    id: "zanzibar",
    name: "Stone Town",
    country: "Zanzibar, Tanzania",
    continent: "Africa",
    lat: -6.1659,
    lng: 39.2026,
    tags: ["spice trade", "swahili coast", "carved doors"],
    teaser: "A trading port where carved wooden doors once signaled a family's wealth and trade.",
    accent: "#1E8A7D",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Stone Town sits on Zanzibar's west coast facing the Indian Ocean, a dense maze of coral-stone buildings and narrow alleys built during centuries as an Indian Ocean trading hub. Dhows, traditional sailboats, still fish and ferry goods along the coast daily." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Swahili culture blends Bantu African, Arab, Persian, and Indian influences visibly in language, food, and architecture. Spice farms just outside town still grow cloves, cinnamon, and vanilla that shaped centuries of trade. Fresh seafood night markets at Forodhani Gardens are a genuine daily gathering point, not solely for visitors." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Elaborately carved wooden doors, Arab and Indian styles side by side, once indicated a household's wealth and trade connections, and many original doors remain in use. Taarab music, blending Arab, Indian, and African influence, is still performed live. Islam shapes daily rhythm, with prayer calls audible across the old town." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Modest dress is expected and appreciated, this is a majority Muslim community. Stone Town's alleys are genuinely easy to get lost in, part of the experience. And a guided spice farm tour gives real context you'd otherwise miss walking through town alone." }
    ]
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    continent: "Africa",
    lat: 30.0444,
    lng: 31.2357,
    tags: ["ancient wonders", "nile life", "dense city"],
    teaser: "Millennia-old pyramids sit at the literal edge of a twenty-million-person megacity.",
    accent: "#C08A3E",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Cairo sits along the Nile River, with the Giza pyramid complex now at the western edge of urban sprawl rather than isolated desert. The river remains the country's lifeline, most of Egypt's population lives within a narrow strip along its banks." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Traffic is dense and famously assertive, with informal rules locals navigate instinctively. Tea and shisha cafes function as genuine daily social hubs across all neighborhoods, not just tourist zones. Extended family networks remain central to daily life, decisions and support often run through them." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Islam shapes daily rhythm for the majority, with a sizable Coptic Christian minority whose own churches and traditions predate Islam in Egypt. Ramadan transforms the city's schedule entirely, with streets quiet by day and full of life after sunset iftar meals. Ancient Egyptian heritage is a genuine source of national pride, not just tourism marketing." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Bargaining is expected almost everywhere outside fixed-price shops. Modest dress is appreciated, particularly for women, outside resort areas. And visiting the pyramids at opening avoids both heat and the busiest crowds." }
    ]
  },
  {
    id: "accra",
    name: "Accra",
    country: "Ghana",
    continent: "Africa",
    lat: 5.6037,
    lng: -0.1870,
    tags: ["coastal forts", "kente cloth", "vibrant markets"],
    teaser: "A coastline of centuries-old forts sits beside some of West Africa's liveliest markets.",
    accent: "#C1443C",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Accra sits on the Gulf of Guinea coastline, with old colonial-era forts, once used in the transatlantic slave trade, still standing along the shore as protected historic sites. The city spreads flat and low, growing fast with new neighborhoods pushing outward each year." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Makola Market is a genuine daily shopping destination for residents, dense with fabric, food, and household goods sold by generations of the same families. Tro-tro shared minibuses, privately run with set but informal routes, move most residents around the city. Extended family and community obligation remain central to daily decisions." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Kente cloth, woven with distinct patterns that carry specific meanings, originated with the Akan people and remains worn for significant occasions, not solely sold to tourists. Naming ceremonies, funerals, and festivals like Homowo are major, well-attended community events. Ghana's history as the first sub-Saharan African country to gain independence from colonial rule remains a strong point of national pride." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Visiting Cape Coast or Elmina Castle nearby is a genuinely moving, important historical experience, worth the extra day. Bargaining in markets is normal and expected. And greetings before business, even a brief one, are considered important social courtesy." }
    ]
  },
  {
    id: "oaxaca",
    name: "Oaxaca",
    country: "Mexico",
    continent: "North America",
    lat: 17.0732,
    lng: -96.7266,
    tags: ["indigenous heritage", "mezcal", "handcrafts"],
    teaser: "A valley where sixteen indigenous language groups still shape daily life.",
    accent: "#A6323A",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Oaxaca sits in a highland valley ringed by mountains, with the ancient Zapotec site of Monte Alban visible on a hilltop just outside the city. The region's varied microclimates support both agave fields for mezcal and diverse corn varieties central to local cooking." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Sixteen distinct indigenous groups, each with their own language, live across the state, and many still speak Zapotec, Mixtec, or other native languages daily alongside Spanish. Markets like Benito Juarez remain genuine daily shopping destinations, thick with mole pastes, chapulines fried grasshoppers, and handwoven textiles." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Dia de los Muertos is observed with particular depth here, family altars, cemetery vigils, and marigold paths guiding spirits home, a genuine spiritual practice, not a costume holiday. Mezcal production remains largely small-batch and family-run across surrounding villages. Wood carving, called alebrijes, and black pottery are distinct regional crafts passed through specific families." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Visiting during Dia de los Muertos, late October to early November, needs accommodation booked well ahead. Mezcal tastings at small palenques outside town are more authentic than city bars. And a light jacket helps, the highland evenings cool quickly." }
    ]
  },
  {
    id: "new-orleans",
    name: "New Orleans",
    country: "United States",
    continent: "North America",
    lat: 29.9511,
    lng: -90.0715,
    tags: ["jazz", "creole culture", "below sea level"],
    teaser: "A city that buries its dead above ground because the water table won't allow otherwise.",
    accent: "#6B3FA0",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"New Orleans sits mostly below sea level, wedged between the Mississippi River and Lake Pontchartrain, protected by a levee system after Hurricane Katrina's 2005 flooding. The high water table means the dead are buried above ground in above-ground tombs across the city's historic cemeteries." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Live music isn't a special event here, it spills out of bars onto Frenchmen Street most nights as a normal part of the week. Creole and Cajun cooking, distinct traditions blending French, African, Spanish, and Caribbean influence, shape daily meals, not just restaurant menus. Front porches remain genuine social space in many neighborhoods." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Jazz funerals, a brass band leading mourners from solemn hymns into upbeat celebration, remain a real practiced tradition, not a tourist reenactment. Mardi Gras krewes, community social clubs, spend all year building floats and planning parades. Voodoo has genuine practicing communities in the city, distinct from its commercialized shop-front version." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Hurricane season runs June through November, worth checking before booking. Tipping street musicians who perform in public spaces is customary and appreciated. And the St. Charles streetcar is a real, cheap way to see the Garden District, not just a tourist ride." }
    ]
  },
  {
    id: "havana",
    name: "Havana",
    country: "Cuba",
    continent: "North America",
    lat: 23.1136,
    lng: -82.3666,
    tags: ["classic cars", "colonial architecture", "music"],
    teaser: "A city where 1950s American cars are still daily transport, kept running by necessity.",
    accent: "#1F7A8C",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Havana sits along the Straits of Florida, its Malecon seawall stretching for miles as both a flood barrier and the city's main social gathering space each evening. Colonial-era buildings, many faded but still inhabited, line narrow streets in the old town, Habana Vieja." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Decades of American vehicle import restrictions mean 1950s cars are still kept running through resourceful, homemade mechanical repairs, genuine daily transport rather than a show for visitors. A dual-track economy and periodic shortages shape daily routines around what's available that week. Ration books, called libretas, still supplement household food access for residents." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Son cubano and salsa emerged directly from Havana's mix of Spanish and African musical traditions, still played live nightly in small local clubs, not only tourist venues. Santeria, blending Yoruba African religion with Catholic saints, has genuine practicing communities across the city. Baseball is closer to a national religion than a pastime." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Internet access is limited and often requires purchased wifi cards used at public hotspots. Cash, and increasingly specific currencies, matter more than cards, worth checking current rules before arrival. And a walk through Centro Habana, not just the restored old town, shows a more complete picture of daily life." }
    ]
  },
  {
    id: "rio",
    name: "Rio de Janeiro",
    country: "Brazil",
    continent: "South America",
    lat: -22.9068,
    lng: -43.1729,
    tags: ["beaches", "favela culture", "carnival"],
    teaser: "Mountains, rainforest, and beach sit inside the city limits, not outside them.",
    accent: "#2E8B57",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Rio is wedged between granite peaks like Sugarloaf and Corcovado, dense Atlantic rainforest, and Atlantic Ocean beaches, all within city limits rather than day trips away. Favelas, informal neighborhoods, climb steep hillsides throughout the city, home to a significant share of Rio's population." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Beach culture is a genuine daily habit, not a vacation activity, with locals exercising, socializing, and even holding business meetings along Copacabana and Ipanema. Futebol is closely tied to neighborhood and family identity, matches at Maracana stadium are a real communal event. Favela community life includes its own vibrant, if under-resourced, culture, commerce, and increasingly, tourism run by residents themselves." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Carnival, far bigger than a parade, involves neighborhood samba schools rehearsing and fundraising all year for a few days of competition. Capoeira, a martial art disguised as dance, developed among enslaved Africans in Brazil and is still taught and performed in public roda circles. Candomble and Umbanda, African-rooted religions, have genuine active communities in the city." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Favela tours should be booked through community-run operators, not outside companies, for a fairer and more honest experience. Valuables are best kept minimal on beaches and in crowded areas. And Carnival accommodation books out very far in advance." }
    ]
  },
  {
    id: "cartagena",
    name: "Cartagena",
    country: "Colombia",
    continent: "South America",
    lat: 10.3910,
    lng: -75.4794,
    tags: ["walled city", "caribbean coast", "colorful streets"],
    teaser: "A walled colonial port city built to survive centuries of pirate raids.",
    accent: "#D9662C",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Cartagena sits on Colombia's Caribbean coast, its old town still encircled by thick stone walls and forts built over centuries to defend against pirate raids and rival colonial powers. Tropical heat and humidity stay high year-round, shaping a slower midday pace." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Fruit vendors called palenqueras, traditionally dressed in colorful skirts, still sell tropical fruit from bowls balanced on their heads, a real trade with roots in the nearby Afro-Colombian community of San Basilio de Palenque. Afternoon heat genuinely slows the pace of the old town, with a natural pickup again in the evening." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"San Basilio de Palenque, nearby, was the first free African town in the Americas, founded by escaped enslaved people, and its language and music traditions remain distinct and celebrated. Champeta music and dance, rooted in Afro-Caribbean and West African rhythm, is genuinely popular nightlife, not a staged show. Colorful balconies and bougainvillea aren't just decoration, they're a real, maintained architectural tradition." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Midday heat is intense, plan walking tours for morning or late afternoon. Getting lost in the walled city's colorful streets is genuinely one of the best things to do. And a day trip to Palenque adds real cultural depth beyond the tourist center." }
    ]
  },
  {
    id: "buenos-aires",
    name: "Buenos Aires",
    country: "Argentina",
    continent: "South America",
    lat: -34.6037,
    lng: -58.3816,
    tags: ["tango", "european flair", "late nights"],
    teaser: "A city that eats dinner at ten and calls that completely normal.",
    accent: "#7A4B6D",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Buenos Aires sits on the wide, muddy Rio de la Plata estuary, flat and sprawling, with distinct European-influenced neighborhoods, French-style boulevards in Recoleta, Italian immigrant roots in La Boca, each with a different character." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Dinner genuinely starts around ten at night, and asado, a slow wood or charcoal barbecue, is closer to a weekly ritual than a meal, often a long family gathering. Mate, a shared herbal tea drunk from a gourd with a metal straw, is a constant daily habit, passed between friends and coworkers throughout the day." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Tango originated in Buenos Aires' working-class immigrant neighborhoods and remains genuinely practiced in milongas, social dance halls, not staged solely for visitors. Football rivalry, especially Boca Juniors versus River Plate, runs deeper than sport into neighborhood identity. Argentina's economic instability over decades has shaped a distinct, resilient daily resourcefulness among residents." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Restaurants often don't open for dinner before eight, plan accordingly. Currency exchange rates have shifted often in recent years, worth checking current guidance before arrival. And a milonga, even as a beginner, is a better tango experience than a paid tourist show." }
    ]
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    continent: "Oceania",
    lat: -45.0312,
    lng: 168.6626,
    tags: ["alpine lake", "adventure sports", "small town"],
    teaser: "A small alpine town that invented commercial bungee jumping off a historic bridge.",
    accent: "#3B6E8F",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Queenstown sits on Lake Wakatipu, a long glacial lake ringed by the jagged Remarkables mountain range, in New Zealand's South Island. The lake famously rises and falls in a slow natural rhythm every few minutes, a phenomenon locals call the lake's heartbeat." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"The town is genuinely small, a few thousand permanent residents, with daily life built around a strong seasonal tourism economy, both summer hiking and winter skiing. Outdoor recreation isn't a special occasion here, it's simply how people spend a normal weekend. Sheep farming remains a real regional industry beyond the tourist center." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Commercial bungee jumping was invented here at the Kawarau Bridge in the 1980s, and the original site is still operating, not just a replica attraction. Maori culture and history are present in place names and local storytelling throughout the South Island, worth genuine engagement beyond a single show. A strong outdoor safety culture, given the terrain, shapes how activities are run and regulated." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Weather changes fast in the mountains, pack layers regardless of season. Booking adventure activities ahead matters in peak summer and ski season. And a short drive to Glenorchy shows quieter, equally dramatic scenery than the town center." }
    ]
  },
  {
    id: "byron-bay",
    name: "Byron Bay",
    country: "Australia",
    continent: "Oceania",
    lat: -28.6474,
    lng: 153.6020,
    tags: ["surf town", "lighthouse", "laid-back"],
    teaser: "The easternmost point of mainland Australia, and it runs on surf schedules.",
    accent: "#2E9E8F",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Byron Bay sits at the easternmost point of the Australian mainland, marked by a lighthouse on a headland where you can sometimes spot whales migrating offshore. Rainforest-covered hinterland sits just inland from the beaches, a genuinely different landscape a short drive away." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Surf conditions genuinely shape the daily schedule for a large part of the town, with many locals checking swell reports before work plans. The town's alternative, wellness-oriented culture took root decades ago and remains a real part of daily life, not just marketing, yoga, organic markets, and small wellness retreats are common." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"The area holds significance for the Arakwal Bundjalung people, the traditional custodians of the land, and some local place names and conservation practices reflect that history. Farmers markets and makers markets remain genuine weekly community events, not solely tourist drawcards. A strong local environmental activism history has shaped development limits in the town." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Sun protection matters more than most visitors expect, the UV index runs high. Accommodation books out well ahead during Australian summer holidays. And the lighthouse walk at sunrise is genuinely worth the early wake-up." }
    ]
  },
  {
    id: "petra",
    name: "Petra",
    country: "Jordan",
    continent: "Middle East",
    lat: 30.3285,
    lng: 35.4444,
    tags: ["ancient city", "desert canyon", "bedouin heritage"],
    teaser: "An entire ancient city carved directly into rose-colored canyon walls.",
    accent: "#B5532E",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Petra sits in a narrow desert canyon, reached through a winding gorge called the Siq, where the Nabataeans carved elaborate facades directly into rose-colored sandstone cliffs over two thousand years ago. The surrounding region is arid, mountainous desert, with the nearby town of Wadi Musa serving as the modern access point." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Local Bedouin communities, some descended from families that lived within Petra itself until relocation decades ago, still guide visitors and run nearby businesses. Desert life shapes daily rhythm around temperature, mornings and evenings for activity, midday for rest. Tourism is now the region's central economy, alongside small-scale herding." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"The Nabataeans who built Petra were skilled traders and hydraulic engineers, channeling scarce rainwater through a system still partly visible today. Bedouin hospitality traditions, including serving tea to guests, remain a genuine cultural practice, not solely performed for visitors. The site holds deep significance in regional history well beyond its use as a filming location." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Walking the full site takes most of a day, comfortable shoes matter over the uneven ancient paths. Visiting early morning or for the candlelit Petra by Night avoids both heat and crowds. And a local Bedouin-guided walk adds context a self-guided visit misses." }
    ]
  },
  {
    id: "muscat",
    name: "Muscat",
    country: "Oman",
    continent: "Middle East",
    lat: 23.5880,
    lng: 58.3829,
    tags: ["forts", "frankincense", "clean coastline"],
    teaser: "A capital that requires every new building to keep the same white and sand tones.",
    accent: "#2C6E6B",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Muscat sits along the Gulf of Oman, wedged between rugged Hajar mountains and the coastline, with old Portuguese-built forts still standing guard over the harbor. Building codes require most structures to stay low-rise and in white or sand tones, giving the city a distinctly uniform look." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Frankincense, burned as incense in homes and shops, remains a genuine daily habit tied to Oman's historic role in the ancient frankincense trade. The souq in Muttrah still functions as a real market for spices, textiles, and silver, alongside tourist shopping. Fishing remains an active traditional livelihood along the coast." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Omani hospitality customs, including serving dates and Omani coffee flavored with cardamom to guests, are taken seriously as genuine cultural practice. Traditional dhow boatbuilding, a craft with roots going back centuries in regional maritime trade, is still practiced in small coastal workshops. Friday remains the primary day of rest and prayer, shaping the week's rhythm." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Modest dress is expected and appreciated across public spaces, more so than in some neighboring countries. Alcohol is available only in licensed hotels and restaurants, not general shops. And Friday mornings are notably quiet, many businesses open later or stay closed." }
    ]
  },
  {
    id: "samarkand",
    name: "Samarkand",
    country: "Uzbekistan",
    continent: "Asia",
    lat: 39.6270,
    lng: 66.9750,
    tags: ["silk road", "turquoise domes", "ancient trade"],
    teaser: "A Silk Road crossroads where turquoise-tiled domes have stood for six centuries.",
    accent: "#2E6B8A",
    sections: [
      { time:"00:00", title:"Landscape", durationSec:35, text:"Samarkand sits on a fertile plain in Central Asia, historically a critical Silk Road crossroads between China, Persia, and Europe. The Registan, a square framed by three monumental madrasas covered in turquoise and blue tilework, has anchored the city's center for over six hundred years." },
      { time:"00:35", title:"Daily life", durationSec:40, text:"Bread, baked in specific round loaves called non, is treated with genuine reverence, never placed upside down or thrown away, a real daily custom, not folklore. Siyob Bazaar remains a working market for produce, spices, and dried fruit central to regional trade for centuries. Hospitality customs around tea and shared meals remain a strong daily practice." },
      { time:"01:15", title:"Culture & ritual", durationSec:40, text:"Timurid architecture, built under the 14th-century conqueror Timur and his successors, produced some of the most elaborate tilework in the Islamic world, still actively restored and maintained. Uzbek suzani embroidery, traditionally made for dowries, remains a practiced craft passed within families. Islam shapes daily and calendar rhythm for most residents, moderated by strong regional and Soviet-era secular influence." },
      { time:"01:55", title:"Before you go", durationSec:32, text:"Visiting the Registan lit up at night is a genuinely different experience from daytime and worth planning for. Cash remains more widely used than cards outside larger hotels. And a local guide adds real depth to the Timurid history that signage alone won't cover." }
    ]
  }
];
