var expect = chai.expect;

var slider,
    wrapperSelector = '.main',
    containerSelector = 'section',
    classForMainContainer = 'sp-container',
    classForPage = 'sp-page',
    classForActivePage = 'active',
    mainWrapperElement, pagesElements;

describe( 'check animation feature ( easing/animationTime )', function() {

    afterEach(function () {
        slider.spDestroy();
    });

    context( 'check params by default ease/1000', function () {
        before(function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer: containerSelector
            });

            mainWrapperElement = document.querySelector( wrapperSelector );
        });

        it( 'should easing be equal "ease" and animationTime equal 1000 ms ', function () {
            var elementCss = mainWrapperElement.style.cssText;
            expect( elementCss ).to.contain( 'ease' );
            expect( elementCss ).to.contain( '1000' );
        });

    });

    context( 'check params easing and animationTime', function () {
        before(function () {
            slider = slidePages( wrapperSelector, {
                sectionContainer:   containerSelector,
                easing:             'linear',
                animationTime:      500
            });

            mainWrapperElement = document.querySelector( wrapperSelector );
        });

        it( 'should easing be equal "linear" and animationTime equal 500 ms ', function () {
            var elementCss = mainWrapperElement.style.cssText;
            expect( elementCss ).to.contain( 'linear' );
            expect( elementCss ).to.not.contain( 'ease' );
            expect( elementCss ).to.contain( '500' );
            expect( elementCss ).to.not.contain( '1000' );
        });

    });
});



