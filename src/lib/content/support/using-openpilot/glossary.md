---
title: openpilot glossary
order: 4
---

Plain-language definitions for terms you may see while driving with openpilot. Features and steering-wheel controls vary by car; check the [supported cars page](/vehicles) for your car's capabilities.

### system states

**engaged** — openpilot is actively helping steer the car and, depending on the car, control its speed. The driving display turns green and an engage sound plays. You are still responsible for driving and must be ready to take over immediately.

**disengaged** — openpilot is not steering or controlling the car's speed. You are in full control, though safety features built into your car may still be active.

**engageable** — openpilot is ready to engage, but is not currently controlling the car. If openpilot cannot engage, an alert on the device explains why.

**override** — you are temporarily taking control of one part of driving. Pressing the accelerator normally lets you control the speed without turning openpilot off. Turning the wheel yourself lets you control the steering. The exact behavior varies by car and settings.

**take over** — resume full manual control by steering and using the pedals as needed. Pressing the brake pedal or the cruise cancel button disengages openpilot.

### driving features

**ADAS (advanced driver-assistance system)** — technology that helps a driver steer, control speed, brake, or notice hazards. openpilot is driver assistance, not a self-driving system.

**Level 2 / L2** — a type of driver assistance that can control steering and speed at the same time. The driver must watch the road at all times and remains responsible for the car.

**ACC (adaptive cruise control)** — cruise control that speeds up and slows down to maintain your selected speed and follow the car ahead. Some cars use openpilot for this; others use the system that came with the car.

**ALC (automated lane centering)** — steering assistance that keeps the car centered on its planned path. openpilot provides this while it is engaged.

**LKA or LKAS (lane keep assist / lane keeping assist system)** — the steering-assistance feature that came with your car. It usually nudges the car away from lane lines. On supported cars, openpilot replaces this feature while engaged.

**LDW (lane departure warning)** — alerts you when the car drifts across a detected lane line without a turn signal. openpilot LDW operates above 31 mph (50 km/h) when enabled.

**FCW (forward collision warning)** — an urgent warning when a collision with a vehicle ahead is predicted. It is a warning, not a guarantee that the car will brake.

**AEB (automatic emergency braking)** — a safety feature built into the car that may brake to help reduce or avoid a collision. openpilot is designed to keep this feature working where supported.

**lateral control** — openpilot's control of steering, including staying on the planned path and helping with lane changes.

**longitudinal control** — openpilot's control of speed, including accelerating, braking, following another car, and stopping or starting when supported.

**openpilot longitudinal control** — openpilot controls the car's speed instead of using the adaptive cruise control that came with the car. Availability depends on the car.

**stock ACC** — the adaptive cruise control that came with the car. On cars that use it with openpilot, the car's original system controls speed while openpilot controls steering.

**set speed** — the speed selected with the cruise buttons. In Chill Mode, openpilot generally tries to drive at this speed when traffic and conditions allow. In Experimental Mode, it is an upper bound rather than a target. It is not the road's speed limit.

**lead vehicle** — the vehicle ahead that ACC is following. A lead indicator appears in the driving visualization when a lead is detected.

**stop-and-go** — ACC operation in slow traffic, including stopping and moving again when supported. Some cars require the driver to press RES/+ or tap the accelerator after a stop.

**resume from stop** — the ability to begin moving again after ACC stops behind a lead vehicle. Whether this happens automatically depends on the car.

**lane change assist** — with openpilot engaged, activate the turn signal, check that the adjacent lane is clear, and gently nudge the wheel in that direction. openpilot does not check your blind spot; you are responsible for confirming the lane change is safe.

### steering-wheel controls

Button labels and behavior differ by car. These are the most common mappings.

**cruise main / on-off** — turns the car's cruise system on or off. On some cars it makes openpilot available; it does not always engage openpilot by itself.

**SET/-** — sets cruise to the current speed and commonly engages openpilot. Once engaged, a press lowers the set speed. Holding it may change the speed continuously or in larger steps, depending on the car.

