var prevButton = $(".swiper-prev");
var nextButton = $(".swiper-next");
var prevButtonText = prevButton.find("> .btn-text");
var nextButtonText = nextButton.find("> .btn-text");

var swiper = new Swiper(".swiper", {
  loop: false,
  spaceBetween: 50,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class=${className}>${index + 1}</span>`; // IE에서는 템플릿 리터럴을 사용하면 오류남(기존의 방식으로 바꿔줘야함)
    },
  },
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
  on: {
    // loop가 true인 경우에는 처음 로드할때 init이 없어도 slideChange가 실행이 되기 때문에 빼주는게 좋습니다. (안그러면 init, slideChange 두번이 실행됨)
    init: function (e) {
      ChangeButtonText(e, e.passedParams.loop);
    },
    slideChange: function (e) {
      ChangeButtonText(e, e.passedParams.loop);
    },
  },
});

function ChangeButtonText(event, loop) {
  var slides = event.slides;
  var currentSlideIndex = event.activeIndex;
  var prevSlideIndex = event.activeIndex - 1;
  var nextSlideIndex = event.activeIndex + 1;
  // console.log(`다음 슬라이드 : ${prevSlideIndex}`);
  // console.log(`현재 슬라이드 : ${currentSlideIndex}`);
  // console.log(`다음 슬라이드 : ${nextSlideIndex}`);

  // var currentSlideTitle = slides[currentSlideIndex].dataset.swiperTitle;
  var prevSlideTitle;
  var nextSlideTitle;
  // console.log(prevSlideIndex, nextSlideIndex);

  if (loop) {
    // 루프일 경우
    // 루프일 경우에는 상단에 activeIndex가 실제 index가 아닌 페이지의 번호가 나옵니다.
    // 기존 슬라이드의 개수보다 맨앞, 맨뒤에 하나씩 더생겨 2개가 더 추가됩니다.
    if (prevSlideIndex === -1) {
      prevSlideIndex = slides.length - 3;
    }

    if (nextSlideIndex >= slides.length) {
      nextSlideIndex -= prevSlideIndex;
    }
    prevSlideTitle = slides[prevSlideIndex].dataset.swiperTitle;
    nextSlideTitle = slides[nextSlideIndex].dataset.swiperTitle;
    // console.log(prevSlideTitle, nextSlideTitle);

    prevButtonText.text(prevSlideTitle);
    nextButtonText.text(nextSlideTitle);
  } else {
    // 루프가 아닐 경우
    if (prevSlideIndex >= 0) {
      prevSlideTitle = slides[prevSlideIndex].dataset.swiperTitle;
      prevButton.removeClass("invisible");
      prevButtonText.text(prevSlideTitle);
    } else {
      prevButton.addClass("invisible");
    }

    if (nextSlideIndex >= 0 && nextSlideIndex < slides.length) {
      nextSlideTitle = slides[nextSlideIndex].dataset.swiperTitle;
      nextButton.removeClass("invisible");
      nextButtonText.text(nextSlideTitle);
    } else {
      nextButton.addClass("invisible");
    }
    // console.log(prevSlideTitle, nextSlideTitle);
  }
}
