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
