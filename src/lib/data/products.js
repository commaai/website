export const products = {
  "comma-four": {
    title: "comma four",
    id: "gid://shopify/Product/7964554231871",
    route: "/shop/four",
    category: "device",
    price: "$999",
    freeRush: true,
    images: [
      "/src/lib/images/products/comma-four/four_screen_on.png",
      "/src/lib/images/products/comma-four/four_angled.png",
      "/src/lib/images/products/comma-four/four_back.png",
      "/src/lib/images/products/comma-four/four_side.png",
      "/src/lib/images/products/comma-four/remount2.png"
    ],
    notes: [],
    description: `
      <strong>Description</strong>
      <p>
        comma four is the next generation comma hardware designed to live in your car. It works on 325+ car models and adds the best driver assistance in the world to your existing car. Ships in 1-12 weeks.
      </p>
      <p>
        It runs <a href="https://github.com/commaai/openpilot" target="_blank">openpilot</a>, which can drive for hours without driver action.
      </p>
      <p>
        You need a <a href="/shop/car-harness" target="_blank">car harness</a> if you don't already have one, which is free with purchase of comma four. The car harness is our universal interface to your car. Use the car harness to connect your comma device to your vehicle.
      </p>
    `.trim(),
    hasCustomComponent: true
  },

  "car-harness": {
    title: "car harness",
    id: "gid://shopify/Product/4447447908415",
    route: "/shop/car-harness",
    category: "accessories",
    price: "$99",
    images: [
      "/src/lib/images/products/car-harness/car-harness.jpg",
      "/src/lib/images/products/car-harness/harness-includes.jpg",
      "/src/lib/images/products/car-harness/connectors.jpg",
      "/src/lib/images/products/car-harness/OBD-II.png"
    ],
    hasCustomComponent: true
  },

  "panda": {
    title: "panda",
    id: "gid://shopify/Product/10933316813",
    route: "/shop/panda",
    category: "accessories",
    price: "from $99",
    images: [
      "/src/lib/images/products/panda/red-panda.jpg",
      "/src/lib/images/products/panda/white-panda.jpeg"
    ],
    notes: [
      {
        title: "Note",
        content: `A panda is not necessary if purchasing a
        <a href="/shop/comma-four" target="_blank">comma four</a>.
        <br /><br />
        A red panda is required if using a comma 3 on a CAN FD vehicle. Check
        <a href="https://github.com/commaai/openpilot/blob/master/docs/CARS.md" target="_blank" rel="noopener noreferrer">compatibility</a> to see if your car requires
        a red panda with comma 3.`,
      }
    ],
    description: `
      <strong>Description</strong>
      <p>
        pandas are the nicest universal car interfaces ever. They give you full
        access to the many communication buses of your car.
      </p>
      <p>
        A panda + <a
          href="https://github.com/commaai/openpilot/tree/master/tools/cabana"
          target="_blank">cabana</a>
        is like fitbit for your car. Track your RPMs, MPG, cornering G-force, battery
        life, and so much more. pandas also work as a CAN to USB adapter.
      </p>
      <p>
        pandas are designed for cars from 2008 and newer. <a
          href="https://github.com/commaai/panda"
          target="_blank">panda firmware</a> is released under the MIT license.
      </p>
      <hr />
      <div>
        <hgroup>
          <div>
            <span>variant</span>
            <strong>red panda</strong>
          </div>
        </hgroup>
        <p>
          The red panda is the future of panda technology. Using a STM32H725, it
          has a 4x faster CPU and support for CAN FD on all 3 buses + the one we
          multiplex.
        </p>
        <p>
          If you have a comma three, a red panda is needed to talk to CAN FD cars.
        </p>
        <p>
          A red panda is not required for the <a href="/shop/comma-four">comma four</a>.
        </p>
        <p>
          The red panda does not have GPS support. It is not compatible with the
          comma two.
        </p>
      </div>
      <hr />
      <div>
        <hgroup>
          <div>
            <span>variant • deprecated from openpilot</span>
            <strong>white panda</strong>
          </div>
        </hgroup>
        <ul>
          <li>3x CAN</li>
          <li>2x LIN</li>
          <li>1x GMLAN</li>
          <li>USB A</li>
          <li>Wi-Fi hardware (software support deprecated)</li>
        </ul>
        <p>White panda is deprecated from openpilot.</p>
      </div>
    `.trim()
  },

  "panda-jungle": {
    title: "panda jungle v2",
    id: "gid://shopify/Product/4598987325503",
    route: "/shop/panda-jungle",
    category: "accessories",
    price: "$199",
    images: [
      "/src/lib/images/products/panda-jungle/panda-jungle-v2.jpeg",
      "/src/lib/images/products/panda-jungle/power-adapter.jpeg"
    ],
    notes: [],
    description: `
      <strong>Description</strong>
      <p>What's better than debug board? pandas in a jungle! (pandas not included, only panda jungle)</p>
      <p>Plug up to 6 comma devices or pandas in at once. Use provided switch to "start" all panda ignitions at once.</p>
      <p>Great for comma device development and debugging!</p>
      <p>
        Firmware for the jungle is located in the panda repository and can be
        <a href="https://github.com/commaai/panda/tree/master/board/jungle" target="_blank">obtained here</a>.
      </p>
    `.trim()
  },

  "panda-paw": {
    title: "panda paw",
    id: "gid://shopify/Product/335696887821",
    route: "/shop/panda-paw",
    category: "accessories",
    price: "$20",
    images: [
      "/src/lib/images/products/panda-paw/panda-paw.jpg",
      "/src/lib/images/products/panda-paw/panda-paw-back.jpeg"
    ],
    notes: [],
    description: `
      <strong>Description</strong>
      <p>Bricked your panda? You must be kidding, because panda are unbrickable if you have the convenient panda paw!</p>
      <p>Just press the button to put your panda in boot mode, no matter what you did to it. Also makes it easy to connect to a computer with a USB Mini-B cable (not included).</p>
      <p>Note that paw PCB color may vary, and you may not like the new color. All paw work the same though, so if you were worried, don't worry.</p>
      <hr/>
      <strong>Open Source</strong>
      <p>
        Buy it here or build it yourself. panda paw are
        <a href="https://github.com/commaai/hardware/tree/master/tools/paw" target="_blank">open source hardware</a>.
      </p>
    `.trim()
  },

  "comma-power": {
    title: "comma power",
    id: "gid://shopify/Product/341670756365",
    route: "/shop/comma-power",
    category: "accessories",
    price: "$20",
    images: [
      "/src/lib/images/products/comma-power/comma-power.jpg"
    ],
    notes: [
      {
        title: "Note",
        content: "A comma power is included with a purchase of a car harness.",
      }
    ],
    description: `
      <strong>Description</strong>
      <p>
        Use your car's OBD-II port to power your car harness.
      </p>
    `.trim()
  },

  "comma-power-extender": {
    title: "comma power extender",
    id: "gid://shopify/Product/7626118266943",
    route: "/shop/comma-power-extender",
    category: "accessories",
    price: "$20",
    images: [
      "/src/lib/images/products/comma-power-extender/POWER-EXTENDER.jpg"
    ],
    notes: [],
    description: `
      <strong>Description</strong>
      <p>
        Use to extend the cable range of your comma power.
      </p>
    `.trim()
  },

  "comma-prime-sim": {
    title: "comma prime SIM",
    id: "gid://shopify/Product/1923405250623",
    route: "/shop/comma-prime-sim",
    category: "accessories",
    price: "$20",
    images: [
      "/src/lib/images/products/comma-prime-sim/comma-prime-sim.jpg",
      "/src/lib/images/products/comma-prime-sim/comma-prime-sim-installation.png"
    ],
    notes: [
      {
        title: "Product Compatibility",
        content: "This product is only for the comma 3/3X.",
      },
      {
        title: "Note",
        content: `For US customers only, requires $24/month comma prime subscription you can purchase at
        <a href="http://connect.comma.ai/" target="_blank">connect.comma.ai</a>.`,
      }
    ],
    description: `
      <strong>Description</strong>
      <p>
        This is a replacement for the SIM that ships with the comma four to support <a href="https://connect.comma.ai/" target="_blank">comma prime</a>.
      </p>
      <p>
        See how to replace the SIM card in a comma 3/3X
        <a href="/support#how-do-you-replace-the-sim-card-in-a-comma-3x" target="_blank">here</a>.
      </p>
    `.trim()
  },

  "obd-c-cable": {
    title: "OBD-C cable",
    id: "gid://shopify/Product/4826822639679",
    route: "/shop/obd-c-cable",
    category: "accessories",
    price: "$20",
    images: [
      "/src/lib/images/products/obd-c-cable/obd-c-cable-four.png",
      "/src/lib/images/products/obd-c-cable/obd-c-long-cable.jpg"
    ],
    notes: [],
    description: `
      <strong>Description</strong>
      <p>
        The OBD-C cable is the standard cable for connecting your comma device to
        your car.
      </p>
      <p>
        Check out the OBD-C spec <a
          href="https://github.com/commaai/hardware/blob/master/harness/OBD-C.sch.pdf"
          target="_blank">here</a>.
      </p>
      <hr />
      <div>
        <hgroup>
          <div>
            <span>variant</span>
            <strong>comma long (9.5 ft)</strong>
          </div>
        </hgroup>
        <p>
          Check the <a href="../shop/car-harness" target="_blank">car harness page</a>
          to determine if your car harness kit requires this cable instead of the
          standard cable. This is the same cable from the comma three/3X car harness kit.
        </p>
      </div>
    `.trim()
  },

  "harness-connector": {
    title: "harness connector",
    id: "gid://shopify/Product/4310075310143",
    route: "/shop/harness-connector",
    category: "accessories",
    price: "$50",
    images: [
      "/src/lib/images/products/harness-connector/harness-connector.jpg",
      "/src/lib/images/products/car-harness/connectors.jpg"
    ],
    notes: [
      {
        title: "Compatibility",
        content: "Harness connector compatibility based on the US car market.",
      }
    ],
    description: `
      <strong>Description</strong>
      <p>
        The harness connector does <b>not</b> include the car harness box and only
        ships with the wires and connectors needed to install an existing car harness
        into another car.
      </p>
      <p>
        Give your car harness more flexibility with another harness connector. The
        harness connector replaces the connector in your existing car harness for
        use in multiple cars. Already using a comma device and car harness in your
        Toyota and want to try it out in your Honda? Simply swap out the connector
        in your car harness, install, and drive!
      </p>
      <p>
        For a harness connector with all the wires and only the 18 pin molex
        connector, choose "Development".
      </p>
      <hr />
      <strong>Open Source</strong>
      <p>
        Buy it here or build it yourself. Harness connectors are <a
          href="https://github.com/commaai/hardware/tree/master/harness"
          target="_blank">open source</a>.
      </p>
    `.trim()
  },

  "harness-box": {
    title: "harness box",
    id: "gid://shopify/Product/4826851573823",
    route: "/shop/harness-box",
    category: "accessories",
    price: "$50",
    images: [
      "/src/lib/images/products/harness-box/harness-box.jpg"
    ],
    notes: [
      {
        title: "Note",
        content: `The harness box is included with the <a href="/shop/car-harness">car harness</a>.`,
      }
    ],
    description: ""
  },

  "replacement-mounts": {
    title: "replacement mounts",
    id: "gid://shopify/Product/4576073482303",
    route: "/shop/replacement-mounts",
    category: "accessories",
    price: "$20",
    images: [
      "/src/lib/images/products/replacement-mounts/replacement-mounts-four.png",
    ],
    notes: [
      {
        title: "Note",
        content: "comma four orders come with (2) mounts.",
      },
      {
        title: "Note",
        content: "comma four mounts are not compatible with comma 3X/three.",
      }
    ],
    description: `
      <strong>Description</strong>
      <p>
        comma four mounts are compatible with every vehicle openpilot supports.
      </p>
      <hr />
      <hgroup>
        <div>
          <span>Variant</span>
          <strong>comma four</strong>
        </div>
      </hgroup>
      <p>
        Mount compatible with all vehicles.<br /><br />
        <strong>Includes:</strong>
      </p>
      <p>
        (2) mounts with adhesive backing
      </p>
      <p>
        (1) alcohol wipe
      </p>
      <hr />
      <hgroup>
        <div>
           <span>Variant</span>
          <strong>comma 3X</strong>
        </div>
      </hgroup>
      <p>
        Standard mount compatible with most vehicles.<br /><br />
        <strong>Includes:</strong>
      </p>
      <p>
        (2) standard mounts with adhesive backing
      </p>
      <p>
        (1) alcohol wipe
      </p>
      <hr />
      <hgroup>
        <div>
          <span>Variant</span>
          <strong>comma 3X (8 degrees)</strong>
        </div>
      </hgroup>
      <p>
        Vehicles with steeper windshields require an alternative mount for
        openpilot to work correctly.<br /><br />
        <strong>Includes:</strong>
      </p>
      <p>
        (2) 8 degree mounts with adhesive backing
      </p>
      <p>
        (1) alcohol wipe
      </p>
      <hr />
      <strong>DIY Mounts</strong>
      <p>
        3D print comma two, three, and 3X mounts from our <a
          href="https://github.com/commaai/hardware"
          target="_blank">open source</a> files.
      </p>
    `.trim(),
    hideOutOfStockVariants: true
  },

  "comma-device-screen": {
    title: "comma device screen",
    id: "gid://shopify/Product/6786322858047",
    route: "/shop/comma-device-screen",
    category: "accessories",
    price: "$40",
    images: [
      "/src/lib/images/products/comma-three-device-screen/comma-three-device-screen.jpg"
    ],
    notes: [
      {
        title: "Note: final sale",
        content: `Open and repair the comma 3/3X at your own risk.
        comma is not responsible for damages that may occur while repairing devices.
        No warranty except DOA.`,
      }
    ],
    description: `
      <strong>comma 3X - screen + front case</strong>
      <ul>
        <li>comma 3X display pre-attached to front case</li>
        <li>includes 4 screws to attach to back piece</li>
      </ul>
      <strong>What's Grade B?</strong>
      <p>
        We no longer have inventory of our Grade A screens, so we are offering Grade B screens at a discount.
        Grade B screens are fully functional, but may have some minor cosmetic imperfections.
      </p>
    `.trim(),
    hideOutOfStockVariants: true
  },

  "comma-3x-back-case": {
    title: "comma 3X back case",
    id: "gid://shopify/Product/7871177818175",
    route: "/shop/comma-3x-back-case",
    category: "accessories",
    price: "$25",
    images: [
      "/src/lib/images/products/comma-3x-back-case/comma-3x-back-case.jpg"
    ],
    notes: [
      {
        title: "Note: final sale",
        content: `Open and repair the comma 3/3X at your own risk.
        comma is not responsible for damages that may occur while repairing devices.
        No warranty except DOA.`,
      }
    ],
    description: `
      <strong>comma 3X back case</strong>
      <ul>
        <li>comma 3X back case</li>
        <li>Includes screws</li>
      </ul>
    `.trim()
  },

  "comma-ai-hoodie": {
    title: "comma hoodie",
    id: "gid://shopify/Product/11027682317",
    route: "/shop/comma-ai-hoodie",
    category: "accessories",
    price: "$89",
    images: [
      "/src/lib/images/products/comma-ai-hoodie/comma-hoodie.jpg",
      "/src/lib/images/products/comma-ai-hoodie/comma-hoodie-back.jpeg",
      "/src/lib/images/products/comma-ai-hoodie/comma-hoodie-print.jpeg",
      "/src/lib/images/products/comma-ai-hoodie/comma-hoodie-packaging.jpeg"
    ],
    notes: [],
    description: `
      <strong>Description</strong>
      <p>
        The perfect mid-weight hoodie. Made from a polyester cotton blend,
        they're not too heavy and not too warm. They have a double-lined hood for warmth,
        a soft interior lining, and - get this - the pocket is also lined with soft fleece!
        Men's sizing. Black fabric with a white printed comma on the front, and
        <a href="http://comma.ai/" target="_blank">comma.ai</a> graphic on the back.
        Hoodie comes stringless.
      </p>
    `.trim()
  },

  "comma-ai-beanie": {
    title: "comma beanie",
    id: "gid://shopify/Product/4863559663679",
    route: "/shop/comma-ai-beanie",
    category: "accessories",
    price: "$69",
    images: [
      "/src/lib/images/products/comma-ai-beanie/comma-beanie.jpg"
    ],
    notes: [],
    description: `
      <strong>Description</strong>
      <p>A black beanie with a comma on it.</p>
      <p><b>The beanie will never ever be sold for less than $69.</b></p>
    `.trim()
  },

  "comma-ai-t-shirt": {
    title: "comma t-shirt",
    id: "gid://shopify/Product/339835518989",
    route: "/shop/comma-ai-t-shirt",
    category: "accessories",
    price: "$35",
    images: [
      "/src/lib/images/products/comma-ai-t-shirt/comma-t-shirt.jpg",
      "/src/lib/images/products/comma-ai-t-shirt/comma-t-shirt-pose.jpeg",
      "/src/lib/images/products/comma-ai-t-shirt/comma-t-shirt-print.jpeg"
    ],
    notes: [],
    description: `
      <strong>Description</strong>
      <p>Okay, okay we heard you. We aren't a high end fashion brand, we are a tech company. We sell a company t-shirt—for a reasonable price.</p>
      <p>
        This signature t-shirt is markedly soft, unisex that is versatile and lends itself to daily wear.
        Spun from a plush fabric that is made up of cotton and polyester fibers,
        this shirt features an up-to-date fit. Choose yours from the single white color we offer.
      </p>
    `.trim()
  },

  "comma-four-trade-in": {
    title: "comma four trade-in",
    id: "gid://shopify/Product/7966994202687",
  },

  "comma-3x-out-of-warranty-repair": {
    title: "comma 3X out of warranty repair",
    id: "gid://shopify/Product/7294255104063",
    route: "/shop/comma-3x-out-of-warranty-repair",
    category: "accessories",
    price: "$500",
    images: [
      "/src/lib/images/products/comma-3x/comma-3x.jpg"
    ],
    backordered: "4-12 weeks",
    notes: [],
    description: `
      <strong>Description</strong>
      <p>
        Dropped your device and broke the screen?
        Having issues outside the warranty period?

        <b>All out-of-warranty comma 3X repairs are covered under the same flat-rate.</b>

        Ship us your original comma 3X, and for the flat rate, we'll send you your repaired comma 3X.
      </p>

      <hr>
      <strong>Instructions</strong>
      <p>
        1. Purchase this product.
      </p>
      <p>
        2. Ship your comma 3X back to us with tracking.
      </p>
      <p>Address to:</p>
      <p style="margin-left: 1em; font-size: 0.75em"><b>
        comma 3X repair<br>
        Repair Order #<br>
        3900 Harney Street<br>
        San Diego, CA 92110<br>
      </b></p>
      <p>
        3. When the comma 3X arrives, give us up to 5 business days to process it.
      </p>
      <p>
        4. We ship you your repaired comma 3X.
      </p>

      <hr>
      <strong>THE FINE PRINT</strong>
      <p>
        -> This offer is ONLY good for the original device owner. <b>What does this mean?</b> The device sent for repair must have been purchased from the comma shop by the same person who purchased the device originally. The name and/or address on the original comma 3X order must be the same. Resale and second market devices do not qualify for repair at this time. You must include your original order number with your device when returning it. We reserve the right to cancel orders that do not follow this policy.
      </p>
      <p>
        -> We are not responsible for lost or damaged packages. Please be sure to have tracking on your package. Ship your device according to local laws and regulations.
      </p>
      <p>
        -> No warranty except DOA.
      </p>
    `.trim()
  }
};
