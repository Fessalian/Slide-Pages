var expect = chai.expect;

var slider,
    wrapperSelector = '.main',
    containerSelector = 'section',
    classForMainContainer = 'sp-container',
    classForPage = 'sp-page',
    classForActivePage = 'active',
    mainWrapperElement, pagesElements;

describe( 'check lopping feature', function() {

    context( 'check looping behavior when option useLooping set to FALSE or not specified while create plugin instance', function () {
        beforeEach(function () {
            pagesElements = document.querySelectorAll( containerSelector );
        });

        afterEach(function () {
            slider.spDestroy();
        });

        it( 'should be disabled by default when try to move up', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer: containerSelector
            });
            slider.spMoveTo( 1 );
            expect( pagesElements.item(0).classList.contains( classForActivePage ) ).to.be.true;
            slider.spMoveUp();
            expect( pagesElements.item(0).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'should be disabled with specified parameter when try to move up', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                useLooping:         false
            });
            slider.spMoveTo( 1 );
            expect( pagesElements.item(0).classList.contains( classForActivePage ) ).to.be.true;
            slider.spMoveUp();
            expect( pagesElements.item(0).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'should be disabled by default when try to move down', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer: containerSelector
            });
            var pageCount = pagesElements.length;
            slider.spMoveTo( pageCount );
            expect( pagesElements.item( pageCount - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            slider.spMoveDown();
            expect( pagesElements.item(  pageCount - 1  ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'should be disabled with specified parameter when try to move down', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                useLooping:         false
            });
            var pageCount = pagesElements.length;
            slider.spMoveTo( pageCount );
            expect( pagesElements.item( pageCount - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            slider.spMoveDown();
            expect( pagesElements.item(  pageCount - 1  ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.false;
        });

    });

    context( 'check looping behavior when option useLooping is enabled', function () {
        var pageCount;
        beforeEach(function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                useLooping:         true
            });
            pagesElements = document.querySelectorAll( containerSelector );
            pageCount = pagesElements.length;
        });

        afterEach(function () {
            slider.spDestroy();
        });

        it( 'should slide top when trigger down on bottom element', function () {
            slider.spMoveTo( pageCount );
            expect( pagesElements.item( pageCount - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            slider.spMoveDown();
            expect( pagesElements.item(0).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( pageCount - 1 ).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'should slide down when trigger top on upper element', function () {
            slider.spMoveTo( 1 );
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.true;
            slider.spMoveUp();
            expect( pagesElements.item( pageCount - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.false;
        });

    });
});



