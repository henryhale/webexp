# WebExp

>:warning: _work in progress_

## Overview

This is an attempt to introduce a new approach to developing applications by abstracting the common grounds for every project.

It is based on the idea: _What is there was one more level of abstraction on top of the browser? Instead of always coding the forms, dashboards, contact pages, and more from scratch. How about we have a system of common responsive components, layouts and themes for developers to quickly setup thier projects using high-level interfaces?_

## The Design Philosophy

To fulfill the idea, a few things need to be set-up such as a standard for structuring the applications. For this matter, YAML-like syntax could be a close option for replacing HTML tags.

### Example

Here is an example: login form

```yaml
title: Login Page
favicon: /favicon.svg
theme: default
layout: CenteredXY
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
3. `theme: ...` specifies the CSS styles(layout, typography, and more) to use on this page. Developers should be able to build thier own themes. Themes must only define stylings for HTML tags, classes are accepted (scoping classes are preferred). They will be fetched and injected in the page during runtime.
4. `layout: ...` specifies the layout of the page(how to arrange the main, header, and footer on the page). For example: CenteredXY means that the main will be centered in the middle of the page. Others may include: Static (default) - header,main,footer in flex-column responsive container, Row - header on the left side (like sidebar), main in the middle, and footer on the right, and more there can be.
5. `body: ...` declares the start of the page's contents. The arrangement of the header, main, and footer follows the layout specified or default layout.
6. `header: ...` declares the contents of the header section of the page
7. `main: ...` declares the contents of the main section of the page
8. `footer: ...` declares the contents of the header section of the page

### Structuring Content

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

### Attributes 

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

## Theming

While custom styling is a normal practice, it is okay to only apply default styles to all HTML elements just like Normalize or TailwindCSS preset. Additionally, themes are meant to be responsive by default so you don't spend more time on issues like navigation bar's box sizing.  

>:warning: Default theme under development

### Templates

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