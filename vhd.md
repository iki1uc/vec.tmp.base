REM disk2vhd64.exe = frei = kein Installer = nur exe
REM Download: https://live.sysinternals.com/disk2vhd64.exe

disk2vhd64.exe C: S:\bio.tel\fix\laufendes_system_live.vhdx

REM Danach VHDX zu VMDK:
qemu-img convert -f vhdx -O vmdk S:\bio.tel\fix\laufendes_system_live.vhdx S:\bio.tel\fix\laufendes_system_live_20GB.vmdk
