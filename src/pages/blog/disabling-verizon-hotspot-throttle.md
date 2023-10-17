---
layout: ../../layouts/BlogPost.astro
title: Disabling the Verizon Hotspot Throttle
author: Nebula
twitter: itsnebulalol
description: Messing with Verizon, once again.
pubDate: 2023-05-26
---

If you're a heavy hotspot user and tend to use more than your hotspot data limit, you're just like me. I use my hotspot for almost 4 hours daily. That much hotspot use will easily surpass 25 GB in less than a month. Keep in mind that while this will make data not count towards your hotspot limit, it will count towards your normal data limit (which is 50 GB on the Do More plan).

## Requirements

You'll need:

1. An Android phone **rooted with Magisk**, preferably latest
2. VPN Hotspot and 1.1.1.1 apps installed
3. Use of [this script](https://github.com/TheCaduceus/WARP-UNLIMITED-ADVANCED) to get free WARP+ data

## Setting up VPN Hotspot

1. Turn on 1.1.1.1 WARP+
   - You should have at least 100 GB of data now from the script I gave above, but you can always get more free data.
2. Open the VPN Hotspot app, enable Wi-Fi Hotspot, and enable wlan1 (which will appear after enabling hotspot)

After doing this, the throttle is already bypassed, and you can use your hotspot freely.

## Setting up the custom prop

To mitigate issues where sometimes your hotspot won't show up on other devices until a reboot, you can set a custom prop that will fix this.

1. Open Termux or `adb shell`
2. Run `su` and click Allow if prompted
3. Run `resetprop net.tethering.noprovisioning true`
   - `resetprop` is much safer than editing the `build.prop` manually, since it's much more difficult to accidentally make mistakes.
4. Enjoy your hotspot!

## Final thoughts

When you want to turn off your hotspot, you can turn it off as usual. You can also disable the VPN after. When you want to enable your hotspot again, repeat the Setting up VPN Hotspot section. You do not have to set the custom prop again, as far as I know. Make sure to check if the prop stayed after a system update.

After doing this, Verizon thinks the data usage is coming from your phone, instead of from another device. This should also work on other carriers, but is mainly for Verizon. Make sure to check out [my post where I enabled N77 on my OnePlus 9 Pro](/blog/verizon-n77) :\)
