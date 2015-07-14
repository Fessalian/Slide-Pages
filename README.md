#Slide-Pages v1.0

Create an IOS like one page scroll website with plugin written with pure Javascript

## Demo
[View demo](http://jsfiddle.net)


## Usage
Add this HTML snippet to your website.
````html
<body>
  ...
  <div class="wrapper">
    <div class="main">
      <section>...</section>
      <section>...</section>
      ...
    </div>
  </div>
  ...
</body>
````
Add `slide-pages.min.css` and `slide-pages.min.js` to your HTML file.
Now you should call the function to activate plugin as follows:
````javascript
slidePages.(        
'.main',                          // specify wrapper selector contains your scroll pages
  {                               // options
    pageSelector:     'section',  // pointer to page DOM selector
    easing:           'ease',     // CSS3 easing animation
    animationTime:    1000,       // throttle time for animation
    isPagination:     true,       // show or hide the pagination
    useKeyboard:      true,       // use keybord
    useLooping:       false,      // page loop back to the top/bottom
    isChangeHistory:  true,       // update url
    historyOptions:   {           // feature for future
      pageLinks:      false       // you can assign string array to pageLinks for showing custom hashtag for each   page 
    }  
  }
);
````








## Compatibility
Tested on almost on all modern browsers such as Chrome, Safari, Firefox and Opera.
