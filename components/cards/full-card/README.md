The card is used to display catalogue items.

There are 4 sections that make up the card. Each section is optional and the order is flexible. 

1. `card-header` is the top section that usually holds a `card-image` component. 
1. `card-body` is flexible section that includes padding so is used for the main text content
1. `card-footer` is used to hold tools and actions. Use child elements `card-footer-left` and `card-footer-right` to position tools
1. `card-slider` is hidden by default can be toggled by adding `is-open` using javascript - useful for revealing extra information

## Theming

A Number of elements on the full card support themeing usisg the global theme classes

1. Card Background inherits `t-background-light` for the background color
1. Card Heading inherits `t-text-main`
1. Card Sub-Heading and Date inherit `t-text-secondary`
