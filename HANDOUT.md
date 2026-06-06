# Apollyon Dynamics — Autonomous USV
## Project Handout & BOM Summary
**Date:** June 2026

---

## 1. Project Overview

An autonomous, FPV-capable Unmanned Surface Vehicle (USV) for a planing/semi-displacement catamaran platform with:
- Full GPS/GNSS waypoint autonomous navigation (ArduRover firmware)
- Redundant long-range RF manual override link
- Real-time FPV video streaming
- 15–20 kg payload capacity with drop/release mechanism
- Western/European dual-use supply chain preference

---

## 2. Hull Architecture Decision

**Platform:** Planing / semi-displacement catamaran, 2–3.5m LOA

**All-Up Weight (AUW) estimate:**

| Component | Weight |
|---|---|
| Hull (GRP catamaran) | 8–14 kg |
| Electronics package | 2–4 kg |
| Battery pack | 6–18 kg |
| Payload | 15–20 kg |
| **Total AUW** | **~35–56 kg** |

---

## 3. Steering Architecture — Critical Decision

**The boat steers by differential thrust only. There is no rudder.**

Two Torqeedo motors (one per pontoon) spin at different speeds to turn the boat — identical to tank steering. ArduRover handles this natively via `SKID_STEER_OUT`. No steering servo is needed.

```
        FRONT
    ┌───────────────┐
    │               │
[Torqeedo]     [Torqeedo]
 LEFT (Port)   RIGHT (Starboard)
    │               │
    └───────────────┘
        BACK

PORT motor faster  → turns STARBOARD
STARBOARD faster   → turns PORT
Both equal         → straight ahead
```

**Servos** are only needed for the payload drop mechanism, not for steering.

---

## 4. Full Bill of Materials (Current State)

### 4.1 Autopilot

| Rank | Model | Manufacturer | Country | Price | Notes |
|---|---|---|---|---|---|
| #1 ★ | Cube Orange+ | CubePilot / HEX | 🇬🇧 UK/HK | ~$404 | Triple IMU, ArduRover native. Right choice for prototype. |
| #2 | Cube Red Pro | CubePilot | 🇬🇧 UK/TW | ~$1,000 | Dual CPU redundancy. For production units only. |
| #3 | Pixhawk 6X | Holybro | 🇨🇳 China | $180–240 | Budget entry. Full ArduPilot support. |

---

### 4.2 GPS / GNSS

> **Key principle:** Never use a compass on a USV near electric motors. Use dual-antenna moving baseline RTK for heading instead.

| Rank | Model | Manufacturer | Country | Price | Notes |
|---|---|---|---|---|---|
| #1 ★ | **mosaic-go H** | Septentrio | 🇧🇪 Belgium | ~€1,499 (~$1,630) | Complete sealed unit. Two antenna inputs, one module. ±0.1° heading accuracy. IP67. No carrier board needed — bolt in and connect two antenna cables. Triple-band L1/L2/L5, AIM+ anti-jamming, 100Hz. |
| #2 | mosaic-X5 via simpleRTK3B | Septentrio / ArduSimple | 🇧🇪🇪🇸 Belgium/Spain | €653 (~$710) | Single antenna only. Needs second unit for heading. |
| #3 | simpleRTK2B | ArduSimple | 🇪🇸 Spain | $170–230 | u-blox F9P. Budget EU RTK option. |

**Why mosaic-go H over Emlid Reach M2:** The Reach M2 costs $749 each and needs TWO units ($1,498 total) for moving-baseline heading. The mosaic-go H does dual-antenna heading in one sealed module at €1,499. One unit, one module, fewer failure points.

---

### 4.3 Motors

> **Architecture A (chosen):** Torqeedo outboards — self-contained, integrated ESC+prop, TQ Bus ArduPilot driver.
> **Architecture B (alternative):** Maytech direct-drive motors + separate ESC. Do not mix architectures.

| Rank | Model | Manufacturer | Country | Price | Notes |
|---|---|---|---|---|---|
| #1 ★ | **Cruise 3.0 R (×2)** | Torqeedo | 🇩🇪 Germany | ~$4,360 each (~$8,720 pair) | Current production model. 3kW each. TQ Bus RS-485. ArduPilot Rover 4.2.0+. |
| #2 | Cruise 2.0 RS (×2) | Torqeedo | 🇩🇪 Germany | $750–900 each (~$1,500–1,800 pair) | Discontinued but available from select vendors. 2kW each. Same TQ Bus wiring. |
| #3 | MT65162 130KV (×2) | Maytech | 🇨🇳 China | $140–160 each | Architecture B only. IP68. Needs separate ESC and thruster housing. |