**RES/+** — resumes the previous set speed and commonly engages openpilot. Once engaged, a press raises the set speed. On some cars it also resumes from a stop.

**CANCEL** — disengages openpilot without turning the entire cruise system off.

**distance / gap** — with openpilot longitudinal control, cycles the Driving Personality on supported cars. With stock ACC, it usually changes the stock following-distance setting.

**LKA / LKAS / lane-assist button** — controls the car's lane-assist setting on some vehicles. Its behavior with openpilot varies by car; it is not the universal openpilot engage button.

**brake pedal** — always disengages openpilot so you can take control.

**accelerator pedal** — normally overrides openpilot's acceleration and braking while pressed. If **Disengage on Accelerator Pedal** is enabled, pressing it disengages openpilot instead.

**steering wheel input** — you can steer at any time. Applying enough force overrides openpilot's steering, but may not disengage acceleration and braking.

### modes and settings

**Chill Mode** — the default driving mode. It uses the standard production driving behavior.

**Experimental Mode** — enables alpha-quality features that are not ready for Chill Mode. The driving model controls gas and brakes, including responding to red lights and stop signs. Set speed becomes an upper bound, and mistakes should be expected. It is only available on cars using openpilot longitudinal control.

**end-to-end longitudinal control** — an Experimental Mode feature in which openpilot looks at the road scene and decides when to accelerate or brake, including for red lights and stop signs.

**Driving Personality** — controls longitudinal following behavior. **Aggressive** follows more closely and uses firmer acceleration and braking, **Standard** is recommended, and **Relaxed** leaves more space. It does not change steering behavior.

**Always-On Driver Monitoring** — keeps monitoring driver attention even while openpilot is disengaged.

**Disengage on Accelerator Pedal** — changes the accelerator from a temporary override into a full disengagement input.

### driving visualization

**driving path** — the path openpilot plans to follow. In Experimental Mode, its color communicates acceleration intent: green for acceleration, red for braking, and gray for coasting.

**confidence ball** — the colored ball on the side of the comma four driving display. It shows how likely openpilot thinks you are to let it continue driving without pressing the brake or taking over the steering. A high green ball means a takeover seems less likely. Yellow or red means a takeover seems more likely. It is not a safety score; always watch the road and be ready to take over.

**torque bar** — the curved bar at the bottom of the comma four driving display. It shows which way openpilot is steering and how much of the car's available steering strength it is using. The bar turns yellow or orange as it gets close to the limit. Be ready to steer if openpilot cannot provide enough steering for a curve.

**current speed** — the car's measured speed, shown prominently on the driving display.

**maximum or set speed** — the driver-selected cruise speed shown near the current speed. In Experimental Mode it is the maximum allowed speed, not necessarily the speed openpilot will target.

**alert** — an on-screen and often audible message. Informational alerts describe a state change; warning and critical alerts require prompt attention or immediate control.

### driver attention and safety

**DM (driver monitoring)** — the cabin-camera system that estimates whether the driver is attentive. It can issue escalating alerts and prevent engagement after repeated distraction. It does not replace attentive driving.

**hands-free, eyes-on** — you do not need to keep your hands on the wheel when conditions allow, but you must watch the road continuously and keep your hands ready to steer.

**driver distracted** — driver monitoring has detected insufficient attention to the road. Look back to the road and be ready to take over.

**driver unresponsive** — driver monitoring cannot confirm an adequate response from the driver. Respond immediately and take control if requested.

**steer saturated / take control** — openpilot has reached the steering available from the car and cannot follow the desired path. Steer manually right away.

### car capability terms

**No ACC accel below** — the lowest speed at which ACC can command acceleration on that car. Below it, acceleration or resume behavior may be limited.

**No ALC below** — the lowest speed at which openpilot can provide lane-centering steering on that car.

**steering torque** — the amount of steering authority the car allows openpilot to command. Higher authority can handle tighter curves, but every car remains limited.
