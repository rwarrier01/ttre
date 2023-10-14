const AMS = "Amsterdam";
const ANG = "Angora";
const ATH = "Athina";
const BAR = "Barcelona";
const BER = "Berlin";
const BRE = "Brest";
const BRI = "Brindisi";
const BRX = "Bruxelles";
const BUC = "Bucuresti";
const BUD = "Budapest";
const CAD = "Cadiz";
const CON = "Constantinople";
const DAN = "Danzic";
const DIE = "Dieppe";
const EDI = "Edinburgh";
const ERZ = "Erzurum";
const ESS = "Essen";
const FRK = "Frankfurt";
const KHR = "Kharkov";
const KOB = "Kobenhavn";
const KYV = "Kyiv";
const LIS = "Lisboa";
const LON = "London";
const MAD = "Madrid";
const MAR = "Marseille";
const MOS = "Moskva";
const MUN = "Munchen";
const PAL = "Palermo";
const PAM = "Pamplona";
const PAR = "Paris";
const PET = "Petrograd";
const RIC = "Rica";
const ROM = "Roma";
const ROS = "Rostov";
const SAR = "Sarajevo";
const SEV = "Sevastopol";
const SMO = "Smolensk";
const SMY = "Smyrna";
const SOC = "Sochi";
const SOF = "Sofia";
const STK = "Stockholm";
const VEN = "Venezia";
const WAR = "Warszawa";
const WIE = "Wien";
const WIL = "Wilno";
const ZAG = "Zagrab";
const ZUR = "Zurich";

class Graph {
  adjacencyList;
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(v) {
    if (!this.adjacencyList[v]) {
      this.adjacencyList[v] = {};
    }
  }

  addPath(v1, v2, w) {
    this.adjacencyList[v1][v2] = w;
    this.adjacencyList[v2][v1] = w;
  }
}

const g = new Graph();
g.addVertex(AMS);
g.addVertex(ANG);
g.addVertex(ATH);
g.addVertex(BAR);
g.addVertex(BER);
g.addVertex(BRE);
g.addVertex(BRI);
g.addVertex(BRX);
g.addVertex(BUC);
g.addVertex(BUD);
g.addVertex(CAD);
g.addVertex(CON);
g.addVertex(DAN);
g.addVertex(DIE);
g.addVertex(EDI);
g.addVertex(ERZ);
g.addVertex(ESS);
g.addVertex(FRK);
g.addVertex(KHR);
g.addVertex(KOB);
g.addVertex(KYV);
g.addVertex(LIS);
g.addVertex(LON);
g.addVertex(MAD);
g.addVertex(MAR);
g.addVertex(MOS);
g.addVertex(MUN);
g.addVertex(PAL);
g.addVertex(PAM);
g.addVertex(PAR);
g.addVertex(PET);
g.addVertex(RIC);
g.addVertex(ROM);
g.addVertex(ROS);
g.addVertex(SAR);
g.addVertex(SEV);
g.addVertex(SMO);
g.addVertex(SMY);
g.addVertex(SOC);
g.addVertex(SOF);
g.addVertex(STK);
g.addVertex(VEN);
g.addVertex(WAR);
g.addVertex(WIE);
g.addVertex(WIL);
g.addVertex(ZAG);
g.addVertex(ZUR);

