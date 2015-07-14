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

## Public Methods
You can also change page through script:
````javascript
  var slider = slidePages( '.main', {
    sectionContainer: 'section'
  });
````
### .spMoveUp()
Allows you to move a page up by one.

````javascript
slider.spMoveUp()
````

### .spMoveDown()
Allows you to move a page down by one.

````javascript
slider.spMoveDown();
````

### .spMoveTo( iPageIndex )
Allows you to move to the specified page index.

````javascript
slider.spMoveDown( 2 );
````

### .spDestroy
Allows you to destroy all plugin data. Including events.
````javascript
slider.spDestroy();
````

## Comments Coverage
Good and understandable code coverage with documentation for methods, logical parts & etc. It can help you.

## Tests Coverage
Dense tests coverage with Mocha for your confidence.
Just open `/tests/tests.html` in your browser. And check tests result.

## Compatibility
Tested almost on all modern browsers such as Chrome, Safari, Firefox and Opera.
