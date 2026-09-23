---
title: Hardware
description: For issues with a comma hardware product
order: 0
---

::: header Hardware Troubleshooting
image: other
alt: Hardware Troubleshooting banner
:::

### Known issues

::: dropdown Device won't turn on or keeps restarting
Check that the device is securely connected to its cable and that the harness connections are fully seated. Follow the [setup guide](/setup) to check the installation.

If the device still has trouble, try the latest stock openpilot release. You can restore the device with [flash.comma.ai](https://flash.comma.ai/). 

[Learn how to flash your comma](/support/troubleshooting/hardware/flash-your-comma "card")

If the issue continues on stock software, [contact hardware support](/support/troubleshooting/hardware#still-having-issues) with the steps you tried.
:::

::: dropdown Blank screen or camera issue
Reseat the device cable and check the mount and installation using the [setup guide](/setup). Third party software can sometimes cause symptoms that look like hardware problems, including a blank screen. Restore the device with [flash.comma.ai](https://flash.comma.ai/) and install the latest stock openpilot release before contacting support.

[Learn how to flash your comma](/support/troubleshooting/hardware/flash-your-comma "card")

If the issue continues, [contact hardware support](/support/troubleshooting/hardware#still-having-issues) and describe what you see.
:::

::: dropdown Dark border on bottom of comma four video display
This is completely normal! It is an effect on the screen for better contrast when onscreen elements are visible. Such as the [torque bar](/support/using-openpilot/glossary).
:::

::: dropdown GPS isn't working
Make sure nothing blocks the device's view of the sky. If GPS still has trouble, [contact hardware support](/support/troubleshooting/hardware#still-having-issues) and include a photo of the device mounted on the windshield.
:::

::: dropdown Car isn't recognized or openpilot won't engage
First [check whether your car is supported](/vehicles). Then check the harness and cable installation with the [setup guide](/setup), and reseat each connection.

If the car is supported and the issue continues on the latest stock openpilot, capture a route showing the issue. A stock route helps support rule out changes made by other software.

[How to capture a route](/support/troubleshooting/hardware/how-to-capture-a-route "card")
:::

### Still having issues?

If you have tried to resolve the issues using the existing resources and haven't been able to succeed, it may be time to contact support. Before contacting support, first restore your device to stock by following the following steps.

1. Remove any third party mounts, harnesses, or cables. Use only hardware from the [comma shop](/shop), and reseat each connection using the [setup guide](/setup).

2. Remove third party software. Flash your device, then install the latest stock openpilot release during setup. Confirm that the issue still occurs before contacting support.

[Learn how to flash your comma](/support/troubleshooting/hardware/flash-your-comma "card")

Ensure that the issue occurs while running the latest openpilot release. **We cannot look into issues while running forks or other software.**

If you have not completed the steps above, your ticket will be closed. In your ticket, include the troubleshooting steps you tried and any relevant photos or videos.

[Open a hardware support ticket](https://commasupport.zendesk.com/hc/en-us/requests/new?ticket_form_id=14150133300887 "external-card")

We also recommend reviewing the community GitHub wiki and discord.comma.ai for help troubleshoot from community members.
