# HTML Commands

What if signals were part of HTML?

This experiment focuses the possibilities there can be if signals or reactivity was baked into the browser.

## Overview

Normally, we define our application state in stores or locally in components.
In this experiment; there is one global store and to define a single reactive variable, we use the following format: `variable:initValue`
At some point in our application, we may need to render the its value, so we can wrap it up using: `output='variable:initValue'`.

## Reactive Values

Take a look at the following example:
```html
<span text="count:0"></span>
<span html="count"></span>
<input val="count" type="number">
```

**Line 1**: We define a variable `count` initialized to `0`. 
The `text` attribute indicates that the `span` element will always contain the current value of `count` as plain text (using HTMLElement.innerText).

**Line 2**: Same as line 1 but the output method is `html` (using HTMLElement.innerHTML) and the variable `count` has already been initialized

**Line 3**: Similarly, the input field depends on the `count` variable and their values are synced, that is, a change in the input field's value triggers a change in the value of `count` and vice versa. 

## Events

Like all stores, we may have actions that trigger some background work like fetch data from an api endpoint.

In this approach, actions are defined globally on `window.$actions` object and they take on parameter: the global store.
To use them, define a `command` attribute on the element with the name of the action.
By default, these commands are triggered on a `click` event.
Optionally add the `event` attribute to specify an event that will trigger/invoke the action.

Here's an example:
```html
<button command="decrement">-</button>
<button command="increment">+</button>

<textarea command="validate" event="input"></textarea>
```

The two buttons invoke `decrement` and `increment` on `click` events.
The textarea element triggers the `validate` action on `input` events only.

**Pro Tip**: You can execute ordered multiple actions using a comma separator in the `command` attribute.
```html
<button command="update,backup,log">Save Changes</button>
```

## Demo

>Run the `index.html` file for a demo.

>:warning: work in progress

>That's all for now!