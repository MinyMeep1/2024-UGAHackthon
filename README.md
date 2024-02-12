# 2024-UGAHackthon
Team members: 
  Adis Tucakovic, Preetam Jain, Christopher Gantes, Dante Mata

## Inspiration
We were inspired by the HPCC Presentation and we decided to make something for
missing children. We have created a facial recognition application that is able to scrape missing children from the (national center for missing and exploited children) directly and recognize photos directly from the website.

## What it does
identifies real time people using scrapped data from the NCMEC database.

## How we built it
We use a framework called Scrapy to scrape all the information, which we then store on our Azure MySQL server. We download all important information onto our local server, including the photos of the missing children. The library we use for the recognition model is called face-recognition 1.3.0, from the PyPI site, and the face detector for our front end is called face-api.js.

## Challenges we ran into
**Time Constraint** is our biggest battle. Building a front end on top of scraping data took at least more than a couple of hours. When it comes to using a predefined model, you're limited to what you can do with that model. For example, during our testing, we realized that when you have hundreds of datasets, the accuracy starts decreasing drastically. This could be due to factors such as our photo datasets being of bad quality or the pictures we took of our subjects being of poor quality. But when having hundreds of other people's photos in a dataset, it becomes harder to give an accurate result. Our solution to this was to reduce the number of photos we had in our data to ensure proper testing and showcasing. **(Maybe in the future, we would look into making our own model that would handle the processes we want.) **Depending on when we post this, our frontend may or may not be missing the "face detector" for our frontend. What that basically did was, you could open the website, or in this case, the local server of the website, then go to a page with a live camera feed, and the face detector would take a photo of you and send it to the backend for facial identification.

## Accomplishments that we're proud of
**We made it this far!!!** This being our first time at a hackathon we wanted to go all out and make something crazy. Our originally plan was to create a model with no ML background and or experience but realizing and learning that it would take longer or take most of our time before the event ended leaving no time for the other aspects of the project.

## What we learned
Machine Learning is awesome but time-consuming, especially if you're new to it. Also, using predefined models leaves you with little to no room for improving the current model to your liking. You could do tunings, but not to the point that it drastically changes the model.

## What's next for the group?
Not sure! I think this would be a great heroic app to continue, but a lot of factors play into ensuring a model can be correctly fed, and those factors may not be in our control.
    
