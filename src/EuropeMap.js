import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: 1,
    shadowSize: 1
});

L.Marker.prototype.options.icon = DefaultIcon;

const EuropeMap = (props) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const countryOptions = [
    { value: 'amsterdam', label: 'Amsterdam' },
    { value: 'angora', label: 'Angora' },
    { value: 'athina', label: 'Athina' },
    { value: 'barcelona', label: 'Bercelona' },
    { value: 'berlin', label: 'Berlin' },
    { value: 'brest', label: 'Brest' },
    { value: 'brindisi', label: 'Brindisi' },
    { value: 'bruxelles', label: 'Bruxelles' },
    { value: 'bucuresti', label: 'Bucuresti' },
    { value: 'budapest', label: 'Budapest' },
    { value: 'cadiz', label: 'Cadiz' },
    { value: 'constantinople', label: 'Constantinople' },
    { value: 'danzic', label: 'Danzic' },
    { value: 'dieppe', label: 'Dieppe' },
    { value: 'edinburgh', label: 'Edinburgh' },
    { value: 'erzurum', label: 'Erzurum' },
    { value: 'essen', label: 'Essen' },
    { value: 'frankfurt', label: 'Frankfurt' },
    { value: 'kharkov', label: 'Kharkov' },
    { value: 'kobenhavn', label: 'Kobenhavn' },
    { value: 'kyiv', label: 'Kyiv' },
    { value: 'lisboa', label: 'Lisboa' },
    { value: 'london', label: 'London' },
    { value: 'madrid', label: 'Madrid' },
    { value: 'marseille', label: 'Marseille' },
    { value: 'moskva', label: 'Moskva' },
    { value: 'munchen', label: 'Munchen' },
    { value: 'palermo', label: 'Palermo' },
    { value: 'pamplona', label: 'Pamplona' },
    { value: 'paris', label: 'Paris' },
    { value: 'petrograd', label: 'Petrograd' },
    { value: 'rica', label: 'Rica' },
    { value: 'roma', label: 'Roma' },
    { value: 'rostov', label: 'Rostov' },
    { value: 'sarajevo', label: 'Sarajevo' },
    { value: 'sevastopol', label: 'Sevastopol' },
    { value: 'smolensk', label: 'Smolensk' },
    { value: 'smyrna', label: 'Smyrna' },
    { value: 'sochi', label: 'Sochi' },
    { value: 'sofia', label: 'Sofia' },
    { value: 'stockholm', label: 'Stockholm' },
    { value: 'venezia', label: 'Venezia' },
    { value: 'warszawa', label: 'Warszawa' },
    { value: 'wien', label: 'Wien' },
    { value: 'wilno', label: 'Wilno' },
    { value: 'zagrab', label: 'Zagrab' },
    { value: 'zurich', label: 'Zurich' },
  ];

  const countryCoordinates = {
    amsterdam: [52.36770346873351, 4.909176493333851],
    angora: [39.95313720392828, 32.93128693901679],
    athina: [37.98310751934288, 23.724917382341904],
    barcelona: [41.38954777746706, 2.178294453714095],
    berlin: [52.519758351461775, 13.410954271291747],
    brest: [48.389911291632686, -4.487268052190781],
    brindisi: [40.63861054696436, 17.947573548011214],
    bruxelles: [50.84794222046928, 4.353098161538776],
    bucuresti: [44.427410633017075, 26.112477123148825],
    budapest: [47.50290159488274, 19.023173767984723],
    cadiz: [36.52162169509899, -6.2800648159568535],
    constantinople: [41.00692472762938, 28.991524646106484],
    danzic: [54.35057140485158, 18.638517855176485],
    dieppe: [49.92266671262107, 1.075908870173067],
    edinburgh: [55.95504066876827, -3.184806343311227],
    erzurum: [39.90623067765108, 41.26282896755537],
    essen: [51.45576934608291, 7.000213749192934],
    frankfurt: [50.114050799944025, 8.680497190680427],
    kharkov: [49.99668168762977, 36.21371497218298],
    kobenhavn: [55.67704773718359, 12.573908512822687],
    kyiv: [50.45930705326843, 30.52715068007616],
    lisboa: [38.72396462882221, -9.139483355764833],
    london: [51.50801699312397, -0.127016116463145],
    madrid: [40.42006612008089, -3.704269926679625],
    marseille: [43.29472193731816, 5.3696485655544315],
    moskva: [55.761480873739806, 37.6380512237346],
    munchen: [48.13463370061183, 11.585768680855393],
    palermo: [38.11512826399626, 13.352821728676485],
    pamplona: [42.81248458398372, -1.6450442719354175],
    paris: [48.856792555241285, 2.354585025442625],
    petrograd: [59.94839893177094, 30.38841861324082],
    rica: [56.96790642202774, 24.09885083416665],
    roma: [41.898199245904905, 12.497532010763424],
    rostov: [47.301129294927925, 39.60734839346799],
    sarajevo: [43.85964223188443, 18.4048772690606],
    sevastopol: [44.75202713036963, 33.61063346692314],
    smolensk: [54.79546335212987, 32.04046230723318],
    smyrna: [38.42751829320041, 27.16089696427852],
    sochi: [43.606166865553526, 39.734738627074414],
    sofia: [42.7004490508852, 23.32291332561731],
    stockholm: [59.33059147400824, 18.058947201921427],
    venezia: [45.43864296138008, 12.318655301270288],
    warszawa: [52.22861761956336, 21.011057567375776],
    wien: [48.20775589119505, 16.36974790199091],
    wilno: [54.69065202426833, 25.283598001001305],
    zagrab: [45.819212773060215, 16.000056662920628],
    zurich: [47.37624973448115, 8.54188218321607]
  };

  useEffect(() => {
    const city1 = props.t.city1.toLowerCase();
    const city2 = props.t.city2.toLowerCase();
    setSelectedCountries([
      city1, city2
    ])
  }, [props.t])

  return (
    <>
      <MapContainer
        center={[48.15032434040175, 17.084318972129314]} // Default center location (e.g., Germany)
        zoom={3}
        style={{ width: '90%', height: '60vw' }}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedCountries.map((country) => (
          <Marker key={country} position={countryCoordinates[country]} opacity={90} style={{display: 'none'}}>
            <Tooltip permanent>
              {countryOptions.find((option) => option.value === country).label}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default EuropeMap;
