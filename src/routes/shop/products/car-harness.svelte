<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import HarnessSelector from "$lib/components/HarnessSelector/HarnessSelector.svelte";

  import CarHarnessImage from "$lib/images/products/car-harness/car-harness.jpg";
  import HarnessIncludesImage from "$lib/images/products/car-harness/harness-includes.jpg";
  import ConnectorsImage from "$lib/images/products/car-harness/connectors.jpg";
  import OBDIIImage from "$lib/images/products/car-harness/OBD-II.png";

  import { CAR_HARNESS_PRICE } from "$lib/constants/prices.js";

  export const productInfo = {
    title: "car harness",
    id: "gid://shopify/Product/4447447908415",
    route: "/shop/car-harness",
    category: "accessories",
    price: `$${CAR_HARNESS_PRICE}`,
    images: [
      CarHarnessImage,
      HarnessIncludesImage,
      ConnectorsImage,
      OBDIIImage,
    ],
  };
</script>

<script>
  export let product;
</script>

<Product
  {product}
  VariantSelector={HarnessSelector}
  autoSelectFirstVariant={false}
>
  <div slot="notes">
    <NoteCard title="Compatibility">
      Harness compatibility based on the US car market.
    </NoteCard>
    <NoteCard title="Note">
      Does not include the right angle
      <a href="/shop/obd-c-cable" target="_blank">OBD-C cable</a>, sold
      separately.
    </NoteCard>
  </div>

  <div slot="description">
    <strong>Description</strong>
    <p>
      The car harness is our universal interface to your car. Use the car
      harness to connect your comma device to your vehicle.
    </p>
    <p>
      We designed it to be invisible in your car while being easy to install and
      use. Car harness allows seamlessly switching back to the stock system when
      unplugging your comma device.
    </p>
    <div class="video-container">
      <iframe
        src="https://www.youtube.com/embed/keM6UnpguKo?rel=0&controls=1&autoplay=0&mute=0&start=0"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen=""
        title="car harness"
      ></iframe>
    </div>
    <hr />
    <strong>Highlights</strong>
    <ul>
      <li>Stealth install; car parts remain in place, no messy cables</li>
      <li>
        Easy to set up; watch us do it in 3 minutes
        <a href="https://www.youtube.com/watch?v=3nlkomHathI" target="_blank">
          here
        </a>
      </li>
    </ul>
    <hr />
    <strong>What's in the box?</strong>
    <p>
      Each vehicle has a specific harness based on make, model and year. Each
      kit includes the following:
    </p>
    <ul>
      <li>comma power</li>
      <li>harness connector</li>
      <li>harness box</li>
    </ul>
    <p>Exceptions to the above include:</p>
    <p><strong>OBD II</strong></p>
    <ul>
      <li>OBD-II connector</li>
      <li>long OBD-C cable (9.5 ft)</li>
      <li>USB-C coupler</li>
    </ul>
    <p><strong>Rivian A, Tesla A, Tesla B, Nissan, and J533</strong></p>
    <ul>
      <li>comma power</li>
      <li>harness connector</li>
      <li>harness box</li>
      <li>long OBD-C cable (9.5 ft)</li>
      <li>USB-C coupler</li>
    </ul>
  </div>

  <div slot="harnessProducts">
    <hr />
    <div style="width: 100%;">
      <strong>Harness Compatibility Table</strong>
      <p>
        Below is a condensed list of harness configurations and compatible
        vehicles:
      </p>
      <table class="compatibility-table">
        <thead>
          <tr>
            <th>Harness Configuration</th>
            <th>Angled mount</th>
            <th>Parts</th>
            <th>Compatible Cars</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>VW J533 Connector (Standard Mount)</td>
            <td>No</td>
            <td>
              <li>comma 3X:</li>
              <dd><li>mount</li></dd>
              <dd><li>right angle OBD-C cable (1.5 ft)</li></dd>
              <br />
              <li>VW J533 connector:</li>
              <dd><li>harness box</li></dd>
              <dd><li>long OBD-C cable</li></dd>
              <dd><li>USB-C coupler</li></dd>
              <dd><li>comma power v2</li></dd>
              <br />
            </td>
            <td
              >Audi A3 2014-19, Audi A3 Sportback e-tron 2017-18, Audi Q2 2018,
              Audi Q3 2019-23, Audi RS3 2018, Audi S3 2015-17, CUPRA Ateca
              2018-23, SEAT Ateca 2016-23, SEAT Leon 2014-20, Škoda Fabia
              2022-23, Škoda Kamiq 2021-23, Škoda Karoq 2019-23, Škoda Kodiaq
              2017-23, Škoda Octavia 2015-19, Škoda Octavia RS 2016, Škoda
              Octavia Scout 2017-19, Škoda Scala 2020-23, Škoda Superb 2015-22,
              Volkswagen Arteon 2018-23, Volkswagen Arteon eHybrid 2020-23,
              Volkswagen Arteon R 2020-23, Volkswagen Arteon Shooting Brake
              2020-23, Volkswagen Atlas 2018-23, Volkswagen Atlas Cross Sport
              2020-22, Volkswagen CC 2018-22, Volkswagen e-Golf 2014-20,
              Volkswagen Golf 2015-20, Volkswagen Golf Alltrack 2015-19,
              Volkswagen Golf GTD 2015-20, Volkswagen Golf GTE 2015-20,
              Volkswagen Golf GTI 2015-21, Volkswagen Golf R 2015-19, Volkswagen
              Golf SportsVan 2015-20, Volkswagen Jetta 2018-23, Volkswagen Jetta
              GLI 2021-23, Volkswagen Passat 2015-22, Volkswagen Passat Alltrack
              2015-22, Volkswagen Passat GTE 2015-22, Volkswagen Polo 2018-23,
              Volkswagen Polo GTI 2018-23, Volkswagen T-Cross 2021, Volkswagen
              T-Roc 2018-23, Volkswagen Taos 2022-23, Volkswagen Teramont
              2018-22, Volkswagen Teramont Cross Sport 2021-22, Volkswagen
              Teramont X 2021-22, Volkswagen Tiguan 2018-23, Volkswagen Tiguan
              eHybrid 2021-23, Volkswagen Touran 2016-23</td
            >
          </tr>
          <tr>
            <td>VW J533 Connector (Angled Mount)</td>
            <td>Yes</td>
            <td>
              <li>comma 3X:</li>
              <dd><li>angled mount (8 degrees)</li></dd>
              <dd><li>right angle OBD-C cable (1.5 ft)</li></dd>
              <br />
              <li>VW J533 connector:</li>
              <dd><li>harness box</li></dd>
              <dd><li>long OBD-C cable</li></dd>
              <dd><li>USB-C coupler</li></dd>
              <dd><li>comma power v2</li></dd>
              <br />
            </td>
            <td
              >MAN eTGE 2020-24, MAN TGE 2017-24, Volkswagen California 2021-23,
              Volkswagen Caravelle 2020, Volkswagen Crafter 2017-24, Volkswagen
              e-Crafter 2018-24, Volkswagen Grand California 2019-24</td
            >
          </tr>
          <tr>
            <td>GM Connector</td>
            <td>No</td>
            <td>
              <li>GM connector:</li>
              <dd><li>harness box</li></dd>
              <br />
              <li>comma 3X:</li>
              <dd><li>mount</li></dd>
              <dd><li>right angle OBD-C cable (1.5 ft)</li></dd>
              <br />
            </td>
            <td
              >Chevrolet Bolt EUV 2022-23, Chevrolet Bolt EV 2022-23, Chevrolet
              Equinox 2019-22, Chevrolet Silverado 1500 2020-21, Chevrolet
              Trailblazer 2021-22, GMC Sierra 1500 2020-21</td
            >
          </tr>
          <tr>
            <td>Ford Q3 Connector (Angled Mount)</td>
            <td>Yes</td>
            <td>
              <li>Ford Q3 connector:</li>
              <dd><li>harness box</li></dd>
              <dd><li>comma power v2</li></dd>
              <br />
              <li>comma 3X:</li>
              <dd><li>angled mount (8 degrees)</li></dd>
              <dd><li>right angle OBD-C cable (1.5 ft)</li></dd>
              <br />
            </td>
            <td
              >Ford Bronco Sport 2021-24, Ford Maverick 2022, Ford Maverick
              2023-24, Ford Maverick Hybrid 2022, Ford Maverick Hybrid 2023-24</td
            >
          </tr>
          <tr>
            <td>Ford Q4 Connector (Angled Mount)</td>
            <td>Yes</td>
            <td>
              <li>Ford Q4 connector:</li>
              <dd><li>harness box</li></dd>
              <dd><li>comma power v2</li></dd>
              <dd><li>long OBD-C cable</li></dd>
              <dd><li>USB-C coupler</li></dd>
              <br />
              <li>comma 3X:</li>
              <dd><li>angled mount (8 degrees)</li></dd>
              <dd><li>right angle OBD-C cable (1.5 ft)</li></dd>
              <br />
            </td>
            <td>Ford F-150 2021-23, Ford F-150 Hybrid 2021-23</td>
          </tr>
          <tr>
            <td>Ford Q4 Connector (Standard Mount)</td>
            <td>No</td>
            <td>
              <li>Ford Q4 connector:</li>
              <dd><li>harness box</li></dd>
              <dd><li>comma power v2</li></dd>
              <dd><li>long OBD-C cable</li></dd>
              <dd><li>USB-C coupler</li></dd>
              <br />
              <li>comma 3X:</li>
              <dd><li>mount</li></dd>
              <dd><li>right angle OBD-C cable (1.5 ft)</li></dd>
              <br />
            </td>
            <td>Ford Mustang Mach-E 2021-23, Ford Ranger 2024</td>
          </tr>
          <tr>
            <td>Nissan A Connector</td>
            <td>No</td>
            <td>
              <li>Nissan A connector:</li>
              <dd><li>harness box</li></dd>
              <dd><li>long OBD-C cable</li></dd>
              <dd><li>USB-C coupler</li></dd>
              <br />
              <li>comma 3X:</li>
              <dd><li>mount</li></dd>
              <dd><li>right angle OBD-C cable (1.5 ft)</li></dd>
              <br />
            </td>
            <td
              >Nissan Leaf 2018-23, Nissan Rogue 2018-20, Nissan X-Trail 2017</td
            >
          </tr>
          <tr>
            <td>Nissan B Connector</td>
            <td>No</td>
            <td>
              <li>Nissan B connector:</li>
              <dd><li>harness box</li></dd>
              <dd><li>long OBD-C cable</li></dd>
              <dd><li>USB-C coupler</li></dd>
              <br />
              <li>comma 3X:</li>
              <dd><li>mount</li></dd>
              <dd><li>right angle OBD-C cable (1.5 ft)</li></dd>
              <br />
            </td>
            <td>Nissan Altima 2019-20</td>
          </tr>
          <tr>
            <td>Rivian A Connector (Angled Mount)</td>
            <td>Yes</td>
            <td>
              <li>Rivian A connector:</li>
              <dd><li>harness box</li></dd>
              <dd><li>long OBD-C cable</li></dd>
              <dd><li>USB-C coupler</li></dd>
              <br />
              <li>comma 3X:</li>
              <dd><li>angled mount (8 degrees)</li></dd>
              <dd><li>right angle OBD-C cable (1.5 ft)</li></dd>
              <br />
            </td>
            <td>Rivian R1S 2022-24, Rivian R1T 2022-24</td>
          </tr>
          <tr>
            <td>Tesla A Connector</td>
            <td>No</td>
            <td>
              <li>Tesla A connector:</li>
              <dd><li>harness box</li></dd>
              <dd><li>long OBD-C cable</li></dd>
              <dd><li>USB-C coupler</li></dd>
              <br />
              <li>comma 3X:</li>
              <dd><li>mount</li></dd>
              <dd><li>right angle OBD-C cable (1.5 ft)</li></dd>
              <br />
            </td>
            <td
              >Tesla Model 3 (with HW3) 2019-23, Tesla Model Y (with HW3)
              2020-23</td
            >
          </tr>
          <tr>
            <td>Tesla B Connector</td>
            <td>No</td>
            <td>
              <li>Tesla B connector:</li>
              <dd><li>harness box</li></dd>
              <dd><li>long OBD-C cable</li></dd>
              <dd><li>USB-C coupler</li></dd>
              <br />
              <li>comma 3X:</li>
              <dd><li>mount</li></dd>
              <dd><li>right angle OBD-C cable (1.5 ft)</li></dd>
              <br />
            </td>
            <td>Tesla Model 3 (with HW4) 2024, Tesla Model Y (with HW4) 2024</td
            >
          </tr>
          <tr>
            <td>comma body</td>
            <td>No</td>
            <td></td>
            <td>comma body</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</Product>

