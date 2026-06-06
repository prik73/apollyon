/*
  Drop image files into:  public/assets/

  Expected filenames:
    hydrofoil.jpg       — hydrofoil boat photo
    candela_c8.jpg      — Candela C-8 photo
    candela-cpod.jpg    — Candela C-Pod motor (underwater)
    emrax-228.jpg       — EMRAX 228 axial flux motor (contender)
    epropulsion-x40.jpg — ePropulsion X40 outboard (contender)
    torqeedo.jpg        — Torqeedo Deep Blue 50R
    bmw-i3.jpg          — BMW i3 battery pack
    ser203x.jpg         — Blue Trail SER-203X servo
    cube-orange.jpg     — CubePilot Cube Orange+
    septentrio.jpg      — Septentrio mosaic-go H
    starlink-mini.jpg   — Starlink Mini
    siyi-a8.jpg         — SIYI A8 Mini gimbal camera
    rpi5.jpg            — Raspberry Pi 5
*/

const BORDER = '1px solid #d0d0d0';
const FONT = 'Arial, sans-serif';

const RESPONSIVE = `
  .ss-wrap      { padding: 32px 24px 80px; }
  .ss-with-img  { display: flex; gap: 20px; align-items: flex-start; }
  .ss-img-col   { flex-shrink: 0; width: 200px; }
  .ss-img-col img { width: 200px; height: 160px; }
  .ss-grid-3    { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 8px; }
  .ss-grid-2    { display: grid; grid-template-columns: 1fr 1fr;     gap: 12px; margin-bottom: 8px; }
  .ss-tscroll   { overflow-x: auto; }
  .ss-tscroll table { min-width: 340px; }

  @media (max-width: 600px) {
    .ss-wrap      { padding: 20px 14px 60px; }
    .ss-with-img  { flex-direction: column; }
    .ss-img-col   { width: 100%; }
    .ss-img-col img { width: 100% !important; height: 180px !important; }
    .ss-grid-3    { grid-template-columns: 1fr; }
    .ss-grid-2    { grid-template-columns: 1fr; }
  }
`;

function SheetTable({ rows, cols }) {
  return (
    <div className="ss-tscroll">
      <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: FONT, fontSize: 13 }}>
        {cols && (
          <thead>
            <tr>
              {cols.map(c => (
                <th key={c} style={{ border: BORDER, padding: '5px 10px', background: '#f2f2f2', fontWeight: 700, textAlign: 'left', fontSize: 12 }}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} style={{ border: BORDER, padding: '5px 10px', background: j === 0 ? '#f9f9f9' : '#fff', fontWeight: j === 0 ? 600 : 400, whiteSpace: j === 0 ? 'nowrap' : 'normal' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, marginBottom: 10, marginTop: 36, color: '#111', borderBottom: '2px solid #111', paddingBottom: 4 }}>
      {children}
    </div>
  );
}

function Img({ src, alt, caption, height = 200 }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height, objectFit: 'contain', background: '#fafafa', border: BORDER, display: 'block', margin: '0 auto' }}
        onError={e => { e.currentTarget.parentElement.style.display = 'none'; }}
      />
      {caption && <div style={{ fontFamily: FONT, fontSize: 11, color: '#888', marginTop: 4 }}>{caption}</div>}
    </div>
  );
}

