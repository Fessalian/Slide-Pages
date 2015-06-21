/* ===========================================================
 * slide-pages.js v1.0.0
 * ===========================================================
 * Copyright 2015 Vasilchenko Vitaliy.
 * https://github.com/Fessalian/Slide-Pages.git
 *
 * An IOS like scroll website that user can scroll by one page
 *
 * License: GPL v3
 *
 * ========================================================== */
(function ( iWindow, iUndefined ) {

    'use strict';

    var slidePages = function ( iElement, iOptions ) {
        /* cached parameters */
        var iElement = iElement,
            iOptions = iOptions;

        /* declaration for main objects */
        var spCachedBody, spElement, spPages, spPaginationList, spPaginationLinks, spSetings, spPagesCount;

        /* object with helper functions */
        var utilities = {
            /**
             * [throttle - throttle ]
             * @param  {object} iFunction [callback]
             * @param  {numeric} iDelay    [delay of action]
             * @param  {object} iScope    [current scope]
             */
            throttle: function ( iFunction, iDelay, iScope ) {
                var last, deferTimer;
                return function () {
                    var context = iScope || this,
                        now     = +new Date(),
                        args    = arguments;
                    if ( !( last && now < last + iDelay ) ) {
                        last    = now;
                        iFunction.apply( context, args );
                    };
                };
            },
            /**
             * [trim - trim spaces for string]
             * @param  {string} iStr [string for trim]
             * @return {string}      [trimmed string]
             */
            trim: function ( iStr ) {
                if ( iStr.trim ) {
                    return iStr.trim();
                };
                return iStr.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            },
            /**
             * [hasClass - check if element has specified class name]
             * @param  {object}  iElement   [HTML Node element]
             * @param  {string}  iClassName [class name]
             * @return {Boolean}            [true if element has specified class name]
             */
            hasClass: function ( iElement, iClassName ) {
                if ( iElement.className ) {
                    if ( iElement.classList ) {
                        return iElement.classList.contains( iClassName );
                    };
                    return iElement.className.match( new RegExp('(\\s|^)' + iClassName + '(\\s|$)') );
                };
                return false;
            },
            /**
             * [addClass - add new class name to the element's classList]
             * @param  {object}  iElement   [HTML Node element]
             * @param  {string}  iClassName [class name]
             */
            addClass: function ( iElement, iClassName ) {
                if ( iElement.classList ) {
                    return iElement.classList.add( iClassName );
                };
                if ( !this.hasClass( iElement, iClassName ) ) {
                    iElement.className += " " + iClassName;
                    iElement.className = this.trim( iElement.className );
                };
            },
            /**
             * [removeClass - remove specified class name from element's classList]
             * @param  {object}  iElement   [HTML Node element]
             * @param  {string}  iClassName [class name]
             */
            removeClass: function ( iElement, iClassName ) {
                if ( iElement.classList ) {
                    return iElement.classList.remove( iClassName );
                };
                if ( this.hasClass( iElement, iClassName ) ) {
                    var addClassRegexp = new RegExp('(\\s|^)' + iClassName + '(\\s|$)');
                    iElement.className = iElement.className.replace( addClassRegexp, '' );
                    iElement.className = this.trim( iElement.className );
                };
            },
            /**
             * [extend - copy properties from separate objects in one]
             * @param  {object} iSource1 [first donor]
             * @param  {object} iSource2 [second donor]
             * @return {object}          [result object]
             */
            extend: function ( iSource1, iSource2 ) {
                var newObj = {};
                for( var key in iSource1 ) {
                    newObj[key] = iSource1[key];
                    if ( iSource2[key] !== undefined  ) {
                        newObj[key] = iSource2[key];
                    };
                };
                return newObj;
            },
            /**
             * [getElementByIndex - get element by index from NodeList]
             * @param  {object}  iElementsList  [ list of objects ]
             * @param  {numeric} iIndex         [index of element]
             * @return {object}                 [required element by index]
             */
            getElementByIndex: function ( iElementsList, iIndex ) {
                return iElementsList.item( iIndex - 1 );
            },
            /**
             * [findElementWithClass - find element which has specified class name]
             * @param  {object}     iElementsList   [ list of objects ]
             * @param  {numeric}    iElementsCount  [cache page count]
             * @param  {string}     iClassName      [class name]
             * @return {object}                     [element]
             */
            findElementWithClass: function ( iElementsList, iElementsCount, iClassName ) {
                for ( var i = 0; i < iElementsCount; i++ ) {
                    if ( this.hasClass( iElementsList[i], iClassName ) ) {
                        return iElementsList[i];
                    };
                };
            }
        };

        /*  object with helper function for transformation  */
        var transformations = {
            /**
             * [getPreparedCSS - prepare string with transformations]
             * @return {string} [transformations string]
             */
            getPreparedCSS: function () {
                if ( this.getPreparedCSS.cache ) {
                    return this.getPreparedCSS.cache;                                   // return memorized result
                };
                var cssVendors = ['-webkit-', '-moz-', '-ms-', '-o-',''];               // known browsers vendor names
                var preparedCSS = [];

                for ( var i = 0; i < cssVendors.length; i++ ) {
                    preparedCSS.push(
                                        cssVendors[i] + 'transform: translate3d( 0, ' +
                                        '??position??%, 0 );' + cssVendors[i] +
                                        'transition: ' + cssVendors[i] + 'transform ' +
                                        '??animateDelay??ms ' +
                                        '??easing??;'
                                    );
                };
                this.getPreparedCSS.cache = preparedCSS.join( '' );                     // memorize last result
                return preparedCSS.join( '' );
            },
            /**
             * [moveScreen - apply transformation]
             * @param  {object} iWindow         [browser window]
             * @param  {object} iElement        [main wrapper]
             * @param  {numeric} iNewPosition   [new value for transformation]
             * @param  {object} iSettings       [settings]
             */
            moveScreen: function ( iWindow, iElement, iNewPosition, iSettings ) {
                // prepare CSS string with required values
                iElement.style.cssText = this.getPreparedCSS().replace( '??position??',     iNewPosition, 'gm' )
                                                              .replace( '??animateDelay??', iSettings.animationTime, 'gm' )
                                                              .replace( '??easing??',       iSettings.easing, 'gm' );
            }
        };

        /* register event callbacks */
        var eventsCallbacks = {
            /**
             * [mouseWheel - callback for mousewheel event]
             * @param  {object} iEvent      [event object]
             */
            mouseWheel: function ( iEvent ) {
                iEvent.preventDefault();
                iEvent.stopPropagation();
                ( (iEvent.wheelDelta || -iEvent.detail) < 0 ) ? this.spMoveDown() : this.spMoveUp();
            },
            /**
             * [paginationClick - callback for click on pagination menu]
             * @param  {object} iEvent   [event object]
             */
            paginationClick: function( iEvent ) {
                this.spMoveTo( iEvent.currentTarget['spIndex'] || 1 );
            },
            /**
             * [keyDown - callback for keydown event]
             * @param  {object} iElement            [main wrapper]
             * @param  {numeric} iPagesCount        [cached count of pages]
             * @param  {object} iEvent              [event object]
             */
            keyDown: function ( iElement, iPagesCount, iEvent ) {
                iEvent.preventDefault();
                iEvent.stopPropagation();
                if ( iEvent.which === 38 ) {                        // if pressed up button
                    this.spMoveUp( iElement );
                } else if ( iEvent.which === 40 ) {
                    this.spMoveDown( iElement );                    // if pressed down button
                } else if ( iEvent.which === 37 ) {
                    this.spMoveTo( 1 );                             // if pressed left button
                } else if ( iEvent.which === 39 ) {
                    this.spMoveTo( iPagesCount );                   // if pressed right button
                };
            }
        };

        /**
         * [prepareData - prepare required data for slidePages(sp)]
         */
        var prepareData = function () {
            /* parameters by default */
            var defaultParameters = {
                pageSelector:         'section',                                                        // choose DOM selector to find pages
                easing:               'ease',                                                           // what easing should use
                animationTime:        1000,                                                             // time for animation
                isPagination:         true,                                                             // use pagination
                isChangeHistory:      true,                                                             // update url
                historyOptions:       {
                    pageLinks:        false                                                             // page's links
                },
                useKeyboard:          true,                                                             // use keyboards
                useLooping:           false
            };
            /* extend required parameters by custom parameters */
            spSetings       = utilities.extend( defaultParameters, iOptions );

            /* required HTML elements */
            spCachedBody    = iWindow.document.querySelector( 'body' );                                 // cache BODY element
            // string selector or Node
            spElement       = ( typeof iElement === 'string' ) ? spCachedBody.querySelector( iElement ) : iElement;
            spPages         = spCachedBody.querySelectorAll( spSetings.pageSelector );                  // collect pages for sliding

            /* additional data */
            spPagesCount    = spPages.length;
        };

        /**
         * [prepareBrowserHistorySettings - prepare data for browser history links]
         * @param  {object}     iSettings   [global settings]
         * @param  {numeric}    iPagesCount [page count]
         * @return {object}                 [array of prepared links]
         */
        var prepareBrowserHistorySettings = function ( iSettings, iPagesCount ) {
            var linkHrefArray = [],
                historySettings = iSettings.historyOptions,
                hasPageLinksArray = historySettings && historySettings['pageLinks'] && historySettings['pageLinks'][0];

            for ( var i = 0; i < iPagesCount; i++ ) {
                linkHrefArray[i] = '#' + ( hasPageLinksArray && historySettings['pageLinks'][i]  ? historySettings['pageLinks'][i] : i + 1 );
            };
            return linkHrefArray;
        };

        /**
         * [prepareContainer - prepare container for pages(wrapper)]
         * @param  {object} iElement [wrapper element]
         */
        var prepareContainer = function ( iElement ) {
            utilities.addClass( iElement, 'sp-container' );
        };

        /**
         * [preparePages - configure pages]
         * @param  {object}     iPages              [node array of pages]
         * @param  {numeric}    iPagesCount         [cached count of pages]
         * @param  {object}     iPreparedLinks      [links names]
         */
        var preparePages = function ( iPages, iPagesCount, iPreparedLinks ) {
            for ( var i = 0; i < iPagesCount; i++ ) {
                utilities.addClass( iPages[i], 'sp-page' );
                iPages[i]['spIndex'] = i + 1;
                iPages[i]['spHref']  = iPreparedLinks[i];
            };
        };

        /**
         * [preparePagination - prepare pagination HTML template]
         * @param  {object}     iWindow          [browser window]
         * @param  {object}     iCachedBody      [cached document body]
         * @param  {object}     iElement         [main wrapper]
         * @param  {object}     iSettings        [main settings]
         * @param  {numeric}    iPagesCount      [cached count of pages]
         * @param  {object}     iPreparedLinks   [links names]
         * ********************************************************
         * @param  {object} spPaginationList  [pagination list node] implicitly
         * @param  {object} spPaginationLinks [pagination list links nodes] implicitly
         */
        var preparePagination = function ( iWindow, iCachedBody, iElement, iSettings, iPagesCount, iPreparedLinks ) {
            if ( !iSettings.isPagination ) {
                return false;
            };

            var pListHTMLTemplate = '';                                         // storing prepared links href
            for ( var i = 0; i < iPagesCount; i++ ) {                           // collect HTML list template
                pListHTMLTemplate += '<li><span sp-link="' + iPreparedLinks[i] + '"></span></li>';
            };

            spPaginationList = iWindow.document.createElement( 'ul' );          // create node
            utilities.addClass( spPaginationList, 'sp-pagination' );            // add class to node
            spPaginationList.innerHTML = pListHTMLTemplate;                     // fulfill list with HTML template
            // spPaginationList.style.top = -( iCachedBody.clientHeight / 2 );     // adjust to center of screen
            iCachedBody.appendChild( spPaginationList );                        // add node to screen

            spPaginationLinks = spPaginationList.querySelectorAll( 'li span' );

            for ( var i = 0; i < spPaginationLinks.length; i++ ) {
                spPaginationLinks[i]['spIndex'] = i + 1;                        // caching index in the list
                spPaginationLinks[i]['spHref']  = iPreparedLinks[i];            // caching href in the list
            };
        };

        /**
         * [prepareEvents - prepare all events]
         * @param  {object} iWindow          [browser window]
         * @param  {object} iCachedBody      [cached body]
         * @param  {object} iElement         [main wrapper]
         * @param  {object} iPaginationLinks [nodelist with pagination links]
         * @param  {object} iSettings        [main settings]
         * @param  {numeric} iPagesCount     [cached count of pages]
         */
        var prepareEvents = function ( iWindow, iCachedBody, iElement, iPaginationLinks, iSettings, iPagesCount ) {
            // calculate 20% of delay for animation
            var delay = iSettings.animationTime + ( iSettings.animationTime * 0.2 );

            // mousewheel events. change callback for using removeEventListener
            eventsCallbacks.mouseWheel = utilities.throttle( eventsCallbacks.mouseWheel.bind( this ), delay );
            iWindow.document.addEventListener( 'mousewheel',     eventsCallbacks.mouseWheel );
            iWindow.document.addEventListener( 'DOMMouseScroll', eventsCallbacks.mouseWheel );

            // pagination links click event
            if ( iSettings.isPagination ) {
                eventsCallbacks.paginationClick = utilities.throttle( eventsCallbacks.paginationClick.bind( this ), delay );
                for ( var i = 0; i < iPaginationLinks.length; i++ ) {
                    iPaginationLinks[i].addEventListener( 'click', eventsCallbacks.paginationClick );
                };
            };
            // keyboard event
            if ( iSettings.useKeyboard ) {
                eventsCallbacks.keyDown = utilities.throttle( eventsCallbacks.keyDown.bind( this, iElement, iPagesCount ), delay );
                iWindow.document.addEventListener( 'keydown', eventsCallbacks.keyDown );
            };
        };

        /**
         * [changeBrowserHistory - change browser history]
         * @param  {object}     iWindow         [browser window]
         * @param  {object}     iSettings       [main settings]
         * @param  {numeric}    iPagesCount     [count of pages]
         * @param  {object}     iPage           [page]
         * @return {bool}                       [return value]
         */
        var changeBrowserHistory = function ( iWindow, iSettings, iPagesCount, iPage ) {
            if ( !iSettings.isChangeHistory ) {                                                      // if enabled isChangeHistory
                return false;
            };

            if ( !( iWindow.history && iWindow.history.pushState ) ) {                             // if browser has history api
                return false;
            };

            var pageIndex = iPage['spIndex'],
                pageLink  = iPage['spHref'];

            if ( !( pageIndex && pageLink ) ) {
                return false;
            };

            if ( pageIndex > iPagesCount || pageIndex < 1 ) {                                    // if index between 0 and max page count
                return false;
            };

            iWindow.history.pushState( {}, iWindow.document.title, pageLink );
        };

        /**
         * [changePaginationLinks - change pagination link active]
         * @param  {object}     iSettings           [main settings]
         * @param  {object}     iPaginationLinks    [nodelist with pagination links]
         * @param  {numeric}    iPageIndex          [page index]
         */
        var changePaginationLinks = function ( iSettings, iPaginationLinks, iPageIndex ) {
            if ( iSettings.isPagination ) {                                            // add class to active pagination link
                var activeLink = utilities.findElementWithClass( iPaginationLinks, iPaginationLinks.length, 'active' );
                if ( activeLink ) {
                    utilities.removeClass( activeLink, 'active' );
                };
                utilities.addClass( utilities.getElementByIndex( iPaginationLinks, iPageIndex ), 'active' );
            };
        };

        /**
         * [getStartPage - get page index on the starting by address link]
         * @param  {object}     iWindow             [browser window]
         * @param  {object}     iSettings           [main settings]
         * @param  {object}     iPreparedLinks      [links names]
         * @return {numeric}                        [page index]
         */
        var getStartPage = function ( iWindow, iSettings, iPreparedLinks ) {
            var href = iWindow.location.href,
                hrefLastChunk = href.lastIndexOf( '#' );                                                  // last chunk

            href = href.substr( hrefLastChunk );

            if ( iPreparedLinks.indexOf( href ) !== -1 ) {
                return iPreparedLinks.indexOf( href ) + 1;
            };
            return 1;                                                                                   // default value
        };

        /**
         * [initialize - init behavior]
         * @return {[type]} [description]
         */
        var initialize = function () {
            prepareData();                                                                              // prepare all main declarations
            prepareContainer( spElement );                                                              // configure main container

            var preparedLinks = prepareBrowserHistorySettings( spSetings, spPagesCount );

            preparePages.call( this, spPages, spPagesCount, preparedLinks );                            // init pages
            preparePagination.call( this, iWindow, spCachedBody, spElement, spSetings, spPagesCount, preparedLinks );   // setup pagination
            prepareEvents.call( this, iWindow, spCachedBody, spElement, spPaginationLinks, spSetings, spPagesCount );  // setup events

            var startIndex = getStartPage( iWindow, spSetings, preparedLinks );                                    // specify starting page index
            var currentPage = utilities.getElementByIndex( spPages, startIndex );                       // get page by starting index

            transformations.moveScreen( iWindow, spElement, -((startIndex - 1) * 100), spSetings );

            utilities.addClass( currentPage, 'active' );                                                // add class to starting

            changePaginationLinks( spSetings, spPaginationLinks, startIndex );                          // change pagination
            changeBrowserHistory( iWindow, spSetings, spPagesCount, currentPage );                      // change browser history if enabled

            return true;
        };

        /**
         * [spMoveTo - public function to move screen to specified page's index ]
         * @param  {numeric} iPageIndex [page index]
         */
        this.spMoveTo = function( iPageIndex ) {
            if ( iPageIndex > spPagesCount || iPageIndex < 1 ) {                                         // if index between 0 and max page count
                return false;
            };

            var position    = -( ( iPageIndex - 1 ) * 100 ),                                             // calculate new position
                activePage  = utilities.findElementWithClass( spPages, spPagesCount, 'active' ),         // find page which active class
                nextElement = utilities.getElementByIndex( spPages, iPageIndex );                        // find page by index

            if ( iPageIndex === activePage['spIndex'] ) {                                                // if new index the same like active page index
                return false;
            };

            transformations.moveScreen( iWindow, spElement, position, spSetings );                       // move screen in required position

            utilities.removeClass( activePage, 'active' );                                               // toggle Active page
            utilities.addClass( nextElement, 'active' );

            changePaginationLinks( spSetings, spPaginationLinks, nextElement['spIndex']  );              // change pagination
            changeBrowserHistory( iWindow, spSetings, spPagesCount, nextElement );                       // change browser history if enabled
        };

        /**
         * [spMoveUp - public function to move screen up ]
         */
        this.spMoveUp = function () {
            var position        = -( ( spPagesCount - 1 ) * 100),                                        // calculate new position
                nextElement,
                activePage      = utilities.findElementWithClass( spPages, spPagesCount, 'active' ),     // find page which active class
                activePageIndex = activePage['spIndex'];                                                 // get index from active page

            if ( activePageIndex === 1 ) {                                                               // if active is first page
                if ( !spSetings.useLooping ) {                                                           // check should loop scroll
                    return false;
                };
                nextElement = utilities.getElementByIndex( spPages, spPagesCount );                      // find next page
            } else {
                nextElement = utilities.getElementByIndex( spPages, activePageIndex - 1 );               // find next page
                position    = -( ( nextElement['spIndex'] - 1 ) * 100);                                  // calculate new position
            };

            transformations.moveScreen( iWindow, spElement, position, spSetings );                       // move screen in required position

            utilities.removeClass( activePage, 'active' );                                               // toggle Active page
            utilities.addClass( nextElement, 'active' );

            changePaginationLinks( spSetings, spPaginationLinks, nextElement['spIndex']  );              // change pagination
            changeBrowserHistory( iWindow, spSetings, spPagesCount, nextElement );                       // change browser history if enabled
        };

        /**
         * [spMoveDown - public function to move screen down ]
         */
        this.spMoveDown = function () {
            var position        = 0,                                                                      // zeroing positions
                nextElement,
                activePage      = utilities.findElementWithClass( spPages, spPagesCount, 'active' ),      // find page which active class
                activePageIndex = activePage['spIndex'];                                                  // get index from active page

            if ( spPagesCount > activePageIndex ) {                                                       // if active page's index less than page's count
                nextElement = utilities.getElementByIndex( spPages, activePageIndex + 1 );                // find next page
                position    = -( activePageIndex * 100 );                                                 // calculate new position
            } else if ( spPagesCount === activePageIndex ) {                                              // if active is last page
                if ( !spSetings.useLooping ) {                                                            // check should loop scroll
                  return false;
                };
                nextElement = utilities.getElementByIndex( spPages, 1 );                                  // find next page
            };

            transformations.moveScreen( iWindow, spElement, position, spSetings );                        // move screen in required position

            utilities.removeClass( activePage, 'active' );                                                // toggle Active page
            utilities.addClass( nextElement, 'active' );

            changePaginationLinks( spSetings, spPaginationLinks, nextElement['spIndex']  );               // change pagination
            changeBrowserHistory( iWindow, spSetings, spPagesCount, nextElement );                        // change browser history if enabled
        };

        /**
         * [spDestroy - public function for destroying plugin object]
         */
        this.spDestroy = function () {
            if ( !iWindow.slidePages.isEnabled ) {                                                        // go out if a plugin is disabled
                return false;
            };

            spElement.removeAttribute( 'style' );                                                         // remove styles from main wrapper
            utilities.removeClass( spElement, 'sp-container' );                                           // remove class from main wrapper

            // remove events and delete DOM element
            if ( spSetings.isPagination ) {
                for ( var i = 0; i < spPaginationLinks.length; i++ ) {
                    spPaginationLinks[i].removeEventListener( 'click', eventsCallbacks.paginationClick ); // remove listener
                };
                spPaginationList.parentNode.removeChild( spPaginationList );                              // remove pagination ul
            };

            // remove events for mousewheel
            iWindow.document.removeEventListener( 'mousewheel', eventsCallbacks.mouseWheel );             // remove listener

            // remove events for mousewheel
            if ( spSetings.useKeyboard ) {
                iWindow.document.removeEventListener( 'keydown', eventsCallbacks.keyDown );               // remove listener
            };

            // remove extra info from pages
            for ( var i = 0; i < spPagesCount; i++ ) {
                utilities.removeClass( spPages[i], 'sp-page' );                                           // delete class
                utilities.removeClass( spPages[i], 'active' );                                            // delete class
                delete spPages[i]['spIndex'];                                                             // delete property
                delete spPages[i]['spHref'];                                                              // delete property
            };

            spCachedBody = spElement = spPages = spPaginationList = spPaginationLinks =
            spSetings = spPagesCount = utilities = transformations = eventsCallbacks =
            prepareData = prepareBrowserHistorySettings = prepareContainer = preparePages =
            preparePagination = prepareEvents = changeBrowserHistory = changePaginationLinks =
            getStartPage = initialize = iElement = iOptions = null;                                       // zeroing all variables

            iWindow.slidePages.isEnabled = false;                                                         // set flag about disabling
        };

        initialize.call( this );                                                                          // invoke initializer
    };

    iWindow.slidePages = function ( iElement, iOptions ) {
        if ( iWindow.slidePages.isEnabled ) {
            return false;
        };
        iWindow.slidePages.isEnabled = true;
        return new slidePages( iElement, iOptions );
    };

})( window, undefined );
