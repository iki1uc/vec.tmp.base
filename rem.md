REM Als Admin CMD

REM R:\ = RAM als Scratch = M2 sauber
mkdir R:\bio.tel\fix
mkdir S:\bio.tel\fix

REM 1. Shadow Copy anlegen = laufendes System einfrieren ohne zu stoppen
vssadmin create shadow /for=C:

REM 2. Dism Capture = komplett frei = kein Key
dism /Capture-Image /ImageFile:S:\bio.tel\fix\laufendes_system.wim /CaptureDir:C:\ /Name:"S=20658_H72_B48_T36" /Compress:max /CheckIntegrity /Verify /ScratchDir:R:\bio.tel\fix

REM Ergebnis: S:\bio.tel\fix\laufendes_system.wim = dein laufendes C: als WIM
REM Größe: ~50% von C: = wenn C: 15GB = WIM ~7GB = passt in S: 20GB

REM 3. WIM zu VMDK für VMware = qemu-img GPL = frei
qemu-img convert -f wim -O vmdk S:\bio.tel\fix\laufendes_system.wim S:\bio.tel\fix\laufendes_system_20GB.vmdk
REM oder VHD für Ventoy/PE:
qemu-img convert -f wim -O vpc S:\bio.tel\fix\laufendes_system.wim S:\bio.tel\fix\laufendes_system_20GB.vhd
