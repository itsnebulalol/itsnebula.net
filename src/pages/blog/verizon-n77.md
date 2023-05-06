---
layout: ../../layouts/BlogPost.astro
title: Verizon N77
author: Nebula
twitter: itsnebulalol
description: Getting 5G N77 enabled on the OnePlus 9 Pro.
pubDate: 2023-05-02
---

N77 is a cell band Verizon uses for C-band (mid band) 5G. For whatever reason, OnePlus has this band disabled on the 9 Pro, which makes it not possible to connect to it.

## OxygenOS

I started off this adventure on OxygenOS 13 (F.21). I found a guide on XDA to enable N77 on OOS using QPST, and the change was able to persist, which is a great start. However, I don't use OxygenOS, I use custom ROMs on my phone.

## Flashing a custom ROM

I ended up choosing Lineage for my daily use ROM. It's pretty stable for me. I flashed Lineage, hoping that my QPST change would persist. Long story short, it didn't.

QPST doesn't work on custom ROMs either, only OxygenOS. After enabling USB diag mode, the device does not show up as a modem like it does on OOS.

## Finding another way

I tried to find a way to persist my QPST changes by backing up the partition where it's saved. First, I MSM'd and updated back to OOS 13 (F.21). I knew it goes to something related to modem, so I landed on `modemst1` and `modemst2`. After opening these dumped images in a hex editor, I found it didn't contain anything related to the `policyman` files I saw in QPST.

There was another modem partition though... it was called `modem`! I dumped that image, and opened it in a hex editor, and doing a quick search located the `generic_band_restrictions.xml` file, embedded in the image multiple times. However, it did not contain the change I did in QPST.

## Hex editing

I knew that with XML and HTML you can add extra spaces and stuff, and I know that in binary files, it must be the same size as it was before, usually. I located the string `<exclude> 39 76 77 </exclude>`, and changed the `77` to two spaces. I did this for every occurrence of it. I'm not sure why it was there multiple times, but oh well.

I flashed Lineage, and the patched modem to both slots on my phone, booted it, and was relieved that cellular still works. A few days later, I was able to test the functionality, and I confirmed that I was able to connect to N77, on a custom ROM.

## Final thoughts

I wrote a quick Python script to automate this process on a dumped `modem.img`. [Here](https://github.com/itsnebulalol/modempatcher) it is if you'd like to do this yourself. I even added an (untested) Android 11/12 mode.

It's unfortunate that the C-band towers near me aren't great. The max I've gotten was 350 mbps download. I'll update this if I ever get higher speeds.
