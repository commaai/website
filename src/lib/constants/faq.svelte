<script context="module">
  import OpenpilotImage from '$lib/images/faq/openpilot.svg';
  import ConnectImage from '$lib/images/faq/connect.svg';
  import CommaThreeImage from '$lib/images/faq/comma-three.svg';
  import BodyImage from '$lib/images/faq/body.svg';
  import ReturnPolicyImage from '$lib/images/faq/30-day.svg';
  import ShopImage from '$lib/images/faq/shop.svg';
  import ShippingImage from '$lib/images/faq/shipping.svg';
  import OtherTopicsImage from '$lib/images/faq/other.svg';

  import CommaThreeSimInsertionImage from '$lib/images/comma-3x-sim-insertion.png';

  export const faq = {
    openpilot: {
      title: 'openpilot',
      image: OpenpilotImage,
      questions: [
        {
          question: 'What is openpilot?',
          answer: `
            <p>
              comma openpilot is an open source driver-assistance system. Currently,
              openpilot performs the functions of Adaptive Cruise Control (ACC) and
              Automated Lane Centering (ALC) for compatible vehicles. It performs
              similarly to Tesla Autopilot and GM Super Cruise. openpilot can steer,
              accelerate, and brake automatically for other vehicles within its lane.
              Check it out on <a href="https://github.com/commaai/openpilot" target="_blank">GitHub</a>.
            </p>
            <p>
              In order to enforce driver alertness, openpilot includes a camera based
              Driver Monitoring (DM) system that alerts the driver when distracted or
              asleep. However, even with an attentive driver, we must make further efforts
              for the system to be safe. We have designed openpilot with two other safety
              considerations:
            </p>
            <ol>
              <li>The driver must always be capable to immediately retake manual control of
              the vehicle, by stepping on either pedal or by pressing the cancel button.</li>
              <li>The vehicle must not alter its trajectory too quickly for the driver to
              safely react. This means that while the system is engaged, the actuators are
              constrained to operate within reasonable limits.</li>
            </ol>
          `
        }, {
          question: 'How does openpilot work?',
          answer: `
            openpilot works by connecting to your car's CAN network. Most modern cars
            accept electronic steering, gas, and brake commands to allow for ADAS
            features. openpilot can use these commands to provide much better ADAS
            features than the car manufacturers can provide.
          `
        }, {
          question: 'Is my car compatible with openpilot?',
          answer: `
            A complete list of compatible vehicles can be found on our
            <a href="/vehicles">Compatibility page</a>.
          `
        }, {
          question: 'What should I buy to run openpilot in my car?',
          answer: `
            After verifying that your car is compatible, we recommend purchasing a comma
            device in our <a href="/shop">shop</a>. Don't forget to purchase a
            car harness to connect it to your vehicle. Add to cart, check out, and
            you’re good to go!
          `
        }, {
          question: 'Do I have to pay attention?',
          answer: `
            Yes, the driver must always be able to immediately retake manual control of
            the vehicle, by stepping on the brake pedal or by pressing the cancel
            button. When openpilot is engaged, a driver monitoring system actively
            tracks driver awareness to help prevent distractions. The openpilot system
            disengages if you are distracted. Drivers must keep their eyes on the road
            at all times and be ready to take control of the car.
          `
        }, {
          question: 'What is the openpilot safety model?',
          answer: `
            More info about the openpilot safety model can be found
            <a href="https://github.com/commaai/openpilot/blob/master/docs/SAFETY.md">here</a>.
          `
        }, {
          question: 'What are the limitations of openpilot Automated Lane Centering?',
          answer: `
            <p>
              openpilot Automated Lane Centering (ALC) system does not automatically drive
              the vehicle or reduce the amount of attention that must be paid to the area
              in front of the vehicle. The driver must always keep control of the steering
              wheel and be ready to correct the ALC system action at all times.
            </p>
            <p>
              Many factors can impact the performance of openpilot ALC, causing it to be
              unable to function as intended. These include, but are not limited to:
            </p>
            <ul>
              <li>Poor visibility (heavy rain, snow, fog, etc.) or weather conditions are
              interfering with sensor operation.</li>
              <li>The road facing camera is obstructed, covered or damaged by mud, ice,
              snow, etc.</li>
              <li>Obstruction caused by applying excessive paint or adhesive products (such
              as wraps, stickers, rubber coating, etc.) onto the vehicle.</li>
              <li>The device is mounted incorrectly.</li>
              <li>When in sharp curves, like on-off ramps, intersections etc...; openpilot
              is designed to be limited in the amount of steering torque it can produce.</li>
              <li>In the presence of restricted lanes or construction zones.</li>
              <li>When driving on highly banked roads or in presence of strong cross-wind.</li>
              <li>Extremely hot or cold temperatures.</li>
              <li>Bright light (due to oncoming headlights, direct sunlight, etc.)</li>
              <li>Driving on hills, narrow, or winding roads.</li>
            </ul>
            <p>
              The list above does not represent an exhaustive list of situations that may
              interfere with proper operation of openpilot components. It is the driver's
              responsibility to be in control of the vehicle at all times.
            </p>
          `
        }, {
          question: 'What are the limitations of openpilot Adaptive Cruise Control?',
          answer: `
            <p>
              openpilot Adaptive Cruise Control (ACC) is not a system that allows careless
              or inattentive driving. It is still necessary for the driver to pay close
              attention to the vehicle’s surroundings and to be ready to re-take control
              of the gas and the brake at all times.
            </p>
            <p>
              Many factors can impact the performance of openpilot ACC, causing it to be
              unable to function as intended. These include, but are not limited to:
            </p>
            <ul>
              <li>Poor visibility (heavy rain, snow, fog, etc.) or weather conditions are
              interfering with sensor operation.</li>
              <li>The road facing camera or radar are obstructed, covered, or damaged by
              mud, ice, snow, etc.</li>
              <li>Obstruction caused by applying excessive paint or adhesive products (such
              as wraps, stickers, rubber coating, etc.) onto the vehicle.</li>
              <li>The device is mounted incorrectly.</li>
              <li>Approaching a toll booth.</li>
              <li>When driving on roads with pedestrians, cyclists, etc...</li>
              <li>In presence of traffic signs or stop lights, which are not detected by
              openpilot at this time.</li>
              <li>
                When the posted speed limit is below the user selected set speed.
                openpilot does not detect speed limits at this time.
              </li>
              <li>In presence of vehicles in the same lane that are not moving.</li>
              <li>
                When abrupt braking maneuvers are required. openpilot is designed to be
                limited in the amount of deceleration and acceleration that it can produce.
              </li>
              <li>When surrounding vehicles perform close cut-ins from neighbor lanes.</li>
              <li>Driving on hills, narrow, or winding roads.</li>
              <li>Extremely hot or cold temperatures.</li>
              <li>Bright light (due to oncoming headlights, direct sunlight, etc.)</li>
              <li>Interference from other equipment that generates ultrasonic waves.</li>
            </ul>
            <p>
              The list above does not represent an exhaustive list of situations that may
              interfere with proper operation of openpilot components. It is the driver's
              responsibility to be in control of the vehicle at all times.
            </p>
          `
        }, {
          question: 'Do I retain my car factory safety features with openpilot installed?',
          answer: `
            <p>
              When openpilot is enabled in settings, Lane Keep Assist (LKAS), and
              Automated Lane Centering (ALC) are replaced by openpilot lateral control and
              only function when openpilot is engaged. Lane Departure Warning (LDW) works
              whether engaged or disengaged.
            </p>
            <p>
              On certain cars, Adaptive Cruise Control (ACC) is replaced by openpilot
              longitudinal control.
            </p>
            <p>
              openpilot preserves any other vehicle safety features, including, but are
              not limited to: AEB, auto high-beam, blind spot warning, and side collision
              warning.
            </p>
          `
        }, {
          question: 'Does openpilot support manual transmission cars (with the driver shifting)?',
          answer: `
            On certain cars, manual transmissions are supported if they have the packages
            listed in the compatibility table. If you’d like to learn more, join us on
            <a href="https://discord.comma.ai/">Discord</a>, where some of our members are supporting
            manual cars.
          `
        }, {
          question: 'How does openpilot recognize the car model it is connected to?',
          answer: `
            <p>
              If your car is on the list of supported cars, openpilot will automatically
              recognize the model of your car by performing a scan of relevant ECU
              firmware versions present in your car. The presence of certain ECU firmware
              versions is an indication of the model year, car brand, car model, and trim.
            </p>
            <p>
              If your car isn’t recognized as supported, your device will fall back to a
              dashcam only mode, preserving the stock functionalities and the user will
              receive a notification on the screen.
            </p>
          `
        }, {
          question: 'How do I update openpilot?',
          answer: `
            All software updates are received over-the-air (OTA). openpilot will
            automatically check for updates when connected to the internet. Your device
            will notify you on the screen when an update is available and prompt you to
            reboot the device to complete the update. You may also manually check for
            updates in the settings, under the "software" tab.
          `
        }, {
          question: 'Will all versions of openpilot work with my comma device?',
          answer: `
            <p>
              The comma 3X can only run openpilot 0.9.4 and above. Running earlier versions
              requires making modifications to the software so that a newer AGNOS is installed.
            </p>
            <p>
              If you face issues after installing an older version of openpilot, you can
              re-flash AGNOS on your device by following the instructions at
              <a href="https://flash.comma.ai">flash.comma.ai</a>.
            </p>
          `
        }, {
          question: 'Does openpilot work at all speeds?',
          answer: `
            Supported speeds vary depending on the car. Please reference the supported
            car list for vehicle specific speed limitations. Maximum speed is the same
            as the maximum speed that stock ACC can be set to (car dependent) with a
            hard limit at ~92mph.
          `
        }, {
          question: 'Does openpilot work outside of the United States of America?',
          answer: `
            Yes, openpilot is not region locked and can be used in any country. You are
            responsible for complying with local laws and regulations.
          `
        }, {
          question: 'What is a fingerprint?',
          answer: `
            <p>
              A fingerprint is the method openpilot uses to determine which vehicle it is
              connected to.
            </p>
            <p>
              Current methods use vehicle ECU firmware logging. openpilot will fingerprint
              the vehicle on each start up.
            </p>
            <p>
              If openpilot detects a firmware version not previously logged, it will need
              to be added to the codebase. Guides on adding new firmware can be found
              <a href="https://github.com/commaai/openpilot/wiki/Fingerprinting">here</a>.
            </p>
          `
        }, {
          question: 'Where is my dongle ID?',
          answer: `
            The dongle ID of your device can be found in Settings of the device in the
            Device tab.
          `
        }, {
          question: 'How do I leave feedback for openpilot?',
          answer: `
            Feedback, good or bad, can be given in the #openpilot-experience channel on
            our community <a href="https://discord.comma.ai/">Discord</a>.
          `
        },
      ]
    },
    connect: {
      title: 'comma connect and prime',
      image: ConnectImage,
      questions: [
        {
          question: 'How do I claim the free prime offer?',
          answer: `
            <p>
              Sign up for prime in <a href="https://connect.comma.ai/">comma connect</a>. With a
              purchase of a comma 3X, you get a free month of comma prime, in which you
              can cancel at any time. After that, you will be charged $24 a month
              (domestic only).
            </p>
            <p>
              Live outside the United States? You can still sign up for prime lite and optionally pair that
              with your own active SIM card. comma prime data service is available in the United States and Puerto Rico only.
            </p>
          `
        }, {
          question: 'What is connect?',
          answer: `
            <p>
              connect (<a href="https://connect.comma.ai/">connect.comma.ai</a>) is a dashboard of
              your recent drives.
            </p>
            <p>
              Your drives are accessible for 3 days (or 1 year with a comma prime
              subscription).
            </p>
            <p>
              connect provides other features such as battery voltage and remote snapshots.
            </p>
          `
        }, {
          question: 'What is the difference between prime and prime lite?',
          answer: `
            <p>
              With prime ($24/mo), domestic data is included.
            </p>
            <p>
              With prime lite ($10/mo), no SIM card or cellular service is provided. You can choose to bring your own SIM card for the full prime experience.
            </p>
            <p>
              Note: your own SIM may require configuration to work with your comma device. We do not offer troubleshooting for third party data service.
            </p>
          `
        }, {
          question: 'How do I transfer a prime subscription to a new device?',
          answer: `
            We aren't able to transfer comma prime subscriptions between devices. To do
            so, you must cancel your existing prime subscription through
            <a href="https://connect.comma.ai/">connect.comma.ai</a> and sign up with the new
            device.
          `
        }, {
          question: 'How do I cancel comma prime?',
          answer: `
            <p>
              We've made the Refund Policy as straightforward as we can, no hidden clauses
              and no fine print.
            </p>
            <ul>
              <li>You may cancel your subscription by selecting the "Cancel subscription" option
              on <a href="https://connect.comma.ai/">connect.comma.ai</a> in the settings cog -> "Prime
              Settings". You can do this at any time without incurring a cancellation
              fee. Upon canceling your comma prime membership, no further fees will be charged.</li>
              <li>If you have a free trial period, we will charge your credit card with the
              monthly subscription fee at the end of the trial period.</li>
              <li>We will continue to charge your credit card account on a monthly basis
              until you cancel your subscription. For example, if you joined on April 5
              your credit card will be charged on May 5; June 5; July 5; and so on until
              you cancel your subscription.</li>
              <li>Your cancellation takes effect immediately. Your last paid monthly fee will be pro-rated and returned as credit on your account.</li>
              <li>You can sign back up at any time.</li>
            </ul>
          `
        }, {
          question: 'I installed my own SIM card, but it\'s not working.',
          answer: `
            <p>
              We do not offer support for setting up third party cellular service. Note that lack of third party cellular connectivity, by itself, is not indicative of malfunctioning hardware as each carrier needs to be carefully configured to function properly. If you are not prepared to configure your SIM card to work with the device, we recommend prime over prime lite.
            </p>
            Some common issues include:
            <ul>
              <li>The APN is not set correctly on the device.</li>
              <li>The device isn't whitelisted with your carrier.</li>
              <li>The SIM card's service isn't active.</li>
            </ul>
          `
        }, {
          question: 'How do I switch between prime and prime lite?',
          answer: `
            Currently, this requires cancelling your current subscription and resubscribing at the new tier.
            Since the subscription is pro-rated, the cancellation happens immediately, and you can resubscribe immediately.
            Your stored drives from the original subscription are not guaranteed to persist after this process.
          `
        }
      ]
    },
    devices: {
      title: 'comma devices',
      image: CommaThreeImage,
      questions: [
        {
          question: 'Do I need a comma prime monthly subscription to use the device?',
          answer: `
            No. comma prime is completely optional and is not needed for any core functionality. comma prime can be activated, cancelled, and re-activated at any time.
          `
        }, {
          question: 'Does installing a comma device require permanent modifications to the car?',
          answer: `
            Installing a comma device does not require any permanent modifications to
            your car. Removing the comma device leaves your car in the same state as before the installation.
          `
        }, {
          question: 'How do I mount my comma device?',
          answer: `
            <p>
              We recommend the mount be centered on the windshield below the trim (see pictures in the Installation Guide). Be sure to leave enough room to remove the trim in the future. First, clean the windshield with the included alcohol wipe. Ensure the top of the mount is fully visible from the driver’s seat. Adhere mount: peel off the 3M tape’s cover on the mount. Press firmly in the center of the mount, then the edges to ensure no bubbles form.
            </p>
            <p>
              Let the mount cure: the mount must cure for 48 hours before installing the comma device. Skipping this step will compromise the integrity of the mount.
            </p>
            <p>
              The 3X mount may be difficult to slide onto the device before it’s installed on the windshield. This is expected and will be easier to do once the mount is installed and fully cured. Some force may be necessary to initially slide the device on the mount. Before applying any force, ensure the device mount is parallel to the mount on the windshield so it will slide in correctly.
            </p>
            <p>
              IT IS THE USER’S RESPONSIBILITY TO MOUNT THE DEVICE IN COMPLIANCE WITH ALL APPLICABLE LAWS AND ORDINANCES.
            </p>
          `
        }, {
          question: 'Will installing a comma device void my warranty?',
          answer: `
            <p>
              From the FTC website: "Simply using an aftermarket or recycled part does not
              void your warranty. The Magnuson-Moss Warranty Act makes it illegal for
              companies to void your warranty or deny coverage under the warranty simply
              because you used an aftermarket or recycled part."
            </p>
            <p>
              <a href="https://www.consumer.ftc.gov/articles/0138-auto-warranties-routine-maintenance">https://www.consumer.ftc.gov/articles/0138-auto-warranties-routine-maintenance</a>
            </p>
          `
        }, {
          question: 'Will my insurance cover my car with a comma device installed?',
          answer: `
            <p>
              Contact your insurance provider directly; insurance coverage is between the
              user and their insurance provider. comma hardware users have been able to
              get coverage and discuss this on Reddit
              <a href="https://www.reddit.com/r/SelfDrivingCars/comments/b13cdp/open_pilot_and_insurance_coverage/">here</a>.
            </p>
            <p>
              Insurance companies are beginning to understand the safety benefits of ADAS
              and LKAS systems like openpilot and we have not heard of any providers
              rejecting coverage to comma hardware users.
            </p>
          `
        }, {
          question: 'I am upgrading from a previous generation comma to a comma 3X do I need to order another harness?',
          answer: `
            No, existing comma harnesses work with these devices.
          `
        }
      ]
    },
    body: {
      title: 'comma body',
      image: BodyImage,
      questions: [
        {
          question: 'What is the body?',
          answer: `
            <p>
              comma body is “the future of people.” You buy a comma body, buy a comma
              3X (the head), attach the comma 3X to the body, and watch it come
              to life.
            </p>
            <p>
              We believe that in order to solve AI, for most people’s definition, you
              must be embedded in the real world. We define AI as a machine that can
              do every task at least as well as a human. And in order to do human
              tasks, it helps a lot to have a human like body. The comma body is the
              beginning of that journey.
            </p>
            <p>
              Today it’s a mobile platform for the comma 3X, but we will be
              building a knee and arms for it. Like everything we do, we try to
              distill the problem down to its essence, so unlike some companies, we
              aren’t focused on the humanoid shape. Wheels are a fine form of
              locomotion for cooking and cleaning, the dream tasks of the comma body.
              Two arms, a knee, and a comma 3X should complete a comma person (sold
              separately, knee and arm coming in 2023).
            </p>
          `
        }, {
          question: 'What software does it run?',
          answer: `
            <p>
              The comma body runs openpilot! From openpilot's perspective, the comma
              body is a car. It runs the same camera and logging software, so we'll
              be able to learn from the fleet of bodies in the same way we learn from
              our fleet of cars.
            </p>
            <p>
              At launch, the software will balance the body (using the same localizer
              as the car!) and allow you to drive it around via web interface. Shortly
              we’ll add video streaming to that web interface, allowing you to drive
              your body outside line of sight. We’d also like to add a VR app to drive
              the body from a first person view, this will be needed by the time we
              ship the arms.
            </p>
            <p>
              Once we start getting data back from our body fleet, we can train
              models. The first model we will train (jointly with the driving model!)
              is a posenet, allowing inside out position tracking. When this model is
              shipped, the localizer will change from 3-DoF to 6-DoF. And once the
              dead reckoning is similar quality to what we have on the cars, adding a
              SLAM system will be very simple to allow drift free localization in
              your environment.
            </p>
          `,
        }
      ]
    },
    trial: {
      title: 'Money-back trial',
      image: ReturnPolicyImage,
      questions: [
        {
          question: 'What is the 30-day money-back trial?',
          answer: `
            <p>
              Every vehicle is a little different and the experience can be hard to describe which is why we offer this trial. If you don’t love the comma 3X, you can return it for a refund–no questions asked. All refunds must be initiated through <a href="https://comma.ai/returns">comma.ai/returns</a> within 30 calendar days of receiving your order.
            </p>
          `
        }, {
          question: 'When does the 30-day money-back trial start?',
          answer: `
            The 30-day money-back trial starts the day your comma 3X is delivered (signature confirmation required for delivery). If you do decide to return your device, we ask that you get the return device in the mail within 30 days of receiving it.
          `
        }, {
          question: 'How do I return my comma 3X?',
          answer: `
            To return your device, please request a return at <a href="https://comma.ai/returns">comma.ai/returns</a>. A prepaid return label (or return instructions if not in the US) will be automatically sent to you. $9.99 will be deducted from your refund if you choose to use this label.
          `
        }, {
          question: 'Are international orders eligible for the trial?',
          answer: `
            <p>
              Yes. We ask that you get your return device in the mail within 30 days of receiving it.
            </p>
            <p>
              The buyer is responsible for international shipping costs to return a device. Please use tracking and insurance as we are not responsible for lost or stolen packages. Return information is provided by email after initiating a return at <a href="https://comma.ai/returns">comma.ai/returns</a>.
            </p>
          `
        }
      ]
    },
    shop: {
      title: 'Shop',
      image: ShopImage,
      questions: [
        {
          question: 'I would like to match a price change.',
          answer: `
            We do not offer price matching. Returns can be made at <a href="https://comma.ai/returns">comma.ai/returns</a> within 30 days of receiving the order.
          `
        }, {
          question: 'Is the 1-year hardware warranty transferable?',
          answer: `
            Yes. Hardware in the comma shop comes with a 1 year limited warranty against
            defects. If you have a device that was not purchased from the comma shop,
            the 1 year warranty does transfer, but you must provide the original order
            number and email address associated with the device. We cannot provide this
            information for you.
          `
        }, {
          question: 'How do I cancel or modify my order?',
          answer: `
            <p>
              To cancel your order: open your order confirmation email and click "View Your Order"; you will see the option to cancel on your order page. You can cancel your order for a full refund up until it ships.
            </p>
            <p>
              An order cannot be modified; please cancel your order and make a new, correct order.
            </p>
            <p>
              Occasionally, we will ship immediately, on the weekend, or during a holiday, so we cannot always guarantee that you or us can catch your order early enough to cancel or modify it.
            </p>
          `
        }, {
          question: 'I got an email saying my order was marked as fraud?',
          answer: `
            Our payment processor will occasionally flag an order for suspicious activity and when this happens our support team will reach out to you and request more information from an official comma email address. If you have purchased UPS 2nd Day Air shipping, it will go out with this speed as soon as the order is verified. If we do not hear back within 2 weeks, we may cancel your order.
          `
        }, {
          question: 'I ordered to the wrong address, now what?',
          answer: `
            <p>
              Domestic shipping only: if you ordered to the wrong address, please open a support ticket at <a href="https://comma.ai/support">comma.ai/support</a> and we will do our best to recall the device to the comma warehouse and refund you once it has returned (can take 7-10+ days). We recommend you make a new purchase once we confirm the device has been recalled.
            </p>
            <p>
              For international shipping, we do not have the ability to recall the device. Please open a ticket at <a href="https://comma.ai/support">comma.ai/support</a> and we will do what we can to resolve the issue, but ultimately the customer is responsible for providing a correct delivery address.
            </p>
          `
        }, {
          question: 'Do you have wholesale and discounted bulk pricing?',
          answer: `
            <p>
              We offer a 10% discount on products with the purchase of 10+ (excluding
              parts). This discount will automatically be applied in the cart. No code
              necessary.
            </p>
            <p>
              If the discount is not automatically applied, please <a href="https://comma.ai/support">contact support</a>
              for assistance.
            </p>
            <p>
              The <a href="/shop">comma shop</a> is the official and only retailer of comma devices. comma does not sell devices in any other stores online.
            </p>
          `
        }, {
          question: 'Do you offer any discounts (Military, Senior, etc)?',
          answer: `
            We do not offer discounts for specific groups.
          `
        }, {
          question: 'Do you offer any upgrades or trade-in discounts for the comma two or three?',
          answer: `
            Trade-in details can be <a href="/shop/comma-3x-trade-in">found here</a>.
          `
        }, {
          question: 'What do I need to know before making an international order?',
          answer: `
            <p>
              We recommend verifying that your car is supported at <a href="/vehicles">comma.ai/vehicles</a>. All support is for US cars unless specified otherwise.
            </p>
            <p>
              Our prices do not include customs duties and taxes that may apply when shipping to your country. These charges are typically determined by your local customs authority and are your responsibility to pay. The fees often range from $150-350 for a 3X and harness, but they can be more depending on your government. The 3X HS Code is 8525.81. If you refuse to pay these fees, comma is forced to cover them to receive the device back and they will be subtracted from the cost of your return refund.
            </p>
            <p>
              Non-Refundable Duties and Taxes:
              Please be aware that our store does not refund customs duties or taxes on international orders. These costs are paid directly to your government and are not recoverable through our store. You may be eligible for a duty refund directly from your local customs office, but this is subject to their policies. A link to your invoice is in your order confirmation email. We may be able to provide you with additional paperwork needed to retrieve these fees from your government by opening a support ticket.
            </p>
            <p>
              Please carefully check that your mailing address is correct before placing an order as it is not possible to change or correct the address once your order has been placed. We are not responsible for devices delivered to incorrect addresses.
            </p>
          `
        }, {
          question: 'I would like to place an order outside of your online store.',
          answer: `
            All orders must be made through our shop except those over $10,000 can be made via purchase order and wire. Please open a support ticket with a detailed list of items you would like to purchase (or a PO) and we will send you next steps.
          `
        },
      ]
    },
    returns: {
      title: 'Shipping & Returns',
      image: ShippingImage,
      questions: [
        {
          question: 'How do I make a return?',
          answer: `
            <p>
              If you're within 30 days of your order delivery, you can request a return at <a href="https://comma.ai/returns">comma.ai/returns</a>.
            </p>
            <ul>
              <li><strong>For U.S. returns:</strong> A prepaid return label will be provided when you submit your request. A $9.99 fee will be deducted from your refund if you choose to use this label.</li>
              <li><strong>For international returns:</strong> The buyer is responsible for all shipping costs. Please use tracking and insurance, as we are not responsible for lost or stolen packages. A return address will be provided after you submit your request.</li>
            </ul>
            <p>
              Please allow 2-5 business days for your return to be processed after we receive it. You will receive a confirmation email once it has been completed.
            </p>
            <p>
              Original packaging is not required, but we are not responsible for damage due to poor packaging. If reusing a box, please remove or cover all barcodes and labels.
            </p>
            <p>
              <strong>Please note:</strong> UPS 2nd Day Air and international shipping fees are non-refundable.
            </p>
          `
        }, {
          question: 'Can I exchange my order?',
          answer: `
            We are unable to offer exchanges of any kind at this time. We request that if you have an issue you make a return via <a href="https://comma.ai/returns">comma.ai/returns</a>.
          `
        }, {
          question: 'How do international returns work?',
          answer: `
            <p>
              The buyer is responsible for all shipping costs, duties, and customs fees to return a device for both 30-day returns and warranty returns. comma covers the costs of sending a repair or replacement device, which will be valued at $1 (the buyer is always responsible for all taxes and duties).
            </p>
            <p>
              Please use tracking and insurance, as we are not responsible for lost or stolen packages. Be sure to mark the package as "Return of Goods" and include HTS code 9801.00.10 on the customs form to avoid import charges. <strong>The customer is responsible for paying all duties and customs fees on the return.</strong>
            </p>
            <p>
              Instructions on how to return your device will be provided after you request a return at <a href="https://comma.ai/returns">comma.ai/returns</a>.
            </p>
          `
        }, {
          question: 'When will I receive my order?',
          answer: `
            <p>
              Orders placed after 7:00 AM PT will be shipped the next business day. You will receive an email with tracking information once your order ships. Please allow 1-2 days for the tracking to become active.
            </p>
            <p>
              Most orders are delivered within 5-10 days, unless expedited. We are not responsible for delays in UPS 2nd Day Air shipping, purchase at your own risk. For international orders, shipping times can vary widely, so please be patient.
            </p>
            <p>
              If your order hasn’t shipped within a few business days, please check your email for any updates from us regarding potential stock issues, address corrections, or fraud verifications. All shipping information is subject to change.
            </p>
          `
        }, {
          question: 'How can I cancel my order?',
          answer: `
            <p>
              To cancel your order: open your order confirmation email and click "View Your Order"; you will see the option to cancel on your order page. You can cancel your order for a full refund up until it ships.
            </p>
            <p>
              An order cannot be modified; if you need to make a change, please cancel your order and make a new, correct order.
            </p>
            <p>
              Occasionally, we will ship immediately, on the weekend, or during a holiday, so we cannot always guarantee that you or us can catch your order early enough to cancel or modify it.
            </p>
          `
        }, {
          question: 'Where does my order ship from?',
          answer: `
            All orders ship from our warehouse in San Diego, California.
          `
        }, {
          question: 'Where do we ship?',
          answer: `
            We ship to the entire US and most countries. We ship internationally with a flat rate of $30. We do not ship to PO Boxes (with an exception for Military). If you reject an international package we will deduct any additional fees from your return. All US deliveries require signature confirmation at this time though subject to change.
          `
        }, {
          question: 'What do I do if my device arrives damaged?',
          answer: `
            <p>
            Please alert us to any issues with your order within 3 days of delivery by opening a <a href="https://commasupport.zendesk.com/hc/en-us/requests/new?ticket_form_id=29233377161623">support ticket here</a> and including pictures of both the product and packaging. We may not be responsible for damages if we are not notified within this window.
            </p>
            <p>
            If we receive a damaged device returned to us, we will deduct the cost of the repair from your return. We are not responsible for lost or damaged items mailed back to us and recommend using the original packaging to make a return or carefully padding your device when sending it back.
            <p>
          `
        }, {
          question: 'My order has no recent tracking activity and is past the delivery date. What should I do?',
          answer: `
            Please call UPS at <a href="tel:1-800-742-5877">1-800-742-5877</a> or use their online contact form to report the issue. Provide your tracking number and explain the situation. If the package is confirmed lost or significantly delayed (over one week), please notify us so we can initiate an investigation and file a claim with UPS. We will keep you updated on the status of the investigation and arrange for any necessary reimbursement or replacement.
          `
        }, {
          question: 'My order tracking shows delivered, but the package has not shown up yet?',
          answer: `
            If your order is via USPS, please note that we will respond to your support ticket 3-4 days after to see if the order has finally shown up. Most delayed USPS orders do eventually arrive within a few days. If this is UPS and the device was signed for, there is little we can do on our end as this is considered a closed matter. If your UPS package was not delivered, please check tracking to see if your order may be at a UPS pickup location. If the order is shown as being returned to the comma warehouse, we will refund it and we recommend that you place a new order.
          `
        }, {
          question: 'Do you offer a warranty?',
          answer: `
            We offer a 1-year limited warranty against hardware defects. If you believe your hardware is defective, please fill out a support request at <a href="https://comma.ai/support">comma.ai/support</a>. We cannot provide shipping return labels for international devices with warranty issues.
          `
        }, {
          question: 'What is the return policy?',
          answer: `
            <p>
              You can request a return within 30 days of the delivery date at <a href="https://comma.ai/returns">comma.ai/returns</a>. For U.S. returns, we offer a prepaid return label for $9.99, which will be deducted from your refund if you choose to use it. International customers are responsible for return shipping costs and should use tracking and insurance, as we are not responsible for lost or stolen packages.
            </p>
            <p>
              Please note that UPS 2nd Day Air and international shipping fees are non-refundable.
            </p>
            <p>
              We reserve the right to cancel orders from customers who have made returns within 6 months of their most recent purchase.
            </p>
            <p>
              If you return a device while having multiple orders within an eligible return window, we will refund the lowest price paid for the eligible devices. A full refund will be provided if all open orders are returned.
            </p>
            There are some items that are ineligible for return, including:
            <ul>
              <li>Parts</li>
              <li>Repairs</li>
              <li>Items marked as “Final Sale”</li>
            </ul>
            <p>
              Only items purchased directly from the <a href="https://comma.ai">comma shop</a> can be returned. We are not responsible for devices damaged due to poor packaging or for items lost without a tracking number.
            </p>
          `
        }, {
          question: 'How long does it take to receive my refund?',
          answer: `
            Refunds can take 2-5 business days to process once we have received your return. If you have not received a refund within 1 week of delivery please open a comma shop support ticket on the <a href="https://comma.ai/support">support page</a>. We will process your refund and reimburse the payment method you used for the original purchase which can take up to a week depending on your bank.
          `
        },
      ]
    },
    troubleshooting: {
      title: 'Hardware Troubleshooting',
      image: CommaThreeImage,
      questions: [
        {
          question: 'Why is a stock route required to open a hardware support ticket?',
          answer: `
            <p>
              It is our policy for a comma engineer to root cause every hardware issue, for both our understanding of any hardware failures and to provide you with the best experience.
              A route on the latest stock openpilot is necessary before a ticket is sent to an engineer for review.
              <strong>Any ticket with a route from third party software will be closed with a request for a new ticket with a stock route.</strong>
            </p>

            We cannot review logs from third party software for several reasons, including:
            <ul>
              <li>your issue may be directly caused by the third party software</li>
              <li>the third party software may not be up to date with the latest openpilot</li>
              <li>the third party software lacks the necessary logging for an engineer to review the issue</li>
            </ul>
          `
        }, {
          question: 'How do you replace the SIM card in a comma 3X?',
          answer: `
            <p>
              All comma 3Xs (shipped in the US) come with a SIM card. The SIM slot is a
              push/pull mechanism, where you must push on the card to release it and then
              guide it out.

              <div class="video-container">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/t_XSGZyHjM4"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen=""
                  title="How to replace the SIM card in a comma 3X"
                ></iframe>
              </div>
            </p>
            <p>
              Make sure your SIM is inserted correctly by following the step-by-step guide
              below:

              <figure>
                <img src=${CommaThreeSimInsertionImage.img.src} alt="steps to insert comma 3X SIM card">
              </figure>
            </p>

            <strong>How to replace the SIM card in a comma 3X</strong>

            <ol>
              <li>With the comma 3X off and unplugged, tap/push the SIM card with the
              big SIM card, credit card, or other narrow hard object to release the SIM
              (you will hear a click).</li>
              <li>Gently pull the SIM card from the SIM slot (try tweezers)</li>
              <li>Push the SIM card into the SIM slot (with the metal contacts facing
              downwards) with your fingernail or plastic card until you hear a click or
              reach resistance. If you've done this step correctly, the SIM card should
              stay completely recessed inside the comma 3X.</li>
            </ol>
            <p>
              We recommend you clean the camera lenses with a microfiber cloth before
              using the comma 3X again.
            </p>
            <strong>How to activate the new SIM card</strong>
            <p>
              Once your new SIM card is installed, your comma 3X will need to connect
              to Wi-Fi to activate the SIM card. Best ways to get your comma 3X online:
              hotspot from your phone, bring your car somewhere with Wi-Fi or connect your
              comma 3X to a USB charger in a place with Wi-Fi. Your comma 3X
              requires about 5 minutes of Wi-Fi connection and then can take up to 30
              minutes to activate and might require a reboot. You will know the activation
              started when the device displays "CONNECT ONLINE".
            </p>
            <p>
              After the next reboot, your SIM card should connect to the internet and you
              should have prime again!
            </p>
          `
        }, {
          question: 'My comma 3X is having issues. What should I do?',
          answer: `
            We recommend first trying to reflash your device at <a href="https://flash.comma.ai">flash.comma.ai</a> and to reseat all the cable connections. comma support is only able to look into issues on stock with a route where the issue occurs. If you are running a fork, we are unable to diagnose defective hardware without a route on stock. Once you have a route, please open a ticket at <a href="https://comma.ai/support">comma.ai/support</a>. Pictures, videos, and uploading logs via wi-fi are very helpful and often expedite the resolution process. Please also include any troubleshooting steps you have already taken. We also recommend reviewing the community <a href="https://github.com/commaai/openpilot/wiki">GitHub wiki</a> and <a href="https://discord.comma.ai">discord.comma.ai</a> for other troubleshooting.
          `
        }, {
          question: 'My J533/Hyundai/Kia harness does not fit?',
          answer: `
            Reference Hyundai/Kia harness diagrams <a href="https://github.com/commaai/openpilot/wiki/Hyundai-Kia-Genesis#harness-guide">here</a>. Reference J533 install details <a href="https://github.com/commaai/openpilot/wiki/VW-J533-(Gateway)-Cable">here</a>.
          `
        }, {
          question: 'Performing a Factory Reset',
          answer: `
            <p>
              Reset the comma 3/3X by repeatedly tapping on the screen as soon as the device boots up.
              After that, the factory reset screen will come up.
            </p>
            <p>
              If this does not work, a more complete factory reset can be performed at <a href="https://flash.comma.ai">flash.comma.ai</a>.
            </p>
          `
        },
      ]
    },
    other: {
      title: 'Other',
      image: OtherTopicsImage,
      questions: [
        {
          question: 'How can I invest in comma?',
          answer: `
            comma is a private company and we are not seeking outside investment at this time.
          `
        }, {
          question: 'Can I get a review device? (I am a Reviewer / Media / YouTuber)',
          answer: `
            We have a 30-day no questions asked return policy if you would like to experience a comma 3X for yourself.
          `
        }, {
          question: 'I\'d like to partner with comma.',
          answer: `
            <p>
              We don't really know what that means. We offer wholesale pricing and these
              <a href="/shop#services">services</a>.
            </p>
            <p>
              Car companies: <a href="https://blog.comma.ai/working-with-comma-a-guide-for-car-companies/">How to work with us?</a>
            </p>
          `
        }, {
          question: 'Why haven\'t I heard back from support?',
          answer: `
            <p>
              comma support is for comma shop order and warranty related issues. Our inbox is not monitored; please open a support ticket on our <a href="https://comma.ai/support">comma.ai/support</a> and provide the requested information.
            </p>
            <p>
              comma does not provide support for openpilot. We recommend the <a https://discord.comma.ai>community Discord</a> or open an issue on openpilot’s GitHub.
            </p>
          `
        },
      ]
    },
  }
</script>
