---
title: Theming
---

Sites that require theming can be updated by including a `theme.css` file or a style block in the head - after the main css `<link>` tag. Specific themeing capabilities for each component are outlined in each components' notes

### CSS Variables

The css makes use of custom properties to allow easy theming of colors.

```scss
:root {
  --color-background-light: $color-background-light;
  --color-background: $color-background;
  --color-primary: $color-primary;
  --color-secondary: $color-secondary;
  --color-text:$color-text;
  --color-text-light:$color-text-light;
}
```

**NOTE** 
CSS custom properties are supported in all modern browers but unfortunately you will still need to override classes manually to support Internet Explore and older versions of browsers.

### Helper classes
Some components using global theme helper classes. Override these styles to update text and background colours

Theme classes are prefixed with `t-`.

```scss
.t-text-primary {
  color: $color-primary;
}

.t-background-top {
  background-color: $color-primary;
}

.t-background-nav {
  background-color: $color-primary;
}

.t-background-light {
  background-color: $color-background-light;
}

.t-background {
  background-color: $color-background;
}

.t-text-main {
  color: $color-text;
}

.t-text-secondary {
  color: $color-text-light;
}
```

### Other Components

Some components such as navigation and buttons should be overridden seperately. Details are in each components' notes.
