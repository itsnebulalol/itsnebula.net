---
layout: ../../layouts/BlogPost.astro
title: iMessage on Android
author: Nebula
twitter: itsnebulalol
description: Using iMessage with my phone number on Android.
date: 2023-09-26
---

If you've ever switched from an iPhone to an Android phone, you may have noticed that you're missing a key feature that most Americans use, iMessage. iMessage is great, because most Americans have an iDevice, and already have iMessage enabled. On an iDevice, you just put in the person's number, and there you go, blue bubbles. I'm not necessarily talking about people being bullied for not having an iPhone, as that is a seperate issue, but here I'm talking about iMessage just being good. You get that whole Apple "it just works" feeling.

## AirMessage, BlueBubbles, Sunbird, and Beeper

There are many different apps to get iMessage on Android. [AirMessage](https://airmessage.org/) and [BlueBubbles](https://bluebubbles.app/) are self hosted, which means you need some sort of Mac, wether it be a Mac mini, a VM, or a hackintosh. [Sunbird](https://www.sunbirdapp.com/) and [Beeper](https://www.beeper.com/) run on their datacenters of KVMs (they could possibly be real Mac minis, however it does not make sense when they can use KVMs).

I suggest using BlueBubbles if you're able to get it working, it has most iMessage features you'd want. If you can't get it working, I'd suggest Beeper, as it works without you having a Mac, or even an iPhone. All you need is an Apple ID.

I personally use Beeper, as I cannot get iMessage working in a VM, and the only Mac I have is a MacBook, which doesn't stay on my network 24/7. Running a macOS VM always results in it giving me a customer code and to call Apple Support, but I've never got around to doing that.

## What about my number?

Good question! Normally, you'd follow [one of these guides](https://airmessage.org/help/guide/phone-number), however there's no point if you already have a VPS or an always on server/PC. Recently, something called [pypush](https://github.com/beeper/pypush) has been released on GitHub, and there is an SMS registration branch. I'll quickly go over how I got it working, but the guide in their [Discord](https://discord.gg/pueNu2JCjd) ([link to guide](https://discord.com/channels/1130633272595066880/1145177252015915080/1153126702571073666)) is good. You'll need:

- pypush SMS registration branch cloned (`git clone -b sms-registration https://github.com/beeper/pypush.git`)
- PNRGatewayClientV2 cloned (`git clone https://github.com/JJTech0130/PNRGatewayClientV2.git`)
- Android Studio
- python
- Computer and phone time synced

1. Open PNRGatewayClientV2 in Android Studio, connect your device, and press start
   - You can use wireless debugging here
   - Make sure to give PNRGatewayClientV2 both permissions it requests in the settings app
2. In the pypush directory, run `python3 demo.py --phone [local IP of your phone] --gateway [gateway] --trigger-pdu`
   - Replace `gateway` with the gateway address, usually it's `22223333`, with Verizon it's `900080006010`, with T-Mobile it should be `28818773`.
3. Copy the REG-RESP string from the Android Studio logcat window
4. Run `python3 demo.py --pdu "[REG-RESP string (pdu)]"`
   - Make sure you surround your PDU in quotes (`"`)
   - Say `y` to both questions, and log in with your Apple ID
5. Run `python3 demo.py --reregister` to register your number

Congrats! Your number is now registered with iMessage. Set it as your default alias in iMessage settings (AirMessage/BlueBubbles) or settings of your chat app (Beeper/Sunbird).

## Keeping your number registered

Discord user Kasherpete wrote a Python script that reregisters your number every 30 minutes. Run it in the pypush directory, and keep it running. If you need to move your reregister script to another machine, make sure to zip up the whole folder (just the `config.json` file should be enough, but just in case).

```py
import subprocess
import time

def run_command(command):
    try:
        process = subprocess.Popen(command, shell=True, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        return process
    except Exception as e:
        print(f"Error running the command!")
        return None

if __name__ == "__main__":
    command_to_run = "python3 demo.py --reregister --alive" # Edit if needed
    interval_minutes = 30

    while True:
        try:
            print(f"Reregistering...")
            process = run_command(command_to_run)

            if process:
                print(f"iMessage number has been reregistered. Waiting for {interval_minutes} minutes.")
                time.sleep(interval_minutes * 60)

                process.terminate()
                process.wait()

                print(f"Script terminated.\n")
        except KeyboardInterrupt:
            print("\n\nScript terminated by user.")
            break
```

## Final thoughts

While this is not perfect, it allows you to use iMessage very similarly to how it would be on an iPhone, depending what iMessage client you chose.
