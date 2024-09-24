# STQS

## Goal
My goal was to visit the SpaceTraders website [SpaceTraders.io](https://docs.spacetraders.io/quickstart/new-game) and implement as many features as I can. 

## What I have done
I began by reading the documentation and planning the structure of my application. On Monday, I completed the majority of the core functionality, and I spent the remaining time refactoring the code and styling the features. Initially, my goal was to finish all of the features, but upon reflection I decided to focus on refining the three sections of the Quickstart game I had implimented.

## Functionality
When you first open the site, you are shown a sign-up page where users can enter their name and click "Submit".
- If username is already taken, an error message is displayed. 
- Please note, only faction 'COSMIC' is valid.

When the user creates a unique username, they are taken to a "Accept contract" page. Here, they are asked whether they would like to accept a contract, and requirements of contract are detailed. These include the type of contract, how many units they need to collect, what items to collect and the deadline. If the current date is later than the deadline, the user cannot accept the contract. If the user clicks "No" they are taken back to the sign-up page.

After successfully accepting a contract, users are directed to a pate which shows the available shipyeards, along with the traits of each location. There is a "View all ships" button at the bottom of each Shipyard card. When clicked, the available ships to buy are displayed. The user can then buy a ship, provided they meet the required conditions, such as having enough money. If the conditions are not met, an error message saying "Sorry, you cannot buy this ship!" will show. If they are able to buy the ship a message saying "You have bought this ship!" will show. 

## What I would do next
If I had more time, I would work on the remaining features, such as enabling users to mine astroids, sell cargo and deliver the goods.

I would also want to add an agent data box in the corner of the page. This would display the agent's name along with their credits which would update as they spend or earn money.

Finally, I would add testing for the compenents which I have created.

## What I would do differently
If I were to start this challenge again I would spend more time planning the full scope of the project. As part of this I would use TDD, writing tests first and then implementing the code to pass those tests.

## Running
`npm run dev`
See `package.json` for more details on available scripts.