function WithImg({ src, alt, caption, children }) {
  return (
    <div className="ss-with-img">
      <div className="ss-img-col">
        <Img src={src} alt={alt} caption={caption} height={160} />
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function CalcBox({ children }) {
  return (
    <div style={{ fontFamily: 'monospace', fontSize: 12.5, background: '#f9f9f9', border: BORDER, borderLeft: '3px solid #aaa', padding: '8px 12px', margin: '8px 0', whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function Note({ children, color = '#666' }) {
  return <div style={{ fontFamily: FONT, fontSize: 12, color, marginTop: 6, fontStyle: 'italic' }}>{children}</div>;
}

export default function SpecSheet() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <style>{RESPONSIVE}</style>
      <div className="ss-wrap" style={{ maxWidth: 900, margin: '0 auto', fontFamily: FONT }}>

        {/* TITLE */}
        <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 2 }}>specsheet USV</div>
        {/* TOP-LEVEL SPECS */}
        <SheetTable
          cols={['Weight (AUW)', 'Speed', 'Range', 'Runtime']}
          rows={[['800 to 1100 kg', '40 to 65 km/h', '~120 km', '2.52 hrs  (75.8 kWh ÷ 30 kW)']]}
        />

        {/* ── HULL ── */}
        <SectionHeading>Hull's Design</SectionHeading>

        {/* hull + inspiration photos */}
        <div className="ss-grid-3">
          <Img src="/assets/hydrofoil.jpg"    alt="Hydrofoil"    caption="Hydrofoil" height={180} />
          <Img src="/assets/candela_c8.jpg"   alt="Candela C-8"  caption="Candela C-8 (~$600 to 700k)" height={180} />
          <Img src="/assets/candela_cpod.jpg" alt="Candela C-Pod" caption="Candela C-Pod underwater motor" height={180} />
        </div>

        <SheetTable
          rows={[
            ['Hull type', 'Hydrofoil catamaran'],
            ['Length', '3.5 to 5 metres'],
            ['Material', 'GRP or carbon fibre'],
            ['Inspired by', 'Candela C-8 (Swedish)'],
            ['Hull weight', '~40 to 50 kg'],
            ['Foil effect', 'Lifts hull above water above ~25 km/h → ~80% drag reduction'],
          ]}
        />

        {/* ── PROPULSION ── */}
        <SectionHeading>Propulsion</SectionHeading>
        <WithImg src="/assets/torqeedo.jpg" alt="Torqeedo Deep Blue 50R" caption="Torqeedo Deep Blue 50R">
          <SheetTable
            rows={[
              ['Motors', '2× Torqeedo Deep Blue 50R'],
              ['Power', '97 kW continuous / 110 kW peak (combined)'],
              ['Voltage', '350 to 400 V'],
              ['Weight', '278 kg (139 kg each)'],
              ['Controller', 'Integrated SMU no external ESC'],
              ['ArduPilot', 'TorqLink CAN, ArduRover 4.7+ native'],
            ]}
          />
        </WithImg>

        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', margin: '14px 0 6px' }}>
          Motors considered
        </div>
        <div className="ss-grid-2">
          <Img src="/assets/emrax-228.jpg"       alt="EMRAX 228"       caption="EMRAX 228, 75 kW, 13 kg (needs custom shaft + gearbox), best power to weight" height={160} />
          <Img src="/assets/epropulsion-x40.jpg" alt="ePropulsion X40" caption="ePropulsion X40 40 kW,  chineese" height={160} />
        </div>

        {/* ── BATTERY ── */}
        <SectionHeading>Battery</SectionHeading>
        <WithImg src="/assets/bmw-i3.jpg" alt="BMW i3 battery" caption="BMW i3 42 kWh pack (salvage)">
          <SheetTable
            rows={[
              ['Packs', '2× BMW i3 42 kWh'],
              ['Total energy', '75.8 kWh usable'],
              ['Voltage', '352 V'],
              ['Weight', '556 kg (278 kg each)'],
              ['BMS', 'SimpBMS (~EUR 150)'],
              ['Cell type', 'Samsung SDI NMC622, 96S1P'],
            ]}
          />
        </WithImg>

        <div style={{ marginTop: 12 }}>
          <CalcBox>{`42.2 kWh × 2 packs = 84.4 kWh gross
84.4 × 0.90 (usable) = 75.8 kWh

Runtime at 30 kW cruise:  75.8 ÷ 30 = 2.52 hrs
Top speed (65 km/h) draw: ~75 kW  → sprint only`}</CalcBox>
        </div>

        {/* ── STEERING ── */}
        <SectionHeading>Steering</SectionHeading>
        <WithImg src="/assets/ser203x.jpg" alt="Blue Trail SER-203X" caption="Blue Trail Engineering SER-203X">
          <SheetTable
            rows={[
              ['Type', 'Rudder'],
              ['Servo', 'Blue Trail Engineering SER-203X Brushless, High Torque'],
              ['Price', '$465'],
              ['Depth rating', '200 m  (400 m with aluminium lower case)'],
              ['Interface', 'PWM → Cube Orange+ servo output'],
            ]}
          />
          <Note>Rudder over differential thrust: both motors stay at full power when turning.</Note>
        </WithImg>

        {/* ── AUTOPILOT ── */}
        <SectionHeading>Autopilot</SectionHeading>
        <WithImg src="/assets/cube-orange.jpg" alt="CubePilot Cube Orange+" caption="CubePilot Cube Orange+">
          <SheetTable
            rows={[
              ['Unit', 'CubePilot Cube Orange+'],
              ['Firmware', 'ArduRover 4.7+'],
              ['Price', '~$404'],
            ]}
          />
        </WithImg>

        {/* ── GNSS ── */}
        <SectionHeading>GNSS</SectionHeading>
        <WithImg src="/assets/septentrio.jpg" alt="Septentrio mosaic-go H" caption="Septentrio mosaic-go H">
          <SheetTable
            rows={[
              ['Unit', 'Septentrio mosaic-go H'],
              ['Heading accuracy', '±0.1°'],
              ['IP rating', 'IP67'],
              ['Price', '~EUR 745'],
              ['Origin', 'Belgium'],
            ]}
          />
        </WithImg>

        {/* ── COMMUNICATION ── */}
        <SectionHeading>Communication</SectionHeading>
        <WithImg src="/assets/starlink-mini.jpg" alt="Starlink Mini" caption="Starlink Mini">
          <SheetTable
            rows={[
              ['Primary', 'Starlink Mini'],
              ['Carries', 'Video + MAVLink + RC control'],
              ['Hardware cost', '$199'],
              ['Power', '25 to 40 W'],
              ['Latency', '20 to 40 ms'],
              ['Throughput', '80 to 150 Mbps'],
            ]}
          />
          <Note>Why not RF: radio horizon at sea surface ≈ 8 to 10 km. Mission = 120 km. RF fails after first 10 km.</Note>
        </WithImg>

        {/* ── CAMERAS ── */}
        <SectionHeading>Cameras</SectionHeading>
        <WithImg src="/assets/siyi-a8.jpg" alt="SIYI A8 Mini" caption="SIYI A8 Mini">
          <SheetTable
            cols={['Spec', 'Value']}
            rows={[
              ['Model', 'SIYI A8 Mini'],
              ['Role', 'PTZ zoom / observation'],
              ['Resolution', '4K'],
              ['Zoom', '8× optical'],
              ['Gimbal', '3-axis stabilised'],
              ['IP rating', 'IP67'],
              ['Output', 'RTSP over Ethernet'],
              ['Price', '$350 to 420'],
            ]}
          />
          <Note>Video → RPi 5 → GStreamer/WebRTC → Starlink. Latency ~100–150(hopefully) ms end-to-end.</Note>
        </WithImg>

        {/* ── COMPANION COMPUTER ── */}
        <SectionHeading>Companion Computer</SectionHeading>
        <WithImg src="/assets/rpi5.jpg" alt="Raspberry Pi 5" caption="Raspberry Pi 5">
          <SheetTable
            rows={[
              ['Board', 'Raspberry Pi 5'],
              ['Role', 'MAVProxy bridge + video encode'],
              ['MAVProxy', 'Connects Cube Orange+ to Starlink ground station over internet'],
              ['Video pipeline', 'GStreamer → WebRTC (~100–150 ms latency)'],
              ['Origin', 'UK'],
            ]}
          />
        </WithImg>

        {/* ── WEIGHT BUDGET ── */}
        <SectionHeading>Weight Budget</SectionHeading>
        <SheetTable
          cols={['Component', 'Weight']}
          rows={[
            ['2× Torqeedo Deep Blue 50R', '278 kg'],
            ['2× BMW i3 42 kWh battery', '556 kg'],
            ['Hull (GRP / carbon catamaran)', '~45 kg'],
            ['Electronics (Cube, RPi, Starlink, SIYI)', '~15 kg'],
            ['Wiring, BMS, connectors', '~10 kg'],
            ['Rudder servos ×2', '~2 kg'],
            ['Payload', '50–100 kg'],
            ['Total AUW', '~956–1,006 kg'],
          ]}
        />

      </div>
    </div>
  );
}
