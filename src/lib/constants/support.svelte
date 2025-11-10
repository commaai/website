<script context="module">
  export const supportFaqs = {
    needSupport: {
      title: "What comma support can help with",
      questions: [
        {
          question: "Hardware support for an in-warranty comma four/3X",
          answer: `
            <div style="margin-left: 2rem">
              <strong>Before contacting support, first try these:</strong>
              <ul>
                <li>Reseat all connections and cables; see the <a href="/setup">setup guide</a>.</li>
                <li>Ensure there's no third party hardware installed, including the mount, harness, and any cables.</li>
                <li>Unplug the device for an hour to allow the device's supercapacitors to fully drain.</li>
                <li>Ensure that the issue occurs while running the latest openpilot release.  <b>We cannot look into issues while running forks or other software.</b></li>
                <li>Still having issues? Reflash the device to the factory default state with <a href="https://flash.comma.ai">flash.comma.ai</a>.</li>
              </ul>

              <strong>GPS issues?</strong>
              <p>
                Ensure there's nothing blocking the device's view of the sky.
                If you're still having issues, contact support and include a picture of the comma device on the windshield.
              </p>

              <strong>Issues after installing a fork?</strong>
              <p>
                Forks (aka third party software) can cause issues that may seem like hardware malfunctions, such as a blank screen or a fan malfunction.
                Use the instructions below to restore your device to stock.
              </p>

              <strong>Restore your device to stock</strong>
              <p>
                Support can only troubleshoot issues that occur while using stock comma hardware and software.
                </br></br>
                For hardware, ensure you are only using a harness, cable, and mounts from the comma shop.
                </br></br>
                For software, first reflash the device with <a href="https://flash.comma.ai">flash.comma.ai</a> to get the device to a clean factory state.
                Then, install the latest openpilot release using the "openpilot" button in the setup.
              </p>

              <strong>Still having issues?</strong>
              <p>
                Open a ticket with <a href="https://commasupport.zendesk.com/hc/en-us/requests/new?ticket_form_id=14150133300887">support</a>.
                If you haven't followed <b>all</b> the steps above, we cannot look into your issue, and the ticket will be closed.
              </p>
            </div>
            `
        },
        {
          question: "Support for a comma prime subscription",
          answer: `
            First ensure your device is running the latest stock openpilot release.
            We cannot look into issues while running forks or other software; see <a href="/support#why-is-a-stock-route-required-to-open-a-hardware-support-ticket">here</a> for why.
            <br></br>

            Use <a href="https://connect.comma.ai">connect.comma.ai</a> to manage and cancel your subscription.
            </br></br>
            If you still have issues, open a <a href="https://commasupport.zendesk.com/hc/en-us/requests/new?ticket_form_id=29233366516631">ticket</a> with support.
          `
        },
        {
          question: "I'm adding support for a new car and would like to extend my return window.",
          answer: `
            If you're adding support for a new car, we can extend your return window to 90 days.
            Open a <a href="https://commasupport.zendesk.com/hc/en-us/requests/new?ticket_form_id=29233363745559">ticket</a> with support with your order number once you've placed the order.
            Return window extensions are subject to approval.
          `
        },
        {
          question: "My comma 3X is out of warranty and needs repair.",
          answer: `
            We offer repairs at a flat-rate for out of warranty comma 3X devices.
            More details on the <a href="/shop/comma-3x-out-of-warranty-repair">shop</a>.
          `
        },
        {
          question: "My older comma device is out of warranty and needs repair.",
          answer: `
            We offer trade-ins for eligible devices.
            More details on the <a href="/shop/comma-3x-trade-in">shop</a>.
          `
        },
        {
          question: "I broke my device's screen.",
          answer: `
            We offer <a href="/shop/comma-device-screen">replacement screens</a> on the shop.
          `
        },
        {
          question: "I need assistance with an active shop order.",
          answer: `
            Process your return at <a href="https://comma.ai/returns" target="_blank" rel="noopener">comma.ai/returns</a>.
            Cancel or edit your existing order directly from your order confirmation email.
            For other issues, open a <a href="https://commasupport.zendesk.com/hc/en-us/requests/new?ticket_form_id=29233377161623">ticket</a> with support.
          `
        },
        {
          question: "I'm ready to claim an openpilot bounty.",
          answer: `
            Thanks for contributing! Open a <a href="https://commasupport.zendesk.com/hc/en-us/requests/new?ticket_form_id=29233607274775">ticket</a> with support to claim.
          `
        },
      ]
    }
  };
</script>
