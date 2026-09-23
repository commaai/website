---
title: openpilot glossary
order: 4
---

Plain-language definitions for terms you may see while driving with openpilot. Features and steering-wheel controls vary by car; check the [supported cars page](/vehicles) for your car's capabilities.

### System states

**Engaged** — openpilot is actively helping steer the car and, depending on the car, control its speed. The driving display turns green and an engage sound plays. You are still responsible for driving and must be ready to take over immediately.

**Disengaged** — openpilot is not steering or controlling the car's speed. You are in full control, though safety features built into your car may still be active.

**Engageable** — openpilot is ready to engage, but is not currently controlling the car. If openpilot cannot engage, an alert on the device explains why.

**Override** — You are temporarily taking control of one part of driving. Pressing the accelerator normally lets you control the speed without turning openpilot off. Turning the wheel yourself lets you control the steering. The exact behavior varies by car and settings.

**Take over** — Resume full manual control by steering and using the pedals as needed. Pressing the brake pedal or the cruise cancel button disengages openpilot.

### Driving features

**ADAS (advanced driver-assistance system)** — Technology that helps a driver steer, control speed, brake, or notice hazards. openpilot is driver assistance, not a self-driving system.

**Level 2 / L2** — A type of driver assistance that can control steering and speed at the same time. The driver must watch the road at all times and remains responsible for the car.

**ACC (adaptive cruise control)** — Cruise control that speeds up and slows down to maintain your selected speed and follow the car ahead. Some cars use openpilot for this; others use the system that came with the car.

**ALC (automated lane centering)** — Steering assistance that keeps the car centered on its planned path. openpilot provides this while it is engaged.

**LKA or LKAS (lane keep assist / lane keeping assist system)** — The steering-assistance feature that came with your car. It usually nudges the car away from lane lines. On supported cars, openpilot replaces this feature while engaged.

**LDW (lane departure warning)** — Alerts you when the car drifts across a detected lane line without a turn signal. openpilot LDW operates above 31 mph (50 km/h) when enabled.

**FCW (forward collision warning)** — An urgent warning when a collision with a vehicle ahead is predicted. It is a warning, not a guarantee that the car will brake.

**AEB (automatic emergency braking)** — A safety feature built into the car that may brake to help reduce or avoid a collision. openpilot is designed to keep this feature working where supported.

**Lateral control** — openpilot's control of steering, including staying on the planned path and helping with lane changes.

**Longitudinal control** — openpilot's control of speed, including accelerating, braking, following another car, and stopping or starting when supported.

**openpilot longitudinal control** — openpilot controls the car's speed instead of using the adaptive cruise control that came with the car. Availability depends on the car.

**Stock ACC** — The adaptive cruise control that came with the car. On cars that use it with openpilot, the car's original system controls speed while openpilot controls steering.

**Set speed** — The speed selected with the cruise buttons. In Chill Mode, openpilot generally tries to drive at this speed when traffic and conditions allow. In Experimental Mode, it is an upper bound rather than a target. It is not the road's speed limit.

**Lead vehicle** — The vehicle ahead that ACC is following. A lead indicator appears in the driving visualization when a lead is detected.

**Stop-and-go** — ACC operation in slow traffic, including stopping and moving again when supported. Some cars require the driver to press RES/+ or tap the accelerator after a stop.

**Resume from stop** — The ability to begin moving again after ACC stops behind a lead vehicle. Whether this happens automatically depends on the car.

**Lane change assist** — With openpilot engaged, activate the turn signal, check that the adjacent lane is clear, and gently nudge the wheel in that direction. openpilot does not check your blind spot; you are responsible for confirming the lane change is safe.

### Steering-wheel controls

Button labels and behavior differ by car. These are the most common mappings.

**Cruise main / on-off** — Turns the car's cruise system on or off. On some cars it makes openpilot available; it does not always engage openpilot by itself.

**SET/-** — Sets cruise to the current speed and commonly engages openpilot. Once engaged, a press lowers the set speed. Holding it may change the speed continuously or in larger steps, depending on the car.