g.addPath(AMS, LON, 2);
g.addPath(AMS, BRX, 1);
g.addPath(AMS, ESS, 3);
g.addPath(AMS, FRK, 2);
g.addPath(ANG, SMY, 3);
g.addPath(ANG, CON, 2);
g.addPath(ANG, ERZ, 3);
g.addPath(ATH, BRI, 4);
g.addPath(ATH, SOF, 3);
g.addPath(ATH, SAR, 4);
g.addPath(ATH, SMY, 2);
g.addPath(BAR, MAD, 2);
g.addPath(BAR, PAM, 2);
g.addPath(BAR, MAR, 4);
g.addPath(BER, ESS, 2);
g.addPath(BER, FRK, 3);
g.addPath(BER, WIE, 3);
g.addPath(BER, WAR, 4);
g.addPath(BER, DAN, 4);
g.addPath(BRE, DIE, 2);
g.addPath(BRE, PAR, 3);
g.addPath(BRE, PAM, 4);
g.addPath(BRI, ROM, 2);
g.addPath(BRI, PAL, 3);
g.addPath(BRX, DIE, 2);
g.addPath(BRX, PAR, 2);
g.addPath(BRX, FRK, 2);
g.addPath(BUC, KYV, 4);
g.addPath(BUC, SEV, 4);
g.addPath(BUC, CON, 3);
g.addPath(BUC, SOF, 2);
g.addPath(BUC, BUD, 4);
g.addPath(BUD, KYV, 6);
g.addPath(BUD, SAR, 3);
g.addPath(BUD, ZAG, 2);
g.addPath(BUD, WIE, 1);
g.addPath(CAD, LIS, 2);
g.addPath(CAD, MAD, 3);
g.addPath(CON, SEV, 4);
g.addPath(CON, SMY, 2);
g.addPath(CON, SOF, 3);
g.addPath(DAN, RIC, 3);
g.addPath(DAN, WAR, 2);
g.addPath(DIE, LON, 2);
g.addPath(DIE, PAR, 1);
g.addPath(EDI, LON, 4);
g.addPath(ERZ, SOC, 3);
g.addPath(ERZ, SEV, 4);
g.addPath(ESS, KOB, 3);
g.addPath(ESS, FRK, 2);
g.addPath(FRK, MUN, 2);
g.addPath(FRK, PAR, 3);
g.addPath(KHR, MOS, 4);
g.addPath(KHR, ROS, 2);
g.addPath(KHR, KYV, 4);
g.addPath(KOB, STK, 3);
g.addPath(KYV, SMO, 3);
g.addPath(KYV, WAR, 4);
g.addPath(KYV, WIL, 2);
g.addPath(LIS, MAD, 3);
//LON
g.addPath(MAD, PAM, 3);
g.addPath(MAR, ZUR, 2);
g.addPath(MAR, ROM, 4);
g.addPath(MAR, PAM, 4);
g.addPath(MAR, PAR, 4);
g.addPath(MOS, SMO, 2);
g.addPath(MOS, PET, 4);
g.addPath(MUN, WIE, 3);
g.addPath(MUN, VEN, 2);
g.addPath(MUN, ZUR, 2);
g.addPath(PAL, SMY, 6);
g.addPath(PAL, ROM, 4);
g.addPath(PAM, PAR, 4);
g.addPath(PAR, ZUR, 3);
g.addPath(PET, WIL, 4);
g.addPath(PET, RIC, 4);
g.addPath(PET, STK, 8);
g.addPath(RIC, WIL, 4);
g.addPath(ROM, VEN, 2);
g.addPath(ROS, SOC, 2);
g.addPath(ROS, SEV, 4);
g.addPath(SAR, SOF, 2);
g.addPath(SAR, ZAG, 3);
g.addPath(SEV, SOC, 2);
g.addPath(SMO, WIL, 3);
// SMY
// SOC
// SOF
// STK
g.addPath(VEN, ZAG, 2);
g.addPath(VEN, ZUR, 2);
g.addPath(WAR, WIL, 3);
g.addPath(WAR, WIE, 4);
g.addPath(WIE, ZAG, 2);
// WIL
// ZAG
// ZUR

/*  
const tracePath = (table, start, end) => {
var path = [];
var next = end;
while (true) {
    path.unshift(next);
    if (next === start) {
    break;
    }
    next = table[next].vertex;
}

return path;
};
*/
const formatGraph = (g) => {
  const tmp = {};
  Object.keys(g).forEach((k) => {
    const obj = g[k];
    const arr = [];
    Object.keys(obj).forEach((v) => arr.push({ vertex: v, cost: obj[v] }));
    tmp[k] = arr;
  });
  return tmp;
};

