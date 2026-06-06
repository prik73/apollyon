import ProductLink from '../components/ProductLink.jsx';

const CHANGES = [
  {
    subsystem: 'Autopilot',
    icon: '🧠',
    color: '#1e3a8a',
    bg: '#eff6ff',
    original: ['Cube Orange+', 'Pixhawk 6X', 'Pixhawk 6C Mini'],
    evaluated: ['CubePilot Cube Red Pro', 'mRo Control Zero H7 OEM', 'Auterion Skynode S', 'ModalAI VOXL 2'],
    chosen: 'Cube Red Pro',
    chosenFull: 'CubePilot Cube Red Pro',
    why: 'The Cube Orange+ is excellent but has a single STM32H743 CPU. If it fails mid-mission on open water, the vehicle is lost. The Cube Red Pro has two fully independent STM32H757 processors — if the primary CPU fails, the secondary takes over with no loss of control. This is the only open-source autopilot with genuine hardware-level CPU redundancy. For a vehicle operating autonomously over water with no manual recovery option, this redundancy is not optional.',
    keyFact: 'The Cube Red Pro is NDAA 2024 compliant — required for any US government or allied-nation contracts.',
    sources: ['discuss.ardupilot.org (Cube Red announcement thread)', 'irlock.com product page', 'CubePilot docs'],
  },
  {
    subsystem: 'Servos',
    icon: '⚙️',
    color: '#7c2d12',
    bg: '#fff7ed',
    original: ['Savox SB-2273SG', 'Hitec HS-5086WP', 'Futaba S3077HV'],
    evaluated: ['Volz DA-22-SUB', 'Volz DA-26-SUB', 'Savox SB-2290SG', 'Dynamixel XM430-W350-T', 'MKS HV747'],
    chosen: 'DA-26-SUB',
    chosenFull: 'Volz DA-26-SUB',
    why: 'The SB-2273SG is a hobbyist servo rated IP67. Marine environments are not just "wet" — saltwater corrosion, wave shock loads, and continuous cycling destroy brushed hobbyist servos within weeks. Within the Volz SUB range, the DA-26-SUB was chosen over the DA-22-SUB for two reasons: (1) 50% more peak torque — 5.0 Nm vs 3.0 Nm — which handles payload release under load and rudder authority against strong currents; (2) wider voltage range of 12–32V vs 20–30V, meaning it runs directly off a 6S LiPo (22.2V nominal) with no step-up regulator. The brushless motor with contactless hall-effect position sensing eliminates all wear failure modes. HART-coat aluminium housing is saltwater-tested. RS-485 digital bus reports real-time position, fault codes, and temperature to the autopilot.',
    keyFact: 'DA-26-SUB operates at 12–32V — direct 6S LiPo connection, no regulator needed. The DA-22-SUB requires 20–30V, needing a boost converter on a 6S pack.',
    sources: ['volz-servos.com product catalogue', 'unmannedsystemssource.com', 'ArduPilot servo integration docs'],
  },
  {
    subsystem: 'ESCs',
    icon: '⚡',
    color: '#6b21a8',
    bg: '#faf5ff',
    original: ['Hobbywing SeaKing 130A', 'Flipsky FSESC 75200', 'Castle Creations Mamba Monster X'],
    evaluated: ['APD 200F3[X] v2', 'Zubax Myxa AD0505D', 'Trampa VESC 75/300 MKIV', 'ODrive Pro'],
    chosen: 'APD 200F3[X] v2',
    chosenFull: 'APD (Advanced Power Drives) 200F3[X] v2',
    why: 'The Hobbywing SeaKing is purpose-built for marine RC boats and is the right budget choice. But it has no telemetry — the autopilot cannot see motor RPM, current draw, temperature, or fault states. The APD 200F3 is designed and manufactured in Australia (not a Chinese OEM board with modified firmware). It has native DroneCAN/UAVCAN support, meaning the autopilot receives real-time RPM, current, voltage, temperature, and fault codes over a single CAN wire. For an autonomous vehicle, knowing when a motor is overloading or overheating before it fails is critical. The 14S/200A continuous rating handles the largest marine thrusters in this weight class.',
    keyFact: 'DroneCAN telemetry from the ESC means ArduPilot can trigger an emergency return-to-home if motor temperature exceeds threshold — impossible with the SeaKing.',
    sources: ['powerdrives.net product documentation', 'ArduPilot DroneCAN ESC integration wiki', 'getfpv.com'],
  },
  {
    subsystem: 'Cameras — Analog',
    icon: '📷',
    color: '#0f766e',
    bg: '#f0fdfa',
    original: ['RunCam Phoenix 2', 'Foxeer Predator V2', 'Caddx Micro Sparrow 2 Pro'],
    evaluated: ['Foxeer Toothless 2 Starlight', 'RunCam Eagle 3', 'Foxeer Razer Mini', 'Sony IMX-based cameras'],
    chosen: 'Micro Toothless 2 Starlight',
    chosenFull: 'Foxeer Micro Toothless 2 Starlight',
    why: 'The RunCam Phoenix 2 uses a 1/3" sensor with a minimum illumination of 0.01 lux. The Foxeer Toothless 2 Starlight uses a 1/2" Sony-derived Starlight sensor with 0.0001 lux minimum illumination — 100 times more sensitive. In marine operations, dawn and dusk are the most common operating windows. Water reflects sunlight creating extreme HDR scenes that blow out standard sensors. The Toothless 2 includes Super HDR specifically to handle high-contrast marine environments. The larger 1/2" sensor also captures more detail in open-water scenes with no visual landmarks.',
    keyFact: '0.0001 lux means usable video in near-total darkness — the RunCam Phoenix 2 at 0.01 lux requires 100× more ambient light to produce the same image.',
    sources: ['foxeer.com product page', 'racedayquads.com', 'FPV community low-light sensor comparison threads'],
  },
  {
    subsystem: 'Cameras — Digital',
    icon: '🎥',
    color: '#1e40af',
    bg: '#eff6ff',
    original: ['DJI O3 Air Unit', 'Caddx Vista', 'OpenIPC + IMX335'],
    evaluated: ['Walksnail Avatar HD Pro', 'SIYI MK15 + ZT30', 'Herelink 1.1', 'HDZero Whoop VTX'],
    chosen: 'MK15 + ZT30 Gimbal',
    chosenFull: 'SIYI MK15 + ZT30',
    why: 'The DJI O3 is the best pure FPV video link but it is a video-only system. The SIYI MK15 + ZT30 combination provides: 15km video range (vs O3\'s ~10km), a 4K optical camera with 30× optical zoom, a 640×512 thermal imaging channel, a 1200m laser rangefinder, and a 3-axis stabilised gimbal — all in one integrated payload. QGroundControl runs natively on the MK15 screen, eliminating the need for a separate GCS tablet. For a USV doing maritime operations, thermal imaging detects people in the water in zero-visibility conditions. The O3 cannot do this. The Walksnail Avatar HD Pro is recommended as the budget digital FPV alternative at $169 with Sony Starvis II sensor.',
    keyFact: 'The ZT30 thermal channel detects a person in the water at 400m range in total darkness. No analog or standard digital FPV camera can do this.',
    sources: ['shop.siyi.biz product documentation', 'SIYI MK15 user manual', 'YT: SIYI MK15 range test'],
  },
  {
    subsystem: 'GPS / GNSS',
    icon: '📡',
    color: '#166534',
    bg: '#f0fdf4',
    original: ['Here 4 (u-blox F9P)', 'Emlid Reach M2', 'ArduSimple simpleRTK2B'],
    evaluated: ['Septentrio mosaic-X5 via simpleRTK3B', 'Septentrio mosaic-go H', 'NovAtel OEM7600', 'SwiftNav Piksi Multi'],
    chosen: 'mosaic-go H',
    chosenFull: 'Septentrio mosaic-go H',
    why: 'The mosaic-X5 requires a carrier board (simpleRTK3B) and is a single-antenna chip — it cannot produce heading on its own. For a USV you cannot use a compass near electric motors, so heading must come from dual-antenna moving baseline GNSS. That means either two mosaic-X5 units (~€1,306 total, two enclosures, two carrier boards, moving baseline software config) or the mosaic-go H. The mosaic-go H is a complete sealed unit with dual SMA antenna ports already integrated — bolt it in, connect two antenna cables, done. One module produces both centimetre-accurate position and ±0.1° heading simultaneously. IP67 sealed housing with USB and COM already wired. Triple-band L1/L2/L5, AIM+ anti-jamming, 100Hz, RAIM+ integrity — identical chip-level performance to the mosaic-X5, but with dual-antenna heading built in and no carrier board or second unit required.',
    keyFact: 'The mosaic-go H replaces what would otherwise be two mosaic-X5 units plus two carrier boards plus moving baseline wiring. One sealed unit, two antenna cables — the complete GNSS and heading solution.',
    sources: ['shop.septentrio.com mosaic-go product page', 'septentrio.com mosaic-go H datasheet', 'gnss.store'],
  },
  {
    subsystem: 'Telemetry',
    icon: '📶',
    color: '#7e22ce',
    bg: '#faf5ff',
    original: ['RFD900x', 'Holybro SiK V3', 'Digi XBee Pro 900HP'],
    evaluated: ['Holybro P900 (Microhard core)', 'Digi XBee SX 900', 'Silvus SC4200', 'Rajant BreadCrumb'],
    chosen: 'P900 (Microhard Pico core)',
    chosenFull: 'Holybro P900 — Microhard Pico OEM Core',
    why: 'The RFD900x is the community gold standard and remains an excellent choice. The Holybro P900 uses the Microhard Pico OEM module — the same core module used inside DJI enterprise products and many professional GCS systems. It adds mesh networking capability (P2P / P2MP / mesh modes), a 60km rated range at 1W, and native Pixhawk JST-GH connector wiring. The critical upgrade is mesh mode: for multi-vehicle USV operations, vehicles can relay telemetry through each other to shore, extending effective range. AES encryption is standard. The Digi XBee SX 900 was also evaluated — it offers DigiMesh self-healing mesh and a 65-mile rated range, making it the top pick if multi-vehicle swarm operations are planned.',
    keyFact: 'The RFD900x is point-to-point only. The P900 in mesh mode allows USV #2 to relay USV #1\'s telemetry to shore when USV #1 is beyond direct radio horizon.',
    sources: ['holybro.com product page', 'Microhard Pico datasheet', 'unmannedrc.com', 'spexdrone.com'],
  },
  {
    subsystem: 'RC Link',
    icon: '🎮',
    color: '#b45309',
    bg: '#fffbeb',
    original: ['TBS Crossfire', 'ExpressLRS EP2 RX', 'FrSky R9 Mini'],
    evaluated: ['Jeti Duplex DS-24 II', 'Futaba T18SZ + R7008SB', 'Graupner mz-32 HoTT', 'DragonLink V3'],
    chosen: 'Duplex DS-24 II',
    chosenFull: 'JETI Model Duplex DS-24 II',
    why: 'TBS Crossfire is the best accessible long-range RC link and remains the budget recommendation. The critical limitation is single-frequency: it operates only on 900MHz. In a dense harbour environment with competing 900MHz signals (some industrial equipment, maritime communications), link quality can degrade. The Jeti DS-24 II has three independent RF modules: two 2.4GHz DUPLEX EX modules and one independent 900MHz NG backup module. If the entire 2.4GHz band is congested or jammed, the 900MHz link autonomously maintains control with no pilot action required. The DS-24 II also monitors 80 sensor values simultaneously on the transmitter screen — battery cell voltages, motor temperatures, hull water ingress sensors — via the JETI EX telemetry protocol. Czech engineering, long-term production history.',
    keyFact: 'Automatic tri-frequency fallback means the DS-24 II is effectively immune to single-band interference. Critical for operating near ports, ships, and industrial areas.',
    sources: ['jetimodel.com DS-24 product page', 'hackermotors.us', 'espritmodel.com', 'JETI EX telemetry protocol documentation'],
  },
  {
    subsystem: 'Motors',
    icon: '🚤',
    color: '#0f766e',
    bg: '#f0fdfa',
    original: ['Blue Robotics T500 Thruster', 'Flipsky 65161 120KV', 'Graupner Speed 900'],
    evaluated: ['Torqeedo Cruise 2.0 RS', 'ePropulsion Spirit 1.0 Plus', 'Hacker A50-16S', 'Lehner 2280 Austria', 'Maytech MT65162'],
    chosen: 'Cruise 2.0 RS (×2)',
    chosenFull: 'Torqeedo Cruise 2.0 RS',
    why: 'The T500 is designed for ROV slow-speed survey work and produces 5.1kg thrust at 350W. For a 35–56kg catamaran with 15–20kg payload, two T500s cannot achieve planing. More critically, the T500 has no telemetry bus — the autopilot cannot see motor RPM, power consumption, or fault states. The Torqeedo Cruise 2.0 RS is a complete professional electric outboard — motor, controller, and propeller integrated in a sealed marine unit with CAN bus output. ArduPilot natively supports Torqeedo via CAN bus (documented in multiple threads on discuss.ardupilot.org). 2kW per motor provides the thrust needed for semi-planing operation. German marine engineering with a proper marine warranty. The Hacker A50-16S is recommended as the sprint motor for the hybrid propulsion configuration.',
    keyFact: 'Torqeedo + Cube Orange via CAN bus is a documented, tested configuration by multiple builders on the ArduPilot forums. Not theoretical — real builds exist.',
    sources: ['torqeedo.com Cruise 2.0 product page', 'discuss.ardupilot.org Torqeedo integration threads', 'hacker-motor.de A50 series'],
  },
  {
    subsystem: 'Power / BMS',
    icon: '🔋',
    color: '#92400e',
    bg: '#fffbeb',
    original: ['Mauch PL-200', 'Victron SmartShunt 500A', 'Holybro PM08'],
    evaluated: ['REC 2Q 16S BMS', 'Victron Lynx Smart BMS 1000 + Cerbo GX MK2', 'Orion BMS2 (Ewert Energy)', 'Genasun GVX'],
    chosen: 'REC 2Q 16S BMS Kit',
    chosenFull: 'REC d.o.o. 2Q Series 16S BMS',
    why: 'The Mauch PL-200 is an excellent autopilot power sensing module but it is not a BMS — it measures current and voltage at the pack level but does not monitor individual cells, does not balance, and cannot prevent a thermal runaway from a degrading cell. In a sealed marine hull, a LiPo fire is catastrophic. The REC 2Q BMS provides cell-level monitoring, passive balancing, and real-time internal resistance measurement that detects a failing cell before it reaches thermal runaway. The galvanically isolated CAN bus speaks Victron VE.Can protocol natively — connecting directly to a Victron Cerbo GX for whole-system monitoring. REC BMS is used in professional marine applications including sailing yachts and electric ferries, not just hobby builds. The Mauch PL-200 remains the recommendation for autopilot power sensing — it serves a different function (MAVLink battery telemetry) and both should be used together.',
    keyFact: 'A LiFePO4 chemistry battery (instead of LiPo) paired with REC BMS eliminates the fire risk entirely — LiFePO4 cells do not undergo thermal runaway. Recommended for sealed-hull production vehicles.',
    sources: ['rec-bms.com product documentation', 'ogm-energy.com', 'REC 2Q BMS user manual PDF', 'Victron VE.Can documentation'],
  },
];

