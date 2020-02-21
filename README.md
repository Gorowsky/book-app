## Task description
### Generate a list of one million books

● A book should have a name, an author, a genre, and a publish date
● An author should have a name and a gender

### Create table out of all 1 million books

### Add any or all of the following functionality
● Sort by Book Name
● Sort By Author Name
● Filter By Book Genre
● Filter By Author Gender
● Indicate books in the "horror" genre, published on Halloween
● Indicate books in the "finance" genre, published on the last Friday of any month

## Note from author

Due to massive data.json (168MB) file I couldnt upload it to github (max 100MB).
Instead I uploaded it on AWS S3 and serve it from there. Unfortunately 168 MB
takes a long time to download even with fast internet connection around ~15-20sec.

## Available Scripts

In the project directory, you can run:

### `npm install`

Run this command to install all dependecies first.

### `npm run server`

Runs mock server. This command should be executed in separate terminal window. Port is set to 8081.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Other informations

Horrors and Finance genre requirements are in addition highlighted with bolded text.
When you see error thats probably because http server is not up (run command server).
