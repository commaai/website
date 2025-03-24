import { writeFile } from "fs/promises";

// the output file is updated in the deployed bundle automatically, so there isn't a need to run this when committing
async function fetchData() {
  console.log("Fetching GitHub repo data...");
  try {
    const response = await fetch("https://api.github.com/repos/commaai/openpilot");
    const data = await response.json();

    const contribResponse = await fetch(data.contributors_url + "?per_page=1&anon=true");
    const contribLinkHeader = contribResponse.headers.get("Link")
    data['contributors_count'] = parseInt(contribLinkHeader.match('(\\d+)\\D*$')[1])

    await writeFile("./src/lib/repo-data.json", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to fetch GitHub repo data:", err);
    process.exit(1);
  }
}

fetchData();