const COMMUNITIES = [
  { name: 'discuss.ardupilot.org/ArduBoat', url: 'https://discuss.ardupilot.org/c/ardurover/arduboat/54', desc: 'Primary source for ArduRover boat parameter tuning, hardware integration, and Torqeedo CAN configs' },
  { name: 'forum.bluerobotics.com/DIY-USVs', url: 'https://discuss.bluerobotics.com/c/build/diy-usvs/25', desc: 'BlueBoat architecture reference and open USV hull/thruster build discussions' },
  { name: 'powerdrives.net', url: 'https://powerdrives.net/f-series', desc: 'APD ESC documentation and DroneCAN integration notes' },
  { name: 'ardusimple.com', url: 'https://www.ardusimple.com', desc: 'Septentrio mosaic-X5 carrier boards and RTK GNSS integration' },
  { name: 'volz-servos.com', url: 'https://www.volz-servos.com', desc: 'DA-22-SUB submersible servo product documentation' },
  { name: 'torqeedo.com', url: 'https://www.torqeedo.com', desc: 'Cruise 2.0 RS CAN bus integration specs' },
  { name: 'shop.siyi.biz', url: 'https://shop.siyi.biz', desc: 'MK15 + ZT30 thermal camera system documentation' },
  { name: 'jetimodel.com', url: 'https://www.jetimodel.com', desc: 'DS-24 II tri-frequency RC system specifications' },
  { name: 'rec-bms.com', url: 'https://www.rec-bms.com', desc: 'REC 2Q Series BMS documentation and Victron VE.Can integration' },
];

