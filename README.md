# To View My Website

You can use this link: `https://yany-henry.me`, which will lead you to "[Welcome to Henry's Homepage](https://yany-henry.me)".

## To Build Such a Website

1. Register a GitHub account if you don't have one and confirm your e-mail (required!)
1. Fork [this repository](https://github.com/academicpages/academicpages.github.io) by clicking the "fork" button in the top right. 
1. See more info at https://academicpages.github.io/

## Code Memo

font-size: [font-size](_sass/_reset.scss/#L14)  
font-family: [font-family](_sass/_variables.scss/#L32)  
A cozy orange: `#e89b00`  
right-justify: `<span style="float: right;">content</span>`  
no-display link style: `[content](link){: .no-underline-black-link }`

## Local preview

```sh
bundle install
bundle exec jekyll serve --config _config.yml,_config.dev.yml
```

Open `http://localhost:4000`. The development configuration disables analytics.
The site builds with Jekyll; browser scripts no longer require an npm build.
Run `npm run check:js` for a JavaScript syntax check.

## Editing the site

- Content and experience entries: `_pages/`.
- Navigation: `_data/navigation.yml`.
- Profile and analytics settings: `_config.yml`.
- Light/dark colors and shared controls: `_sass/_appearance.scss`.
- Mobile entry alignment and logo layout: `_sass/_responsive.scss`.
- Browser interactions: `assets/js/site.js`.

Keep the commented personal material and existing PDF URLs when updating the site.
Do not include certificates in published output.