<style>
  .compatibility-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
    margin-top: 1rem;
    display: block; /* Change to block for scrolling */
    max-height: 500px; /* Set a max height to enable scrolling; adjust as needed */
    overflow-y: auto; /* Enable vertical scrolling */
  }

  .compatibility-table thead {
    position: sticky;
    top: 0;
    z-index: 1; /* Ensure header stays above body content */
  }

  .compatibility-table thead th {
    background-color: #f5f5f5;
    font-weight: 600;
    padding: 0.75rem 1rem;
    border-bottom: 2px solid #ddd;
    text-align: left;
    position: sticky;
    top: 0; /* Stick to the top of the container */
  }

  .compatibility-table tbody td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #eee;
    vertical-align: top;
  }

  /* Column widths */
  .compatibility-table th:nth-child(1),
  .compatibility-table td:nth-child(1) {
    width: 18%; /* Harness Configuration */
  }

  .compatibility-table th:nth-child(2),
  .compatibility-table td:nth-child(2) {
    width: 8%; /* Angled mount */
  }

  .compatibility-table th:nth-child(3),
  .compatibility-table td:nth-child(3) {
    width: 19%; /* Parts */
  }

  .compatibility-table th:nth-child(4),
  .compatibility-table td:nth-child(4) {
    width: 55%; /* Compatible Cars */
  }

  /* Normalize text size in Parts column */
  .compatibility-table li {
    margin: 0.25rem 0;
    font-size: 1rem; /* Ensure top-level <li> matches table */
  }

  .compatibility-table dd {
    margin-left: 1.5rem;
    font-size: 0.875rem; /* Slightly smaller for nested items */
  }

  .compatibility-table dd li {
    font-size: 0.875rem; /* Match <dd> size for consistency */
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .compatibility-table {
      font-size: 0.875rem;
      max-height: 300px; /* Smaller height on mobile; adjust as needed */
    }

    .compatibility-table th,
    .compatibility-table td {
      padding: 0.5rem;
    }

    /* Stack columns on small screens */
    .compatibility-table th:nth-child(1),
    .compatibility-table td:nth-child(1),
    .compatibility-table th:nth-child(2),
    .compatibility-table td:nth-child(2),
    .compatibility-table th:nth-child(3),
    .compatibility-table td:nth-child(3),
    .compatibility-table th:nth-child(4),
    .compatibility-table td:nth-child(4) {
      width: auto;
    }

    /* Adjust list sizes for mobile */
    .compatibility-table li {
      font-size: 0.875rem;
    }

    .compatibility-table dd {
      font-size: 0.75rem;
    }

    .compatibility-table dd li {
      font-size: 0.75rem;
    }
  }
</style>
