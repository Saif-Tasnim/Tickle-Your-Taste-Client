# Recipe Sharing System

[Live Site Url](https://tickle-your-taste.web.app/)

A Full-stack Recipe Sharing System built with ReactJS (Front-End), MongoDB + ExpressJS (Back-End), and Firebase (Authentication).

## Features

- Users can see the recipes on the site.
- Users can register to the system using Google Authentication via Firebase.
- New users receive 50 coins upon registration.
- Users can see recipe details by spending 10 coins.
- Users can buy 100/500/1000 coins by spending 1/5/10 dollars.
- Users can add recipes to the system and earn 1 coin for each viewing of their recipe.
- Secure authentication using JWT tokens.
- Local storage-based authorization for logged-in users.
- Reaction system for logged-in users.
- Filtering, searching, and infinite scrolling features on the All Recipes page.
- Suggestion system on the recipe detail page.

## Layout

The website is based on a traditional one-column layout:
- A Navbar at the top.
- Route-based rendering in the middle.
- A footer with your information at the bottom.

### Navbar
**Before Login:**
- Home
- Recipes
- Google Login

**After Login:**
- Home
- Recipes
- Add Recipes
- Coins + User Image + Logout

## Login and Registration System

- User Login/Registration only with Google Login.
- On successful login, store user information in the database with 50 default coins.
- Validate to avoid duplicate user-info insertion.

## Add Recipes

- Add Recipes Route is private.
- Non-logged-in users are alerted and redirected to the home page.
- Form input fields: Recipe Name, Recipe Image (using imgbb), Recipe Details, Embedded YouTube video code, Country, Category (dropdown).
- On submission, create an object with all form data, `creatorEmail`, `watchCount: 0`, `purchased_by: []` and send it to the database.

## All Recipes

- Public route showing all recipes in a one-column card view.
- Display specific recipe information using MongoDB projection: Recipe Name, Recipe Image, `purchased_by`, `creatorEmail`, Country, “View The Recipe” Button.

### View The Recipe Button Behavior
1. **Not Logged In**: Show a toast for login.
2. **Creator Viewing**: Redirect to recipe detail page.
3. **Insufficient Coins**: Redirect to purchase coin page and alert for buying coins.
4. **Sufficient Coins**: Alert for spending 10 coins, reduce 10 coins from user, add 1 coin to the creator, insert user email into `purchased_by`, increase `watchCount`, and redirect to recipe details.
5. **Already Purchased**: Redirect to recipe detail page.

## Recipe Detail

- Private route showing all information of the recipe.
- Embed YouTube video with an iframe.

## Purchase Coin

- Show 3 cards for buying coins:
  - 100 coins for 1 dollar.
  - 500 coins for 5 dollars.
  - 1000 coins for 10 dollars.
- Implement payment system for the specific dollar amount.
- On successful payment, update user coins and navigate to all recipes or recipe details.

## Secure The API Endpoints

- Implement local storage-based authorization using JWT tokens.
- Secure recipe detail API for logged-in users using middleware.

## Utilities

1. **User Reaction System**: Add/remove reactions for logged-in users.
2. **Filtering System**: Filter by category and country on the All Recipe Page.
3. **Search System**: Search based on Recipe Title on the All Recipe Page.
4. **Infinite Scrolling System**: Implement infinite scrolling on the All Recipe Page.
5. **Suggestion System**: Show recipe suggestions with the same category or country on the recipe detail page.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Firebase Account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recipe-sharing-system.git
   cd recipe-sharing-system
