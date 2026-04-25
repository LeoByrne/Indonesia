const vesselImageCatalog = {
  "A S": {
    imageSrc: "assets/vessels/preview/a-s.webp",
    imageFullSrc: "assets/vessels/full/a-s.webp"
  },
  "ADELINE G": {
    imageSrc: "assets/vessels/preview/adeline-g.webp",
    imageFullSrc: "assets/vessels/full/adeline-g.webp"
  },
  "AURORA": {
    imageSrc: "assets/vessels/preview/aurora.webp",
    imageFullSrc: "assets/vessels/full/aurora.webp"
  },
  "CALM BRIDGE": {
    imageSrc: "assets/vessels/preview/calm-bridge.webp",
    imageFullSrc: "assets/vessels/full/calm-bridge.webp"
  },
  "HAFNIA KALLANG": {
    imageSrc: "assets/vessels/preview/hafnia-kallang.webp",
    imageFullSrc: "assets/vessels/full/hafnia-kallang.webp"
  },
  "KOTI": {
    imageSrc: "assets/vessels/preview/koti.webp",
    imageFullSrc: "assets/vessels/full/koti.webp"
  },
  "KRITI STATE": {
    imageSrc: "assets/vessels/preview/kriti-state.webp",
    imageFullSrc: "assets/vessels/full/kriti-state.webp"
  },
  "MATURITY ONE": {
    imageSrc: "assets/vessels/preview/maturity-one.webp",
    imageFullSrc: "assets/vessels/full/maturity-one.webp"
  },
  "NORITA": {
    imageSrc: "assets/vessels/preview/norita.webp",
    imageFullSrc: "assets/vessels/full/norita.webp"
  },
  "PARS FORTUNE": {
    imageSrc: "assets/vessels/preview/pars-fortune.webp",
    imageFullSrc: "assets/vessels/full/pars-fortune.webp"
  },
  "SAMSON": {
    imageSrc: "assets/vessels/preview/samson.webp",
    imageFullSrc: "assets/vessels/full/samson.webp"
  },
  "SINAR TERNATE": {
    imageSrc: "assets/vessels/preview/sinar-ternate.webp",
    imageFullSrc: "assets/vessels/full/sinar-ternate.webp"
  },
  "SHANG YUAN BAO": {
    imageSrc: "assets/vessels/preview/shang-yuan-bao.webp",
    imageFullSrc: "assets/vessels/full/shang-yuan-bao.webp"
  },
  "SKYLIGHT": {
    imageSrc: "assets/vessels/preview/skylight.webp",
    imageFullSrc: "assets/vessels/full/skylight.webp"
  },
  "STAR 18": {
    imageSrc: "assets/vessels/preview/star-18.webp",
    imageFullSrc: "assets/vessels/full/star-18.webp"
  }
};

