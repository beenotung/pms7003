# pms7003 prototype project

## arduino IDE setup
1. in preference, add Boards manager link
http://arduino.esp8266.com/stable/package_esp8266com_index.json
(wait for a while)

2. in board manager, install for esp8266

(1. and 2. failed)

3. install the board manager from git
```bash
## download main
cd /usr/share/arduino
cd hardware
mkdir esp8266com
cd esp8266com
git clone https://github.com/esp8266/Arduino.git esp8266
## download deps
cd esp8266/tools
python get.py
```
