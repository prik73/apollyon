import { useState } from 'react';
import { subsystems } from '../data/bom.js';

// Simple reasons why each alternative was not chosen
const WHY_NOT = {
  // Autopilot
  'Cube Red Pro': ['Costs nearly $1,000 — 3× the Cube Orange+. Dual-CPU redundancy is only justified for production units, not a first prototype.'],
  'Pixhawk 6X': ['Made in China — country of origin concern for the main guidance computer.'],
  // Servos
  'SB-2290SG Black Edition': ['Brushed motor wears faster in continuous saltwater cycling. DA-26-SUB has a brushless motor with no wear components.'],
  'HS-7980TH': ['Lower torque ceiling. Standard hobby-grade motor — not built for repeated heavy payload release.'],
  // ESCs
  'HV160': ['12S voltage limit is tighter. No DroneCAN — autopilot cannot see motor temperature or fault codes in real time.'],
  'SeaKing 130A V3': ['Made in China. No telemetry to autopilot — cannot detect overheating before the motor fails mid-mission.'],
  // Nav camera
  'Razer Micro Pro (IMX585)': ['Very similar performance. Chosen as backup due to slightly lower availability of IMX585 cameras at time of sourcing.'],
  'Micro Toothless 2 Starlight': ['100× less sensitive in very low light than the IMX462. Fallback only if IMX462 cameras are unavailable.'],
  // Obs camera
  'A8 Mini': ['No thermal channel — cannot detect people or vessels in darkness or fog. Thermal is the core requirement for night operations.'],
  'DS-2DE4A425IWG-E (25× PTZ)': ['Standard CCTV camera, not designed for marine use. No thermal, no gimbal stabilisation, not marinized for spray.'],
  // GPS
  'mosaic-X5 via simpleRTK3B': ['Single antenna only — needs a second unit for heading, which doubles cost and complexity vs the mosaic-go H doing it all in one module.'],
  'simpleRTK2B': ['Dual-band only, no anti-jamming. Harbour environments with radar and AIS transmitters can disrupt it — not reliable enough for operational use.'],
  // Telemetry
  'XBee SX 900': ['More expensive per unit. Multi-vehicle mesh networking is useful but not needed at prototype stage.'],
  'RFD900x': ['Point-to-point only — no mesh for multi-vehicle operations. Shorter rated range (40km vs 60km for P900).'],
  // RC Link
  'Duplex DS-24 II': ['Costs ~$2,855 — nearly 20× the price of Crossfire. Tri-frequency fallback is genuinely useful near busy harbours but not justified for a first prototype.'],
  'ExpressLRS EP2 RX + RadioMaster TX': ['Open-source — shorter range and less proven in harsh marine RF environments compared to Crossfire.'],
  // Motors
  'Cruise 2.0 RS (×2)': ['Discontinued model — vendor stock availability is unconfirmed. 2kW vs 3kW may not achieve planing with full payload.'],
  'MT65162 130KV (×2, Architecture B only)': ['Needs separate ESC, thruster housing, and shaft seals — significantly more integration work. Chinese origin.'],
  // BMS
  'Smart BMS 500A + Cerbo GX MK2': ['Two separate units needed, more wiring. REC 2Q covers the same function in one unit with better cell-level monitoring.'],
  'JK BMS (active balancing)': ['No cell-level resistance monitoring — cannot detect a degrading cell before it causes a fire in a sealed hull. Chinese origin.'],
  // Battery
  'LiFePO4 24V 50Ah (commercial pack)': ['Heavier and larger than the LiPo for the same capacity. Tattu is simpler to source and handle at prototype stage.'],
  'Custom LiFePO4 pack (production use only)': ['Requires cell assembly equipment, spot welding, and battery expertise. Dangerous without proper facilities — not for a first build.'],
  // Companion computer
  'Jetson Orin NX 8GB': ['At $500–600, only worth it if AI-based obstacle detection or object classification is needed. Basic waypoint missions do not need it.'],
  'Orange Pi 5 (8GB)': ['Chinese origin. Less ArduPilot companion community support than Raspberry Pi, which is the documented choice for USV builds.'],
  // Hull
  'Graupner Boat Hull Kit (modified)': ['Still needs significant modification for electronics bay, motor mounts, and payload hardpoints — only marginally faster than custom.'],
  'Foam-core glass sandwich (self-build)': ['Requires composite fabrication skills, moulds, and epoxy work. Not practical without workshop experience.'],
  // Sensors
  'Quantum 2 Doppler Radar': ['Under review — high cost ($1,200–1,500) and Ethernet integration adds complexity. May not be needed at prototype stage.'],
  'Ping2 Sonar — downward-facing (depth)': ['Same unit as the forward Ping2, different mount. Both are chosen — this is not an alternative, it is the second unit.'],
  'dAISy 2+ AIS Receiver': ['Low priority for prototype. Receives commercial vessel traffic but not critical for initial validation. Can be added later.'],
  'Bilge float switch + DS18B20 temp sensor': ['Low-cost safety sensors — will be added before water testing. Not needed on the bench.'],
  // RF Antennas
  'SMA bulkhead feedthrough fitting': ['Required hardware for every RF chain — not an alternative, it is a mandatory fitting alongside any external antenna.'],
  'Crossfire diversity antennas': ['Included with the TBS Crossfire RX — not a separate purchase decision.'],
  // VTX
  'HDZero Race V3': ['8–12ms latency is better but range is shorter (3–5km vs 6–8km). Walksnail offers a better all-round balance for open-water use.'],
  'Rush Blade 5.8GHz VTX': ['Analog 5.8GHz — range collapses to ~500m over open water due to surface multipath. Not usable beyond harbour distance.'],
};

