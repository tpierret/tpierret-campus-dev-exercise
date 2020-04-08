# tpierret-campus-dev-exercise

This package is a front-end web application. It uses http://omdbapi.com/ to search for movie and television content by name or content type and returns the relevant movies with information about release year, their posters, and their IMDb page link.

## Set up

To access the app. Install npm at this link (https://www.npmjs.com/get-npm), if you do not already have it installed.

Then clone this repo locally, and from the root run:

```npm install```

and:

```npm start```.

This will run the app locally at http://localhost:3333/.


## Brief Description

### Search Page
The search page has two input fields: 1. A text input field for a title to search and 2. A select menu for the specific content type to be searched. Both fields are required. To search, a user can click the search button, or press the Enter key while typing in the text input field. On search, the user is redirected to the results page and their search parameters are sent to http://omdapi.com/ to return results.

### Results Page
The results page shows up to 10 results at any time, with each result contained in a box with the result's title, release year(s), link to IMDb page, and poster if present. The result grid is responsive, and depending on the size of the screen will have 1, 2, or 3 columns of results. The search parameters, as well as the current page, can be seen at the top the Results Page. At the bottom of the Results Page, there is an indicator of what page of results a user is on and how many total pages there are. If applicable, there are also arrows to move forward or backwards among pages of results. There is an "Edit Search" button at the top of the Results Page, which allows the user to return to the Search Page with their previous search parameters prepopulated in the search fields.
