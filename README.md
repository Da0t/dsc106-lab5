# DSC 106 Lab 5 — Visualizing Categorical Data with D3

**Author:** Dat Nguyen (`Da0t`)

An interactive standalone project portfolio based on [UCSD DSC 106 Lab 5](https://dsc106.com/labs/lab05/): a D3 pie chart showing counts by project year, responsive legend, case-insensitive search across project metadata, selected-year filtering, and combined search + year interaction.

## Run locally

Serve this folder over HTTP (module imports and `fetch()` may not work via `file://`):

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/projects/ in your browser. D3 v7 is loaded from jsDelivr; an internet connection is required.

## Project files

- `index.html`: author homepage and navigation.
- `lib/projects.json`: 12 portfolio projects with year fields.
- `global.js`: shared data fetcher and portfolio rendering.
- `projects/index.html`: chart and projects interface.
- `projects/projects.js`: D3 aggregation, pie, legend, search and year filtering.
- `style.css`: responsive layout and interactive styling.

## Combined filtering (extra credit)

Both the search term (`query`) and chosen year (`selectedYear`) live in one shared state. `updatePage()` filters the original dataset and renders cards filtered by both conditions. The pie chart reflects the text search but retains available years to allow users to toggle the selected year off, so searching does not discard an existing year selection.

## Submission checklist

1. Verify each project's year, description and destination link; entries are illustrative and should be reviewed for accuracy.
2. Test chart slice selection, legend, search, combined filters and clear buttons in a browser.
3. Enable GitHub Pages if you need a public deployed URL.
4. Record the required video (60 seconds maximum) showing chart, interaction, filter fix and what you learned.
5. Submit the repository URL, deployed website URL and video as required by course instructions.

**Note:** This is a standalone reconstruction, not an extension of the earlier course portfolio. Actual Lab 4 source files were not available when it was created.