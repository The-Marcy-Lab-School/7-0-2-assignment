# Giphy Search Lab 

In this assignment, you will be building out the following project using React's `useEffect` hook. You **must** fetch to the Giphy API and you **must** use a controlled form.

![demo](./demo.gif)

**Table of Contents**
- [Short Responses](#short-responses)
- [Tech Checklist](#tech-checklist)
- [Set Up \& Starter Code](#set-up--starter-code)
  - [API](#api)
- [Tasks](#tasks)
  - [GitIgnore Your API Key](#gitignore-your-api-key)
    - [TODO 1](#todo-1)
  - [Adapters + handleFetch](#adapters--handlefetch)
    - [handleFetch.js](#handlefetchjs)
    - [giphyAdapters.js](#giphyadaptersjs)
    - [TODO 2](#todo-2)
  - [Running Async Processes with useEffect \& Rendering the Gifs](#running-async-processes-with-useeffect--rendering-the-gifs)
    - [TODO 3](#todo-3)
  - [Controlled Search Forms](#controlled-search-forms)
    - [TODO 4](#todo-4)


## Short Responses

Do them first!

## Tech Checklist

There are 10 tasks to complete and 2 bonuses.

Your goal is to meet at least 75% of these requirements to complete the assignment. But don't stop there! Shoot for 100%!

**Functionality:**
- [ ] When a user first loads the app, they should see 3 gifs from today's [Giphy API "Trending Gifs" endpoint](https://developers.giphy.com/docs/api/endpoint#trending).
- [ ] The user can search for gifs using the [Giphy API search endpoint](https://developers.giphy.com/docs/api/endpoint#search).
- [ ] The app updates the gifs on the page, displaying 3 at a time, **every time the user clicks the Find Gifs button**.
- [ ] Bonus: if an error occurs, the `defaultGifs` from `gifs.json` are displayed along with a message reading `"Sorry, the GIPHY API is not working, but here are some cats"`.

**React Fundamentals**
- [ ] Props are extracted in child components using destructuring
- [ ] `useState` is used to manage state
- [ ] `useEffect` is used to perform an asynchronous fetch call.
- [ ] The gifs are displayed as an unordered list (`ul`)
- [ ] Every `li` in the `ul` has a unique `key` prop
- [ ] The form is a controlled form.
- [ ] Bonus: modify the `useEffect` hook to be re-triggered whenever the user input changes (not just when they click the button).

**Miscellaneous**
- [ ] The `config.js` file is listed in the `.gitignore` and is NOT included in the final repository.
- [ ] At no point did you ever use any vanilla DOM JS methods (e.g. `document.querySelector` or `document.createElement`)
- [ ] Bonus: Display the gifs as a grid using flexbox or grid!

## Set Up & Starter Code

Run `npm install` to download dependencies. Then run `npm run dev` to run the app.

There is a good amount of starter code created for you. Take some time to draw out the component hierarchy. Take your time to really understand each component and how they work will with each other. **You are allowed to create as many additional components as you want**.

### API 

You will be using the [Giphy API](https://developers.giphy.com/docs/api#quick-start-guide) and will need to register for an API key.

The endpoints you should use are the `/v1/gifs/trending` endpoint:

```
https://api.giphy.com/v1/gifs/trending?api_key={API_KEY}&rating=g
```

and the `/v1/gifs/search` endpoint:

```
https://api.giphy.com/v1/gifs/search?api_key={API_KEY}&q={query}&rating=g
```

The data returned by these endpoints will be an object with a `data` array of gif objects. Each gif will have an `images` array containing the URLs of the gifs to display.

For each of these, DO NOT paste your API key directly into your code. Follow the next set of steps to properly hide your API key from GitHub.

## Tasks

### GitIgnore Your API Key

It is a bad practice to push any code that exposes your API key to your repo. You NEVER want to deploy an app that does this in any way.

> NOTE: The technique below will not protect your API key if you were to deploy it. You need to deploy a backend to properly hide your API keys.

#### TODO 1
- Create a `config.js` file with the following (the name of the file is arbitrary):

```js
const API_KEY = "PASTE_YOUR_API_KEY_HERE";

export default API_KEY;
```

- Open the `.gitignore` file and add a line of text with the name of your file `config.js`
- Wherever you need the `API_KEY`, import it from `config.js`

```js
import API_KEY from 'path/to/config.js'
```

### Adapters + handleFetch

An **adapter** is essentially a "transition layer" that connects two different interfaces. Think of it just like the power adapter (a.k.a. the "brick") that converts the USB-C connector on your charging cable to the standard three-prong electrical connector.

In our case, the adapter layer will provide functions for sending fetch requests to the APIs used by our application.

To support this pattern, we've provided a directory called **src/adapters/** for you with two files:

#### handleFetch.js

This file exports a `handleFetch` helper function. This function's behavior should mostly be familiar to you. This particular implementation always returns a "tuple" — an array with two values: `[data, error]`. 

It can be used like this (run the file to see this test example in action):

```js
const testExample = () => {
  // immediately destructure the returned tuple
  const [data, error] = handleFetch('https://dog.ceo/api/breeds/image/random');
  if (error) {
    // handle the error. maybe you render an error message.
    return console.log(error);
  }
  // otherwise, render the data
  console.log(data);
}
```

When we fetch, there are basically two outcomes: we get the data we fetched or an error is thrown. Rather than returning a single value, either the data OR the error, we return two values:
- If the fetch succeeds, the `data` value will be the fetched `data` object while the `error` value will be `null`. 
- If an error is thrown, the `data` value will be `null` while the `error` value will be the thrown `error` object.

By returning a tuple, the caller of this `handleFetch` helper is able to immediately know whether or not an `error` occurred. If the `error` exists, then we can easily handle it. If the `error` is `null`, then we know that the `data` was fetched successfully.

If we only returned a single value, either the data OR the error, then the caller of `handleFetch` would need to add their own logic to determine if they are receiving an error object or fetched data. Instead, the returned tuple makes this distinction abundantly clear.

#### giphyAdapters.js

This file exports two functions for fetching from various endpoints from the GIPHY API. Each function's sole purpose is to send a fetch request using the `handleFetch` helper and return the data in a desired format. 

For example, an adapter to fetch a dog image from the [Dog API](https://dog.ceo/dog-api/) might look like this:

```js
const getDogImageByBreed = (breed) => {
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;
  return handleFetch(url);
}
```

Your first task will be to complete these functions

#### TODO 2

In **giphyAdapters.js**
- Import the API Key from your `config.js` file
- Complete the `getTrendingGifs` adapter to fetch from the `trending/` endpoint

  ```
  https://api.giphy.com/v1/gifs/trending?api_key={API_KEY}&rating=g
  ```

  It should return a tuple containing the first three gifs fetched from this endpoint and the error (remember, the error will be `null` if the fetch is successful).

- Complete the `getGifsBySearch` adapter to fetch from the `search/` endpoint based on a given `searchTerm`

  ```
  https://api.giphy.com/v1/gifs/search?api_key={API_KEY}&q={searchTerm}&rating=g
  ```

  It should return a tuple containing the first three gifs fetched from this endpoint and the error (remember, the error will be `null` if the fetch is successful).

### Running Async Processes with useEffect & Rendering the Gifs

Open **src/components/GifContainer.jsx**.

Once you have your adapters built, you will want to use them in the `GifContainer` component which will render the fetched gifs.

This component is meant to display gifs. However, there are two different sets of gifs that this component can display, depending on the user's actions. At first, they should see trending gifs but after submitting a search term in the GifSearch form, they should see gifs related to their search.

For now, we'll handle the trending gifs.

> Note: If you're struggling to get your fetching adapters to work with the GIPHY API, you can render the list of `gifs` in the `src/gifs.js` file instead. This file has been imported for you as `defaultGifs` and the gifs in this file are in the same structure as the gifs you would receive when fetching from the GIPHY API.

#### TODO 3

- Use the `getTrendingGifs` adapter to fetch trending gifs on the first render (and only on the first render)
- The component should render the first three gifs returned from the `trending/` endpoint inside the `ul` as list items containing an `img` (did you know you can use `img` to render gifs??).
  - Remember to assign each list item a `key`

> TIP: Use `console.log` to print out the fetched gifs to see the data's structure. You should be looking for "original URL" of the image.

### Controlled Search Forms

Now that your app can render the trending gifs, we want to allow our users to search for gifs. Check out the `GifSearch` component.

This component is meant to contain a controlled form (a form whose input values) are controlled by a piece of React state (with `useState`). However, the final submitted value(s) of the form needs to be shared with the `GifContainer` so be careful about where you define your final submitted state!

#### TODO 4

- Convert the form in `GifSearch` into a controlled form.
- Handle form submissions by setting a `searchTerm` state value that can be shared with the `GifContainer` component (where should this state be defined? how can it be shared with `GifContainer`?)
- Once the `searchTerm` value is shared with the `GifContainer`, add an effect that uses the `getGifsBySearch` adapter to fetch and render the searched-for gifs any time that the `searchTerm` state is updated.