const dijkstra = (graph, start, end) => {
  var map = formatGraph(graph);

  var visited = [];
  var unvisited = [start];
  var shortestDistances = { [start]: { vertex: start, cost: 0 } };

  var vertex;
  while ((vertex = unvisited.shift())) {
    // Explore unvisited neighbors
    var neighbors = map[vertex].filter((n) => !visited.includes(n.vertex));

    // Add neighbors to the unvisited list
    unvisited.push(...neighbors.map((n) => n.vertex));

    var costToVertex = shortestDistances[vertex].cost;

    for (let { vertex: to, cost } of neighbors) {
      var currCostToNeighbor =
        shortestDistances[to] && shortestDistances[to].cost;
      var newCostToNeighbor = costToVertex + cost;
      if (
        currCostToNeighbor == undefined ||
        newCostToNeighbor < currCostToNeighbor
      ) {
        // Update the table
        shortestDistances[to] = { vertex, cost: newCostToNeighbor };
      }
    }

    visited.push(vertex);
  }

  //const path = tracePath(shortestDistances, start, end);
  /*
    console.log(
        "Shortest path is: ",
        path.join(" -> "),
        " with weight ",
        shortestDistances[end].cost
    );
    */
  return shortestDistances[end].cost;
};

const CITIES = [
  AMS,
  ANG,
  ATH,
  BAR,
  BER,
  BRE,
  BRI,
  BRX,
  BUC,
  BUD,
  CAD,
  CON,
  DAN,
  DIE,
  EDI,
  ERZ,
  ESS,
  FRK,
  KHR,
  KOB,
  KYV,
  LIS,
  LON,
  MAD,
  MAR,
  MOS,
  MUN,
  PAL,
  PAM,
  PAR,
  PET,
  RIC,
  ROM,
  ROS,
  SAR,
  SEV,
  SMO,
  SMY,
  SOC,
  SOF,
  STK,
  VEN,
  WAR,
  WIE,
  WIL,
  ZAG,
  ZUR,
];

module.exports = function ticket_generator(n) {
  let rem_cities = CITIES.slice(0);
  let ticket_list = [];
  while (ticket_list.length < n) {
    let city1 = "";
    let city2 = CITIES[Math.floor(Math.random() * CITIES.length)];

    if (rem_cities.length > 0) {
      city1 = rem_cities[Math.floor(Math.random() * rem_cities.length)];
    } else {
      city1 = CITIES[Math.floor(Math.random() * CITIES.length)];
    }

    if (city1 === city2) {
      continue;
    }

    let weight = dijkstra(g.adjacencyList, city1, city2);
    let ticket = { city1: city1, city2: city2, score: weight };
    let ticket2 = { city1: city2, city2: city1, score: weight };

    if (
      ticket_list.includes(ticket) ||
      ticket_list.includes(ticket2) ||
      weight < 4
    ) {
      console.error(`Rejected ${JSON.stringify(ticket)}`);
    } else {
      const i1 = rem_cities.indexOf(city1);
      if (i1 > -1) {
        rem_cities.splice(i1, 1);
      }

      const i2 = rem_cities.indexOf(city2);
      if (i2 > -1) {
        rem_cities.splice(i2, 1);
      }

      ticket_list.push(ticket);
      console.log(`${city1} -> ${city2} (${weight})`);
    }
  }
  // shuffle
  const shuffleES6 = (array) => {
    const newArray = [...array];

    newArray.reverse().forEach((item, index) => {
      const j = Math.floor(Math.random() * (index + 1));
      [newArray[index], newArray[j]] = [newArray[j], newArray[index]];
    });

    return newArray;
  };

  const a = shuffleES6(ticket_list);
  return a;
}
