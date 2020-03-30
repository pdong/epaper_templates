import React from 'react'
import MemoizedFontAwesomeIcon from '../util/MemoizedFontAwesomeIcon'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

export default {
  "display.display_type": {
    "ui:help": "Model of the e-paper display you're using"
  },
  "display.windowed_updates": {
    "ui:help":
      "When enabled, update partial regions of the screen.  Only enable this if your display does not support partial updates.",
    transformer: x => x.toLowerCase() === "true"
  },
  "mqtt.password": {
    "ui:widget": "password"
  },
  "web.admin_password": {
    "ui:widget": "password"
  },
  "network.wifi_password": {
    "ui:widget": "password"
  },
  "hardware.busy_pin": {
    transformer: parseInt
  },
  "hardware.dc_pin": {
    transformer: parseInt
  },
  "hardware.rst_pin": {
    transformer: parseInt
  },
  "hardware.spi_bus": {
    "ui:help": <>
    <div>
      SPI bus to use.  HSPI uses GPIOs 12, 14, 15.  VSPI uses 5, 18, 19.  See README for more details.
    </div>
    <div>
      <MemoizedFontAwesomeIcon icon={faExclamationTriangle} className="text-warning fa-fw mr-1" />
      <b>Changing this setting requires a reboot!</b>
    </div>
    </>
  },
  "web.port": {
    transformer: parseInt
  },
};