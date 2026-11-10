---
title: comma four common issues
parent: comma-four
description: Troubleshoot common comma four hardware issues and find out when to contact support.
---

## Common issues

::: dropdown Device won't turn on or keeps restarting
Check that the device is securely connected to its cable and that the harness connections are fully seated. Follow the [setup guide](/setup) to check the installation.

If the device still has trouble, try the latest stock openpilot release. You can restore the device with [flash.comma.ai](https://flash.comma.ai/).

[Learn how to flash your comma](/support/flash-your-comma "card")

If the issue continues on stock software, [contact hardware support](/support/comma-four-common-issues#still-having-issues) with the steps you tried.
:::

::: dropdown Blank screen or camera issue
Reseat the device cable and check the mount and installation using the [setup guide](/setup). Third-party software can sometimes cause symptoms that look like hardware problems, including a blank screen. Restore the device with [flash.comma.ai](https://flash.comma.ai/) and install the latest stock openpilot release before contacting support.

[Learn how to flash your comma](/support/flash-your-comma "card")

If the issue continues, [contact hardware support](/support/comma-four-common-issues#still-having-issues) and describe what you see.
:::

::: dropdown Dark border on bottom of comma four video display
This is a normal display effect that improves contrast behind on-screen elements such as the torque bar.
:::

::: dropdown GPS isn't working
Make sure nothing blocks the device's view of the sky. If GPS still has trouble, [contact hardware support](/support/comma-four-common-issues#still-having-issues) and include a photo of the device mounted on the windshield.
:::

::: dropdown Car isn't recognized or openpilot won't engage
First check whether your car is supported. Then check the harness and cable installation with the [setup guide](/setup), and reseat each connection.

[Check if your car is supported](/support/vehicle-compatibility "card")

If the car is supported and the issue continues on the latest stock openpilot, capture a route showing the issue. A stock route helps support rule out changes made by other software.

[How to capture a route](/support/how-to-capture-a-route "card")
:::

## Still having issues?

If you have tried to resolve the issues using the existing resources and haven't been able to succeed, it may be time to contact support. Before contacting support, first restore your device to stock with the following steps.

1. Remove any third-party mounts, harnesses, or cables. Use only hardware from the [comma shop](/shop), and reseat each connection using the [setup guide](/setup).

2. Remove third-party software. Flash your device, then install the latest stock openpilot release during setup. Confirm that the issue still occurs before contacting support.

[Learn how to flash your comma](/support/flash-your-comma "card")

Ensure that the issue occurs while running the latest openpilot release. **We cannot look into issues while running forks or other software.**

3. If your issue relates to driving or using the device onroad, capture a route on stock openpilot where the issue occurs, and include the route link in your ticket.

[How to capture a route](/support/how-to-capture-a-route "card")

If you have not completed the steps above, your ticket will be closed. In your ticket, include the troubleshooting steps you tried and any relevant photos or videos.

[Open a hardware support ticket](https://commasupport.zendesk.com/hc/en-us/requests/new?ticket_form_id=14150133300887 "card")

We also recommend reviewing the [openpilot wiki](https://github.com/commaai/openpilot/wiki) and the community [Discord](https://discord.comma.ai/) for troubleshooting help from community members.
