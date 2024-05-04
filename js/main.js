// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function (event) {
  //클릭이 전파되지 않게
  event.stopPropagation();
  // 클래스가 있는지 없는지 확인하는 것
  basketEl.classList.contains('show'); //없으면 false 반환

  if (basketEl.classList.contains('show')) {
    //hide
    hideBasket();
  } else {
    //show
    showBasket();
  }
});

basketEl.addEventListener('click', function (event) {
  // 장바구니 영역에서 토글을 누른 것이 아닌 것으로 인식되게 버블링 멈춤
  event.stopPropagation();
});

window.addEventListener('click', function () {
  //다른 곳을 클릭하면 보이지 않게
  basketEl.classList.remove('show');
  //근데 이렇게만 하면 장바구니를 클릭해도 보이지 않게된다. 장바구니클릭이 윈도우까지 전파되니까
});

//함수를 사용해서 내용을 더 직관적으로 알 수 있도록 추상화
function showBasket() {
  basketEl.classList.add('show');
}
function hideBasket() {
  basketEl.classList.remove('show');
}

// 검색!
const headerEl = document.querySelector('header');

// ...은 전개연산자 headerEl.querySelectorAll('ul.menu > li')을 통해서 반환된 내용이 전개연산자를 통해서 해체됨 그리고 해체된 것이 []로 묶인다
// 이렇게 배열로 하면 더 많은 함수를 사용할 수 있다
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];

const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const SearchShadowEl = searchWrapEl.querySelector('.shadow');
const SearchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

searchStarterEl.addEventListener('click', showSearching);
searchCloserEl.addEventListener('click', hideSearching);
SearchShadowEl.addEventListener('click', hideSearching);

// searching이라는 함수로 검색 header에 searching 클래스 추가
function showSearching() {
  headerEl.classList.add('searching');
  // html의 html요소 찾는 방법
  document.documentElement.classList.add('fixed');
  //console.log(headerMenuEls.reverse()); // -> 장바구니부터 사라지게 해야한다

  headerMenuEls.reverse().forEach(function (el, index) {
    // 딜레이가 0.4초 내에 진행되도록 할건데 그 안에 순차적으로 사라지게 할 것이다
    //.length는 몇개가 알 수 있는지 함수 -> 나중에 ul태그가 추가되어도 자동으로 되게
    // index가 0부터 시작하니까 11까지 나오게 되고 순차적으로 사라지게 한다
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + 's';
  });

  searchDelayEls.forEach(function (el, index) {
    // search 안에 있는 li가 순차적으로 나타나게 하기
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + 's';
  });

  // 검색 input에 포커스 넣기 다 나타나고 난 뒤에 포커스 넣기
  setTimeout(function () {
    SearchInputEl.focus();
  }, 600);
}
function hideSearching() {
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');

  //showSearching에서 뒤집은 것을 다시 뒤집으니까 원래대로 순차적으로 적용이 된다
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + 's';
  });

  searchDelayEls.reverse().forEach(function (el, index) {
    // 반대 순서로 사라지게 하기
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + 's';
  });
  // 이후에도 순차적으로 나타나도록 다시 뒤집기
  searchDelayEls.reverse();

  SearchInputEl.value = '';
}