export default function Research() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Research & Decision Log</div>
        <div className="page-subtitle">
          Complete sourcing research for all 10 subsystems. Documents what was originally listed,
          what alternatives were evaluated, what was chosen, and the precise reasoning.
          Hover any underlined product name for direct buying and information links.
        </div>
      </div>

      {/* Summary banner */}
      <div style={{ background: '#0f172a', borderRadius: 12, padding: '20px 24px', marginBottom: 28, color: 'white' }}>
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#94a3b8', marginBottom: 8 }}>Research Summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
          {[
            { n: '10', l: 'Subsystems Re-evaluated' },
            { n: '40+', l: 'Alternatives Researched' },
            { n: '10', l: 'Components Upgraded' },
            { n: '9', l: 'Community Sources' },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#60a5fa' }}>{s.n}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Volz DA-22-SUB callout */}
      <div style={{
        background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10,
        padding: '14px 18px', marginBottom: 28,
        display: 'flex', gap: 12, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>🔍</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#92400e', marginBottom: 4 }}>
            Field Note: Volz DA-22 → DA-22-SUB
          </div>
          <div style={{ fontSize: 13, color: '#78350f', lineHeight: 1.6 }}>
            During research on the Volz website, two submersible variants were identified:
            <ProductLink name="DA-22-SUB">DA-22-SUB</ProductLink> (22mm, 20–30V, 3.0 Nm peak) and <ProductLink name="DA-26-SUB">DA-26-SUB</ProductLink> (26mm, 12–32V, 5.0 Nm peak).
            The <strong>DA-26-SUB was chosen</strong> over the DA-22-SUB for two reasons: 50% more peak torque for
            payload release under load and rudder authority in currents, and the wider 12–32V input range runs
            directly off a 6S LiPo without a boost regulator. The DA-22-SUB would require a step-up converter on
            a standard 6S pack. All BOM servo entries have been updated to DA-26-SUB.
          </div>
        </div>
      </div>

      {/* Decision log cards */}
      {CHANGES.map(c => (
        <div key={c.subsystem} style={{
          background: 'white', border: '1px solid #e2e8f0',
          borderRadius: 12, marginBottom: 20, overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          {/* Header */}
          <div style={{ background: c.bg, borderBottom: `1px solid ${c.color}20`, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>{c.icon}</span>
            <span style={{ fontWeight: 700, fontSize: 16, color: c.color }}>{c.subsystem}</span>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: c.color, opacity: 0.7, fontWeight: 600 }}>
              {c.original.length} original → {c.evaluated.length} evaluated → 1 chosen
            </span>
          </div>

          <div style={{ padding: '18px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

            {/* Left: original + evaluated */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#94a3b8', marginBottom: 8 }}>Originally Listed</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
                {c.original.map(o => (
                  <div key={o} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#cbd5e1', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#64748b', textDecoration: 'line-through' }}>
                      <ProductLink name={o}>{o}</ProductLink>
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#94a3b8', marginBottom: 8 }}>Alternatives Evaluated</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {c.evaluated.map(e => (
                  <div key={e} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#475569' }}>
                      <ProductLink name={e.replace(' (submersible)', '').replace(' Austria', '').replace(' v2', '[X] v2').replace('APD ', '')}>{e}</ProductLink>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: chosen + rationale */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: c.color, marginBottom: 8 }}>Final Choice</div>
              <div style={{
                background: c.bg, border: `1px solid ${c.color}30`,
                borderRadius: 8, padding: '10px 14px', marginBottom: 12,
              }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: c.color, marginBottom: 2 }}>
                  <ProductLink name={c.chosen}>{c.chosenFull}</ProductLink>
                </div>
              </div>

              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#94a3b8', marginBottom: 8 }}>Why This Won</div>
              <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.65, marginBottom: 12 }}>{c.why}</div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: '8px 12px', marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 3 }}>KEY FACT</div>
                <div style={{ fontSize: 12.5, color: '#0f172a', lineHeight: 1.5 }}>{c.keyFact}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#94a3b8', marginBottom: 6 }}>Sources</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {c.sources.map(s => (
                    <div key={s} style={{ fontSize: 12, color: '#64748b', display: 'flex', gap: 6 }}>
                      <span style={{ color: '#cbd5e1' }}>—</span> {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Communities used */}
      <div className="section" style={{ marginTop: 8 }}>
        <div className="section-title">Research Sources & Communities</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Community / Source</th><th>What Was Researched Here</th></tr>
            </thead>
            <tbody>
              {COMMUNITIES.map(c => (
                <tr key={c.name}>
                  <td>
                    <a href={c.url} target="_blank" rel="noopener noreferrer"
                      style={{ color: 'var(--accent-mid)', fontWeight: 600, textDecoration: 'none', fontSize: 13 }}>
                      {c.name} ↗
                    </a>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