#### ⚠ Critical Torqeedo Wiring Notes
- **RS-485 converter required:** Cube Orange+ outputs 3.3V TTL UART. Torqeedo TQ Bus is RS-485. A UART-to-RS-485 level shifter is required per motor. Without this, the autopilot cannot communicate with the motors.
- **Short circuit protection mandatory:** ArduPilot documentation explicitly records that rapid large throttle changes with non-Torqeedo batteries caused a short circuit and fire risk during development. Fit a 100A blade fuse or automotive circuit breaker on each motor power cable at the battery terminal.
- **Firmware note:** Rover 4.7+ may support TorqLink CAN directly — confirm hardware revision before choosing wiring path.

#### Sprint Motor (Under Evaluation)
**Lehner 2280** — Austrian inrunner, purpose-built for RC boat racing. Under specification. Lehner contacted June 2026 — awaiting reply on winding recommendation. See Section 7 for email details.

---

### 4.4 ESCs

> Torqeedo motors have integrated motor controllers — no external ESC needed for Torqeedo. ESCs are only needed if using Architecture B (Maytech motors) or a separate Lehner sprint motor.

| Rank | Model | Manufacturer | Country | Price | Notes |
|---|---|---|---|---|---|
| #1 ★ | 200F3[X] v2 | APD (Advanced Power Drives) | 🇦🇺 Australia | $189–209 | 200A continuous, 14S, DroneCAN native. For Lehner sprint motor. |
| #2 | HV160 | Castle Creations | 🇺🇸 USA | $130–160 | 160A, 12S, US-made. Alternative for sprint motor. |
| #3 | SeaKing 130A V3 | Hobbywing | 🇨🇳 China | $65–85 | Water-cooled marine ESC. Architecture B only. |

---

### 4.5 Servos

> Servos are for **payload drop mechanism only**. Steering is handled by differential thrust — no steering servo exists on this build.

| Rank | Model | Manufacturer | Country | Price | Notes |
|---|---|---|---|---|---|
| #1 | DA-26-SUB | Volz Servos | 🇩🇪 Germany | ~$300–800 | IP68 submersible. RS-485 telemetry. Industrial/dual-use provenance. Currently in BOM — may be overspecced for surface payload drop. |
| #2 ★ | SB-2290SG Black Edition | Savox | 🇹🇼 Taiwan | $149–164 | IP67, 70 kg/cm, brushless. Best accessible waterproof option. |
| #3 | HS-7980TH | Hitec | 🇰🇷 South Korea | $80–110 | IP67, titanium gears. Solid marine-proven option. |

> **Open decision:** DA-26-SUB has 6,000m depth rating for deep-sea ROVs — this is overspecced for a surface boat. If the defence supply chain story matters, downgrade to **DA-22-SUB** (same Volz quality, appropriate 100m rating). If cost matters, the Savox does the physical job for a tenth of the price.

---

### 4.6 Telemetry (MAVLink / GCS Link)

| Rank | Model | Manufacturer | Country | Price | Notes |
|---|---|---|---|---|---|
| #1 ★ | P900 (Microhard Pico core) | Holybro / Microhard | 🇨🇦🇨🇳 Canada/China | $229/unit | 900MHz, 1W, 60km, mesh capable, AES encryption. |
| #2 | XBee SX 900 | Digi International | 🇺🇸 USA | ~$269/unit | 65-mile range, DigiMesh self-healing, AES+FEC. US-made. |
| #3 | RFD900x | RFDesign | 🇦🇺 Australia | $315–376 (pair) | 40km, SiK MAVLink native. Community gold standard. |

---

### 4.7 RC Link (Manual Override)

| Rank | Model | Manufacturer | Country | Price | Notes |
|---|---|---|---|---|---|
| #1 ★ | Crossfire Nano RX + TX Module | Team BlackSheep | 🇨🇭 Switzerland | TX $120 + RX $25 = $145 total | 900MHz, 100km+ range, CRSF native in ArduPilot. Swiss-made. |
| #2 | Duplex DS-24 II | JETI Model | 🇨🇿 Czech Republic | ~$2,855 complete | 2.4GHz + 900MHz auto-fallback. Production-grade for dense harbour RF. |
| #3 | ExpressLRS EP2 RX + RadioMaster TX | Open source / RadioMaster | 🌐 | $60–100 total | Open source, 900MHz, 30–50km. Budget option. |

---

### 4.8 FPV / Observation Cameras

#### Navigation Camera (always-on, forward-facing)

