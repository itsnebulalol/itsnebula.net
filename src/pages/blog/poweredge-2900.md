---
layout: ../../layouts/BlogPost.astro
title: PowerEdge 2900 Adventures
author: Nebula
twitter: itsnebulalol
description: 2004 hardware is painful to work with in 2023.
date: 2023-05-01
--- 

The Dell PowerEdge 2900 is a Dell server from 2006. I was able to get my hands on one for free. The motherboard PCIE was broken, so I had to spend $20 (+ $20 shipping/tax) on a new motherboard from eBay, but it was worth it since it came with 2 CPUs and 16 GB of RAM.

## First fixes

Before placing the new motherboard in, the system wouldn't get to the "strike F1 to continue" text, and would fail with a PCIE error. I wasn't completely sure if the motherboard was the issue, but the seller takes returns, so I gave it a shot.

The motherboard did fix the issue, and was able to boot past the initial post.

## No UEFI

I had a Ventoy USB I intended on booting to install Debian. All I got was an "isolinux.bin not found or corrupted" error, so I did a quick search and found out that the system does not support UEFI. Even after recreating the Ventoy USB as MBR, it would get stuck at the text VT and not move on. Ventoy is out of the question here, I guess.

## Windows

I noticed that Windows Server 2012 R2 was an [officially supported operating system](https://www.dell.com/support/home/en-us/drivers/supportedos/poweredge-2900), so I used Rufus in a Windows VM on my Linux machine to create an MBR + legacy BIOS boot USB with the Windows Server 2012 R2 ISO.

To my surprise, this booted and installed fine! Finally, a usable operating system on this. This was also the first time I used something "based on" Windows 8. I was also able to update to BIOS version 2.7.0, since it was on 2.3.x before.

I wanted to push the limits of this machine and install Windows 10 Pro (22H2). This also installed, and booted fine. After running [a debloat script](https://github.com/Sycnex/Windows10Debloater), the system ran great. I went ahead and installed WSL 2 for Docker... atleast I tried. Turns out that this system/CPU does not support SLAT, which is required for WSL 2, and VMWare. Windows without WSL is absolutely useless for a server in 2023.

## Ubuntu Server

So I figured I'd try and make an Ubuntu Server 20.04.6 USB the same way I made the Windows ones. There was someone that's [using Ubuntu Server 20.04 on a PE2900](https://www.dell.com/community/Rack-Servers/Dell-PowerEdge-2900-Server-upgrading-BIOS-amp-Firmware-without/td-p/7709553), so I figured I'd try that.

The installer booted fine, but there was one issue, there's no UEFI. However, if you go to the shell in the help menu, you can run `cfdisk -z` and choose "dos", then write to disk. After going to the partition menu again, you can now create an MS-DOS partition, which is what we want.

The install went perfectly fine, however there was an issue. For some reason, the BIOS/boot picker does not care about the MBR. In my experience, only bootable Windows installs would show in the boot picker, making Linux unbootable.

## The hackiest fix

The only way I was able to get Linux booted was to boot it through Windows. Here's how it goes:

1. Install Windows 10 normally
2. Run a debloat script and install [EasyBSD](https://neosmart.net/EasyBCD/), we don't need it yet
3. Shrink the Windows partition to about 50 GB, or less if you can. We don't really care about Windows
4. Create a new partition in the empty space, formatted as whatever, I went with NTFS, take note of the size
5. Boot the Ubuntu Server installer, or whatever distro you want
6. Choose custom partition layout
7. Choose the new partition, format as ext4, and choose mount to `/`
8. Finish the install
9. On reboot, you'll notice how Windows still boots
    - This is what I mean about the BIOS/boot picker does not care about the MBR. If it did, GRUB should be booted, as it would overwrite the MBR.
10. Open EasyBSD, and add an entry for GRUB2
    - I left the disk as auto choose, and it worked fine
11. Reboot
12. In the Windows Boot Manager, you can now set your Linux distro as default, and choose it in the picker
13. Your machine should now boot to GRUB!

## Final thoughts

The Windows Boot Manager entry way was not how I wanted to make this work. It would be great if it just normally worked. However, I'm happy with this setup for now. Even Docker Engine works on Linux since it doesn't require SLAT like Hyper-V for WSL 2.

I can't figure out how to remove the need for the "press F1 to continue" prompt. I'd like it to automatically normal boot unless chose not to on the Dell screen.
