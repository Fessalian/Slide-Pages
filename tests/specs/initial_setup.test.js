var expect = chai.expect;

var slider,
    wrapperSelector = '.main',
    containerSelector = 'section',
    classForMainContainer = 'sp-container',
    classForPage = 'sp-page',
    classForActivePage = 'active',
    mainWrapperElement, pagesElements;

describe( 'initial placed data', function() {

    before(function () {
        slider = slidePages( wrapperSelector, {
            sectionContainer: containerSelector
        });
    });

    after(function () {
        slider.spDestroy();
    });

    context( 'add required data to the main wrapper element', function () {
        beforeEach(function () {
            mainWrapperElement = document.querySelector( wrapperSelector );
        });

        it( 'should add class', function () {
            expect( mainWrapperElement.classList.contains( classForMainContainer ) ).to.be.true;
        });

        it( 'should add styles', function () {
            var elementCss = mainWrapperElement.style.cssText;
            expect( elementCss ).to.contain( 'transition' );
            expect( elementCss ).to.contain( 'transform' );
        });
    });

    context( 'add required data to the pages elements', function () {
        beforeEach(function () {
            pagesElements = document.querySelectorAll( containerSelector );
        });

        it( 'should add class', function () {
            for ( var i = 0; i < pagesElements.length; i++ ) {
                expect( pagesElements[i].classList.contains( classForPage ) ).to.be.true;
            };
        });

        it( 'should add active class to only one page', function () {
            var elementsCount = 0;
            for ( var i = 0; i < pagesElements.length; i++ ) {
                if ( pagesElements[i].classList.contains( classForActivePage ) ) {
                    elementsCount ++;
                };
            };
            expect( elementsCount ).to.equal( 1 );
        });
    });

    context( 'try to enable plugin twice', function () {
        it( 'should return FALSE when plugin try to init second time', function () {
            var secondPluginInstance = slidePages( wrapperSelector, { sectionContainer: containerSelector });
            expect( secondPluginInstance ).to.be.false;
        });
    });
});