**RES/+** — Resumes the previous set speed and commonly engages openpilot. Once engaged, a press raises the set speed. On some cars it also resumes from a stop.

**CANCEL** — Disengages openpilot without turning the entire cruise system off.

**Distance / gap** — With openpilot longitudinal control, cycles the Driving Personality on supported cars. With stock ACC, it usually changes the stock following-distance setting.

**LKA / LKAS / lane-assist button** — Controls the car's lane-assist setting on some vehicles. Its behavior with openpilot varies by car; it is not the universal openpilot engage button.

**Brake pedal** — Always disengages openpilot so you can take control.

**Accelerator pedal** — Normally overrides openpilot's acceleration and braking while pressed. If **Disengage on Accelerator Pedal** is enabled, pressing it disengages openpilot instead.

**Steering wheel input** — You can steer at any time. Applying enough force overrides openpilot's steering, but may not disengage acceleration and braking.

### Modes and settings

**Chill Mode** — The default driving mode. It uses the standard production driving behavior.

**Experimental Mode** — Enables alpha-quality features that are not ready for Chill Mode. The driving model controls gas and brakes, including responding to red lights and stop signs. Set speed becomes an upper bound, and mistakes should be expected. It is only available on cars using openpilot longitudinal control.

**End-to-end longitudinal control** — An Experimental Mode feature in which openpilot looks at the road scene and decides when to accelerate or brake, including for red lights and stop signs.

**Driving Personality** — Controls longitudinal following behavior. **Aggressive** follows more closely and uses firmer acceleration and braking, **Standard** is recommended, and **Relaxed** leaves more space. It does not change steering behavior.

**Always-On Driver Monitoring** — Keeps monitoring driver attention even while openpilot is disengaged.

**Disengage on Accelerator Pedal** — Changes the accelerator from a temporary override into a full disengagement input.

### Driving visualization

**Driving path** — The path openpilot plans to follow. In Experimental Mode, its color communicates acceleration intent: green for acceleration, red for braking, and gray for coasting.

**Confidence ball** — The colored ball on the side of the comma four driving display. It shows how likely openpilot thinks you are to let it continue driving without pressing the brake or taking over the steering. A high green ball means a takeover seems less likely. Yellow or red means a takeover seems more likely. It is not a safety score; always watch the road and be ready to take over.

**Torque bar** — The curved bar at the bottom of the comma four driving display. It shows which way openpilot is steering and how much of the car's available steering strength it is using. The bar turns yellow or orange as it gets close to the limit. Be ready to steer if openpilot cannot provide enough steering for a curve.

**Current speed** — The car's measured speed, shown prominently on the driving display.

**Maximum or set speed** — The driver-selected cruise speed shown near the current speed. In Experimental Mode it is the maximum allowed speed, not necessarily the speed openpilot will target.

**Alert** — An on-screen and often audible message. Informational alerts describe a state change; warning and critical alerts require prompt attention or immediate control.

### Driver attention and safety

**DM (driver monitoring)** — The cabin-camera system that estimates whether the driver is attentive. It can issue escalating alerts and prevent engagement after repeated distraction. It does not replace attentive driving.

**Hands-free, eyes-on** — You do not need to keep your hands on the wheel when conditions allow, but you must watch the road continuously and keep your hands ready to steer.

**Driver distracted** — Driver monitoring has detected insufficient attention to the road. Look back to the road and be ready to take over.

**Driver unresponsive** — Driver monitoring cannot confirm an adequate response from the driver. Respond immediately and take control if requested.

**Steer saturated / take control** — openpilot has reached the steering available from the car and cannot follow the desired path. Steer manually right away.

### Car capability terms

**No ACC accel below** — The lowest speed at which ACC can command acceleration on that car. Below it, acceleration or resume behavior may be limited.

**No ALC below** — The lowest speed at which openpilot can provide lane-centering steering on that car.

**Steering torque** — The amount of steering authority the car allows openpilot to command. Higher authority can handle tighter curves, but every car remains limited.
