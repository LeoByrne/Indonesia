const stsExerciseData = {
  title: "STS Detection OS",
  subtitle: "Exercise 2: map-led STS legitimacy review",
  briefing: {
    title: "Review your four assigned encounter cases.",
    lines: [
      "Select your group first, then work from your four-case dashboard into one dedicated encounter workspace at a time.",
      "For each case, review the map, encounter facts, and vessel evidence, then discuss your assessment with the group."
    ]
  },
  groups: [
    {
      id: "G1",
      label: "Group 1",
      title: "Baseline and escalation",
      blurb: "Start with a legitimate benchmark, a crowded false-positive, and two progressively tougher oil cases."
    },
    {
      id: "G2",
      label: "Group 2",
      title: "False positives and ambiguity",
      blurb: "Work through coal logistics, anchorage clutter, and the harder middle ground where the file is uncomfortable but incomplete."
    },
    {
      id: "G3",
      label: "Group 3",
      title: "Service water vs sanctions risk",
      blurb: "Compare benign service contacts against the stronger corridor and DPRK-linked escalation cases."
    }
  ],
  classificationOptions: [
    "Likely legitimate STS",
    "False positive / not really STS",
    "Unclear / needs more scrutiny",
    "Likely illegitimate / concerning"
  ],
  cases: [
    {
      id: "Case 1",
      groupId: "G1",
      focus: "Oil",
      title: "Singapore Bunkering Contact",
      commodity: "Marine fuel / bunkers",
      area: "Singapore eastern service waters",
      participantSummary: "Two tankers make a brief overnight support / bunkering-style contact inside Singapore's regulated eastern service waters, then resume normal movement. Use the controlled setting, continuous AIS, and clean separation before treating it as suspicious.",
      aisEvidence: {
        signal: "Continuous AIS from both vessels",
        pattern: "Short regulated service-water support / bunkering-style contact with clean separation",
        contactWindow: "Under 2 hours",
        setting: "Inside regulated Singapore service waters",
        timing: "Routine overnight operating window"
      },
      eventFacts: [
        { label: "Setting", value: "Inside regulated Singapore eastern service waters" },
        { label: "Contact", value: "Brief tanker-to-tanker support / bunkering-style contact" },
        { label: "Vessel profile", value: "Oil products tanker and chemical/oil products tanker" },
        { label: "AIS picture", value: "Continuous AIS before, during, and after contact" },
        { label: "Supporting evidence", value: "No visible sanctions or identity trigger in the file" }
      ],
      indicators: [
        "Regulated Singapore service-water context supports routine tanker support activity",
        "Short, fully visible contact with no AIS concealment",
        "Both tracks resume normal controlled movement after separation",
        "No obvious identity irregularity or sanctions red flag in-file"
      ],
      vessels: {
        a: {
          name: "GOLDEN PIONEER",
          role: "Tanker",
          imo: "9467823",
          type: "Oil Products Tanker",
          flag: "Singapore",
          built: "2011",
          owner: "GOLDEN DENDRO PTE LTD",
          manager: "GOLDEN ISLAND MARINE SERVICES",
          operator: "GOLDEN ISLAND MARINE SERVICES",
          insurer: "",
          formerNames: "No recent alias noted",
          history: "Golden Island Marine Services and Golden Dendro are publicly linked to 250 Sims Avenue, #02-01, SPCS Building, Singapore 387513."
        },
        b: {
          name: "SINGAPORE PIONEER",
          role: "Tanker",
          imo: "9478262",
          type: "Chemical/Oil Products Tanker",
          flag: "Panama",
          built: "2009",
          owner: "MAKINO KAIUN/MAKI OCEAN",
          manager: "SHANGHAI DINGHENG SHIP MGMT CO",
          operator: "SHANGHAI DINGHENG SHIP MGMT CO",
          insurer: "",
          formerNames: "No recent alias noted",
          history: "Public tools link the owner/beneficial-owner trail to Makino Kaiun/Maki Ocean and care-of Shanghai Dingheng Ship Management, Building 10, 199 Changjian Lu, Baoshan Qu, Shanghai, China."
        }
      },
      map: {
        viewport: { center: [1.214, 104.184], zoom: 11.5 },
        encounter: { lat: 1.204, lng: 104.189, label: "" },
        zones: [
          {
            kind: "service",
            shape: "polygon",
            label: "Singapore service-water footprint",
            coordinates: [
              [1.170, 104.055],
              [1.176, 104.285],
              [1.214, 104.342],
              [1.258, 104.320],
              [1.272, 104.220],
              [1.265, 104.075]
            ]
          }
        ],
        annotations: [],
        events: [],
        vessels: [
          {
            key: "a",
            label: "Vessel A",
            tone: "a",
            currentPosition: [1.195, 104.226],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [1.197, 104.224],
                  [1.199, 104.216],
                  [1.201, 104.208],
                  [1.203, 104.200]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [1.203, 104.200],
                  [1.204, 104.195],
                  [1.204, 104.191],
                  [1.204, 104.187],
                  [1.203, 104.191],
                  [1.203, 104.196],
                  [1.203, 104.200]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [1.203, 104.200],
                  [1.201, 104.208],
                  [1.199, 104.216],
                  [1.197, 104.223],
                  [1.195, 104.226]
                ]
              }
            ]
          },
          {
            key: "b",
            label: "Vessel B",
            tone: "b",
            currentPosition: [1.201, 104.101],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [1.236, 104.334],
                  [1.231, 104.313],
                  [1.226, 104.290],
                  [1.220, 104.266],
                  [1.215, 104.241],
                  [1.210, 104.216],
                  [1.206, 104.198]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [1.206, 104.198],
                  [1.205, 104.194],
                  [1.204, 104.190],
                  [1.204, 104.186],
                  [1.205, 104.181],
                  [1.206, 104.177],
                  [1.206, 104.198]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [1.206, 104.198],
                  [1.205, 104.182],
                  [1.204, 104.166],
                  [1.203, 104.150],
                  [1.202, 104.133],
                  [1.201, 104.117],
                  [1.201, 104.101]
                ]
              }
            ]
          }
        ]
      },
      billOfLading: {
        title: "Bill of Lading",
        previewSrc: "assets/bills-of-lading/preview/case-01-bill-of-lading.webp",
        fullSrc: "assets/bills-of-lading/full/case-01-bill-of-lading.webp",
        alt: "Bill of Lading for Case 1",
        caption: "Cargo document"
      },
      facilitator: {
        intendedClassification: "Likely legitimate STS",
        rationale: "Regulated Singapore service waters, continuous AIS, a short contact, clean separation, and no concealment signal fit a routine legitimate bunkering-style support call.",
        hiddenFacts: ["Green benchmark for oil cases."],
        researchAnchor: "Real searchable tanker pair in a synthetic but plausible Singapore service-water bunkering encounter.",
        citations: []
      }
    },
    {
      id: "Case 2",
      groupId: "G1",
      focus: "Coal",
      title: "Kalimantan Anchorage Overlap",
      commodity: "Coal / loading context",
      area: "Muara Pantai / East Kalimantan coal loading area",
      participantSummary: "Two bulk carriers operate in a crowded coal-loading area. Use the anchorage context and vessel roles before deciding whether any transfer actually occurred.",
      aisEvidence: {
        signal: "Continuous signal",
        pattern: "Anchorage-area pass with short holding movement",
        contactWindow: "Under 2 hours",
        setting: "Busy coal loading area",
        timing: "Daylight / working hours"
      },
      eventFacts: [
        { label: "Setting", value: "Known East Kalimantan coal-loading area" },
        { label: "Contact", value: "Close operating pass near anchorage" },
        { label: "Vessel profile", value: "Two bulk carriers in loading traffic" },
        { label: "AIS picture", value: "Continuous AIS, no gap or concealment" },
        { label: "Supporting evidence", value: "No sanctions signal or transfer evidence" }
      ],
      indicators: [
        "Legitimate coal hotspot setting",
        "Two oceangoing bulkers, not a clean feeder pattern",
        "Weak basis for immediate escalation",
        "Investigate further before inferring STS concern"
      ],
      vessels: {
        a: {
          name: "SEA PRIDE I",
          role: "Bulk carrier",
          imo: "9636450",
          type: "Bulk Carrier",
          flag: "Panama",
          built: "2013",
          owner: "SPDBFL NO. TWO HUNDRED AND THIRTY-FIVE (TIANJIN) SHIP LEASING COMPANY LIMITED",
          manager: "SEA TRADE MARINE SA",
          operator: "SEA TRADE MARINE SA",
          insurer: "",
          formerNames: "AFRICAN PRIDE; AFRICAN LION; CLIPPER EXCALIBUR",
          history: "Public shipping records show a long-running bulker identity with searchable ownership and management particulars in accessible sources."
        },
        b: {
          name: "CM LAURENCIA",
          role: "Bulk carrier",
          imo: "9316880",
          type: "Bulk Carrier",
          flag: "Indonesia",
          built: "2007",
          owner: "CAKRAWALA MITRA INTIPRIMA PT",
          manager: "CAKRAWALA DERMAGA SELATAN PT",
          operator: "CAKRAWALA DERMAGA SELATAN PT",
          insurer: "",
          formerNames: "No recent alias noted",
          history: "Public sources tie the management trail to Cakrawala Dermaga Selatan and address traces in Gambut, Banjar, Kalimantan and Jakarta, Indonesia."
        }
      },
      map: {
        viewport: { center: [2.30, 120.25], zoom: 5.3 },
        encounter: { lat: 1.98, lng: 118.44, label: "Brief operating proximity" },
        zones: [
          {
            kind: "anchorage",
            shape: "polygon",
            label: "Muara Pantai loading approaches",
            coordinates: [
              [1.82, 118.36],
              [1.86, 118.62],
              [2.02, 118.70],
              [2.14, 118.55],
              [2.10, 118.38],
              [1.94, 118.32]
            ]
          }
        ],
        annotations: [],
        events: [],
        vessels: [
          {
            key: "a",
            label: "Vessel A",
            tone: "a",
            currentPosition: [-1.10, 119.05],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [4.85, 123.20],
                  [4.40, 122.50],
                  [3.95, 121.75],
                  [3.50, 121.05],
                  [3.05, 120.30],
                  [2.60, 119.70],
                  [2.28, 119.10],
                  [2.18, 119.05],
                  [2.10, 118.95],
                  [2.05, 118.75],
                  [2.00, 118.50],
                  [1.99, 118.47]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [1.99, 118.47],
                  [2.04, 118.48],
                  [2.06, 118.44],
                  [2.03, 118.39],
                  [1.97, 118.38],
                  [1.94, 118.43],
                  [1.99, 118.47]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [1.99, 118.47],
                  [1.70, 118.75],
                  [1.30, 119.00],
                  [0.80, 119.18],
                  [0.20, 119.25],
                  [-0.45, 119.18],
                  [-1.10, 119.05]
                ]
              }
            ]
          },
          {
            key: "b",
            label: "Vessel B",
            tone: "b",
            currentPosition: [-1.10, 119.25],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [5.80, 119.90],
                  [5.20, 119.75],
                  [4.60, 119.55],
                  [4.00, 119.25],
                  [3.40, 118.95],
                  [2.80, 118.70],
                  [2.35, 118.78],
                  [2.12, 118.78],
                  [2.06, 118.76]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [2.06, 118.76],
                  [2.02, 118.72],
                  [1.98, 118.68],
                  [1.94, 118.64],
                  [1.92, 118.62]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [1.92, 118.62],
                  [1.80, 118.95],
                  [1.45, 119.35],
                  [0.90, 119.62],
                  [0.25, 119.50],
                  [-0.45, 119.38],
                  [-1.10, 119.25]
                ]
              }
            ]
          }
        ]
      },
      billOfLading: {
        title: "Bill of Lading",
        previewSrc: "assets/bills-of-lading/preview/case-02-bill-of-lading.webp",
        fullSrc: "assets/bills-of-lading/full/case-02-bill-of-lading.webp",
        alt: "Bill of Lading for Case 2",
        caption: "Cargo document"
      },
      facilitator: {
        intendedClassification: "False positive / not really STS",
        rationale: "Crowded coal-loading context plus vessel mix supports routine traffic rather than a clear suspicious transfer event.",
        hiddenFacts: ["Low-concern discriminator case for coal context."],
        researchAnchor: "Real searchable bulk carriers placed in a plausible East Kalimantan coal-loading / anchorage clutter scenario.",
        citations: []
      }
    },
    {
      id: "Case 3",
      groupId: "G1",
      focus: "Oil",
      title: "Penang Offshore Contact",
      commodity: "Crude oil",
      area: "Off Muka Head, Penang",
      participantSummary: "Two crude oil tankers are shown in an offshore contact pattern off Penang. Review the AIS movement, vessel identifiers, former names, and company fields, then decide what additional checks or follow-up questions are needed.",
      aisEvidence: {
        signal: "Continuous AIS from both tankers",
        pattern: "Brief coupled offshore manoeuvring inside a wider international tanker route picture",
        contactWindow: "2-6 hours",
        setting: "Off Muka Head, Penang, northern Malacca Strait",
        timing: "Overnight"
      },
      eventFacts: [
        { label: "Setting", value: "Off Muka Head, Penang, northern Malacca Strait" },
        { label: "Location detail", value: "Reported contact area approximately 24 nm west of Muka Head" },
        { label: "Contact", value: "Nighttime coupled-position contact" },
        { label: "Vessel profile", value: "Two VLCC crude oil tankers" },
        { label: "AIS picture", value: "Continuous AIS with a brief coupled manoeuvre inside wider route context" }
      ],
      indicators: [
        "Compare the two AIS tracks and contact timing",
        "Review each vessel's IMO number, current name and former names",
        "Review available owner, manager, operator and insurer fields",
        "Identify what information is missing or unclear",
        "Decide what follow-up checks would be needed before taking action"
      ],
      vessels: {
        a: {
          name: "NORA",
          role: "Tanker",
          imo: "9237539",
          type: "Crude Oil Tanker",
          flag: "Guyana (current AIS)",
          built: "2002",
          owner: "Not shown / blank in accessible vessel sources",
          manager: "Not shown / blank in accessible vessel sources",
          operator: "Not shown / blank in accessible vessel sources",
          insurer: "",
          formerNames: "AROON; NIGH; LONGBOW LAKE; GULF FALCON; GULF GLORY; NICHINORI",
          history: "Public vessel records show a longer former-name history. Current owner and manager fields are not shown or are blank in accessible vessel sources."
        },
        b: {
          name: "RCELEBRA",
          role: "Tanker",
          imo: "9286073",
          type: "Crude Oil Tanker",
          flag: "Cameroon",
          built: "2005",
          owner: "CAPITAL FLAT INTL TRADING",
          manager: "AGILITY SHIPPING LTD",
          operator: "AGILITY SHIPPING LTD",
          insurer: "",
          formerNames: "T CEREAL; ROLIN; CAROLINE; ADVENTURE",
          history: "Public vessel records identify a registered owner and manager/operator. The vessel also has several former names."
        }
      },
      map: {
        viewport: { center: [6.1, 98.5], zoom: 4.7 },
        encounter: { lat: 5.41, lng: 99.82, label: "Night coupled-position contact" },
        zones: [{ kind: "hotspot", shape: "circle", label: "Penang offshore contact area", center: [5.41, 99.82], radius: 36000 }],
        annotations: [],
        events: [],
        vessels: [
          {
            key: "a",
            label: "Vessel A",
            tone: "a",
            currentPosition: [8.54, 93.52],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [10.40, 93.00],
                  [9.80, 93.60],
                  [9.20, 94.40],
                  [8.60, 95.20],
                  [8.00, 96.00],
                  [7.40, 96.80],
                  [6.80, 97.60],
                  [6.20, 98.30],
                  [5.80, 98.82],
                  [5.55, 99.20],
                  [5.42, 99.58],
                  [5.38, 99.70]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [5.38, 99.70],
                  [5.38, 99.74],
                  [5.39, 99.78],
                  [5.40, 99.81],
                  [5.41, 99.82],
                  [5.42, 99.80],
                  [5.42, 99.76],
                  [5.41, 99.72],
                  [5.38, 99.70]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [5.38, 99.70],
                  [5.48, 99.32],
                  [5.70, 98.80],
                  [6.00, 98.18],
                  [6.36, 97.48],
                  [6.76, 96.70],
                  [7.18, 95.90],
                  [7.64, 95.12],
                  [8.10, 94.30],
                  [8.54, 93.52]
                ]
              }
            ]
          },
          {
            key: "b",
            label: "Vessel B",
            tone: "b",
            currentPosition: [1.32, 103.22],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [11.50, 95.00],
                  [10.80, 95.80],
                  [10.00, 96.60],
                  [9.20, 97.30],
                  [8.40, 97.90],
                  [7.60, 98.40],
                  [6.90, 98.80],
                  [6.30, 99.10],
                  [5.90, 99.36],
                  [5.65, 99.56],
                  [5.45, 99.74]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [5.45, 99.74],
                  [5.44, 99.77],
                  [5.44, 99.80],
                  [5.43, 99.83],
                  [5.41, 99.85],
                  [5.38, 99.86]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [5.38, 99.86],
                  [4.95, 100.06],
                  [4.45, 100.28],
                  [3.88, 100.58],
                  [3.24, 100.92],
                  [2.62, 101.34],
                  [2.08, 101.82],
                  [1.70, 102.36],
                  [1.48, 102.94],
                  [1.32, 103.22]
                ]
              }
            ]
          }
        ]
      },
      billOfLading: {
        title: "Bill of Lading",
        previewSrc: "assets/bills-of-lading/preview/case-03-bill-of-lading.webp",
        fullSrc: "assets/bills-of-lading/full/case-03-bill-of-lading.webp",
        alt: "Bill of Lading for Case 3",
        caption: "Cargo document"
      },
      facilitator: {
        intendedClassification: "Likely illegitimate / concerning",
        rationale: "Facilitator note: this case is intended to test whether participants combine movement, vessel identity, company data and document checks rather than relying on AIS proximity alone. Keep the participant-facing view neutral.",
        hiddenFacts: ["Red / escalation case in Group 1."],
        researchAnchor: "Facilitator note: compare public records for IMO 9237539 and IMO 9286073, including current vessel names, former names, owner/manager fields and sanctions-screening results.",
        citations: []
      }
    },
    {
      id: "Case 4",
      groupId: "G1",
      focus: "Oil",
      title: "Eastern Indian Ocean Contact",
      commodity: "Crude oil",
      area: "Eastern Indian Ocean approaches",
      participantSummary: "Two VLCC crude oil tankers are shown in an offshore contact pattern in the eastern Indian Ocean approaches. Review the AIS movement, vessel identifiers, former names, and company fields, then decide what additional checks or follow-up questions are needed.",
      aisEvidence: {
        signal: "Uneven signal continuity across the two tracks",
        pattern: "Short offshore tanker contact within wider international routing",
        contactWindow: "2-6 hours",
        setting: "Eastern Indian Ocean approaches",
        timing: "Overnight"
      },
      eventFacts: [
        { label: "Setting", value: "Eastern Indian Ocean approaches" },
        { label: "Contact", value: "Short offshore tanker-to-tanker contact" },
        { label: "Vessel profile", value: "Two VLCC crude oil tankers" },
        { label: "AIS picture", value: "Signal continuity differs across the two routes around the contact window" },
        { label: "Timing", value: "Overnight contact window" }
      ],
      indicators: [
        "Compare the two AIS tracks and contact timing",
        "Review each vessel's IMO number, current name and former names",
        "Review available owner, manager, operator and insurer fields",
        "Identify what information is missing or unclear",
        "Decide what follow-up checks would be needed before taking action"
      ],
      vessels: {
        a: {
          name: "VIGOR",
          role: "Tanker",
          imo: "9262156",
          type: "Crude Oil Tanker",
          flag: "Panama",
          built: "2004",
          owner: "GALAXY MANAGEMENT NV",
          manager: "ATLANTIC NAVIGATION OPC PRIVATE LIMITED",
          operator: "ATLANTIC NAVIGATION OPC PRIVATE LIMITED",
          insurer: "",
          formerNames: "SANTA MARINA; ISUZUGAWA",
          history: "Public vessel records list prior names and current company fields. Review the IMO, current name, former names, owner and manager fields."
        },
        b: {
          name: "MS ENOLA",
          role: "Tanker",
          imo: "9251951",
          type: "Crude Oil Tanker",
          flag: "Djibouti (case timeframe)",
          built: "2002",
          owner: "JOURNEY INVESTMENT CO",
          manager: "ROSE SHIPPING LTD",
          operator: "ROSE SHIPPING LTD",
          insurer: "",
          formerNames: "KOHO I; HAI HUN",
          history: "Public vessel records list prior names and company fields. Some public vessel records show later name and flag changes after the case timeframe."
        }
      },
      map: {
        viewport: { center: [11.0, 77.5], zoom: 4.25 },
        encounter: { lat: 5.24, lng: 93.22, label: "Offshore contact" },
        zones: [{ kind: "hotspot", shape: "circle", label: "Outer Malacca approaches", center: [5.24, 93.22], radius: 70000 }],
        annotations: [],
        events: [],
        vessels: [
          {
            key: "a",
            label: "Vessel A",
            tone: "a",
            currentPosition: [4.66, 93.90],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [25.40, 57.80],
                  [25.00, 58.40],
                  [24.60, 59.20],
                  [23.20, 61.40],
                  [22.20, 63.40]
                ]
              },
              {
                type: "gap",
                coordinates: [
                  [22.20, 63.40],
                  [20.60, 64.80],
                  [19.00, 66.20]
                ]
              },
              {
                type: "spoof",
                coordinates: [
                  [19.00, 66.20],
                  [17.20, 67.90],
                  [15.80, 69.40]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [15.80, 69.40],
                  [13.00, 73.00],
                  [10.00, 74.80],
                  [7.20, 76.40],
                  [4.40, 78.10],
                  [1.80, 79.80]
                ]
              },
              {
                type: "gap",
                coordinates: [
                  [1.80, 79.80],
                  [0.00, 83.80],
                  [-1.80, 87.80],
                  [-0.80, 90.60],
                  [1.00, 92.20],
                  [3.40, 92.80],
                  [4.80, 93.00],
                  [5.08, 93.06]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [5.08, 93.06],
                  [5.12, 93.12],
                  [5.18, 93.18],
                  [5.24, 93.22],
                  [5.30, 93.20],
                  [5.34, 93.14],
                  [5.32, 93.06],
                  [5.24, 93.02],
                  [5.14, 93.02],
                  [5.08, 93.06]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [5.08, 93.06],
                  [4.96, 93.28],
                  [4.82, 93.56],
                  [4.66, 93.90]
                ]
              }
            ]
          },
          {
            key: "b",
            label: "Vessel B",
            tone: "b",
            currentPosition: [7.22, 96.58],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [16.20, 90.40],
                  [15.00, 90.60],
                  [13.80, 91.00],
                  [12.80, 91.40],
                  [11.60, 91.80],
                  [10.40, 92.20],
                  [9.20, 92.60],
                  [8.20, 92.84],
                  [7.20, 93.00],
                  [6.40, 93.10],
                  [5.80, 93.18],
                  [5.42, 93.30],
                  [5.22, 93.38]
                ]
              },
              {
                type: "gap",
                coordinates: [
                  [5.22, 93.38],
                  [5.20, 93.30],
                  [5.18, 93.24]
                ]
              },
              {
                type: "spoof",
                coordinates: [
                  [5.18, 93.24],
                  [5.42, 93.62],
                  [5.76, 94.10]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [5.76, 94.10],
                  [6.16, 94.74],
                  [6.64, 95.56],
                  [7.22, 96.58]
                ]
              }
            ]
          }
        ]
      },
      billOfLading: {
        title: "Bill of Lading",
        previewSrc: "assets/bills-of-lading/preview/case-04-bill-of-lading.webp",
        fullSrc: "assets/bills-of-lading/full/case-04-bill-of-lading.webp",
        alt: "Bill of Lading for Case 4",
        caption: "Cargo document"
      },
      facilitator: {
        intendedClassification: "Likely illegitimate / concerning",
        rationale: "Facilitator note: this case is intended to test whether participants combine movement, vessel identity, company data and document checks. Keep the participant-facing view neutral.",
        hiddenFacts: ["Red benchmark for Group 1."],
        researchAnchor: "Facilitator note: compare public records for IMO 9262156 and IMO 9251951, including current vessel names, former names, owner/manager fields and sanctions-screening results.",
        citations: []
      }
    },
    {
      id: "Case 5",
      groupId: "G2",
      focus: "Coal",
      title: "Taboneo Coal Loading",
      commodity: "Coal",
      area: "Taboneo anchorage / South Kalimantan",
      participantSummary: "Two Indonesia-flagged bulk carriers are shown operating around Taboneo anchorage / South Kalimantan. Review the AIS movement, vessel identifiers, company fields and former-name information before deciding what follow-up checks are needed.",
      aisEvidence: {
        signal: "Continuous AIS from both bulk carriers",
        pattern: "Anchored loading window with a short local working approach",
        contactWindow: "2-6 hours",
        setting: "Taboneo offshore coal-loading anchorage",
        timing: "Daylight / working hours"
      },
      eventFacts: [
        { label: "Setting", value: "Taboneo offshore coal-loading anchorage" },
        { label: "Contact", value: "Short alongside loading window at anchor" },
        { label: "Vessel profile", value: "Larger anchored bulker with a smaller Indonesia-flagged bulker" },
        { label: "AIS picture", value: "Continuous local approach, loading window, and departure" },
        { label: "Supporting evidence", value: "Searchable vessel identities, company fields, and former-name information" }
      ],
      indicators: [
        "Compare the AIS tracks and timing",
        "Review each vessel's IMO number, current name and former names",
        "Review owner, manager, operator and insurer fields",
        "Identify what information is missing or unclear",
        "Decide what follow-up checks would be needed before taking action"
      ],
      vessels: {
        a: {
          name: "HABCO ANKAA",
          role: "Bulk carrier",
          imo: "9354105",
          type: "Bulk Carrier",
          flag: "Indonesia",
          built: "2006",
          owner: "PT HABCO TRANS MARITIMA TBK",
          manager: "PT HABCO TRANS MARITIMA TBK",
          operator: "PT HABCO TRANS MARITIMA TBK",
          insurer: "",
          formerNames: "No recent alias noted",
          history: "Public vessel sources identify HABCO ANKAA as an Indonesia-flagged bulk carrier. Company fields should be checked against public vessel and company records."
        },
        b: {
          name: "ALPHA SAMUDRA 1",
          role: "Bulk carrier",
          imo: "9504293",
          type: "Bulk Carrier",
          flag: "Indonesia",
          built: "2009",
          owner: "PT SAMUDRA CAKRA INDONESIA",
          manager: "PT SAMUDRA CAKRA INDONESIA",
          operator: "PT SAMUDRA CAKRA INDONESIA",
          insurer: "",
          formerNames: "ALPHA SAMUDRA I; ELGIZNUR CEBI",
          history: "Public vessel and class records identify PT SAMUDRA CAKRA INDONESIA as owner / management company. Former names include ALPHA SAMUDRA I and ELGIZNUR CEBI."
        }
      },
      map: {
        viewport: { center: [-3.75, 114.39], zoom: 10.25 },
        encounter: { lat: -3.734, lng: 114.405, label: "Coal loading position" },
        zones: [{ kind: "anchorage", shape: "polygon", label: "Taboneo loading anchorage", coordinates: [[-3.56, 114.2], [-3.6, 114.57], [-3.82, 114.61], [-3.91, 114.31], [-3.76, 114.16]] }],
        annotations: [],
        events: [],
        vessels: [
          {
            key: "a",
            label: "Vessel A",
            tone: "a",
            currentPosition: [-3.731, 114.405],
            trackSegments: [
              {
                type: "anchor",
                coordinates: [
                  [-3.724, 114.396],
                  [-3.729, 114.401],
                  [-3.734, 114.407],
                  [-3.739, 114.414],
                  [-3.736, 114.420],
                  [-3.729, 114.422],
                  [-3.723, 114.417],
                  [-3.720, 114.410],
                  [-3.721, 114.401],
                  [-3.726, 114.397],
                  [-3.731, 114.405]
                ]
              }
            ]
          },
          {
            key: "b",
            label: "Vessel B",
            tone: "b",
            currentPosition: [-3.89, 114.29],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [-3.610, 114.280],
                  [-3.640, 114.310],
                  [-3.670, 114.340],
                  [-3.700, 114.370],
                  [-3.720, 114.390]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [-3.720, 114.390],
                  [-3.728, 114.398],
                  [-3.736, 114.406],
                  [-3.744, 114.409],
                  [-3.749, 114.404],
                  [-3.744, 114.397],
                  [-3.736, 114.392],
                  [-3.727, 114.392],
                  [-3.720, 114.390]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [-3.720, 114.390],
                  [-3.760, 114.360],
                  [-3.810, 114.330],
                  [-3.850, 114.310],
                  [-3.890, 114.290]
                ]
              }
            ]
          }
        ]
      },
      billOfLading: {
        title: "Bill of Lading",
        previewSrc: "assets/bills-of-lading/preview/case-05-bill-of-lading.webp",
        fullSrc: "assets/bills-of-lading/full/case-05-bill-of-lading.webp",
        alt: "Bill of Lading for Case 5",
        caption: "Cargo document"
      },
      facilitator: {
        intendedClassification: "Likely legitimate STS",
        rationale: "Known Taboneo loading context, compatible bulk carrier roles, continuous AIS, and short working geometry fit routine offshore coal loading rather than evasive behavior.",
        hiddenFacts: ["Green benchmark in Group 2."],
        researchAnchor: "Real searchable vessels placed in a plausible Taboneo coal-loading scenario.",
        citations: []
      }
    },
    {
      id: "Case 6",
      groupId: "G2",
      focus: "Oil",
      title: "Singapore Anchorage Overlap",
      commodity: "Oil cargo unconfirmed",
      area: "Singapore Strait anchorage",
      participantSummary: "Two product tankers are shown in an extended close anchorage pattern in the Singapore Strait area. Review the AIS movement, vessel identifiers, former names and company fields before deciding what follow-up checks are needed.",
      aisEvidence: {
        signal: "Continuous AIS from both tankers",
        pattern: "Extended close anchorage overlap without decisive transfer geometry",
        contactWindow: "6 hours or more",
        setting: "Singapore Strait anchorage",
        timing: "Overnight / waiting period"
      },
      eventFacts: [
        { label: "Setting", value: "Crowded Singapore Strait anchorage" },
        { label: "Contact", value: "Extended close anchored overlap" },
        { label: "Vessel profile", value: "Two product tankers" },
        { label: "AIS picture", value: "Continuous AIS with prolonged nearby anchoring" },
        { label: "Company fields", value: "Owner, manager, operator and former-name fields are available for review" }
      ],
      indicators: [
        "Compare the AIS tracks and timing",
        "Review each vessel's IMO number, current name and former names",
        "Review owner, manager, operator and insurer fields",
        "Identify what information is missing or unclear",
        "Decide what follow-up checks would be needed before taking action"
      ],
      vessels: {
        a: {
          name: "KENJI",
          role: "Tanker",
          imo: "9626845",
          type: "Oil Products Tanker",
          flag: "St Kitts & Nevis",
          built: "2018",
          owner: "HETICA OVERSEAS LTD",
          manager: "RENATA SHIP MANAGEMENT CO LTD",
          operator: "ERA BARU SHIPPING & TRADING",
          insurer: "",
          formerNames: "RONIN; AN PHU 15",
          history: "Public vessel sources identify KENJI as an oil products tanker with former names RONIN and AN PHU 15. Company fields should be checked against public vessel and company records."
        },
        b: {
          name: "ORKIM POWER",
          role: "Tanker",
          imo: "9546825",
          type: "Oil Products Tanker",
          flag: "Malaysia",
          built: "2010",
          owner: "ORKIM POWER SDN BHD",
          manager: "ORKIM SHIP MANAGEMENT SDN BHD",
          operator: "ORKIM SHIP MANAGEMENT SDN BHD",
          insurer: "",
          formerNames: "No recent alias noted",
          history: "Public vessel and company sources identify ORKIM POWER as a Malaysia-flagged oil products tanker associated with the Orkim group."
        }
      },
      map: {
        viewport: { center: [1.241, 103.922], zoom: 12.8 },
        encounter: { lat: 1.243, lng: 103.921, label: "Extended close anchorage overlap" },
        zones: [{ kind: "anchorage", shape: "polygon", label: "Singapore Strait anchorage", coordinates: [[1.22, 103.88], [1.22, 103.95], [1.27, 103.97], [1.29, 103.90], [1.25, 103.86]] }],
        annotations: [],
        events: [],
        vessels: [
          {
            key: "a",
            label: "Vessel A",
            tone: "a",
            currentPosition: [1.232, 103.900],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [1.214, 103.862],
                  [1.222, 103.874],
                  [1.229, 103.885],
                  [1.234, 103.894],
                  [1.238, 103.900]
                ]
              },
              {
                type: "anchor",
                coordinates: [
                  [1.238, 103.900],
                  [1.239, 103.906],
                  [1.238, 103.913],
                  [1.235, 103.918],
                  [1.230, 103.922],
                  [1.223, 103.923],
                  [1.217, 103.920],
                  [1.214, 103.914],
                  [1.214, 103.907],
                  [1.218, 103.902],
                  [1.224, 103.899],
                  [1.232, 103.900]
                ]
              }
            ]
          },
          {
            key: "b",
            label: "Vessel B",
            tone: "b",
            currentPosition: [1.252, 103.919],
            trackSegments: [
              {
                type: "anchor",
                coordinates: [
                  [1.255, 103.920],
                  [1.258, 103.927],
                  [1.258, 103.936],
                  [1.254, 103.944],
                  [1.247, 103.949],
                  [1.238, 103.949],
                  [1.232, 103.944],
                  [1.229, 103.936],
                  [1.230, 103.927],
                  [1.236, 103.921],
                  [1.244, 103.918],
                  [1.252, 103.919]
                ]
              }
            ]
          }
        ]
      },
      billOfLading: {
        title: "Bill of Lading",
        previewSrc: "assets/bills-of-lading/preview/case-06-bill-of-lading.webp",
        fullSrc: "assets/bills-of-lading/full/case-06-bill-of-lading.webp",
        alt: "Bill of Lading for Case 6",
        caption: "Cargo document"
      },
      facilitator: {
        intendedClassification: "Unclear / needs more scrutiny",
        rationale: "Hidden facilitator note: intended as an anchorage-ambiguity case. Participants should compare AIS proximity, anchorage context, company fields and former-name information before deciding whether to query or monitor.",
        hiddenFacts: ["Amber ambiguity benchmark in Group 2."],
        researchAnchor: "Real searchable tankers placed in a plausible Singapore anchorage ambiguity scenario; KENJI / AN PHU 15 identity drift is part of the discomfort.",
        citations: []
      }
    },
    {
      id: "Case 7",
      groupId: "G2",
      focus: "Oil",
      title: "Corridor Overnight Contact",
      commodity: "Oil cargo unconfirmed",
      area: "Malaysia / Singapore corridor",
      participantSummary: "Two oil products tankers are shown in an overnight close-movement pattern in the Malaysia / Singapore corridor. Review the AIS movement, vessel identifiers and company fields before deciding what follow-up checks are needed.",
      aisEvidence: {
        signal: "One vessel shows interrupted AIS before the overnight overlap",
        pattern: "Extended paired movement within wider international route context",
        contactWindow: "6 hours or more",
        setting: "Malaysia / Singapore corridor",
        timing: "Overnight"
      },
      eventFacts: [
        { label: "Setting", value: "Malaysia / Singapore corridor" },
        { label: "Contact", value: "Overnight close movement pattern" },
        { label: "Vessel profile", value: "Two oil products tankers" },
        { label: "AIS picture", value: "One track includes a gap before the contact window" },
        { label: "Company fields", value: "Owner, manager and operator fields are available for review" }
      ],
      indicators: [
        "Compare the AIS tracks and timing",
        "Review each vessel's IMO number and current name",
        "Review owner, manager and operator fields",
        "Identify what information is missing or unclear",
        "Decide what follow-up checks would be needed before taking action"
      ],
      vessels: {
        a: {
          name: "SHI XING",
          role: "Tanker",
          imo: "9047726",
          type: "Oil Products Tanker",
          flag: "Togo (current AIS)",
          built: "1992",
          owner: "Not shown / blank in accessible vessel sources",
          manager: "Not shown / blank in accessible vessel sources",
          operator: "Not shown / blank in accessible vessel sources",
          insurer: "",
          history: "Public vessel sources identify SHI XING as an oil products tanker. Current owner, manager and operator fields are not shown or are blank in accessible vessel sources."
        },
        b: {
          name: "EMERALD ENERGY 3",
          role: "Tanker",
          imo: "9109627",
          type: "Oil Products Tanker",
          flag: "Tanzania (current AIS)",
          built: "1994",
          owner: "Not shown / blank in accessible vessel sources",
          manager: "Not shown / blank in accessible vessel sources",
          operator: "Not shown / blank in accessible vessel sources",
          insurer: "",
          history: "Public vessel sources identify EMERALD ENERGY 3 as an oil products tanker. Current owner, manager and operator fields are not shown or are blank in accessible vessel sources."
        }
      },
      map: {
        viewport: { center: [4.1, 109.5], zoom: 4.9 },
        encounter: { lat: 1.86, lng: 105.44, label: "Overnight corridor overlap" },
        zones: [{ kind: "hotspot", shape: "polygon", label: "Dual-use corridor area", coordinates: [[1.22, 104.70], [1.36, 105.02], [1.86, 105.60], [2.32, 106.02], [2.48, 105.84], [2.06, 105.30], [1.52, 104.76]] }],
        annotations: [],
        events: [],
        vessels: [
          {
            key: "a",
            label: "Vessel A",
            tone: "a",
            currentPosition: [0.06, 106.52],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [9.20, 114.40],
                  [8.40, 113.60],
                  [7.60, 112.80],
                  [6.80, 112.00],
                  [6.00, 111.20],
                  [5.20, 110.40],
                  [4.50, 109.70],
                  [3.90, 109.00],
                  [3.35, 108.35],
                  [2.95, 107.70],
                  [2.70, 107.08],
                  [2.45, 106.45]
                ]
              },
              {
                type: "gap",
                coordinates: [
                  [2.45, 106.45],
                  [2.34, 106.18],
                  [2.22, 105.90]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [2.22, 105.90],
                  [2.04, 105.68],
                  [1.86, 105.44],
                  [1.70, 105.24],
                  [1.56, 105.06],
                  [1.46, 104.94],
                  [1.38, 104.84]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [1.38, 104.84],
                  [1.20, 105.10],
                  [0.96, 105.42],
                  [0.68, 105.78],
                  [0.38, 106.14],
                  [0.06, 106.52]
                ]
              }
            ]
          },
          {
            key: "b",
            label: "Vessel B",
            tone: "b",
            currentPosition: [5.38, 109.44],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [-1.10, 107.90],
                  [-0.72, 107.54],
                  [-0.28, 107.18],
                  [0.18, 106.84],
                  [0.62, 106.50],
                  [0.98, 106.18],
                  [1.22, 105.86],
                  [1.34, 105.48],
                  [1.38, 105.12],
                  [1.38, 104.84]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [1.38, 104.84],
                  [1.46, 104.94],
                  [1.56, 105.06],
                  [1.70, 105.24],
                  [1.86, 105.44],
                  [2.04, 105.68],
                  [2.22, 105.90]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [2.22, 105.90],
                  [2.62, 106.30],
                  [3.08, 106.78],
                  [3.58, 107.34],
                  [4.14, 107.98],
                  [4.74, 108.68],
                  [5.38, 109.44]
                ]
              }
            ]
          }
        ]
      },
      billOfLading: {
        title: "Bill of Lading",
        previewSrc: "assets/bills-of-lading/preview/case-07-bill-of-lading.webp",
        fullSrc: "assets/bills-of-lading/full/case-07-bill-of-lading.webp",
        alt: "Bill of Lading for Case 7",
        caption: "Cargo document"
      },
      facilitator: {
        intendedClassification: "Unclear / needs more scrutiny",
        rationale: "Hidden facilitator note: intended as a corridor-contact case. Participants should compare AIS proximity, gaps, vessel identifiers and company fields before deciding whether to monitor, query or escalate.",
        hiddenFacts: ["Hard-amber benchmark in Group 2; identity-friction case."],
        researchAnchor: "Synthetic corridor encounter built around real searchable tanker identities with unstable public naming / flag data and one pre-contact AIS interruption, rather than a clean sanctions-designation hit.",
        citations: []
      }
    },
    {
      id: "Case 8",
      groupId: "G2",
      focus: "Oil",
      title: "East China Sea Offshore Contact",
      commodity: "Refined petroleum / cargo purpose unclear",
      area: "East China Sea offshore corridor",
      participantSummary: "Two product tankers are shown in an overnight offshore contact pattern in the East China Sea. Review the AIS movement, vessel identifiers, former names and company fields before deciding what follow-up checks are needed.",
      aisEvidence: {
        signal: "Multiple AIS continuity changes before and after contact",
        pattern: "Overnight offshore contact followed by divergent track behavior",
        contactWindow: "2-6 hours",
        setting: "East China Sea offshore corridor",
        timing: "Overnight"
      },
      eventFacts: [
        { label: "Setting", value: "East China Sea offshore corridor" },
        { label: "Contact", value: "Overnight offshore close-movement pattern" },
        { label: "Vessel profile", value: "Two product tankers" },
        { label: "AIS picture", value: "Tracks include continuity changes before or after the contact window" },
        { label: "Company fields", value: "Owner, manager, operator and former-name fields are available for review" }
      ],
      indicators: [
        "Compare the AIS tracks and contact timing",
        "Review each vessel's IMO number, current name and former names",
        "Review owner, manager and operator fields",
        "Identify what information is missing or unclear",
        "Decide what follow-up checks would be needed before taking action"
      ],
      vessels: {
        a: {
          name: "KINGSWAY",
          role: "Tanker",
          imo: "9191773",
          type: "Oil Products Tanker",
          flag: "Not consistently shown across accessible public sources",
          built: "1998",
          owner: "BUNKER'S TAIWAN GROUP CORPORATION",
          manager: "UNITED SHIPS MARITIME CORP",
          operator: "BILLIONS BUNKER GROUP CORPORATION",
          insurer: "",
          formerNames: "BILLIONS NO. 18; SHUN FA; APEX; GOLDEN YUKI"
        },
        b: {
          name: "LING YU",
          role: "Tanker",
          imo: "9635987",
          type: "Chemical/Oil Products Tanker",
          flag: "China",
          built: "2014",
          owner: "WIN MORE SHIPPING LTD",
          manager: "LIGHTHOUSE SHIP MANAGEMENT LTD",
          operator: "LIGHTHOUSE SHIP MANAGEMENT LTD",
          insurer: "",
          formerNames: "LIGHTHOUSE WINMORE; JIAN AN 81; MULTRASALVOR 3"
        }
      },
      map: {
        viewport: { center: [32.4, 124.7], zoom: 4.7 },
        encounter: { lat: 30.16, lng: 125.44, label: "Overnight offshore contact" },
        zones: [{ kind: "hotspot", shape: "polygon", label: "East China Sea offshore transfer area", coordinates: [[29.64, 124.96], [29.84, 125.64], [30.18, 126.02], [30.54, 125.78], [30.54, 125.18], [30.30, 124.88]] }],
        annotations: [],
        events: [],
        vessels: [
          {
            key: "a",
            label: "Vessel A",
            tone: "a",
            currentPosition: [38.92, 121.80],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [38.45, 124.05],
                  [37.82, 124.28],
                  [37.10, 124.54],
                  [36.30, 124.84],
                  [35.46, 125.08],
                  [34.58, 125.28],
                  [33.70, 125.40],
                  [32.78, 125.46],
                  [31.84, 125.48],
                  [30.96, 125.46],
                  [30.26, 125.44]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [30.26, 125.44],
                  [30.16, 125.44],
                  [30.06, 125.36]
                ]
              },
              {
                type: "gap",
                coordinates: [
                  [30.06, 125.36],
                  [30.86, 125.28],
                  [31.48, 125.12]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [31.48, 125.12],
                  [32.30, 124.94],
                  [33.22, 124.82],
                  [34.18, 124.74],
                  [35.12, 124.70],
                  [35.96, 124.66],
                  [36.74, 124.60]
                ]
              },
              {
                type: "gap",
                coordinates: [
                  [36.74, 124.60],
                  [37.32, 124.18],
                  [37.86, 123.56]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [37.86, 123.56],
                  [38.14, 123.00],
                  [38.38, 122.54],
                  [38.60, 122.16],
                  [38.80, 121.92],
                  [38.92, 121.80]
                ]
              }
            ]
          },
          {
            key: "b",
            label: "Vessel B",
            tone: "b",
            currentPosition: [32.18, 127.78],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [25.24, 121.70],
                  [25.84, 122.10],
                  [26.56, 122.58],
                  [27.36, 123.12],
                  [28.12, 123.70],
                  [28.78, 124.20],
                  [29.30, 124.62],
                  [29.72, 124.98],
                  [29.94, 125.18],
                  [30.06, 125.36]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [30.06, 125.36],
                  [30.16, 125.44],
                  [30.26, 125.44]
                ]
              },
              {
                type: "gap",
                coordinates: [
                  [30.26, 125.44],
                  [30.10, 125.82],
                  [29.98, 126.20]
                ]
              },
              {
                type: "spoof",
                coordinates: [
                  [29.98, 126.20],
                  [30.30, 126.60],
                  [30.60, 126.94]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [30.60, 126.94],
                  [31.08, 127.22],
                  [31.62, 127.52],
                  [32.18, 127.78]
                ]
              }
            ]
          }
        ]
      },
      billOfLading: {
        title: "Bill of Lading",
        previewSrc: "assets/bills-of-lading/preview/case-08-bill-of-lading.webp",
        fullSrc: "assets/bills-of-lading/full/case-08-bill-of-lading.webp",
        alt: "Bill of Lading for Case 8",
        caption: "Cargo document"
      },
      facilitator: {
        intendedClassification: "Likely illegitimate / concerning",
        rationale: "Hidden facilitator note: intended as a high-concern East China Sea contact case. Participants should combine AIS continuity, former-name checks, company fields and document review before deciding whether to monitor, query or escalate.",
        hiddenFacts: ["Red benchmark in Group 2."],
        researchAnchor: "Hidden facilitator note: compare public records for IMO 9191773 and IMO 9635987, including current names, former names, owner, manager and operator fields.",
        citations: []
      }
    },
    {
      id: "Case 9",
      groupId: "G3",
      focus: "Oil",
      title: "Pasir Gudang Short Contact",
      commodity: "Marine fuel / products",
      area: "Pasir Gudang / Teluk Ramunia",
      participantSummary: "A short tanker service contact occurs in a real bunkering / debunkering environment near Johor. Use the place first before escalating the geometry.",
      aisEvidence: {
        signal: "Continuous signal",
        pattern: "Brief service approach, short loiter, then separation",
        contactWindow: "Under 2 hours",
        setting: "Johor waters",
        timing: "Short local contact window"
      },
      eventFacts: [
        { label: "Setting", value: "Pasir Gudang / Teluk Ramunia bunkering area" },
        { label: "Contact", value: "Short service-style contact" },
        { label: "Vessel profile", value: "Bunker tanker and product tanker" },
        { label: "AIS picture", value: "Plausible port-support movement" },
        { label: "Supporting evidence", value: "No sanctions signal or identity concern" }
      ],
      indicators: [
        "Johor service-water context is material",
        "Service-profile vessel is present",
        "No strong second-layer concern",
        "Likely benign encounter"
      ],
      vessels: {
        a: {
          name: "FERESA",
          role: "Bunker tanker",
          imo: "9649067",
          type: "Bunkering Tanker",
          flag: "Singapore",
          built: "2012",
          owner: "CATHAY MARINE FUEL OIL TRADING PTE LTD",
          manager: "HW SHIPPING PTE LTD",
          operator: "HW SHIPPING PTE LTD",
          insurer: "",
          formerNames: "No recent alias noted",
          history: "Public company sources tie HW Shipping Pte Ltd to 18 Sin Ming Lane, #08-08, Midview City, Singapore 573960. Cathay Marine Fuel Oil Trading Pte Ltd is publicly associated with marine-fuel supply / bunker craft operations in Singapore."
        },
        b: {
          name: "ORKIM PEARL",
          role: "Tanker",
          imo: "9899569",
          type: "Oil Products Tanker",
          flag: "Malaysia",
          built: "2021",
          owner: "ORKIM PEARL SDN BHD",
          manager: "ORKIM SHIP MANAGEMENT SDN BHD",
          operator: "ORKIM SHIP MANAGEMENT SDN BHD",
          insurer: "",
          formerNames: "No recent alias noted",
          history: "Public vessel sources list ORKIM PEARL as a Malaysian-flagged oil products tanker built in 2021. Public Orkim sources place Orkim Ship Management / Orkim Sdn Bhd at Level 15, Menara TSR, No.12 Jalan PJU 7/3, Mutiara Damansara, 47810 Petaling Jaya, Selangor."
        }
      },
      map: {
        viewport: { center: [1.248, 104.126], zoom: 12.2 },
        encounter: { lat: 1.254, lng: 104.130, label: "Short service contact" },
        zones: [{ kind: "service", shape: "polygon", label: "Pasir Gudang / Teluk Ramunia service area", coordinates: [[1.18, 103.98], [1.20, 104.16], [1.27, 104.25], [1.33, 104.22], [1.31, 104.06], [1.25, 103.96]] }],
        annotations: [],
        events: [],
        vessels: [
          {
            key: "a",
            label: "Vessel A",
            tone: "a",
            currentPosition: [1.232, 104.176],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [1.266, 104.202],
                  [1.264, 104.190],
                  [1.262, 104.178],
                  [1.260, 104.166],
                  [1.258, 104.154],
                  [1.256, 104.142]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [1.256, 104.142],
                  [1.255, 104.136],
                  [1.254, 104.130],
                  [1.253, 104.124],
                  [1.252, 104.118]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [1.252, 104.118],
                  [1.248, 104.126],
                  [1.244, 104.136],
                  [1.240, 104.148],
                  [1.236, 104.162],
                  [1.232, 104.176]
                ]
              }
            ]
          },
          {
            key: "b",
            label: "Vessel B",
            tone: "b",
            currentPosition: [1.296, 104.242],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [1.204, 104.010],
                  [1.214, 104.026],
                  [1.223, 104.042],
                  [1.231, 104.058],
                  [1.238, 104.074],
                  [1.244, 104.090],
                  [1.249, 104.104],
                  [1.252, 104.118]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [1.252, 104.118],
                  [1.253, 104.124],
                  [1.254, 104.130],
                  [1.255, 104.136],
                  [1.256, 104.142]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [1.256, 104.142],
                  [1.262, 104.158],
                  [1.269, 104.176],
                  [1.277, 104.196],
                  [1.286, 104.218],
                  [1.296, 104.242]
                ]
              }
            ]
          }
        ]
      },
      billOfLading: {
        title: "Bill of Lading",
        previewSrc: "assets/bills-of-lading/preview/case-09-bill-of-lading.webp",
        fullSrc: "assets/bills-of-lading/full/case-09-bill-of-lading.webp",
        alt: "Bill of Lading for Case 9",
        caption: "Cargo document"
      },
      facilitator: {
        intendedClassification: "Likely legitimate STS",
        rationale: "Calibration case. The purpose is to test whether participants can assess a short contact using location, duration, vessel profiles and supporting records, rather than treating AIS geometry alone as decisive.",
        hiddenFacts: ["Green benchmark in Group 3."],
        researchAnchor: "Real searchable vessels in a plausible Pasir Gudang / Teluk Ramunia bunkering scenario.",
        citations: []
      }
    },
    {
      id: "Case 10",
      groupId: "G3",
      focus: "Oil",
      title: "South China Sea Offshore Contact",
      commodity: "Oil products",
      area: "Eastern Bintan / South China Sea corridor",
      participantSummary: "Two chemical/oil products tankers are shown in a short offshore contact east of Bintan. Review the AIS movement, vessel identifiers, former names and public compliance records before deciding what follow-up checks are needed.",
      aisEvidence: {
        signal: "Continuous signal",
        pattern: "North-south movement with a short offshore contact east of Bintan",
        contactWindow: "2-6 hours",
        setting: "Offshore east of Bintan",
        timing: "Overnight"
      },
      eventFacts: [
        { label: "Setting", value: "Offshore east of Bintan in the wider Singapore tanker corridor" },
        { label: "Contact", value: "Short offshore tanker-to-tanker contact" },
        { label: "Vessel profile", value: "Two chemical/oil products tankers" },
        { label: "AIS picture", value: "One tanker pauses near a port approach before making a long detour into the contact and then turning back north" },
        { label: "Supporting evidence", value: "Targeted compliance searches return repeated port-state-control detentions for one vessel" }
      ],
      indicators: [
        "One tanker pauses near a port approach and then breaks out of that route picture just to make a brief contact",
        "The counterparty fits ordinary regional product-tanker movement more comfortably",
        "Public PSC history gives a practical second reason to hold the file open",
        "No direct sanctions or concealment answer is visible on the map alone"
      ],
      vessels: {
        a: {
          name: "TROMSO",
          role: "Tanker",
          imo: "9435791",
          type: "Chemical/Oil Products Tanker",
          flag: "Bahamas",
          built: "2008",
          owner: "TROMSO SHIPPING CO LTD",
          manager: "WORLD TANKERS MANAGEMENT PTE LTD",
          operator: "WORLD TANKERS MANAGEMENT PTE LTD",
          insurer: "",
          formerNames: "M.Y. ARCTIC; GEMI",
          history: "Public vessel records connect TROMSO to Tromso Shipping Co Ltd and World Tankers Management Pte Ltd. Port-state-control searches return multiple recent detention records in China."
        },
        b: {
          name: "ACCORD",
          role: "Tanker",
          imo: "9274020",
          type: "Chemical/Oil Products Tanker",
          flag: "Singapore",
          built: "2004",
          owner: "CELINA SHIPPING CO PTE LTD",
          manager: "RAFFLES SHIPMANAGEMENT SERVICES PTE LTD",
          operator: "RAFFLES SHIPMANAGEMENT SERVICES PTE LTD",
          insurer: "",
          formerNames: "GOLDEN ACCORD; FRABANDARI",
          history: "Public ship databases connect ACCORD to Celina Shipping Co Pte Ltd and Raffles Shipmanagement Services Pte Ltd in Singapore."
        }
      },
      map: {
        viewport: { center: [10.8, 109.2], zoom: 4.2 },
        encounter: { lat: 1.62, lng: 105.06, label: "Offshore contact east of Bintan" },
        zones: [{ kind: "hotspot", shape: "circle", label: "Eastern Bintan offshore contact area", center: [1.62, 105.06], radius: 52000 }],
        annotations: [],
        events: [],
        vessels: [
          {
            key: "a",
            label: "Vessel A",
            tone: "a",
            currentPosition: [21.90, 117.10],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [21.90, 117.10],
                  [19.10, 114.90],
                  [16.85, 113.45],
                  [14.40, 111.95],
                  [12.60, 110.75],
                  [12.05, 110.00]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [12.05, 110.00],
                  [12.12, 109.92],
                  [12.20, 109.90],
                  [12.26, 109.98],
                  [12.24, 110.08],
                  [12.14, 110.12],
                  [12.06, 110.10],
                  [12.05, 110.00]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [12.05, 110.00],
                  [10.30, 109.10],
                  [8.15, 108.05],
                  [5.95, 107.00],
                  [4.20, 106.35],
                  [3.10, 105.55],
                  [2.10, 105.20],
                  [1.78, 105.15]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [1.78, 105.15],
                  [1.70, 105.12],
                  [1.62, 105.06],
                  [1.56, 104.99],
                  [1.61, 104.94],
                  [1.69, 104.97],
                  [1.76, 105.05],
                  [1.78, 105.15]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [1.78, 105.15],
                  [2.80, 105.25],
                  [4.55, 105.75],
                  [6.75, 106.55],
                  [9.20, 107.80],
                  [11.85, 109.70],
                  [14.55, 111.15],
                  [17.25, 113.00],
                  [19.55, 115.05],
                  [21.90, 117.10]
                ]
              }
            ]
          },
          {
            key: "b",
            label: "Vessel B",
            tone: "b",
            currentPosition: [-5.10, 110.75],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [-5.40, 111.20],
                  [-4.30, 110.10],
                  [-3.10, 108.95],
                  [-1.85, 107.75],
                  [-0.55, 106.60],
                  [0.45, 105.80],
                  [1.10, 105.35],
                  [1.50, 105.08]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [1.50, 105.08],
                  [1.56, 105.12],
                  [1.62, 105.06],
                  [1.66, 105.00],
                  [1.63, 104.94],
                  [1.57, 104.97],
                  [1.50, 105.08]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [1.50, 105.08],
                  [1.15, 105.10],
                  [0.75, 105.35],
                  [0.15, 105.85],
                  [-0.65, 106.55],
                  [-1.65, 107.45],
                  [-2.80, 108.45],
                  [-4.00, 109.55],
                  [-5.10, 110.75]
                ]
              }
            ]
          }
        ]
      },
      billOfLading: {
        title: "Bill of Lading",
        previewSrc: "assets/bills-of-lading/preview/case-10-bill-of-lading.webp",
        fullSrc: "assets/bills-of-lading/full/case-10-bill-of-lading.webp",
        alt: "Bill of Lading for Case 10",
        caption: "Cargo document"
      },
      facilitator: {
        intendedClassification: "Unclear / needs more scrutiny",
        rationale: "Amber calibration case. The contact occurs in a real tanker corridor, but TROMSO makes a long southbound deviation into the contact area and then returns north. TROMSO also has recent port-state-control detention history, which gives a second reason to keep the file open. There is no direct sanctions hit and no obvious AIS concealment, so this should remain a query / hold case rather than an automatic escalation.",
        hiddenFacts: ["Amber dogleg-plus-PSC case for Group 3."],
        researchAnchor: "Real searchable tanker pair built around a long South China Sea dogleg by TROMSO plus official Tokyo MOU detention history.",
        citations: []
      }
    },
    {
      id: "Case 11",
      groupId: "G3",
      focus: "Oil",
      title: "Northbound Offshore Contact",
      commodity: "Oil products",
      area: "Eastern Bintan / East China Sea corridor",
      participantSummary: "A larger tanker leaves a recognizable port approach, waits off the outer Singapore approaches, then makes an offshore tanker contact east of Bintan. After the contact, it heads north but drops off AIS before the northern end of the voyage. It later shows local port-side activity near Chinese port approaches, including tight circling, before the track stabilizes. A smaller regional tanker arrives separately and leaves on a different route.",
      aisEvidence: {
        signal: "AIS gap appears on the northbound leg",
        pattern: "Offshore contact followed by a long northbound movement",
        contactWindow: "6 hours or more",
        setting: "Offshore east of Bintan",
        timing: "Overnight"
      },
      eventFacts: [
        { label: "Setting", value: "Offshore east of Bintan in the wider Singapore tanker corridor" },
        { label: "Contact", value: "Extended offshore tanker-to-tanker contact" },
        { label: "Vessel profile", value: "Large products tanker and smaller regional products tanker" },
        { label: "AIS picture", value: "One vessel leaves a port approach, pauses near the outer approaches, then disappears on the northbound leg before later circling near Chinese port approaches" },
        { label: "Supporting evidence", value: "Public research returns a sanctions-adjacent / identity-churn trail for the larger tanker" }
      ],
      indicators: [
        "The larger tanker's route begins in a visible port setting rather than mid-ocean",
        "A visible outer-approach hold before contact makes the meeting look planned, not incidental",
        "The hidden northbound leg matters because it sits on the delivery side of the voyage that later papers may need to explain",
        "The post-gap circling near Chinese port approaches creates a benign cover story rather than explaining the missing leg"
      ],
      vessels: {
        a: {
          name: "CERS",
          role: "Tanker",
          imo: "9301902",
          type: "Chemical/Oil Products Tanker",
          flag: "Panama",
          built: "2006",
          owner: "Owner opaque / public registry trail thin",
          manager: "Cymare-linked management trail in public sources",
          operator: "Operator trail opaque in accessible public sources",
          insurer: "",
          formerNames: "MARE DI RAVENNA; FALCON NOSTOS; GRACE LUCRUM",
          history: "Public vessel tools show repeated name and flag changes. Public risk sources also connect CERS to Russian crude oil / petroleum-products transport and Ukraine sanctions exposure."
        },
        b: {
          name: "NEW INTEGRITY",
          role: "Tanker",
          imo: "9543794",
          type: "Chemical/Oil Products Tanker",
          flag: "Panama",
          built: "2009",
          owner: "VANTAGE SAIL LTD",
          manager: "SINGAPORE STRAIT SHIPPING PTE",
          operator: "SINGAPORE STRAIT SHIPPING PTE",
          insurer: "",
          formerNames: "NING HU 86; LIAN RUN YANG FAN; ZHEN ZHU 6 HAO",
          history: "Public company sources tie Singapore Strait Shipping Pte to 10-03 Caspian, 50 Lakeside Drive, Singapore 648315."
        }
      },
      map: {
        viewport: { center: [18.6, 118.3], zoom: 3.25 },
        encounter: { lat: 1.66, lng: 105.02, label: "Extended offshore contact" },
        zones: [{ kind: "hotspot", shape: "circle", label: "Eastern Bintan offshore contact area", center: [1.66, 105.02], radius: 52000 }],
        annotations: [],
        events: [],
        vessels: [
          {
            key: "a",
            label: "Vessel A",
            tone: "a",
            currentPosition: [30.84, 123.85],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [4.35, 103.70],
                  [3.90, 103.92],
                  [3.30, 104.18],
                  [2.70, 104.42],
                  [2.10, 104.56],
                  [1.72, 104.65]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [1.72, 104.65],
                  [1.78, 104.78],
                  [1.84, 104.88],
                  [1.86, 104.98],
                  [1.82, 105.05],
                  [1.74, 105.00],
                  [1.69, 104.90],
                  [1.72, 104.65]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [1.72, 104.65],
                  [1.69, 104.84],
                  [1.67, 104.95],
                  [1.66, 105.02],
                  [1.63, 104.96],
                  [1.62, 104.90],
                  [1.66, 104.86],
                  [1.72, 104.65]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [1.66, 105.02],
                  [4.35, 106.45],
                  [7.55, 108.35],
                  [11.20, 110.70],
                  [15.10, 113.45],
                  [19.05, 116.55],
                  [22.70, 119.65],
                  [25.90, 122.50],
                  [28.80, 124.10],
                  [31.20, 124.70]
                ]
              },
              {
                type: "gap",
                coordinates: [
                  [31.20, 124.70],
                  [31.90, 125.10],
                  [30.55, 123.55]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [30.55, 123.55],
                  [30.61, 123.48],
                  [30.68, 123.44],
                  [30.73, 123.49],
                  [30.72, 123.60],
                  [30.64, 123.69],
                  [30.55, 123.70],
                  [30.49, 123.64],
                  [30.50, 123.57],
                  [30.55, 123.55]
                ]
              },
              {
                type: "spoof",
                coordinates: [
                  [30.84, 123.85],
                  [30.95, 123.78],
                  [31.02, 123.65],
                  [31.00, 123.50],
                  [30.89, 123.40],
                  [30.76, 123.44],
                  [30.68, 123.58],
                  [30.69, 123.74],
                  [30.76, 123.86],
                  [30.84, 123.85]
                ]
              }
            ]
          },
          {
            key: "b",
            label: "Vessel B",
            tone: "b",
            currentPosition: [-3.90, 110.90],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [-5.40, 111.20],
                  [-4.30, 110.10],
                  [-3.10, 108.95],
                  [-1.85, 107.75],
                  [-0.55, 106.60],
                  [0.45, 105.80],
                  [1.10, 105.35],
                  [1.58, 105.10]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [1.58, 105.10],
                  [1.61, 105.06],
                  [1.64, 105.02],
                  [1.67, 104.98],
                  [1.71, 104.96],
                  [1.73, 105.00],
                  [1.71, 105.06],
                  [1.66, 105.12],
                  [1.58, 105.10]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [1.58, 105.10],
                  [1.20, 105.42],
                  [0.70, 105.90],
                  [0.05, 106.60],
                  [-0.75, 107.50],
                  [-1.70, 108.55],
                  [-2.75, 109.70],
                  [-3.90, 110.90]
                ]
              }
            ]
          }
        ]
      },
      billOfLading: {
        title: "Bill of Lading",
        previewSrc: "assets/bills-of-lading/preview/case-11-bill-of-lading.webp",
        fullSrc: "assets/bills-of-lading/full/case-11-bill-of-lading.webp",
        alt: "Bill of Lading for Case 11",
        caption: "Cargo document"
      },
      facilitator: {
        intendedClassification: "Unclear / needs more scrutiny",
        rationale: "Hard-amber case. The contact itself occurs offshore east of Bintan, but the more important issue is the post-contact northbound movement and later AIS gap before reappearance near Chinese port approaches. CERS also has a repeated identity-change trail and public sanctions-adjacent risk reporting connected to Russian crude oil / petroleum-products transport. There is no direct UN DPRK sanctions hit in the supplied fields, so the case should remain query / hold unless participants identify additional corroborating evidence.",
        hiddenFacts: ["Hard-amber oil case built around post-contact northbound concealment toward a DPRK-delivery problem set followed by Chinese-port cover activity."],
        researchAnchor: "Real searchable tanker CERS with official Ukraine sanctions exposure, shadow-fleet reporting, identity churn, and a synthetic Bintan contact followed by concealed northbound movement and Chinese-port-side cover activity.",
        citations: []
      }
    },
    {
      id: "Case 12",
      groupId: "G3",
      focus: "Coal",
      title: "Gulf of Tonkin Offshore Contact",
      commodity: "Coal / dry bulk",
      area: "Southern Gulf of Tonkin / north-central Vietnam corridor",
      participantSummary: "A cargo vessel appears near Chinese coal-port approaches after a missing northern interval, circles locally, then runs south to an offshore contact with a bulker. After the meeting, the bulker does not take a simple direct port call and instead vanishes briefly before circling near one Vietnamese port approach and continuing farther south.",
      aisEvidence: {
        signal: "AIS gaps appear on separate legs of the two tracks",
        pattern: "One vessel moves south from northern waters before an extended offshore contact; the other continues south after a broken coastal sequence",
        contactWindow: "6 hours or more",
        setting: "Offshore southern Gulf of Tonkin / north-central Vietnam approaches",
        timing: "Overnight into following day"
      },
      eventFacts: [
        { label: "Setting", value: "Offshore southern Gulf of Tonkin / north-central Vietnam approaches" },
        { label: "Contact", value: "Extended offshore cargo-vessel to bulker contact" },
        { label: "Vessel profile", value: "General cargo vessel and bulk carrier" },
        { label: "AIS picture", value: "One vessel emerges from a missing northern interval near Chinese coal-port approaches; the bulker later follows a broken southbound port sequence" },
        { label: "Supporting evidence", value: "Public searches on both vessels surface serious identity and sanctions concerns" }
      ],
      indicators: [
        "The missing northern interval sits on the likely load side of the voyage rather than on an irrelevant local leg",
        "Short coal-port cover activity in China does not create a clean continuous origin story before the southbound run",
        "The receiving bulker does not make a straightforward single-port post-contact movement",
        "Both ships carry visible public-risk trails that matter to a sanctions review"
      ],
      vessels: {
        a: {
          name: "ASIA BRIDGE",
          role: "General cargo vessel",
          imo: "9010022",
          type: "General Cargo Ship",
          flag: "Flags of convenience in public vessel history",
          built: "1991",
          owner: "Unknown / unclear in accessible public vessel tools",
          manager: "Unknown / unclear in accessible public vessel tools",
          operator: "Unknown / unclear in accessible public vessel tools",
          insurer: "",
          formerNames: "ASIA BRIDGE 2; HAN BAEK 1; SIRIUS; OPAL",
          history: "Public vessel records show repeated name and flag changes across multiple former identities. Review the IMO, current name, former names, and company fields against public vessel and company records."
        },
        b: {
          name: "KOSAN",
          role: "Bulk carrier",
          imo: "9110236",
          type: "Bulk Carrier",
          flag: "Flags of convenience in public vessel history",
          built: "1994",
          owner: "Unknown / unclear in accessible public vessel tools",
          manager: "Unknown / unclear in accessible public vessel tools",
          operator: "Unknown / unclear in accessible public vessel tools",
          insurer: "",
          formerNames: "FIRSTGLEAM; DAWNLIGHT; TAIGA",
          history: "Public vessel records show earlier foreign-flag identities including DAWNLIGHT and FIRSTGLEAM. Review the IMO, current name, former names, and company fields against public vessel and company records."
        }
      },
      map: {
        viewport: { center: [26.0, 113.8], zoom: 4.1 },
        encounter: { lat: 18.15, lng: 107.55, label: "Extended offshore contact" },
        zones: [{ kind: "offshore", shape: "circle", label: "Southern Gulf of Tonkin offshore contact area", center: [18.15, 107.55], radius: 68000 }],
        annotations: [],
        events: [],
        vessels: [
          {
            key: "a",
            label: "Vessel A",
            tone: "a",
            currentPosition: [17.55, 108.40],
            trackSegments: [
              {
                type: "gap",
                coordinates: [
                  [39.80, 124.20],
                  [39.40, 122.70],
                  [39.25, 120.60]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [39.25, 120.60],
                  [39.32, 120.72],
                  [39.40, 120.76],
                  [39.44, 120.64],
                  [39.37, 120.51],
                  [39.27, 120.48],
                  [39.20, 120.55],
                  [39.25, 120.60]
                ]
              },
              {
                type: "spoof",
                coordinates: [
                  [39.33, 120.88],
                  [39.40, 120.95],
                  [39.47, 120.88],
                  [39.46, 120.75],
                  [39.36, 120.68],
                  [39.26, 120.73],
                  [39.24, 120.84],
                  [39.33, 120.88]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [39.25, 120.60],
                  [38.40, 121.30],
                  [37.10, 122.40],
                  [35.40, 122.80],
                  [33.70, 122.60],
                  [31.80, 122.20],
                  [30.20, 121.90],
                  [28.40, 121.50],
                  [26.50, 120.80],
                  [24.00, 119.80],
                  [21.80, 116.80],
                  [20.30, 114.40],
                  [19.40, 113.20],
                  [18.90, 112.10],
                  [18.55, 110.90],
                  [18.35, 109.70],
                  [18.15, 107.55]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [18.15, 107.55],
                  [18.10, 107.49],
                  [18.07, 107.42],
                  [18.10, 107.35],
                  [18.18, 107.34],
                  [18.24, 107.40],
                  [18.25, 107.49],
                  [18.22, 107.57],
                  [18.15, 107.55]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [18.15, 107.55],
                  [17.85, 107.92],
                  [17.55, 108.40]
                ]
              }
            ]
          },
          {
            key: "b",
            label: "Vessel B",
            tone: "b",
            currentPosition: [13.75, 109.55],
            trackSegments: [
              {
                type: "normal",
                coordinates: [
                  [14.70, 113.20],
                  [15.50, 112.35],
                  [16.20, 111.35],
                  [16.85, 110.10],
                  [17.50, 108.95],
                  [18.15, 107.55]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [18.15, 107.55],
                  [17.65, 107.86],
                  [17.05, 108.06],
                  [16.35, 108.18]
                ]
              },
              {
                type: "gap",
                coordinates: [
                  [16.35, 108.18],
                  [16.02, 108.35]
                ]
              },
              {
                type: "loiter",
                coordinates: [
                  [16.02, 108.35],
                  [16.08, 108.44],
                  [16.15, 108.40],
                  [16.16, 108.28],
                  [16.08, 108.22],
                  [16.00, 108.25],
                  [15.98, 108.33],
                  [16.02, 108.35]
                ]
              },
              {
                type: "normal",
                coordinates: [
                  [16.02, 108.35],
                  [15.25, 108.82],
                  [14.35, 109.22],
                  [13.75, 109.55]
                ]
              }
            ]
          }
        ]
      },
      billOfLading: {
        title: "Bill of Lading",
        previewSrc: "assets/bills-of-lading/preview/case-12-bill-of-lading.webp",
        fullSrc: "assets/bills-of-lading/full/case-12-bill-of-lading.webp",
        alt: "Bill of Lading for Case 12",
        caption: "Cargo document"
      },
      facilitator: {
        intendedClassification: "Likely illegitimate / concerning",
        rationale: "Red benchmark case. ASIA BRIDGE is an OFAC-blocked vessel tied to North Korean coal transport, and KOSAN / DAWNLIGHT carries its own DPRK-linked sanctions record. The AIS story compounds the sanctions picture: ASIA BRIDGE has a hidden northern interval before Chinese port-cover activity and then an extended offshore contact with KOSAN; KOSAN then follows a broken southbound sequence with a post-contact gap and port-side circling. This is the escalation case for Group 3.",
        hiddenFacts: ["Red coal benchmark for Group 3 built around a hidden DPRK-side load leg, Chinese coal-port cover activity, and a sanctioned bulker receiver."],
        researchAnchor: "Real searchable pair built around sanctioned coal-smuggling vessel ASIA BRIDGE plus sanctioned bulker KOSAN, with synthetic AIS showing concealed northern loading logic and awkward southbound post-contact behavior.",
        citations: []
      }
    }
  ]
};

