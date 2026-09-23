---
title: Using openpilot
image: /images/support/directions_car.svg
order: 2
---

Find guides for driving with openpilot, staying attentive, and keeping your software up to date.

<!-- articles -->

### openpilot FAQ

::: dropdown Do I have to pay attention?
Yes. You must keep your eyes on the road and be ready to take control at any time. openpilot monitors driver attention and disengages if you are distracted.
:::

::: dropdown Do I need a comma prime monthly subscription to use the device?
No. comma prime is optional and is not required for core device functionality.
:::

::: dropdown What is the openpilot safety model?
More information about the openpilot safety model is available in the [openpilot safety documentation](https://github.com/commaai/openpilot/blob/master/docs/SAFETY.md).
:::

::: dropdown What are the limitations of openpilot Automated Lane Centering?
openpilot Automated Lane Centering (ALC) does not automatically drive the vehicle or reduce the attention you must pay to the road. You must always remain ready to steer and correct the system.

Conditions that can prevent ALC from working as intended include:

- Poor visibility from heavy rain, snow, fog, bright light, or other weather conditions
- A road-facing camera that is obstructed, covered, or damaged
- Paint, wraps, stickers, or coatings that obstruct vehicle sensors
- An incorrectly mounted device
- Sharp curves, including ramps and intersections, where the car's available steering torque may not be enough
- Restricted lanes, construction zones, highly banked roads, or strong crosswinds
- Hills, narrow roads, and winding roads
- Extremely hot or cold temperatures

This is not an exhaustive list. You are responsible for controlling the vehicle at all times.
:::

::: dropdown What are the limitations of openpilot Adaptive Cruise Control?
openpilot Adaptive Cruise Control (ACC) does not allow careless or inattentive driving. You must watch the vehicle's surroundings and remain ready to control the accelerator and brake.

Conditions that can prevent ACC from working as intended include:

- Poor visibility from heavy rain, snow, fog, bright light, or other weather conditions
- A road-facing camera or radar that is obstructed, covered, or damaged
- Paint, wraps, stickers, or coatings that obstruct vehicle sensors
- An incorrectly mounted device
- Toll booths, pedestrians, cyclists, traffic signs, or stop lights
- Stopped vehicles in the same lane
- Situations that require abrupt braking or acceleration
- Close cut-ins from nearby lanes
- Hills, narrow roads, and winding roads
- Extremely hot or cold temperatures
- Interference from equipment that generates ultrasonic waves

openpilot does not detect speed limits. This is not an exhaustive list, and you are responsible for controlling the vehicle at all times.
:::

::: dropdown What are the limitations of openpilot Driver Monitoring?
openpilot Driver Monitoring (DM) is not an exact measurement of driver alertness. Its performance can be affected by low light, bright light, the driver's face being partly or completely outside the camera's field of view, or an obstructed, covered, or damaged driver-facing camera.

This is not an exhaustive list. Do not rely on Driver Monitoring to assess your level of attention.
:::

::: dropdown How does openpilot recognize the car model it is connected to?
If your car is supported, openpilot scans relevant ECU firmware versions to identify its model year, brand, model, and trim. If the car is not recognized as supported, the device falls back to dashcam mode, preserves the car's stock functionality, and displays a notification.
:::

::: dropdown Does openpilot work outside of the United States of America?
Yes. openpilot is not region locked and can be used in any country. You are responsible for complying with local laws and regulations.
:::

::: dropdown What is a fingerprint?
A fingerprint is how openpilot determines which vehicle it is connected to. Current fingerprinting methods use vehicle ECU firmware, and openpilot fingerprints the vehicle at each startup.

If openpilot detects a firmware version that has not been logged before, it may need to be added to the codebase. See the [fingerprinting guide](https://github.com/commaai/openpilot/wiki/Fingerprinting) for more information.
:::

::: dropdown Where is my dongle ID?
Your device's dongle ID is in the **Device** tab in Settings.
:::

::: dropdown How do I leave feedback for openpilot?
Share feedback, good or bad, in the **#openpilot-experience** channel on the comma community [Discord](https://discord.comma.ai/).
:::
