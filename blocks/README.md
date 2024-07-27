# Building Blocks

To fulfill the [idea](../README.md#motivation), a few things need to be set-up such as a standard for structuring the applications. For this matter, YAML-like syntax could be a close option for replacing HTML tags.

## Example

Here is an example: login form

```yaml
title: Login Page
favicon: /favicon.svg
body:
    header:
    main:
        img: /logo.png app-name .logo
        h3: App Name
        p: \#marker tagline 
        form:
            action: /auth/login
            method: post
            input:
                select: Role [User, Admin]
                text: Username
                password: Password
            submit: Sign In
        a: /register Register
    footer:
        p: &copy; Company, 2024
```

As you can see, this is readable, maintainable and predictable as a whole. 

Let me break it down, line by line;
1. `title: ...` sets the title of the page
2. `favicon: ...` sets the page's shortcut/icon image
5. `body: ...` declares the start of the page's contents. The arrangement of the header, main, and footer follows the layout specified or default layout.
6. `header: ...` declares the contents of the header section of the page
7. `main: ...` declares the contents of the main section of the page
8. `footer: ...` declares the contents of the header section of the page

## Structuring Content

This applies to contents of the `header`, `main` and `footer`.

Let's look at how to define elements in a more precise manner; Every element takes the following structure
```yaml
# single-tag element like img, hr, ...
<element>: <attr>...

# block element like div, h1..6, p, span, ...
<element>: <attr>... text
    # children
    <element>: <attr>...
    <element>: <attr>... text
```

The `<element>` part refers to the HTML tag. Accessibility, to a possible extent, is taken care off. 

Empty elements can also be declared, for example: `<hr>`, `<br>`

```yaml
hr:
br:
```

## Attributes 

Here are some examples of attributes
- `\#id` specifies the ID of the element (escaped with `\` so that it is not interpreted as a comment)
- `.class` specifies one CSS class selector
- Use `key=value` for others. Only add those that are relevant so as not to make the entire file verbose.

By default, the last attribute, `text` will be considered as the element's text content incase it does not match the about rules.
For instance: `span: .red Roses` would give `<span class="red">Roses</span>`.

However, some of the elements which have a specific arrangement(preset) of attributes like:
- `img: <src> <alt> <other attr>....`
- `a: <href> <other attr>... text`

**Embedding attributes**: just like we have preset attributes for inline elements, we can structure the attributes of the tag. For instance;

```yaml
img:
    src: /logo.png
    alt: app-name
```

## Templates

Think of these as modern day components but covering everything between structuring, styling and usage. There are many design systems, lots of low-level components out there: for example, Tailwind/Bootstrap Components. In this approach, you do not need to code an entire page all over again everytime. Take a look at this;

**Example**: Built-in Form Template

The `form: ...` tag requires the `action` and `method` attributes as well as child elements like input fields. All nested entries will be checked if they match known and expected attributes, otherwise they will be considered as HTML elements.

```yaml
form:
    # action url
    action: /auth/login
    # form method
    method: post
    # all input fields in order
    input: select Role [User, Admin]
    input: text Username
    input: password Password
    # form submit input 
    submit: Sign In
```

>More templates and their presets will be documented as development continues.

>:warning: Under development