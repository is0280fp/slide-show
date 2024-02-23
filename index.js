//スライドの枚数
const slideLength = document.querySelectorAll('.carousel__list').length;
const slideList = document.querySelectorAll('.carousel__list');
const slideListStyle = getComputedStyle(slideList[0]);

//スライド間の余白 = "30px"
const slideInterval = slideListStyle.getPropertyValue('margin-right');

//スライド間の余白を”文字列”として取得 = "30"
const slideIntervalValueStr = slideInterval.replace('px', '');

//スライド間の余白を数値へ変換 = 30
const slideIntervalValue = Number(slideIntervalValueStr);

//スライドの幅＋余白の幅
const slideWidth = document.querySelector('.carousel').clientWidth + slideIntervalValue;
// 30 * 5 = 150
const slideIntervalTotal = slideIntervalValue * slideLength;

//カルーセル全体の横幅
const slideAreaWidth = `${slideWidth * slideLength + slideIntervalTotal}px`;
const slideArea = document.querySelector('.carousel__area');

//[.carousel__area]の横幅(width)を指定
slideArea.style.width = slideAreaWidth;
const slideBackBtn = document.querySelector('.back');
const slideNextBtn = document.querySelector('.next');

let slideCurrentIndex = 0;
const slideLastIndex = slideLength - 1;

function changeSlide() {
    //スライドが移動する幅を指定
    const slideMove = slideCurrentIndex * slideWidth;
    //[carousel__area]にwill-change:transform;を指定
    slideArea.style.willChange = 'transform'
    slideArea.animate(
        {
            transform: `translateX(-${slideMove}px)` 
        }
        , 
        {
            duration: 500,
            fill: 'forwards'
        }
    );
}

const paginationBtnWrapper = document.querySelector(".carousel__pagination");
const paginationBtns = Array.from(paginationBtnWrapper.children);
let targetIndex = 0;
paginationBtnWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains('carousel__paginationCircle')) {
        targetIndex = paginationBtns.indexOf(e.target);
        changeCurrentBtn(slideCurrentIndex, targetIndex, paginationBtns)
        slideCurrentIndex = targetIndex;
        changeSlide();
    }
})

function changeCurrentBtn(currentIndex, targetIndex, btnArray) {
    btnArray[currentIndex].classList.remove("target")
    btnArray[targetIndex].classList.add("target");
}

slideNextBtn.addEventListener('click', () => {
    prevIndex = slideCurrentIndex
    if (slideCurrentIndex === slideLastIndex) {
        slideCurrentIndex = 0;
        changeSlide();
        changeCurrentBtn(prevIndex, slideCurrentIndex, paginationBtns)
    } else {
        slideCurrentIndex++;
        changeSlide();
        changeCurrentBtn(prevIndex, slideCurrentIndex, paginationBtns)
    }
})

slideBackBtn.addEventListener('click', () => {
    prevIndex = slideCurrentIndex
    if (slideCurrentIndex === 0) {
        slideCurrentIndex = slideLastIndex;
        changeSlide();
        changeCurrentBtn(prevIndex, slideCurrentIndex, paginationBtns)
    } else {
        slideCurrentIndex--;
        changeSlide();
        changeCurrentBtn(prevIndex, slideCurrentIndex, paginationBtns)
    }
});