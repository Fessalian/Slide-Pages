var expect = chai.expect;

var slider,
    wrapperSelector = '.main',
    containerSelector = 'section',
    classForMainContainer = 'sp-container',
    classForPage = 'sp-page',
    classForActivePage = 'active',
    mainWrapperElement, pagesElements;

describe( 'residual the plugin\'s data after destroy', function() {

    before(function () {
        slider = slidePages( wrapperSelector, {
            sectionContainer: containerSelector
        });
        slider.spDestroy();
    });

    context( 'remove required data from the main wrapper element', function () {
        beforeEach(function () {
            mainWrapperElement = document.querySelector( wrapperSelector );
        });

        it( 'should remove class', function () {
            expect( mainWrapperElement.classList.contains( classForMainContainer ) ).to.not.be.true;
        });

        it( 'should remove styles', function () {
            var elementCss = mainWrapperElement.style.cssText;
            expect( elementCss ).to.not.contain( 'transition' );
            expect( elementCss ).to.not.contain( 'transform' );
        });
    });

    context( 'remove required data from the pages elements', function () {
        beforeEach(function () {
            pagesElements = document.querySelectorAll( containerSelector );
        });

        it( 'should remove class', function () {
            for ( var i = 0; i < pagesElements.length; i++ ) {
                expect( pagesElements[i].classList.contains( classForPage ) ).to.be.false;
            };
        });

        it( 'should remove active class', function () {
            var elementsCount = 0;
            for ( var i = 0; i < pagesElements.length; i++ ) {
                if ( pagesElements[i].classList.contains( classForActivePage ) ) {
                    elementsCount ++;
                };
            };
            expect( elementsCount ).to.equal( 0 );
        });
    });
});
