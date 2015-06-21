var expect = chai.expect;

var slider,
    wrapperSelector = '.main',
    containerSelector = 'section',
    classForMainContainer = 'sp-container',
    classForPage = 'sp-page',
    classForActivePage = 'active',
    paginationSelector = '.sp-pagination',
    mainWrapperElement, pagesElements,
    paginationUL, paginationLinks;

describe( 'initial placed data', function() {

    context( 'check start up behavior', function () {
        it( 'should not be exist UL before plugin start', function () {
            expect( document.querySelector( paginationSelector ) ).to.be.null;
        });

        it( 'should not be exist UL if it disabled in start up options', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer: containerSelector,
                isPagination: false
            });
            expect( document.querySelector( paginationSelector ) ).to.be.null;
            slider.spDestroy();
        });

        it( 'should be exist UL if it enabled in start up options', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer: containerSelector,
                isPagination: true
            });
            expect( document.querySelector( paginationSelector ) ).to.not.be.null;
            slider.spDestroy();
        });

        it( 'should UL has number of link that equals pages count', function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer: containerSelector
            });
            paginationUL = document.querySelector( paginationSelector );
            paginationLinks = paginationUL.querySelectorAll( 'li' );
            pagesElements = document.querySelectorAll( containerSelector );
            expect( paginationLinks.length ).to.equal( pagesElements.length );
            slider.spDestroy();
        });
    });

    context( 'check pagination behavior when user click link', function () {
        beforeEach(function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer: containerSelector
            });

            paginationUL = document.querySelector( paginationSelector );
            paginationLinks = paginationUL.querySelectorAll( 'li' );
            pagesElements = document.querySelectorAll( containerSelector );
        });

        afterEach(function () {
            slider.spDestroy();
        });

        it( 'click on specified pagination link should activate specified page', function () {
            paginationLinks.item(2).querySelector( 'span' ).click();
            expect( pagesElements.item(2).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.false;
        });

        it( 'repeated click on specified pagination link should activate specified page', function () {
            paginationLinks.item(1).querySelector( 'span' ).click();
            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item(0).classList.contains( classForActivePage ) ).to.be.false;
            paginationLinks.item(1).querySelector( 'span' ).click();
            expect( pagesElements.item(1).classList.contains( classForActivePage ) ).to.be.true;
        });

        it( 'after call method spMoveTo and pagination should change accordingly', function () {
            paginationLinks.item(0).querySelector( 'span' ).click();
            expect( pagesElements.item(0).classList.contains( classForActivePage ) ).to.be.true;
            var lastPageIndex = pagesElements.length;
            slider.spMoveTo( lastPageIndex );
            expect( pagesElements.item( lastPageIndex - 1 ).classList.contains( classForActivePage ) ).to.be.true;
            expect( pagesElements.item( 0 ).classList.contains( classForActivePage ) ).to.be.false;
        });
    });

});
