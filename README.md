# Giphy Search Lab 

In this assignment, you will be building out the following project using React's `useEffect` hook. You **must** fetch to the Giphy API and you **must** use a controlled form.

![demo](./demo.gif)

**Table of Contents**
- [Short Responses](#short-responses)
- [Tech Checklist](#tech-checklist)
- [Set Up \& Starter Code](#set-up--starter-code)
- [API](#api)
  - [Hiding Your API key from Github](#hiding-your-api-key-from-github)
- [Coding Tips:](#coding-tips)
  - [Fetching with useEffect](#fetching-with-useeffect)
  - [Controlled Forms](#controlled-forms)
  - [Rendering a List](#rendering-a-list)


## Short Responses

Do them first!

## Tech Checklist

There are 10 tasks to complete and 2 bonuses.

Your goal is to meet at least 75% of these requirements to complete the assignment. But don't stop there! Shoot for 100%!

**Functionality:**
- [ ] When a user first loads the app, they should see 3 gifs from today's [Giphy API "Trending Gifs" endpoint](https://developers.giphy.com/docs/api/endpoint#trending).
- [ ] The user can search for gifs using the [Giphy API search endpoint](https://developers.giphy.com/docs/api/endpoint#search).
- [ ] The app updates the gifs on the page, displaying 3 at a time, **every time the user clicks the Find Gifs button**.

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

## API 

You will be using the [Giphy API](https://developers.giphy.com/docs/api#quick-start-guide) and will need to register for an API key.

The endpoints you should use are the `/v1/gifs/trending` endpoint:

```
https://api.giphy.com/v1/gifs/trending?api_key={API_KEY}&limit=3&rating=g
```

and the `/v1/gifs/search` endpoint:

```
https://api.giphy.com/v1/gifs/search?api_key={API_KEY}&q={query}&limit=3&rating=g
```

The data returned by these endpoints will be an object with a `data` array of gif objects. Each gif will have an `images` array containing the URLs of the gifs to display.

For each of these, DO NOT paste your API key directly into your code. Follow the next set of steps to properly hide your API key from GitHub.


### Hiding Your API key from GitHub

It is a bad practice to push any code that exposes your API key to your repo. You NEVER want to deploy an app that does this in any way.

The technique below will not work for deployed apps but this app will only be used locally so it is okay:

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

## Coding Tips:

### Fetching with useEffect

* Remember to create state for the data and the error
* We CANNOT use an `async` callback with useEffect
* We have to define an `async` function within the useEffect callback and then invoke it
* The second argument to `useEffect` is the dependency array:
  * `[]` - An empty array means the effect will run only on the first render
  * `[a, b, c]` - Adding variables to the array will trigger the effect to run when those variables change
  * No array provided will trigger the effect to run EVERY time the component re-renders

```jsx
const DataComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('')

  useEffect(() => {
    const doFetch = async () => {
      const [data, error] = await fetchData('http://someAPI');
      if (data) setData(data);
      if (error) setError(error.message);
    }
    doFetch();
  }, []); // empty array will run only once

  // code to render the data or the error
}
```

### Controlled Forms

* A controlled form uses `useState` to manage the current input value of text input elements
* The `value` prop of the `<input>` element uses the state value
* The `onChange` prop of the `<input>` element invokes the state setter function with `e.target.value`

```js
function Form({handleSubmit}) {
    const [inputValue, setInputValue] = useState('');

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="textInput">Enter Some Text </label>
        <input type="text" id="textInput" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    )
}
```

### Rendering a List

* When we have an array that we want to render, use a `ul`
* We use the `thingsToRender?.map` syntax to only map over the array if it is defined
* Use `.map` to convert each element in the array to a `li`
* Each `li` should have a unique `key` value (often the id of the element)

```jsx
function List({ thingsToRender }) {
  return (
    <ul>
      {
        thingsToRender?.map((thing) => (
          <li key={thing.id}>
            <p>{thing.information}</p>
          </li>
        ))
      }
    </ul>
  )
}
```