| Rank | Model | Sensor | Price | Notes |
|---|---|---|---|---|
| #1 ★ | RunCam Night Eagle 3 | Sony STARVIS IMX462 | $40–48 | 0.00001 lux. Best low-light FPV camera available. |
| #2 | Foxeer Razer Micro Pro | Sony STARVIS 2 IMX585 | $45–55 | Newer sensor, better HDR. |
| #3 | Foxeer Micro Toothless 2 Starlight | Sony Starlight | $40–48 | Fallback option. |

#### Observation Camera (PTZ, independent of boat heading)

| Rank | Model | Manufacturer | Price | Notes |
|---|---|---|---|---|
| #1 ★ | MK15 + ZT30 Gimbal | SIYI Technology | ~$2,200–2,900 | 15km range, 4K + thermal + 30× optical + 1200m laser rangefinder. QGroundControl on MK15 touchscreen. |
| #2 | A8 Mini | SIYI Technology | $350–420 | 4K, 8× optical, IP67, 3-axis stabilised. |
| #3 | DS-2DE4A425IWG-E | Hikvision | $180–250 | 25× optical, IP66, RTSP stream. Budget option. |

---

### 4.9 Power / BMS

| Rank | Model | Manufacturer | Country | Price | Notes |
|---|---|---|---|---|---|
| #1 ★ | REC 2Q 16S BMS Kit | REC d.o.o. | 🇸🇮 Slovenia | $795 | Marine gold standard. Cell-level monitoring, Victron VE.Can native, Wi-Fi. |
| #2 | Smart BMS 500A + Cerbo GX MK2 | Victron Energy | 🇳🇱 Netherlands | ~$350 + $275 | Dutch marine standard, NMEA 2000, VRM cloud monitoring. |
| #3 | JK BMS | JIKONG | 🇨🇳 China | $60–100 | Active balancing, Bluetooth. Budget prototyping option. |

---

### 4.10 Battery

| Rank | Model | Chemistry | Price | Notes |
|---|---|---|---|---|
| #1 ★ | Tattu Plus 6S 22Ah | LiPo | $280–320 | Most trusted LiPo in professional USV builds. Commercial ready-made. |
| #2 | LiFePO4 24V 50Ah (commercial pack) | LiFePO4 | $350–600 | Safer chemistry, 3,000+ cycles. 25.6V nominal matches Torqeedo directly. |
| #3 | Custom LiFePO4 (CATL/EVE cells) | LiFePO4 | $600–900 | Production use only — requires assembly facilities and expertise. |

---

### 4.11 Sensors

| Component | Model | Manufacturer | Price | Notes |
|---|---|---|---|---|
| Long-range detection | Quantum 2 Doppler Radar | Raymarine 🇬🇧 | $1,200–1,500 | 24nm range, microwave — unaffected by spray/fog/dark. Ethernet to companion. |
| Close-range (forward) | Ping2 Sonar | Blue Robotics 🇺🇸 | $279 | Horizontal mount. 0.5–50m collision avoidance. IP68. ArduPilot native. |
| Depth (downward) | Ping2 Sonar | Blue Robotics 🇺🇸 | $279 | Downward mount. Prevents grounding. Same unit, different orientation. |
| AIS receiver | dAISy 2+ | Wegmatt LLC 🇺🇸 | $59–75 | Receives all commercial vessel traffic within 20–30nm. NMEA 0183. |
| Hull safety | Bilge float switch + DS18B20 | Generic / Maxim | ~$10–20 | Float switch triggers RTH on flooding. Temp probe monitors motor bay. |

> **Note on LiDAR:** IR LiDAR (905nm) was removed — specular reflection off calm water and scatter from chop make it unreliable as a marine proximity sensor. Sonar (acoustic) is the correct technology for surface vehicles.

---

### 4.12 Companion Computer

| Rank | Model | Manufacturer | Country | Price | Notes |
|---|---|---|---|---|---|
| #1 ★ | Raspberry Pi CM4 (8GB/32GB eMMC) | Raspberry Pi Foundation | 🇬🇧 UK | $75–95 | UK-made. ArduPilot MAVProxy native. BlueOS runs on CM4. Most documented USV companion. |
| #2 | Jetson Orin NX 8GB | NVIDIA | 🇺🇸 USA | $500–600 | 40 TOPS NPU. Only if AI-based obstacle avoidance or object detection is required. |
| #3 | Orange Pi 5 (8GB) | Shenzhen Xunlong | 🇨🇳 China | $60–80 | Budget fallback when CM4 stock is unavailable. |

---

### 4.13 Hull

