// Central registry of all product links.
// key: exact model name string used across the app
// info: official product/info page
// buy: primary purchase URL
// buy2: secondary purchase URL (optional)
// datasheet: datasheet/manual URL (optional)

export const productLinks = {
  // ── AUTOPILOTS ────────────────────────────────────────
  'Cube Red Pro': {
    info: 'https://docs.cubepilot.org/user-guides/autopilot/the-cube-red',
    buy: 'https://irlock.com/products/cube-red-standard-set-beta-version',
    buy2: 'https://nwblue.com/products/cube-red-pro-standard-set',
  },
  'Cube Orange+': {
    info: 'https://docs.cubepilot.org/user-guides/autopilot/the-cube-module-overview',
    buy: 'https://cubepilot.org/shop',
    buy2: 'https://unmannedtechshop.co.uk/product/cube-orange/',
  },
  'Control Zero H7 OEM': {
    info: 'https://mrobotics.io/docs/control-zero-oem-h7/',
    buy: 'https://store.3dr.com/control-zero-h7-oem/',
  },
  'Pixhawk 6X': {
    info: 'https://holybro.com/products/pixhawk-6x',
    buy: 'https://holybro.com/products/pixhawk-6x',
  },
  'Pixhawk 6C Mini': {
    info: 'https://holybro.com/products/pixhawk-6c-mini',
    buy: 'https://holybro.com/products/pixhawk-6c-mini',
  },
  'Auterion Skynode S': {
    info: 'https://auterion.com/product/skynode-s/',
    buy: 'https://auterion.com/product/skynode-s/',
  },

  // ── SERVOS ────────────────────────────────────────────
  'DA-26-SUB': {
    info: 'https://www.volz-servos.com/actuators/detail/da-26-sub/',
    buy: 'https://www.unmannedsystemssource.com/shop/servos/volz/',
    datasheet: 'https://www.volz-servos.com/fileadmin/user_upload/pdf/Volz_Servos_Product_Overview.pdf',
  },
  'DA-22-SUB': {
    info: 'https://www.volz-servos.com/actuators/detail/da-22-sub/',
    buy: 'https://www.unmannedsystemssource.com/shop/servos/volz/',
    datasheet: 'https://www.volz-servos.com/fileadmin/user_upload/pdf/Volz_Servos_Product_Overview.pdf',
  },
  'DA-22 Series': {
    info: 'https://www.volz-servos.com/actuators/',
    buy: 'https://www.unmannedsystemssource.com/shop/servos/volz/da-22-12-2615-51mm-volz-servo/',
    datasheet: 'https://www.volz-servos.com/fileadmin/user_upload/pdf/Volz_Servos_Product_Overview.pdf',
  },
  'SB-2290SG Black Edition': {
    info: 'https://www.savox.com/product/sb-2290sg/',
    buy: 'https://www.altitudehobbies.com/products/savox-sb2290sg-monster-torque-brushless-servo-black-edition',
    buy2: 'https://www.amainhobbies.com/savox-sb-2290sg-black-edition/p536890',
  },
  'SB-2273SG': {
    info: 'https://www.savox.com/product/sb-2273sg/',
    buy: 'https://www.altitudehobbies.com/collections/savox-servos',
  },
  'XM430-W350-T': {
    info: 'https://emanual.robotis.com/docs/en/dxl/x/xm430-w350/',
    buy: 'https://www.robotis.us/dynamixel-xm430-w350-t/',
    buy2: 'https://www.robotshop.com/products/robotis-dynamixel-xm430-w350-t-smart-servo-actuator',
  },
  'HS-5086WP': {
    info: 'https://hitecrcd.com/products/servos/micro-mini-1-9-sub-micro/hs-5086wp-ultra-nano-waterproof-servo/product',
    buy: 'https://www.rc-electronics.eu/hitec-hs-5086wp',
  },

  // ── ESCs ─────────────────────────────────────────────
  '200F3[X] v2': {
    info: 'https://powerdrives.net/f-series',
    buy: 'https://powerdrives.net/f-series',
    buy2: 'https://www.getfpv.com/apd-f-series-200f3-x-14s-200a-60v-32-bit-esc.html',
  },
  'APD 200F3': {
    info: 'https://powerdrives.net/f-series',
    buy: 'https://powerdrives.net/f-series',
  },
  'Myxa AD0505D': {
    info: 'https://zubax.com/products/myxa',
    buy: 'https://shop.zubax.com/products/zubax-myxa',
    buy2: 'https://cyphal.store/products/zubax-myxa',
  },
  'Zubax Myxa': {
    info: 'https://zubax.com/products/myxa',
    buy: 'https://shop.zubax.com/products/zubax-myxa',
  },
  'SeaKing 130A V3': {
    info: 'https://www.hobbywing.com/goods.php?id=474',
    buy: 'https://www.hobbywing.com/goods.php?id=474',
    buy2: 'https://www.aliexpress.com/w/wholesale-hobbywing-seaking-130a.html',
  },
  'VESC 75/300 MKIV': {
    info: 'https://trampaboards.com/vesc-75v-300a--16s-c-1432.html',
    buy: 'https://trampaboards.com/vesc-75v-300a--16s-c-1432.html',
  },
  'FSESC 75200': {
    info: 'https://flipsky.net/products/fsesc75200',
    buy: 'https://flipsky.net/products/fsesc75200',
  },
  'Mamba Monster X 8S': {
    info: 'https://www.castlecreations.com/en/car-truck/mamba-monster-x',
    buy: 'https://www.castlecreations.com/en/car-truck/mamba-monster-x',
  },

  // ── CAMERAS ANALOG ────────────────────────────────────
  'Micro Toothless 2 Starlight': {
    info: 'https://www.foxeer.com/foxeer-micro-toothless-2-fov-switchable-fpv-starlight-camera-1-2-sensor-super-hdr-g-281',
    buy: 'https://www.foxeer.com/foxeer-micro-toothless-2-fov-switchable-fpv-starlight-camera-1-2-sensor-super-hdr-g-281',
    buy2: 'https://www.racedayquads.com/products/foxeer-toothless-2-micro-1200tvl-16-9-4-3-pal-nstc-cmos-switchable-fov-fpv-starlight-camera-w-m12-lens-and-1-2-sensor-1-7mm-choose-your-color',
  },
  'Eagle 3': {
    info: 'https://www.runcam.com/eagle3/',
    buy: 'https://www.getfpv.com/runcam-eagle-3-fpv-camera.html',
    buy2: 'https://www.runcam.com/eagle3/',
  },
  'Phoenix 2 Micro': {
    info: 'https://www.runcam.com/phoenix2micro/',
    buy: 'https://www.runcam.com/phoenix2micro/',
    buy2: 'https://www.getfpv.com/runcam-phoenix-2-micro-fpv-camera.html',
  },
  'Predator V2': {
    info: 'https://www.foxeer.com/foxeer-predator-v2-fpv-racing-camera-g-76',
    buy: 'https://www.foxeer.com/foxeer-predator-v2-fpv-racing-camera-g-76',
  },

  // ── CAMERAS DIGITAL ───────────────────────────────────
  'MK15 + ZT30 Gimbal': {
    info: 'https://shop.siyi.biz/collections/video-link',
    buy: 'https://shop.siyi.biz',
  },
  'SIYI MK15': {
    info: 'https://shop.siyi.biz/products/siyi-mk15',
    buy: 'https://shop.siyi.biz/products/siyi-mk15',
  },
  'SIYI ZT30': {
    info: 'https://shop.siyi.biz/products/zt30',
    buy: 'https://shop.siyi.biz/products/zt30',
  },
  'Herelink 1.1': {
    info: 'https://docs.cubepilot.org/user-guides/herelink/herelink-overview',
    buy: 'https://irlock.com/products/herelink-hd-video-transmission-system-_',
    buy2: 'https://nwblue.com/products/herelink',
  },
  'Avatar HD Mini': {
    info: 'https://www.caddxfpv.com/products/walksnail-avatar-hd-mini-vtx-kit',
    buy: 'https://www.caddxfpv.com/products/walksnail-avatar-hd-mini-vtx-kit',
    buy2: 'https://www.getfpv.com/caddx-walksnail-avatar-hd-mini-vtx.html',
  },
  'HDZero Race V3': {
    info: 'https://www.hdzero.com/product/hdzero-race-v3/',
    buy: 'https://www.hdzero.com/product/hdzero-race-v3/',
    buy2: 'https://www.getfpv.com/hdzero-race-v3-vtx.html',
  },
  'Avatar HD Pro Kit (Dual Antenna)': {
    info: 'https://www.caddxfpv.com/products/walksnail-avatar-hd-pro-kit-dual-antenna',
    buy: 'https://www.caddxfpv.com/products/walksnail-avatar-hd-pro-kit-dual-antenna',
    buy2: 'https://www.team-blacksheep.com/products/product:7421',
  },
  'O3 Air Unit': {
    info: 'https://www.dji.com/o3-air-unit',
    buy: 'https://store.dji.com/product/dji-o3-air-unit',
  },

  // ── GPS / GNSS ────────────────────────────────────────
  'mosaic-go H': {
    info: 'https://www.septentrio.com/en/products/gnss-receivers/gnss-receiver-modules/mosaic-go',
    buy: 'https://shop.septentrio.com/en/shop/mosaic-go',
    buy2: 'https://gnss.store/septentrio-gnss-modules/',
  },
  'mosaic-X5 via simpleRTK3B': {
    info: 'https://www.septentrio.com/en/products/gnss-receivers/gnss-receiver-modules/mosaic-x5',
    buy: 'https://www.ardusimple.com/product/simplertk3b-basic-starter-kit/',
    buy2: 'https://gnss.store/septentrio-gnss-modules/357-elt0727.html',
  },
  'Septentrio mosaic-X5': {
    info: 'https://www.septentrio.com/en/products/gnss-receivers/gnss-receiver-modules/mosaic-x5',
    buy: 'https://shop.septentrio.com/en/shop/mosaic-x5-devkit',
  },
  'Reach M2': {
    info: 'https://emlid.com/reachm2/',
    buy: 'https://emlid.com/reachm2/',
    datasheet: 'https://docs.emlid.com/reachm2/',
  },
  'OEM7600': {
    info: 'https://novatel.com/products/receivers/gnss-gps-receiver-boards/oem7600',
    buy: 'https://canalgeomatics.com/products/novatel-oem7600-dual-frequency-gnss-receiver/',
    buy2: 'https://www.navtechgps.com/oem7600_dual_frequency_gnss_receiver/',
  },
  'Here 4': {
    info: 'https://docs.cubepilot.org/user-guides/here-4/here-4-manual',
    buy: 'https://cubepilot.org/shop',
    buy2: 'https://unmannedtechshop.co.uk/product/here4/',
  },
  'simpleRTK2B': {
    info: 'https://www.ardusimple.com/product/simplertk2b/',
    buy: 'https://www.ardusimple.com/product/simplertk2b/',
  },

  // ── TELEMETRY ─────────────────────────────────────────
  'P900 (Microhard Pico core)': {
    info: 'https://holybro.com/products/microhard-telemetry-radio-v2',
    buy: 'https://holybro.com/products/microhard-telemetry-radio-v2',
    buy2: 'https://unmannedrc.com/products/microhard-telemetry-radio-v2',
  },
  'RFD900x': {
    info: 'https://rfdesign.com.au/products/rfd900x/',
    buy: 'https://rfdesign.com.au/products/rfd900x/',
    datasheet: 'https://rfdesign.com.au/docs/RFD900x%20DataSheet.pdf',
  },
  'XBee SX 900': {
    info: 'https://www.digi.com/products/embedded-systems/digi-xbee/rf-modules/sub-1-ghz-rf-modules/xbee-sx-900',
    buy: 'https://www.digikey.com/en/product-highlight/d/digi-intl/xbee-xbee-pro-sx-rf-modules',
    buy2: 'https://www.digi.com/products/embedded-systems/digi-xbee/rf-modules/sub-1-ghz-rf-modules/xbee-sx-900',
  },
  'Silvus SC4200': {
    info: 'https://silvustechnologies.com/products/streamcaster-4200-enhanced-plus/',
    buy: 'https://silvustechnologies.com/contact/',
  },

  // ── RC LINKS ──────────────────────────────────────────
  'Duplex DS-24 II': {
    info: 'https://www.jetimodel.com/en/Catalogue/Transmitters/DS-24/',
    buy: 'https://hackermotors.us/product/jeti-duplex-ds-24-ii-gray-lacquer/',
    buy2: 'https://www.espritmodel.com/jeti-duplex-radio-systems-ds-24-2-4ghz-900mhz-line.aspx',
  },
  'T18SZ + R7008SB': {
    info: 'https://futabausa.com/product/18sz/',
    buy: 'https://futabausa.com/product/18sz/',
    buy2: 'https://www.altitudehobbies.com/collections/futaba-transmitters',
  },
  'Crossfire Nano RX + TX': {
    info: 'https://www.team-blacksheep.com/products/product:396',
    buy: 'https://www.team-blacksheep.com/products/product:396',
  },
  'TBS Crossfire': {
    info: 'https://www.team-blacksheep.com/tbs-crossfire',
    buy: 'https://www.team-blacksheep.com/products/product:396',
  },
  'ExpressLRS EP2 RX': {
    info: 'https://www.expresslrs.org/',
    buy: 'https://www.radiomasterrc.com/collections/expresslrs',
    buy2: 'https://www.drone-parts.eu',
  },

  // ── MOTORS ───────────────────────────────────────────
  'Cruise 3.0 R (×2)': {
    info: 'https://www.torqeedo.com/us/en-us/products/outboards/cruise/cruise-3.0-r/M-1260-00.html',
    buy: 'https://www.torqeedo.com/us/en-us/products/outboards/cruise/cruise-3.0-r/M-1260-00.html',
    buy2: 'https://greenboatsolutions.com/shop/motor/outboard/torqeedo-cruise-3-0-r',
  },
  'Torqeedo Cruise 3.0 R': {
    info: 'https://www.torqeedo.com/us/en-us/products/outboards/cruise/cruise-3.0-r/M-1260-00.html',
    buy: 'https://www.torqeedo.com/us/en-us/products/outboards/cruise/cruise-3.0-r/M-1260-00.html',
  },
  'Cruise 2.0 RS (×2)': {
    info: 'https://www.torqeedo.com/us/en-us/products/outboards/cruise',
    buy: 'https://www.torqeedo.com/us/en-us/products/outboards/cruise',
  },
  'A50-16S (sprint motor)': {
    info: 'https://www.hacker-motor.com/en/a50-series/',
    buy: 'https://www.hacker-motor.com/en/a50-series/',
    buy2: 'https://hackermotors.us/',
  },
  'Hacker A50-16S': {
    info: 'https://www.hacker-motor.com/en/a50-series/',
    buy: 'https://www.hacker-motor.com/en/a50-series/',
  },
  'MT65162 130KV': {
    info: 'https://maytech.cn/products/flipsky-65161',
    buy: 'https://maytech.cn/',
    buy2: 'https://www.aliexpress.com/w/wholesale-maytech-65162.html',
  },
  'T500 Thruster': {
    info: 'https://bluerobotics.com/store/thrusters/t100-t200-thrusters/t500-thruster/',
    buy: 'https://bluerobotics.com/store/thrusters/t100-t200-thrusters/t500-thruster/',
    datasheet: 'https://bluerobotics.com/learn/t500-thruster-documentation/',
  },
  '65161 Sensored 120KV': {
    info: 'https://flipsky.net/products/65161-sensored-brushless-motor',
    buy: 'https://flipsky.net/products/65161-sensored-brushless-motor',
  },

  // ── POWER / BMS ───────────────────────────────────────
  'REC 2Q 16S BMS Kit': {
    info: 'https://www.rec-bms.com/rec-battery-management-system/',
    buy: 'https://ogm-energy.com/products/rec-2q-series-16s-bms-kit',
    buy2: 'https://www.rec-bms.com',
    datasheet: 'https://www.rec-bms.com/datasheet/UserManual_REC_2Q_BMS.pdf',
  },
  'Lynx Smart BMS 1000 + Cerbo GX MK2': {
    info: 'https://www.victronenergy.com/battery-monitors/lynx-smart-bms',
    buy: 'https://nvnmarine.com/products/112966-victron-lynx-smart-bms-1000-battery-management',
    buy2: 'https://www.victronenergy.com/where-to-buy',
  },
  'PL-200 Power Module': {
    info: 'https://www.mauch-electronic.com/power-module/',
    buy: 'https://www.mauch-electronic.com/power-module/',
  },
  'SmartShunt 500A': {
    info: 'https://www.victronenergy.com/battery-monitors/smart-battery-shunt',
    buy: 'https://www.victronenergy.com/where-to-buy',
  },

  // ── COMPETITOR PLATFORMS ──────────────────────────────
  'BlueBoat': {
    info: 'https://bluerobotics.com/store/boat/blueboat/',
    buy: 'https://bluerobotics.com/store/boat/blueboat/',
  },
  'Otter USV': {
    info: 'https://maritimerobotics.com/otter/',
    buy: 'https://maritimerobotics.com/contact/',
  },
  'Heron USV': {
    info: 'https://clearpathrobotics.com/heron-unmanned-surface-vessel/',
    buy: 'https://clearpathrobotics.com/contact/',
  },
  'ME120': {
    info: 'https://www.oceanalpha.com/product/usv/me120/',
    buy: 'https://www.oceanalpha.com/contact/',
  },
  'C-Worker 4': {
    info: 'https://www.asv-global.com/platforms/c-worker-4/',
    buy: 'https://www.asv-global.com/contact/',
  },
  'Inspector MK2': {
    info: 'https://www.ecagroup.com/en/solutions/inspector-mk2-usv',
    buy: 'https://www.ecagroup.com/en/contact',
  },
  'MANTAS T12': {
    info: 'https://martac.us/mantas/',
    buy: 'https://martac.us/contact/',
  },
};