const GLOSSARY = {
  'STM32H743': 'The specific microcontroller chip inside the autopilot — made by ST Microelectronics. It runs the navigation calculations 400 times per second.',
  'STM32H7': 'High-performance microcontroller series by ST Microelectronics — the processing chip that runs all autopilot calculations.',
  'Triple IMU': 'Three independent motion sensors built in. IMU = Inertial Measurement Unit — measures acceleration and rotation. Having three means if one gives bad data, the other two outvote it automatically.',
  'IMU': 'Inertial Measurement Unit — a sensor that measures acceleration and rotation. Tells the autopilot how the boat is moving and tilting at all times.',
  'CAN bus': 'Controller Area Network — a communication standard originally from the automotive industry. Lets the autopilot talk to motors, GPS, and other devices over a single wire pair, reliably and fast.',
  'DroneCAN': 'Open communication standard for drone components. Lets the ESC report RPM, temperature, current, and faults to the autopilot over a single CAN wire.',
  'ArduRover': 'Open-source autopilot software for boats and ground vehicles — maintained by a global community. Handles autonomous waypoint navigation, failsafes, and motor mixing.',
  'ArduPilot': 'The open-source project behind ArduRover. A community-maintained autopilot firmware used in commercial survey drones, boats, and research vehicles worldwide.',
  'RTK': 'Real-Time Kinematic — a GPS technique that achieves centimetre-level accuracy by comparing signals with a fixed reference. Standard GPS gives ±5m; RTK gives ±2cm.',
  'GNSS': 'Global Navigation Satellite System — the umbrella term for all satellite positioning systems: US GPS, Russian GLONASS, European Galileo, and Chinese BeiDou.',
  'IP67': 'Waterproof rating — the device can survive being submerged in 1 metre of water for 30 minutes.',
  'IP68': 'Waterproof rating — the device can survive continuous submersion beyond 1 metre depth.',
  'IP56': 'Weather-resistant rating — protected against powerful water jets and dust. Not submersible.',
  'RS-485': 'A robust serial communication standard designed for industrial environments. More reliable than standard serial over long cable runs and in electrically noisy environments like motor bays.',
  'PWM': 'Pulse Width Modulation — the standard signal type for sending throttle commands to servos and ESCs. A simple timed electrical pulse whose width encodes the position or speed.',
  'CRSF': 'CrossFire Serial Protocol — TBS\'s proprietary RC link protocol. Very low latency (~4ms) and more reliable than standard PWM over long distances.',
  'MAVLink': 'Micro Air Vehicle Link — the communication protocol used between the autopilot and the ground station laptop. Carries telemetry, commands, and mission data.',
  'SiK': 'Open-source firmware for 900MHz telemetry radios. The standard software running on RFD900x and similar MAVLink radios.',
  'FHSS': 'Frequency Hopping Spread Spectrum — the radio hops rapidly between frequencies to avoid interference and jamming.',
  'AES': 'Advanced Encryption Standard — military-grade encryption applied to the radio link so the data cannot be intercepted or decoded.',
  'AIM+': 'Septentrio\'s proprietary anti-jamming technology. Actively filters out interference from nearby radar, radio, and AIS equipment that would otherwise corrupt GPS signals.',
  'RAIM+': 'Receiver Autonomous Integrity Monitoring — the GPS receiver checks its own data against multiple satellites and flags bad readings automatically.',
  'L1/L2/L5': 'The three GPS frequency bands. Using all three gives faster lock-on, better accuracy in urban canyons, and resistance to jamming compared to single-band receivers.',
  'eMMC': 'Embedded MultiMediaCard — built-in flash storage soldered directly onto the board. Like a fast SD card that cannot be removed or lost.',
  'MAVProxy': 'Software running on the companion computer that acts as a bridge — it connects the autopilot to the ground station laptop and can relay commands, log data, and run mission scripts.',
  'NPU': 'Neural Processing Unit — a dedicated chip for running AI and machine learning calculations efficiently. Only needed if the mission requires real-time object detection.',
  'VE.Can': 'Victron Energy\'s CAN bus protocol — allows the BMS to communicate battery status directly to Victron monitoring equipment and chargers.',
  'NMEA 2000': 'A marine communication standard. Allows the BMS and GPS to share data on the same network as chartplotters and other marine electronics.',
  'BMS': 'Battery Management System — monitors each individual cell in the battery pack, prevents overcharging or over-discharging, and can cut power if a dangerous condition is detected.',
  'LiPo': 'Lithium Polymer battery — high energy density and high discharge rate. Standard for drones and performance RC vehicles. Risk of fire if damaged or overcharged.',
  'LiFePO4': 'Lithium Iron Phosphate battery — safer chemistry than LiPo. Cannot thermally runaway (catch fire). Lower energy density but 3,000+ charge cycles vs ~300 for LiPo.',
  'GRP': 'Glass Reinforced Plastic — fibreglass. The standard hull material for boats, strong, lightweight, and fully waterproof.',
  'LOA': 'Length Overall — the total length of the boat from bow to stern.',
  'AUW': 'All-Up Weight — the total weight of the vehicle including hull, electronics, batteries, and payload.',
  'UART': 'Universal Asynchronous Receiver-Transmitter — a basic serial communication interface. The autopilot uses UART ports to talk to GPS, telemetry radios, and other peripherals.',
};