| Rank | Model | Price | Notes |
|---|---|---|---|
| #1 ★ | Custom GRP catamaran (2–3.5m) | $1,000–2,500 | Best performance. Geometry optimised for exact AUW. Integrated electronics bay and payload hardpoints. |
| #2 | Graupner Boat Hull Kit (modified) | $300–600 | German GRP kit. Fastest path to a physical hull for prototyping. Requires modification. |
| #3 | Foam-core glass sandwich (self-build) | $200–500 materials | Fully custom geometry, lowest cost. Requires fabrication skill. |

---

## 5. Supply Chain Risk Summary

| Region | Components | Risk | Mitigation |
|---|---|---|---|
| 🇨🇳 China | Motors, ESCs, cameras, batteries, low-cost GPS | HIGH — 60–70% of BOM by unit count | Dual-qualify Western alternatives. 90-day buffer stock. |
| 🇪🇺 Western Europe | GNSS (Septentrio, Emlid, ArduSimple), Power (Victron, REC), LTE (Teltonika) | LOW | Multiple vendors, stable supply, strong EU industrial base. |
| 🇬🇧 UK/HK | Autopilot (CubePilot/HEX), FPV (Herelink) | MEDIUM | HK component adds geopolitical exposure. Dual-qualify Holybro. |
| 🇦🇺 Australia | RFD900x (RFDesign) | MEDIUM | Single-source risk. Qualify Microhard (Canada) as backup. |
| 🇨🇭 Switzerland | TBS Crossfire (Team BlackSheep) | LOW | ExpressLRS open-source is zero-cost alternative. |
| 🇺🇸 USA | Blue Robotics, Castle Creations, NVIDIA | LOW | Strong industrial base. Export-friendly. |

---

## 6. Competitor Landscape

| Platform | Manufacturer | Country | Price | Speed | Payload | ArduPilot | FPV |
|---|---|---|---|---|---|---|---|
| **Your Build** | Apollyon Dynamics | 🌐 Custom | ~$6K–9.5K | 20–35 km/h | 15–20 kg + drop | ✅ Yes | ✅ Yes |
| BlueBoat | Blue Robotics | 🇺🇸 USA | ~$5,149 | ~5 km/h | 15 kg | ✅ Yes (ArduRover) | ❌ Not standard |
| SL20 | Ocean Alpha | 🇨🇳 China | Quote only | 8 knots | 10 kg | ❌ Proprietary | ❌ |
| Otter USV | Maritime Robotics | 🇳🇴 Norway | $30K–50K | ~6 km/h | 20 kg | ❌ Proprietary | Optional |
| Heron USV | Clearpath Robotics | 🇨🇦 Canada | $15K–25K | ~5 km/h | 10 kg | ❌ ROS | Optional |
| ME120 | Ocean Alpha | 🇨🇳 China | $8K–15K | ~8 km/h | 30 kg | ❌ Proprietary | Optional |
| Corsair ASV | Saronic Technologies | 🇺🇸 USA | ~$400K | — | 454 kg | ❌ | ✅ |
| Saildrone Explorer | Saildrone | 🇺🇸 USA | ~$2,500/day | ~3 knots | Sensor suite | ❌ | ✅ |
| MANTAS T12 | MARTAC | 🇺🇸 USA | $200K+ | 30+ knots | 64 kg | ❌ | ✅ |
| Inspector MK2 | Exail (prev. ECA Group) | 🇫🇷 France | $150K+ | ~15 km/h | 200 kg+ | ❌ | ✅ |

**Your competitive advantage:** Only build in the sub-$10K tier with native ArduPilot, FPV, RF manual override, and a payload drop mechanism.

---

## 7. Vendor Contact Status

| Vendor | Contact | Status |
|---|---|---|
| Septentrio | sales@septentrio.com | Contact to request applications engineering call — they support industrial USV projects |
| Emlid | support@emlid.com | Contact for partner pricing on Reach M2 |
| RFDesign | sales@rfdesign.com.au | Contact for RFD900x evaluation units |
| **Lehner Motoren** | Andreas (contacted) | **Email sent June 2026** — awaiting reply on 2280 winding recommendation for marine sprint motor |
| Torqeedo | torqeedo.com | Cruise 3.0 R in production. Cruise 2.0 RS discontinued — vendor located, confirm stock. |

### Lehner Email Sent (June 2026)

Specs provided to Lehner for the 2280 sprint motor:

