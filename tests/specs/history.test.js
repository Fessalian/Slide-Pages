var expect = chai.expect;

var slider,
    wrapperSelector = '.main',
    containerSelector = 'section',
    classForMainContainer = 'sp-container',
    classForPage = 'sp-page',
    classForActivePage = 'active',
    mainWrapperElement, pagesElements;

describe( 'check feature that change browser url', function() {

    context( 'check behavior of the feature with various isChangeHistory option states', function () {

        beforeEach(function () {
            pagesElements = document.querySelectorAll( containerSelector );
        });

        afterEach(function () {
            slider.spDestroy();
        });

        it( 'check behavior if isChangeHistory is disabled', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                isChangeHistory:    false
            });

            slider.spMoveTo( 1 );
            var prevLocation = window.document.location.href;
            slider.spMoveTo( pagesElements.length );
            expect( prevLocation ).to.equal(  window.document.location.href );
        });

        it( 'check behavior if isChangeHistory is enabled by default', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector
            });

            slider.spMoveTo( 1 );
            var prevLocation = window.document.location.href;
            slider.spMoveTo( pagesElements.length );
            expect( prevLocation ).to.not.equal(  window.document.location.href );
        });

        it( 'check behavior if isChangeHistory is enabled expressly', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                isChangeHistory:    true
            });

            slider.spMoveTo( 1 );
            var prevLocation = window.document.location.href;
            slider.spMoveTo( pagesElements.length );
            expect( prevLocation ).to.not.equal(  window.document.location.href );
        });
    });

    context( 'check behavior of the feature with various historyOptions.pageLinks option states', function () {

        beforeEach(function () {
            pagesElements = document.querySelectorAll( containerSelector );
        });

        afterEach(function () {
            slider.spDestroy();
        });

        it( 'check behavior if historyOptions.pageLinks equals undefined', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:       containerSelector,
                historyOptions:         {
                    pageLinks:              undefined
                                        }
            });

            slider.spMoveTo( 1 );
            var prevLocation = window.document.location.href;
            slider.spMoveTo( pagesElements.length );
            expect( prevLocation ).to.not.equal(  window.document.location.href );
            expect( window.document.location.hash ).to.contain( "#" + pagesElements.length );
            var prevLocation = window.document.location.href;

            slider.spMoveTo( 1 );
            expect( prevLocation ).to.not.equal(  window.document.location.href );
            expect( window.document.location.hash ).to.contain( "#" + 1 );
        });

        it( 'check behavior if historyOptions.pageLinks equals empty array', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:       containerSelector,
                historyOptions:         {
                    pageLinks:              []
                                        }
            });

            slider.spMoveTo( 1 );
            var prevLocation = window.document.location.href;
            slider.spMoveTo( pagesElements.length );
            expect( prevLocation ).to.not.equal(  window.document.location.href );
            expect( window.document.location.hash ).to.contain( "#" + pagesElements.length );
            var prevLocation = window.document.location.href;

            slider.spMoveTo( 1 );
            expect( prevLocation ).to.not.equal(  window.document.location.href );
            expect( window.document.location.hash ).to.contain( "#" + 1 );
        });

        it( 'check behavior if historyOptions.pageLinks equals partially filled array of strings', function () {
            var linksArray = ['first', 'second'];
            slider = slidePages( wrapperSelector, {
                sectionContainer:       containerSelector,
                historyOptions:         {
                    pageLinks:              linksArray
                                        }
            });

            slider.spMoveTo( 1 );
            expect( window.document.location.hash ).to.contain( "#" + linksArray[0] );

            slider.spMoveTo( 2 );
            expect( window.document.location.hash ).to.contain( "#" + linksArray[1] );

            slider.spMoveTo( pagesElements.length );
            expect( window.document.location.hash ).to.contain( "#" + pagesElements.length );
        });
    });

    context( 'check start up behavior of the feature', function () {

        beforeEach(function () {
            pagesElements = document.querySelectorAll( containerSelector );
        });

        afterEach(function () {
            slider.spDestroy();
        });

        it( 'check behavior if browser location hash has not any appropriate value', function () {
            window.history.pushState( {}, document.title, '#unknownvalue' );
            slider = slidePages( wrapperSelector, {
                sectionContainer:       containerSelector
            });

            expect( window.document.location.hash ).to.contain( "#" + 1 );
        });

        it( 'check behavior if browser location hash has appropriate value', function () {
            window.history.pushState( {}, document.title, '#3' );
            slider = slidePages( wrapperSelector, {
                sectionContainer:       containerSelector
            });

            expect( window.document.location.hash ).to.contain( "#" + 3 );
            expect( pagesElements.item(2).classList.contains( classForActivePage ) ).to.be.true;
        });

    });

});