function TechTip({ term, children }) {
  const explanation = GLOSSARY[term];
  if (!explanation) return <>{children}</>;
  return (
    <span className="tech-tip">
      {children}
      <span className="tech-tip-box">{explanation}</span>
    </span>
  );
}

function annotateText(text) {
  if (!text) return text;
  const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  let parts = [{ type: 'text', value: text }];

  for (const term of terms) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    const newParts = [];
    for (const part of parts) {
      if (part.type !== 'text') { newParts.push(part); continue; }
      let str = part.value;
      let last = 0;
      let match;
      regex.lastIndex = 0;
      while ((match = regex.exec(str)) !== null) {
        if (match.index > last) newParts.push({ type: 'text', value: str.slice(last, match.index) });
        newParts.push({ type: 'tip', term, matched: match[0] });
        last = match.index + match[0].length;
      }
      if (last < str.length) newParts.push({ type: 'text', value: str.slice(last) });
    }
    parts = newParts;
  }

  return parts.map((p, i) =>
    p.type === 'tip'
      ? <TechTip key={i} term={p.term}>{p.matched}</TechTip>
      : p.value
  );
}

function stripEmoji(str) {
  return str.replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '').replace(/[\u{1F300}-\u{1FAFF}]/gu, '').replace(/[\u{2600}-\u{27BF}]/gu, '').trim();
}

export default function BOM() {
  const [activeId, setActiveId] = useState(subsystems[0].id);
  const active = subsystems.find(s => s.id === activeId);
  const chosen = active.components[0];
  const alternatives = active.components.slice(1);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Bill of Materials</div>
        <div className="page-subtitle">
          Chosen component for each subsystem and the alternatives that were evaluated but not selected.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>

        {/* Left sidebar */}
        <div style={{
          width: 190,
          flexShrink: 0,
          borderRight: '1px solid var(--border)',
          marginRight: 28,
          paddingRight: 0,
        }}>
          {subsystems.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '9px 14px',
                background: activeId === s.id ? 'var(--accent-bg)' : 'transparent',
                borderLeft: activeId === s.id ? '3px solid var(--accent-light)' : '3px solid transparent',
                borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                color: activeId === s.id ? 'var(--accent-mid)' : 'var(--text-secondary)',
                fontWeight: activeId === s.id ? 600 : 400,
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.12s',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Right content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Chosen component */}
          <div style={{
            background: 'var(--accent-bg)',
            border: '1px solid #bfdbfe',
            borderRadius: 10,
            padding: '16px 20px',
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--accent-mid)', marginBottom: 8 }}>
              Chosen
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 4 }}>
              {chosen.model}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>
              {chosen.manufacturer} · {stripEmoji(chosen.country)} · <span style={{ fontWeight: 600, color: 'var(--accent-mid)' }}>{chosen.price}</span>
            </div>
            <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>{annotateText(chosen.notes)}</div>
          </div>

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', marginBottom: 12 }}>
                Alternatives considered
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {alternatives.map(alt => {
                  const reasons = WHY_NOT[alt.model] || [];
                  return (
                    <div key={alt.rank} style={{
                      background: 'white',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      padding: '14px 18px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{alt.model}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{alt.manufacturer} · {stripEmoji(alt.country)} · {alt.price}</span>
                      </div>
                      {reasons.length > 0 && (
                        <div style={{ marginTop: 8 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#94a3b8', marginBottom: 5 }}>
                            Why not chosen
                          </div>
                          {reasons.map((r, i) => (
                            <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: 10, borderLeft: '2px solid #e2e8f0', marginBottom: 4 }}>
                              {r}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