- **Application:** Sprint motor on autonomous catamaran USV, ~50 kg AUW, saltwater, alongside 2× Torqeedo Cruise 3.0 R cruise motors
- **Voltage:** 24V (6S LiPo, 22.2V nominal) — open to 8S/10S
- **Target RPM:** 3,000–5,000 RPM at prop shaft, direct drive
- **Power:** 2–3 kW continuous / 4–5 kW burst for 60–120 seconds
- **Cooling:** Water cooled, hull-mounted, saltwater environment
- **Run time:** 5–7 minutes per sortie, otherwise idle; burst phase 60–120 seconds
- **Volume inquiry:** Initial 15–30 units → 500–1,000 → 3,000–5,000

---

## 8. Key Technical Communities for Research

| Community | URL | Best For |
|---|---|---|
| ArduPilot Forum — Rover/ArduBoat | discuss.ardupilot.org | Autopilot config, boat-specific parameters, motor tuning |
| ArduPilot Discord (#boats) | discord.gg/ardupilot | Real-time firmware help (16,305 members) |
| Blue Robotics Forum | discuss.bluerobotics.com | BlueBoat builds, closest commercial reference |
| ExpressLRS Discord | discord.gg/expresslrs | RC link setup (34,380 members) |
| WFB-NG Telegram | t.me/wfb_ng | Long-range HD FPV video |
| Hackaday.io | hackaday.io | Complete build logs with photos and part lists |
| rctestflight (YouTube) | YouTube | Best channel for ArduRover boat missions — watch full boat playlist in order |
| Intlwaters | intlwaters.com | RC boat racing community — propulsion expertise (Lehner motors discussed here) |

---

## 9. Open Decisions & Next Steps

| Item | Status | Action Required |
|---|---|---|
| Servo spec | ⚠ Open | Decide: DA-26-SUB (defence story) vs DA-22-SUB (right-sized Volz) vs Savox SB-2290SG (cost) |
| Sprint motor | ⏳ Pending | Awaiting Lehner reply on 2280 winding recommendation |
| Motor choice | ⚠ Open | Cruise 3.0 R (~$8,720/pair) vs Cruise 2.0 RS (~$1,500–1,800/pair from vendor) — confirm vendor stock |
| Sprint motor voltage | ⚠ Open | Confirm battery voltage for Lehner: 24V (6S) / 29.6V (8S) / 37V (10S) |
| Payload drop mechanism | ⚠ Open | Confirm payload drop is still a requirement before finalising servo spec |
| Hull fabrication | ⚠ Open | Engage local marine composites fabricator for custom GRP catamaran |
| Lehner volume quote | ⏳ Pending | Await Lehner reply confirming 15–30 / 500–1,000 / 3,000–5,000 unit capability |
| Torqeedo RS-485 wiring | 📋 Noted | Source UART-to-RS-485 level shifter per motor before integration |
| Torqeedo fusing | 📋 Noted | 100A blade fuse or circuit breaker per motor power cable — mandatory |

---

## 10. Budget Estimate (Current BOM State)

| Subsystem | Budget Option | Professional Option |
|---|---|---|
| Autopilot | $180 (Pixhawk 6X) | $404 (Cube Orange+) |
| GNSS (mosaic-go H) | — | ~$1,630 |
| Motors (pair) | $1,500–1,800 (Cruise 2.0 RS) | $8,720 (Cruise 3.0 R) |
| Telemetry | $315 (RFD900x pair) | $458 (2× P900) |
| RC link | $95 (ELRS) | $145 (TBS Crossfire) |
| Observation camera | $180 (Hikvision PTZ) | $2,900 (SIYI MK15+ZT30) |
| Navigation camera | $40 (RunCam Night Eagle 3) | $48 |
| Power / BMS | $60 (JK BMS) | $795 (REC 2Q) |
| Battery | $280 (Tattu 6S 22Ah) | $600 (LiFePO4 pack) |
| Sensors (radar + sonar + AIS) | — | ~$1,900 |
| Companion computer | $60 (Orange Pi 5) | $95 (RPi CM4) |
| Hull | $200–500 (self-build) | $1,000–2,500 (custom GRP) |
| Wiring, enclosures, connectors | $200 | $300 |
| **Total estimate** | **~$3,110–3,610** | **~$19,095** |

> Note: The professional build total is significantly higher than the original $3,500–5,500 estimate, primarily due to the Torqeedo Cruise 3.0 R motors ($8,720) and the SIYI observation camera system ($2,900). The Cruise 2.0 RS vendor source, if confirmed, brings the professional build down to approximately $11,000–13,000.

---

*Document generated from Apollyon Dynamics project session — June 2026*
*React app data files: `src/data/bom.js`, `src/data/competitors.js`, `src/data/supplyChain.js`, `src/data/productLinks.js`*
