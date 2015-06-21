var expect = chai.expect;

var slider,
    wrapperSelector = '.main',
    containerSelector = 'section',
    classForMainContainer = 'sp-container',
    classForPage = 'sp-page',
    classForActivePage = 'active',
    mainWrapperElement, pagesElements;

var keyboardEvent;

describe( 'check hotkey feature based on keyboard keydown events for up/down/left/right', function() {

    before(function () {
        mainWrapperElement = document.querySelector( wrapperSelector );
        pagesElements = document.querySelectorAll( containerSelector );
    });

    context( 'check behavior when pressed DOWN', function () {

        beforeEach(function () {
            keyboardEvent = new Event( 'keydown' );
        });

        afterEach(function () {
            slider.spDestroy();
        });

        it( 'should enabled by default', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector
            });

            slider.spMoveTo( 1 );
            expect( pagesElements.item(0).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.false;

            keyboardEvent.which = 40;
            document.dispatchEvent( keyboardEvent );

            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item(0).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'should enabled by expressly', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                useKeyboard:        true
            });

            slider.spMoveTo( 1 );
            expect( pagesElements.item(0).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.false;

            keyboardEvent.which = 40;
            document.dispatchEvent( keyboardEvent );

            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item(0).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'should disabled by expressly', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                useKeyboard:        false
            });

            slider.spMoveTo( 1 );
            expect( pagesElements.item(0).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.false;

            keyboardEvent.which = 40;
            document.dispatchEvent( keyboardEvent );

            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.false;
        });

    });

    context( 'check behavior when pressed UP', function () {

        beforeEach(function () {
            keyboardEvent = new Event( 'keydown' );
        });

        afterEach(function () {
            slider.spDestroy();
        });

        it( 'should enabled by default', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector
            });

            slider.spMoveTo( pagesElements.length );
            expect( pagesElements.item(  pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.false;

            keyboardEvent.which = 38;
            document.dispatchEvent( keyboardEvent );

            expect( pagesElements.item( pagesElements.length - 2 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'should enabled by expressly', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                useKeyboard:        true
            });

            slider.spMoveTo( pagesElements.length );
            expect( pagesElements.item(  pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.false;

            keyboardEvent.which = 38;
            document.dispatchEvent( keyboardEvent );

            expect( pagesElements.item( pagesElements.length - 2 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'should disabled by expressly', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                useKeyboard:        false
            });

            slider.spMoveTo( pagesElements.length );
            expect( pagesElements.item(  pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.false;

            keyboardEvent.which = 38;
            document.dispatchEvent( keyboardEvent );

            expect( pagesElements.item( pagesElements.length - 2 ).classList.contains( classForActivePage ) ).to.be.false;
        });

    });

    context( 'check behavior when pressed LEFT', function () {

        beforeEach(function () {
            keyboardEvent = new Event( 'keydown' );
        });

        afterEach(function () {
            slider.spDestroy();
        });

        it( 'should enabled by default', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector
            });

            slider.spMoveTo( pagesElements.length );
            expect( pagesElements.item(  pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.false;

            keyboardEvent.which = 37;
            document.dispatchEvent( keyboardEvent );

            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'should enabled by expressly', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                useKeyboard:        true
            });

            slider.spMoveTo( pagesElements.length );
            expect( pagesElements.item(  pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.false;

            keyboardEvent.which = 37;
            document.dispatchEvent( keyboardEvent );

            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'should disabled by expressly', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                useKeyboard:        false
            });

            slider.spMoveTo( pagesElements.length );
            expect( pagesElements.item(  pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.false;

            keyboardEvent.which = 37;
            document.dispatchEvent( keyboardEvent );

            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.false;
        });
    });

   context( 'check behavior when pressed RIGHT', function () {

        beforeEach(function () {
            keyboardEvent = new Event( 'keydown' );
        });

        afterEach(function () {
            slider.spDestroy();
        });

        it( 'should enabled by default', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector
            });

            slider.spMoveTo( 1 );
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 1 ).classList.contains( classForActivePage ) ).to.be.false;

            keyboardEvent.which = 39;
            document.dispatchEvent( keyboardEvent );

            expect( pagesElements.item( pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'should enabled by expressly', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                useKeyboard:        true
            });

            slider.spMoveTo( 1 );
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 1 ).classList.contains( classForActivePage ) ).to.be.false;

            keyboardEvent.which = 39;
            document.dispatchEvent( keyboardEvent );

            expect( pagesElements.item( pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'should disabled by expressly', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                useKeyboard:        false
            });

            slider.spMoveTo( 1 );
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 1 ).classList.contains( classForActivePage ) ).to.be.false;

            keyboardEvent.which = 39;
            document.dispatchEvent( keyboardEvent );

            expect( pagesElements.item( pagesElements.length - 1 ).classList.contains( classForActivePage ) ).to.be.false;
        });
    });
});