const registryData = {
  title: "Registry Review OS",
  subtitle: "Fifteen vessel applications for registry assessment.",
  riskOptions: ["Green", "Amber", "Red"],
  actionOptions: ["Accept", "Hold", "Refer", "Refuse"],
  // ─── Group assignments ────────────────────────────────────────────────────
  // Edit the vessel ID lists here to change which group sees which vessels.
  // Current split: 15 vessels, 5 per group — mixed risk/region distribution.
  groups: [
    { id: "G1", label: "Group 1", vessels: ["V1", "V4", "V8", "V10", "V11"] },
    { id: "G2", label: "Group 2", vessels: ["V2", "V6", "V7", "V13", "V15"] },
    { id: "G3", label: "Group 3", vessels: ["V5", "V3", "V9", "V12", "V14"] }
  ],


  vessels: [
    {
      id: "V1",
      name: "HAFNIA KALLANG",
      type: "Product tanker",
      built: "2017",
      imo: "9766190",
      applicantOwner: "BW Aldrich Pte. Ltd.",
      manager: "Hafnia Pte. Ltd.",
      operator: "Hafnia Pte. Ltd.",
      previousFlag: "Singapore",
      address: "10 Pasir Panjang Road, #18-01 Mapletree Business City, Singapore 117438",
      insurer: "NorthStandard P&I Club",
      invoicePayee: "BW Aldrich Pte. Ltd.",
      operatingArea: "East and Southeast Asia clean products trade",
      docsStatus: "Complete",
      imageSrc: "assets/vessel_v1.png",
      applicationNote: "Modern tanker. Application pack appears orderly and complete, with no immediate inconsistencies on the face of the file.",
      aisMap: {
        corridor: "Singapore / Sunda Strait / Indian Ocean / Arabian Sea",
        viewport: {
          center: [3.0, 84.0],
          zoom: 4.2
        },
        currentPosition: [18.55, 72.98],
        routeSegments: [
          {
            type: "normal",
            coordinates: [
              [1.26, 103.84],
              [0.18, 105.12],
              [-1.35, 107.62],
              [-3.62, 106.40],
              [-6.28, 105.68]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [-6.28, 105.68],
              [-7.20, 104.20],
              [-8.60, 100.80],
              [-8.20, 94.60],
              [-5.40, 88.10],
              [2.80, 78.50],
              [11.20, 70.60],
              [18.55, 72.98]
            ]
          }
        ],
        ports: [
          { label: "Singapore", lat: 1.26, lng: 103.84, kind: "origin" },
          { label: "Sunda Strait", lat: -6.28, lng: 105.68, kind: "transit" },
          { label: "Indian Ocean", lat: -5.40, lng: 88.10, kind: "transit" },
          { label: "Arabian Sea", lat: 18.55, lng: 72.98, kind: "destination" }
        ],
        events: [
          { label: "Normal departure", type: "normal", routeRef: { segmentIndex: 0, pointIndex: 1 } },
          { label: "Steady transit", type: "normal", routeRef: { segmentIndex: 1, pointIndex: 4 } },
          { label: "Normal arrival", type: "normal", routeRef: { segmentIndex: 1, pointIndex: 7 } }
        ]
      },
      facilitator: {
        intendedRisk: "Green",
        intendedAction: "Accept",
        intendedFinding: "Clean control. Identity and web checks should broadly align without a direct OFAC hit."
      }
    },
    {
      id: "V2",
      name: "KRITI STATE",
      type: "Oil products tanker",
      built: "2006",
      imo: "9324289",
      applicantOwner: "Argo Shipholding S.A.",
      manager: "Avin International Ltd.",
      operator: "Avin International Ltd.",
      previousFlag: "Liberia",
      address: "12A Irodou Attikou Street, Marousi, 15124 Athens, Greece",
      insurer: "Gard P&I (Bermuda) Ltd.",
      invoicePayee: "Avin International Ltd.",
      operatingArea: "Asia trade with westbound repositioning",
      docsStatus: "Complete",
      imageSrc: "assets/vessel_v2.png",
      applicationNote: "Routine application file. Notes a former vessel identity but presents the current registration, ownership and management details as ordinary.",
      aisMap: {
        corridor: "Singapore / Malacca Strait / Indian Ocean / Arabian Sea",
        viewport: {
          center: [9.8, 82.8],
          zoom: 4.55
        },
        currentPosition: [17.44, 64.22],
        routeSegments: [
          {
            type: "normal",
            coordinates: [
              [1.27, 103.86],
              [2.35, 102.68],
              [3.25, 100.24],
              [5.05, 96.18],
              [6.55, 92.14]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [6.55, 92.14],
              [7.05, 88.50],
              [7.42, 85.12]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [7.42, 85.12],
              [9.54, 78.44],
              [11.88, 73.46],
              [14.36, 68.50],
              [15.18, 62.38]
            ]
          },
          {
            type: "loiter",
            coordinates: [
              [15.18, 62.38],
              [15.44, 62.74],
              [15.22, 63.08],
              [14.94, 62.82],
              [15.18, 62.38]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [15.18, 62.38],
              [16.20, 63.12],
              [17.44, 64.22]
            ]
          }
        ],
        ports: [
          { label: "Singapore", lat: 1.27, lng: 103.86, kind: "origin" },
          { label: "Malacca Strait", lat: 3.25, lng: 100.24, kind: "transit" },
          { label: "Indian Ocean", lat: 7.42, lng: 85.12, kind: "transit" },
          { label: "Arabian Sea", lat: 17.44, lng: 64.22, kind: "destination" }
        ],
        events: [
          { label: "Ordinary transit", type: "normal", routeRef: { segmentIndex: 0, pointIndex: 2 } },
          { label: "6h gap", type: "gap", routeRef: { segmentIndex: 1, pointIndex: 1 } },
          { label: "Slow drift", type: "loiter", routeRef: { segmentIndex: 3, pointIndex: 2 } },
          { label: "Speed normalises", type: "normal", routeRef: { segmentIndex: 4, pointIndex: 1 } }
        ]
      },
      facilitator: {
        intendedRisk: "Amber",
        intendedAction: "Hold",
        intendedFinding: "Former identity BW AMAZON is discoverable through live checks, but a direct OFAC vessel hit is not expected. This is an identity-led amber case, not a sanctions slam-dunk."
      }
    },
    {
      id: "V3",
      name: "ADELINE G",
      type: "Crude oil tanker",
      built: "2003",
      imo: "9234666",
      applicantOwner: "U Beacon Shipping Co., Limited",
      manager: "Nova Shipping Management Co.",
      operator: "Joyguide Shipping Management",
      previousFlag: "Panama",
      address: "Hong Kong, China",
      insurer: "The Shipowners' Club",
      invoicePayee: "Harbour Registry Services Ltd (Hong Kong)",
      operatingArea: "Middle East to Asia petroleum trade",
      docsStatus: "Partial",
      imageSrc: "assets/vessel_v3.png",
      applicationNote: "Application presents this as an ordinary tanker file and requests timely processing. Some supporting materials are still pending.",
      aisMap: {
        corridor: "Malaysia STS area / Singapore Strait / South China Sea",
        viewport: {
          center: [2.7, 105.4],
          zoom: 6.2
        },
        currentPosition: [5.36, 109.44],
        routeSegments: [
          {
            type: "anchor",
            coordinates: [
              [1.08, 104.02],
              [1.22, 104.16],
              [1.34, 104.30],
              [1.24, 104.44],
              [1.08, 104.26],
              [1.08, 104.02]
            ]
          },
          {
            type: "loiter",
            coordinates: [
              [1.62, 104.92],
              [1.84, 105.16],
              [2.02, 104.88],
              [1.90, 104.52],
              [1.60, 104.60],
              [1.62, 104.92]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [1.60, 104.60],
              [1.42, 104.26],
              [1.25, 103.98]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [1.25, 103.98],
              [1.62, 104.84],
              [2.44, 106.20],
              [3.58, 107.90],
              [4.58, 109.10]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [4.58, 109.10],
              [4.98, 109.66],
              [5.36, 109.44]
            ]
          }
        ],
        ports: [
          { label: "Malaysia STS area", lat: 1.62, lng: 104.92, kind: "origin" },
          { label: "Singapore Strait", lat: 1.25, lng: 103.98, kind: "transit" },
          { label: "South China Sea", lat: 5.36, lng: 109.44, kind: "destination" }
        ],
        events: [
          { label: "Anchorage wait", type: "anchor", routeRef: { segmentIndex: 0, pointIndex: 2 } },
          { label: "STS-style slow drift", type: "loiter", routeRef: { segmentIndex: 1, pointIndex: 2 } },
          { label: "19h gap", type: "gap", routeRef: { segmentIndex: 2, pointIndex: 1 } },
          { label: "Onward transit resumes", type: "normal", routeRef: { segmentIndex: 3, pointIndex: 2 } },
          { label: "7h gap", type: "gap", routeRef: { segmentIndex: 4, pointIndex: 1 } }
        ]
      },
      facilitator: {
        intendedRisk: "Red",
        intendedAction: "Refuse",
        intendedFinding: "The clearest registry red. OFAC should return ADELINE G directly from the vessel name or IMO 9234666, and U Beacon Shipping Co., Limited should also pay off. Participants should still note the partial file and suspicious AIS pattern before concluding."
      }
    },
    {
      id: "V4",
      name: "PARS FORTUNE",
      type: "Offshore support vessel",
      built: "1983",
      imo: "8119649",
      applicantOwner: "Pars Honar Hormozgan",
      manager: "KHADIJA SHIP MANAGEMENT PRIVATE LIMITED",
      operator: "Pars Honar Hormozgan",
      previousFlag: "Samoa",
      address: "Unit D-605, 6th Floor, Crystal Plaza Premises Chs Ltd, Opp. Infinity Mall, New Link Road, Mumbai, Maharashtra 400053, India",
      insurer: "Iran Insurance Company",
      invoicePayee: "Gulf Marine Agency LLC (Dubai, UAE)",
      operatingArea: "Persian Gulf offshore support / Fujairah pattern",
      docsStatus: "Complete",
      imageSrc: "assets/vessel_v4.png",
      applicationNote: "Application file appears administratively complete and commercially routine for an older offshore support vessel active in Gulf service work.",
      aisMap: {
        corridor: "UAE offshore base / Gulf support area / Fujairah anchorage",
        viewport: {
          center: [25.48, 55.08],
          zoom: 6.2
        },
        currentPosition: [25.14, 56.52],
        routeSegments: [
          {
            type: "normal",
            coordinates: [
              [25.10, 56.34],
              [25.42, 55.76],
              [25.68, 54.90],
              [26.06, 54.18]
            ]
          },
          {
            type: "loiter",
            coordinates: [
              [26.06, 54.18],
              [26.22, 54.34],
              [26.10, 54.58],
              [25.88, 54.42],
              [26.06, 54.18]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [26.06, 54.18],
              [25.72, 54.86],
              [25.40, 55.46]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [25.40, 55.46],
              [25.26, 56.02],
              [25.14, 56.52]
            ]
          },
          {
            type: "anchor",
            coordinates: [
              [25.18, 56.34],
              [25.10, 56.46],
              [25.14, 56.52],
              [25.04, 56.40],
              [25.18, 56.34]
            ]
          }
        ],
        ports: [
          { label: "UAE offshore base", lat: 25.10, lng: 56.34, kind: "origin" },
          { label: "Gulf support area", lat: 26.06, lng: 54.18, kind: "transit" },
          { label: "Fujairah anchorage", lat: 25.14, lng: 56.52, kind: "destination" }
        ],
        events: [
          { label: "Routine support transit", type: "normal", routeRef: { segmentIndex: 0, pointIndex: 1 } },
          { label: "Station-keeping", type: "loiter", routeRef: { segmentIndex: 1, pointIndex: 2 } },
          { label: "4h gap", type: "gap", routeRef: { segmentIndex: 2, pointIndex: 1 } },
          { label: "Transit resumes", type: "normal", routeRef: { segmentIndex: 3, pointIndex: 1 } },
          { label: "Anchorage wait", type: "anchor", routeRef: { segmentIndex: 4, pointIndex: 2 } }
        ]
      },
      facilitator: {
        intendedRisk: "Red",
        intendedAction: "Refuse",
        intendedFinding: "Manager-led red case. OFAC should pay off on KHADIJA SHIP MANAGEMENT PRIVATE LIMITED, and the Crystal Plaza Mumbai address should also be a useful search trail. The vessel movement is only supporting context."
      }
    },
    {
      id: "V5",
      name: "MATURITY ONE",
      type: "Oil products / bunkering-type tanker",
      built: "2013",
      imo: "9661388",
      applicantOwner: "Maturity One Shipping Inc.",
      manager: "West Enterprise Ship Management Ltd",
      operator: "West Enterprise Ship Management Ltd",
      previousFlag: "Marshall Islands",
      address: "Trust Company Complex, Ajeltake Road, Ajeltake Island, Majuro 96960, Marshall Islands",
      insurer: "British Marine",
      invoicePayee: "Pacific Registry Support Ltd (Majuro, Marshall Islands)",
      operatingArea: "Regional bunkering / offshore product transfers",
      docsStatus: "Partial",
      imageSrc: "assets/vessel_v5.png",
      applicationNote: "Application appears routine for a tanker involved in regional bunkering and offshore product-transfer activity.",
      aisMap: {
        corridor: "Fujairah / Indian Ocean / Singapore Strait / Batam outer anchorages",
        viewport: {
          center: [9.0, 84.6],
          zoom: 4.7
        },
        currentPosition: [1.18, 104.26],
        routeSegments: [
          {
            type: "normal",
            coordinates: [
              [25.12, 56.56],
              [22.80, 61.90],
              [17.20, 70.40],
              [11.30, 79.60],
              [7.10, 87.20]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [7.10, 87.20],
              [6.30, 91.60],
              [5.70, 95.40]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [5.70, 95.40],
              [4.80, 98.20],
              [3.60, 100.80],
              [2.20, 103.20],
              [1.56, 103.64]
            ]
          },
          {
            type: "anchor",
            coordinates: [
              [1.56, 103.64],
              [1.42, 103.98],
              [1.30, 104.22],
              [1.22, 104.46],
              [1.34, 104.62],
              [1.48, 104.36],
              [1.56, 103.64]
            ]
          },
          {
            type: "loiter",
            coordinates: [
              [1.34, 104.10],
              [1.24, 104.18],
              [1.18, 104.30],
              [1.10, 104.20],
              [1.18, 104.08],
              [1.34, 104.10]
            ]
          }
        ],
        ports: [
          { label: "Fujairah", lat: 25.12, lng: 56.56, kind: "origin" },
          { label: "Singapore Strait", lat: 1.56, lng: 103.64, kind: "transit" },
          { label: "Batam / outer anchorages", lat: 1.18, lng: 104.26, kind: "destination" }
        ],
        events: [
          { label: "Short gap", type: "gap", routeRef: { segmentIndex: 1, pointIndex: 1 } },
          { label: "Transit resumes", type: "normal", routeRef: { segmentIndex: 2, pointIndex: 1 } },
          { label: "Extended anchorage", type: "anchor", routeRef: { segmentIndex: 3, pointIndex: 3 } },
          { label: "Slow manoeuvre", type: "loiter", routeRef: { segmentIndex: 4, pointIndex: 2 } }
        ]
      },
      facilitator: {
        intendedRisk: "Amber",
        intendedAction: "Refer",
        intendedFinding: "Address-led amber case. The Trust Company Complex address should produce useful OFAC and Google search results, but the address alone is not enough to justify refusal. Participants should combine the address trail with the vessel's partial file and outer-anchorage pattern."
      }
    },
    {
      id: "V6",
      name: "SAMSON",
      type: "General cargo vessel",
      built: "1995",
      imo: "9128972",
      applicantOwner: "Yuben International Business Ltd.",
      manager: "Yuben International Business Ltd.",
      operator: "Yuben International Business Ltd.",
      previousFlag: "Gabon",
      address: "Majuro, Marshall Islands",
      insurer: "Ascent General Insurance Company",
      invoicePayee: "Ascent General Insurance Company",
      operatingArea: "Philippines / Taiwan / Singapore feeder cargo trade",
      docsStatus: "Complete",
      imageSrc: "assets/vessel_v2.png",
      applicationNote: "Application file is complete and presents the vessel as a routine regional general-cargo operator.",
      aisMap: {
        corridor: "Mindanao / West Pacific / Taiwan Strait / South China Sea / Singapore approaches",
        viewport: {
          center: [11.0, 115.6],
          zoom: 4.95
        },
        currentPosition: [1.32, 104.06],
        routeSegments: [
          {
            type: "normal",
            coordinates: [
              [7.20, 126.60],
              [9.80, 127.20],
              [14.40, 124.80],
              [18.80, 122.80],
              [23.20, 120.40]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [23.20, 120.40],
              [19.60, 118.60],
              [15.80, 116.80]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [15.80, 116.80],
              [11.60, 113.40],
              [7.20, 109.60],
              [3.40, 106.20],
              [1.52, 103.92]
            ]
          },
          {
            type: "anchor",
            coordinates: [
              [1.52, 103.92],
              [1.44, 104.02],
              [1.36, 104.12],
              [1.30, 104.20],
              [1.52, 103.92]
            ]
          }
        ],
        ports: [
          { label: "Mindanao east", lat: 7.20, lng: 126.60, kind: "origin" },
          { label: "Taiwan approaches", lat: 23.20, lng: 120.40, kind: "transit" },
          { label: "South China Sea", lat: 15.80, lng: 116.80, kind: "transit" },
          { label: "Singapore approaches", lat: 1.32, lng: 104.06, kind: "destination" }
        ],
        events: [
          { label: "Routine segment", type: "normal", routeRef: { segmentIndex: 0, pointIndex: 1 } },
          { label: "8h coverage loss", type: "gap", routeRef: { segmentIndex: 1, pointIndex: 1 } },
          { label: "Transit resumes", type: "normal", routeRef: { segmentIndex: 2, pointIndex: 2 } },
          { label: "Port waiting", type: "anchor", routeRef: { segmentIndex: 3, pointIndex: 2 } }
        ]
      },
      facilitator: {
        intendedRisk: "Red",
        intendedAction: "Refer",
        intendedFinding: "Insurance-led service-chain red case. OFAC should surface Ascent General Insurance Company as the main concern. The vessel trail itself is not the strongest clue; the risk emerges in the insurance layer."
      }
    },
    {
      id: "V7",
      name: "AURORA",
      type: "LPG tanker",
      built: "1995",
      imo: "9088536",
      applicantOwner: "BEACH WAVES LTD.",
      manager: "HORIZON HARVEST SHIPPING LLC",
      operator: "HORIZON HARVEST SHIPPING LLC",
      previousFlag: "Palau",
      address: "Office No 103, Al Garhoud, Deira, Dubai, United Arab Emirates",
      insurer: "Not stated in application",
      invoicePayee: "HORIZON HARVEST SHIPPING LLC (Dubai, UAE)",
      operatingArea: "UAE / Arabian Sea / west coast India LPG trade",
      docsStatus: "Complete",
      imageSrc: "assets/vessel_v3.png",
      applicationNote: "Application file presents the vessel as a routine LPG carrier operating on the Gulf-to-India trade. Ownership and management details appear consistent on the face of the file.",
      aisMap: {
        corridor: "Sharjah / Gulf of Oman / Arabian Sea / New Mangalore",
        viewport: {
          center: [19.4, 66.8],
          zoom: 4.85
        },
        currentPosition: [12.92, 74.78],
        routeSegments: [
          {
            type: "anchor",
            coordinates: [
              [25.36, 55.39],
              [25.28, 55.55],
              [25.14, 55.63],
              [25.04, 55.48],
              [25.18, 55.32],
              [25.36, 55.39]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [25.18, 55.32],
              [24.52, 57.08],
              [22.86, 60.42],
              [20.12, 63.76],
              [17.34, 67.48],
              [14.74, 70.96]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [14.74, 70.96],
              [14.12, 72.18],
              [13.56, 73.22]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [13.56, 73.22],
              [13.22, 74.02],
              [12.92, 74.78]
            ]
          },
          {
            type: "loiter",
            coordinates: [
              [12.92, 74.78],
              [12.82, 74.92],
              [12.70, 74.86],
              [12.76, 74.68],
              [12.92, 74.78]
            ]
          }
        ],
        ports: [
          { label: "Sharjah Anchorage", lat: 25.18, lng: 55.32, kind: "origin" },
          { label: "Gulf of Oman", lat: 24.52, lng: 57.08, kind: "transit" },
          { label: "Arabian Sea", lat: 17.34, lng: 67.48, kind: "transit" },
          { label: "New Mangalore Approaches", lat: 12.92, lng: 74.78, kind: "destination" }
        ],
        events: [
          { label: "Anchorage wait before departure", type: "anchor", routeRef: { segmentIndex: 0, pointIndex: 2 } },
          { label: "Routine LPG tanker transit", type: "normal", routeRef: { segmentIndex: 1, pointIndex: 2 } },
          { label: "6h AIS gap", type: "gap", routeRef: { segmentIndex: 2, pointIndex: 1 } },
          { label: "Signal resumes on India approach", type: "normal", routeRef: { segmentIndex: 3, pointIndex: 1 } },
          { label: "Slow manoeuvre / waiting off port", type: "loiter", routeRef: { segmentIndex: 4, pointIndex: 2 } }
        ]
      },
      facilitator: {
        intendedRisk: "Red",
        intendedAction: "Refuse",
        intendedFinding: "Participants should pivot from AURORA to IMO 9088536 / SEA BIRD. OFAC should pay off on SEA BIRD and HORIZON HARVEST SHIPPING LLC. AIS is only supporting context, not the main solve."
      }
    },
    {
      id: "V8",
      name: "NORITA",
      type: "LPG tanker",
      built: "1999",
      imo: "9197727",
      applicantOwner: "BENOIL SHIPPING INC",
      manager: "BENOIL SHIPPING INC",
      operator: "BENOIL SHIPPING INC",
      previousFlag: "Panama",
      address: "80 Broad Street, Monrovia, Liberia",
      insurer: "Not stated in application",
      invoicePayee: "BENOIL SHIPPING INC (Monrovia, Liberia)",
      operatingArea: "Sharjah / Arabian Sea / west coast India LPG trade",
      docsStatus: "Complete",
      imageSrc: "assets/vessel_v2.png",
      applicationNote: "Application file presents the vessel as a routine regional LPG carrier. Ownership and operational details appear internally consistent on the face of the pack.",
      aisMap: {
        corridor: "Sharjah / Makran Coast / Arabian Sea / Jaigad",
        viewport: {
          center: [20.2, 65.8],
          zoom: 4.9
        },
        currentPosition: [16.58, 73.35],
        routeSegments: [
          {
            type: "anchor",
            coordinates: [
              [25.28, 55.34],
              [25.16, 55.46],
              [25.04, 55.58],
              [24.98, 55.42],
              [25.12, 55.28],
              [25.28, 55.34]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [25.12, 55.28],
              [24.26, 58.10],
              [22.88, 61.42],
              [21.44, 64.26],
              [19.82, 67.60]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [19.82, 67.60],
              [19.04, 68.84],
              [18.32, 70.18]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [18.32, 70.18],
              [17.64, 71.54],
              [16.98, 72.62],
              [16.58, 73.35]
            ]
          },
          {
            type: "loiter",
            coordinates: [
              [16.58, 73.35],
              [16.46, 73.48],
              [16.34, 73.40],
              [16.40, 73.22],
              [16.58, 73.35]
            ]
          }
        ],
        ports: [
          { label: "Sharjah Anchorage", lat: 25.12, lng: 55.28, kind: "origin" },
          { label: "Arabian Sea", lat: 21.44, lng: 64.26, kind: "transit" },
          { label: "Jaigad Approaches", lat: 16.58, lng: 73.35, kind: "destination" }
        ],
        events: [
          { label: "Anchorage wait before departure", type: "anchor", routeRef: { segmentIndex: 0, pointIndex: 2 } },
          { label: "Routine west India transit", type: "normal", routeRef: { segmentIndex: 1, pointIndex: 2 } },
          { label: "8h AIS gap", type: "gap", routeRef: { segmentIndex: 2, pointIndex: 1 } },
          { label: "Signal resumes", type: "normal", routeRef: { segmentIndex: 3, pointIndex: 1 } },
          { label: "Slow approach / waiting off port", type: "loiter", routeRef: { segmentIndex: 4, pointIndex: 2 } }
        ]
      },
      facilitator: {
        intendedRisk: "Red",
        intendedAction: "Refuse",
        intendedFinding: "Current name NORITA looks routine, but IMO 9197727 should resolve to OFAC-listed AQUA SPIRIT linked to BENOIL SHIPPING INC. This is an identity-history red case; AIS is only supporting context."
      }
    },
    {
      id: "V9",
      name: "SKYLIGHT",
      type: "Chemical / products tanker",
      built: "2006",
      imo: "9330020",
      applicantOwner: "RED SEA SHIP MANAGEMENT LLC",
      manager: "RED SEA SHIP MANAGEMENT LLC",
      operator: "RED SEA SHIP MANAGEMENT LLC",
      previousFlag: "Unknown",
      address: "Office No 306, Parcel 133-251, Al Mamzar, Deira, Dubai, United Arab Emirates",
      insurer: "Not stated in application",
      invoicePayee: "RED SEA SHIP MANAGEMENT LLC (Dubai, UAE)",
      operatingArea: "Persian Gulf / Strait of Hormuz / UAE coastal products trade",
      docsStatus: "Complete",
      imageSrc: "assets/vessel_v4.png",
      applicationNote: "Application presents the vessel as a routine regional products tanker with complete ownership and management details and no obvious discrepancy on the face of the file.",
      aisMap: {
        corridor: "Basra / Persian Gulf / Sharjah / Khasab",
        viewport: {
          center: [27.0, 53.9],
          zoom: 6.15
        },
        currentPosition: [26.18, 56.25],
        routeSegments: [
          {
            type: "normal",
            coordinates: [
              [29.86, 48.80],
              [29.42, 49.40],
              [28.56, 50.22],
              [27.68, 52.10],
              [26.92, 54.24]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [26.92, 54.24],
              [26.44, 54.98],
              [26.12, 55.46]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [26.12, 55.46],
              [25.86, 55.60],
              [25.52, 55.64],
              [25.28, 55.58]
            ]
          },
          {
            type: "anchor",
            coordinates: [
              [25.28, 55.58],
              [25.18, 55.70],
              [25.04, 55.62],
              [25.10, 55.44],
              [25.28, 55.58]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [25.28, 55.58],
              [25.66, 56.02],
              [26.00, 56.18],
              [26.18, 56.25]
            ]
          },
          {
            type: "loiter",
            coordinates: [
              [26.18, 56.25],
              [26.26, 56.34],
              [26.12, 56.38],
              [26.06, 56.24],
              [26.18, 56.25]
            ]
          }
        ],
        ports: [
          { label: "Basra approaches", lat: 29.86, lng: 48.80, kind: "origin" },
          { label: "Persian Gulf", lat: 27.68, lng: 52.10, kind: "transit" },
          { label: "Sharjah Anchorage", lat: 25.28, lng: 55.58, kind: "transit" },
          { label: "Khasab Approaches", lat: 26.18, lng: 56.25, kind: "destination" }
        ],
        events: [
          { label: "Routine Gulf coastal transit", type: "normal", routeRef: { segmentIndex: 0, pointIndex: 2 } },
          { label: "5h AIS gap", type: "gap", routeRef: { segmentIndex: 1, pointIndex: 1 } },
          { label: "Signal resumes near UAE coast", type: "normal", routeRef: { segmentIndex: 2, pointIndex: 1 } },
          { label: "Extended anchorage wait", type: "anchor", routeRef: { segmentIndex: 3, pointIndex: 2 } },
          { label: "Transit toward Hormuz", type: "normal", routeRef: { segmentIndex: 4, pointIndex: 2 } },
          { label: "Slow manoeuvre off Khasab", type: "loiter", routeRef: { segmentIndex: 5, pointIndex: 1 } }
        ]
      },
      facilitator: {
        intendedRisk: "Red",
        intendedAction: "Refuse",
        intendedFinding: "Manager-led red case. OFAC should pay off on SKYLIGHT and RED SEA SHIP MANAGEMENT LLC. Google should also surface that the vessel was previously known as AL MOUSTAFA and was used in an STS-linked Iranian condensate context. AIS supports escalation but is not the sole giveaway."
      }
    },
    {
      id: "V10",
      name: "KOTI",
      type: "Oil products tanker",
      built: "2008",
      imo: "9417115",
      applicantOwner: "KOTI CORP",
      manager: "KOTI CORP",
      operator: "KOTI CORP",
      previousFlag: "Panama",
      address: "Panama City, Panama",
      insurer: "Not stated in application",
      invoicePayee: "KOTI CORP (Panama City, Panama)",
      operatingArea: "East China Sea / Yellow Sea petroleum shuttle",
      docsStatus: "Complete",
      imageSrc: "assets/vessel_v4.png",
      applicationNote: "Application presents the vessel as a small regional products tanker seeking routine handling. The file appears administratively usable and commercially unremarkable on its face.",
      aisMap: {
        corridor: "East China Sea / Yellow Sea / Pyeongtaek-Dangjin",
        viewport: {
          center: [34.4, 124.8],
          zoom: 5.6
        },
        currentPosition: [36.88, 126.48],
        routeSegments: [
          {
            type: "normal",
            coordinates: [
              [31.10, 123.40],
              [32.08, 123.62],
              [33.02, 123.96],
              [33.88, 124.18]
            ]
          },
          {
            type: "loiter",
            coordinates: [
              [33.88, 124.18],
              [34.02, 124.42],
              [33.80, 124.54],
              [33.64, 124.28],
              [33.88, 124.18]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [33.88, 124.18],
              [34.52, 124.86],
              [35.26, 125.42]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [35.26, 125.42],
              [35.92, 125.80],
              [36.40, 126.10],
              [36.88, 126.48]
            ]
          },
          {
            type: "anchor",
            coordinates: [
              [36.88, 126.48],
              [36.96, 126.58],
              [36.84, 126.66],
              [36.76, 126.50],
              [36.88, 126.48]
            ]
          }
        ],
        ports: [
          { label: "East China Sea", lat: 31.10, lng: 123.40, kind: "origin" },
          { label: "Yellow Sea mid-point", lat: 33.88, lng: 124.18, kind: "transit" },
          { label: "Yellow Sea north", lat: 35.26, lng: 125.42, kind: "transit" },
          { label: "Pyeongtaek-Dangjin approaches", lat: 36.88, lng: 126.48, kind: "destination" }
        ],
        events: [
          { label: "Routine northbound segment", type: "normal", routeRef: { segmentIndex: 0, pointIndex: 2 } },
          { label: "Slow manoeuvre", type: "loiter", routeRef: { segmentIndex: 1, pointIndex: 2 } },
          { label: "9h AIS gap", type: "gap", routeRef: { segmentIndex: 2, pointIndex: 1 } },
          { label: "Transit resumes toward Korean west coast", type: "normal", routeRef: { segmentIndex: 3, pointIndex: 2 } },
          { label: "Anchorage hold", type: "anchor", routeRef: { segmentIndex: 4, pointIndex: 2 } }
        ]
      },
      facilitator: {
        intendedRisk: "Red",
        intendedAction: "Refuse",
        intendedFinding: "OFAC should pay off directly on KOTI and KOTI CORP. Google should also surface the South Korea seizure and the UN-linked KUM UN SAN 3 ship-to-ship transfer narrative. AIS supports escalation but is not the sole giveaway."
      }
    },
    {
      id: "V11",
      name: "SINAR TERNATE",
      type: "LPG tanker",
      built: "2009",
      imo: "9370654",
      applicantOwner: "SAMUDERA SHIPPING INDONESIA PT",
      manager: "PT SAMUDERA INDONESIA SHIP MANAGEMENT",
      operator: "NORSTAR SHIP MANAGEMENT PTE LTD",
      previousFlag: "Bahamas",
      address: "PT Samudera Indonesia Ship Management (PT SISM), Lantai 2, Gedung Samudera Indonesia, Jalan Letjen S Parman Kav 35, Palmerah, Jakarta 11480, Indonesia",
      insurer: "Not stated in application",
      invoicePayee: "NORSTAR SHIP MANAGEMENT PTE LTD",
      operatingArea: "Singapore / South China Sea / Gulf of Tonkin LPG trade",
      docsStatus: "Complete",
      imageSrc: "assets/vessel_v2.png",
      applicationNote: "Application presents the vessel as a regional LPG carrier in Southeast and East Asian trade. The pack is administratively complete with no obvious discrepancies on the face of the file.",
      aisMap: {
        corridor: "Singapore / South China Sea / Gulf of Tonkin / Qinzhou",
        viewport: {
          center: [14.8, 111.6],
          zoom: 4.75
        },
        currentPosition: [21.73, 108.62],
        routeSegments: [
          {
            type: "normal",
            coordinates: [
              [1.26, 103.82],
              [4.40, 106.20],
              [8.10, 109.32],
              [12.10, 112.60],
              [15.60, 112.40]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [15.60, 112.40],
              [17.40, 111.20],
              [19.20, 109.80]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [19.20, 109.80],
              [20.40, 109.20],
              [21.18, 108.92],
              [21.73, 108.62]
            ]
          },
          {
            type: "anchor",
            coordinates: [
              [21.73, 108.62],
              [21.82, 108.76],
              [21.66, 108.84],
              [21.58, 108.66],
              [21.73, 108.62]
            ]
          }
        ],
        ports: [
          { label: "Singapore", lat: 1.26, lng: 103.82, kind: "origin" },
          { label: "South China Sea", lat: 12.10, lng: 112.60, kind: "transit" },
          { label: "Gulf of Tonkin", lat: 20.40, lng: 109.20, kind: "transit" },
          { label: "Qinzhou", lat: 21.73, lng: 108.62, kind: "destination" }
        ],
        events: [
          { label: "Routine regional LPG transit", type: "normal", routeRef: { segmentIndex: 0, pointIndex: 2 } },
          { label: "Short AIS coverage loss", type: "gap", routeRef: { segmentIndex: 1, pointIndex: 1 } },
          { label: "Signal resumes on Qinzhou approach", type: "normal", routeRef: { segmentIndex: 2, pointIndex: 2 } },
          { label: "Extended port waiting", type: "anchor", routeRef: { segmentIndex: 3, pointIndex: 2 } }
        ]
      },
      facilitator: {
        intendedRisk: "Amber",
        intendedAction: "Hold",
        intendedFinding: "Participants should find a recent Tokyo MoU detention in Qinzhou and the former-name trail to Cathinka Spirit. No sanctions slam-dunk is expected. This is a PSC/history-led amber case."
      }
    },
    {
      id: "V12",
      name: "A S",
      type: "Chemical tanker",
      built: "1973",
      imo: "7303803",
      applicantOwner: "KOREA ANSAN SHIPPING COMPANY",
      manager: "KOREA ANSAN SHIPPING COMPANY",
      operator: "KOREA ANSAN SHIPPING COMPANY",
      previousFlag: "Russia",
      address: "Pyongyang, Democratic People's Republic of Korea",
      insurer: "Not stated in application",
      invoicePayee: "KOREA ANSAN SHIPPING COMPANY (Pyongyang, DPRK)",
      operatingArea: "Yellow Sea / China Coast coastal tanker pattern",
      docsStatus: "Complete",
      imageSrc: "assets/vessel_v5.png",
      applicationNote: "Application file presents the vessel under the name A S with basic but processable ownership documentation. The pack does not reference prior vessel identities.",
      aisMap: {
        corridor: "Yellow Sea / China Coast",
        viewport: {
          center: [35.4, 124.4],
          zoom: 5.55
        },
        currentPosition: [31.84, 122.98],
        routeSegments: [
          {
            type: "normal",
            coordinates: [
              [38.80, 124.20],
              [37.60, 124.00],
              [36.54, 123.96],
              [34.92, 123.54]
            ]
          },
          {
            type: "loiter",
            coordinates: [
              [34.92, 123.54],
              [35.10, 123.70],
              [34.86, 123.84],
              [34.72, 123.62],
              [34.92, 123.54]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [34.92, 123.54],
              [34.10, 123.30],
              [33.22, 123.14]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [33.22, 123.14],
              [32.54, 123.04],
              [31.84, 122.98]
            ]
          },
          {
            type: "anchor",
            coordinates: [
              [31.84, 122.98],
              [31.94, 123.10],
              [31.76, 123.16],
              [31.68, 123.00],
              [31.84, 122.98]
            ]
          }
        ],
        ports: [
          { label: "Yellow Sea north", lat: 38.80, lng: 124.20, kind: "origin" },
          { label: "Yellow Sea mid-point", lat: 34.92, lng: 123.54, kind: "transit" },
          { label: "China Coast", lat: 31.84, lng: 122.98, kind: "destination" }
        ],
        events: [
          { label: "Routine coastal segment", type: "normal", routeRef: { segmentIndex: 0, pointIndex: 2 } },
          { label: "Slow manoeuvre", type: "loiter", routeRef: { segmentIndex: 1, pointIndex: 2 } },
          { label: "10h AIS gap", type: "gap", routeRef: { segmentIndex: 2, pointIndex: 1 } },
          { label: "Signal resumes near China coast", type: "normal", routeRef: { segmentIndex: 3, pointIndex: 1 } },
          { label: "Anchorage wait", type: "anchor", routeRef: { segmentIndex: 4, pointIndex: 2 } }
        ]
      },
      facilitator: {
        intendedRisk: "Red",
        intendedAction: "Refuse",
        intendedFinding: "Application-facing name A S should lead participants to pivot through IMO 7303803 and uncover OFAC-listed AN SAN 1 linked to KOREA ANSAN SHIPPING COMPANY. Google should also surface Japan MOFA material strongly suspecting banned STS activity."
      }
    },
    {
      id: "V13",
      name: "SHANG YUAN BAO",
      type: "General cargo vessel",
      built: "1984",
      imo: "8126070",
      applicantOwner: "JUI CHENG SHIPPING COMPANY LIMITED",
      manager: "JUI ZONG SHIP MANAGEMENT CO LTD",
      operator: "JUI PANG SHIPPING CO LTD",
      previousFlag: "Sierra Leone",
      address: "Room B, 21/F Kaikwong Commercial Building, 332 Lockhart Road, Wan Chai, Hong Kong",
      insurer: "China Continent Insurance Company",
      invoicePayee: "ELITE MARINE TRANSPORTATION CO SA (5th Floor, 551 Jiuru 1st Road, Sanmin District, Kaohsiung, Taiwan)",
      operatingArea: "Taiwan / East China Sea / Yellow Sea general cargo trade",
      docsStatus: "Complete",
      imageSrc: "assets/vessel_v3.png",
      applicationNote: "Application file presents the vessel as an older general-cargo carrier in regional East Asian service. The pack contains cross-references between multiple related shipping entities but appears administratively complete.",
      aisMap: {
        corridor: "Kaohsiung / Taiwan Strait / East China Sea / Yellow Sea",
        viewport: {
          center: [30.0, 124.0],
          zoom: 5.2
        },
        currentPosition: [34.60, 123.40],
        routeSegments: [
          {
            type: "normal",
            coordinates: [
              [22.40, 120.20],
              [23.80, 119.60],
              [25.20, 120.40],
              [27.60, 121.80],
              [30.20, 123.00]
            ]
          },
          {
            type: "loiter",
            coordinates: [
              [30.20, 123.00],
              [30.40, 123.20],
              [30.20, 123.40],
              [30.00, 123.20],
              [30.20, 123.00]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [30.20, 123.00],
              [31.40, 123.20],
              [32.60, 123.40]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [32.60, 123.40],
              [33.40, 123.40],
              [34.20, 123.40],
              [34.60, 123.40]
            ]
          },
          {
            type: "anchor",
            coordinates: [
              [34.60, 123.40],
              [34.70, 123.52],
              [34.56, 123.58],
              [34.48, 123.42],
              [34.60, 123.40]
            ]
          }
        ],
        ports: [
          { label: "Kaohsiung approaches", lat: 22.40, lng: 120.20, kind: "origin" },
          { label: "Taiwan Strait", lat: 25.20, lng: 120.40, kind: "transit" },
          { label: "East China Sea", lat: 30.20, lng: 123.00, kind: "transit" },
          { label: "Yellow Sea anchorage", lat: 34.60, lng: 123.40, kind: "destination" }
        ],
        events: [
          { label: "Routine departure", type: "normal", routeRef: { segmentIndex: 0, pointIndex: 2 } },
          { label: "Slow manoeuvre in open water", type: "loiter", routeRef: { segmentIndex: 1, pointIndex: 2 } },
          { label: "12h AIS gap", type: "gap", routeRef: { segmentIndex: 2, pointIndex: 1 } },
          { label: "Signal resumes", type: "normal", routeRef: { segmentIndex: 3, pointIndex: 1 } },
          { label: "Anchorage wait", type: "anchor", routeRef: { segmentIndex: 4, pointIndex: 2 } }
        ]
      },
      facilitator: {
        intendedRisk: "Red",
        intendedAction: "Refuse",
        intendedFinding: "Classic DPRK sanctions-evasion route case. OFAC should pay off on SHANG YUAN BAO and/or JUI CHENG SHIPPING COMPANY LIMITED. The company layering across JUI CHENG, JUI PANG, and JUI ZONG, combined with the Kaohsiung and Wan Chai addresses, should surface strong sanctions concern. The AIS gap and loiter pattern are supporting context for a suspected STS facilitation pattern."
      }
    },
    {
      id: "V14",
      name: "CALM BRIDGE",
      type: "General cargo vessel",
      built: "1985",
      imo: "8318867",
      applicantOwner: "SILVER BRIDGE SHIPPING CO-HKG",
      manager: "SILVER BRIDGE SHIPPING CO-HKG",
      operator: "SILVER BRIDGE SHIPPING CO-HKG",
      previousFlag: "Tanzania",
      address: "Unit B-01, 20th Floor, Full Win Commercial Centre, 573 Nathan Road, Yau Ma Tei, Kowloon, Hong Kong",
      insurer: "Pacific Pioneer Insurance Company",
      invoicePayee: "SILVER BRIDGE SHIPPING CO-HKG (573 Nathan Road, Kowloon, Hong Kong)",
      operatingArea: "East Korea Bay / Sea of Japan / East China Sea regional bulk trade",
      docsStatus: "Partial",
      imageSrc: "assets/vessel_v5.png",
      applicationNote: "Application presents the vessel as an older general-cargo carrier engaged in routine regional bulk trade. Some documentation has been flagged as pending supplementary materials.",
      aisMap: {
        corridor: "East Korea Bay / Sea of Japan / Tsushima Strait / East China Sea",
        viewport: {
          center: [37.0, 130.6],
          zoom: 5.4
        },
        currentPosition: [33.80, 128.80],
        routeSegments: [
          {
            type: "normal",
            coordinates: [
              [39.60, 128.20],
              [38.80, 129.00],
              [37.80, 130.20],
              [36.40, 131.00]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [36.40, 131.00],
              [35.80, 130.60],
              [35.20, 129.80]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [35.20, 129.80],
              [34.60, 129.40],
              [34.20, 129.20],
              [33.80, 128.80]
            ]
          },
          {
            type: "loiter",
            coordinates: [
              [33.80, 128.80],
              [33.92, 128.96],
              [33.74, 129.00],
              [33.68, 128.82],
              [33.80, 128.80]
            ]
          },
          {
            type: "anchor",
            coordinates: [
              [33.80, 128.80],
              [33.86, 128.90],
              [33.76, 128.94],
              [33.72, 128.82],
              [33.80, 128.80]
            ]
          }
        ],
        ports: [
          { label: "East Korea Bay", lat: 39.60, lng: 128.20, kind: "origin" },
          { label: "Sea of Japan", lat: 36.40, lng: 131.00, kind: "transit" },
          { label: "Tsushima Strait approaches", lat: 34.60, lng: 129.40, kind: "transit" },
          { label: "Tsushima anchorage", lat: 33.80, lng: 128.80, kind: "destination" }
        ],
        events: [
          { label: "Routine coastal transit", type: "normal", routeRef: { segmentIndex: 0, pointIndex: 2 } },
          { label: "7h AIS gap", type: "gap", routeRef: { segmentIndex: 1, pointIndex: 1 } },
          { label: "Signal resumes south of Tsushima", type: "normal", routeRef: { segmentIndex: 2, pointIndex: 2 } },
          { label: "Slow manoeuvre", type: "loiter", routeRef: { segmentIndex: 3, pointIndex: 2 } },
          { label: "Anchorage wait", type: "anchor", routeRef: { segmentIndex: 4, pointIndex: 2 } }
        ]
      },
      facilitator: {
        intendedRisk: "Red",
        intendedAction: "Refuse",
        intendedFinding: "Operator-address led red case. OFAC should pay off on CALM BRIDGE and/or SILVER BRIDGE SHIPPING CO-HKG. The Full Win Commercial Centre address and DPRK coal-export route logic should reinforce the sanctions concern. The AIS gap between East Korea Bay and Tsushima supports a DPRK coal-transfer narrative."
      }
    },
    {
      id: "V15",
      name: "STAR 18",
      type: "General cargo vessel",
      built: "1991",
      imo: "9020015",
      applicantOwner: "THINH CUONG COMPANY LIMITED",
      manager: "THINH CUONG COMPANY LIMITED",
      operator: "THINH CUONG COMPANY LIMITED",
      previousFlag: "Vietnam",
      address: "41/8 B Cu Chinh Lan, Hai Phong, Vietnam",
      insurer: "Bao Viet Insurance Corporation",
      invoicePayee: "THINH CUONG COMPANY LIMITED (41/8 B Cu Chinh Lan, Hai Phong, Vietnam)",
      operatingArea: "Hai Phong / Gulf of Tonkin / South China Sea regional coastal trade",
      docsStatus: "Complete",
      imageSrc: "assets/vessel_v1.png",
      applicationNote: "Application presents the vessel as a routine coastal cargo carrier in Vietnamese and regional trade. The pack contains vessel identity information and references prior operating names. Documentation is complete and internally consistent on its face.",
      aisMap: {
        corridor: "Hai Phong / Gulf of Tonkin / Hainan Strait / South China Sea",
        viewport: {
          center: [17.6, 109.4],
          zoom: 5.8
        },
        currentPosition: [15.40, 109.20],
        routeSegments: [
          {
            type: "normal",
            coordinates: [
              [20.76, 106.88],
              [20.20, 107.30],
              [19.60, 107.80],
              [18.80, 108.40]
            ]
          },
          {
            type: "gap",
            coordinates: [
              [18.80, 108.40],
              [18.20, 108.80],
              [17.60, 109.40]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [17.60, 109.40],
              [17.00, 109.40],
              [16.40, 109.30],
              [15.80, 109.20]
            ]
          },
          {
            type: "loiter",
            coordinates: [
              [15.80, 109.20],
              [15.68, 109.30],
              [15.54, 109.22],
              [15.60, 109.10],
              [15.80, 109.20]
            ]
          },
          {
            type: "normal",
            coordinates: [
              [15.80, 109.20],
              [15.60, 109.20],
              [15.40, 109.20]
            ]
          },
          {
            type: "anchor",
            coordinates: [
              [15.40, 109.20],
              [15.48, 109.30],
              [15.36, 109.36],
              [15.30, 109.22],
              [15.40, 109.20]
            ]
          }
        ],
        ports: [
          { label: "Hai Phong approaches", lat: 20.76, lng: 106.88, kind: "origin" },
          { label: "Gulf of Tonkin", lat: 18.80, lng: 108.40, kind: "transit" },
          { label: "Hainan Strait area", lat: 17.60, lng: 109.40, kind: "transit" },
          { label: "Central Vietnam coast", lat: 15.40, lng: 109.20, kind: "destination" }
        ],
        events: [
          { label: "Routine departure", type: "normal", routeRef: { segmentIndex: 0, pointIndex: 2 } },
          { label: "6h AIS gap", type: "gap", routeRef: { segmentIndex: 1, pointIndex: 1 } },
          { label: "Signal resumes south of Hainan", type: "normal", routeRef: { segmentIndex: 2, pointIndex: 2 } },
          { label: "Slow manoeuvre offshore", type: "loiter", routeRef: { segmentIndex: 3, pointIndex: 2 } },
          { label: "Anchorage wait", type: "anchor", routeRef: { segmentIndex: 5, pointIndex: 2 } }
        ]
      },
      facilitator: {
        intendedRisk: "Red",
        intendedAction: "Refuse",
        intendedFinding: "Document-heavy red case. OFAC should surface STAR 18 and/or THINH CUONG COMPANY LIMITED. The alias trail through SAM 5 and THINH CUONG (as a vessel name) should reinforce the concern. The Hai Phong address and Southeast Asia coastal routing are consistent with the sanctions narrative."
      }
    }
  ]
};

registryData.vessels = registryData.vessels.map((vessel) => ({
  ...vessel,
  ...(vesselImageCatalog[vessel.name] || {})
}));
