import 'owl.carousel';
require('./custom-select.js')

$(document).ready(() => {
  ////////////////CAROUSEL/////////////////////////////////////////////////
  var slider = $('#main-slider')
  slider.owlCarousel({
    loop: false,
    rewind: true,
    items: 1,
    dots: false

    //dotsContainer: '#photos-dots'
  })
  slider.on('changed.owl.carousel', (event) => {
    $(".js-list-item").removeClass("active")
    $("#item"+event.item.index).addClass("active")
    $(".progress-bar").find(".complete").css('width', 25*(event.item.index + 1)+'%')
  })
  $('.js-list-item').click((event) => {
    var id = event.currentTarget.id
    slider.trigger('to.owl.carousel', [id.replace('item', '')])
  })
  $('.to-last').click((event) => {
    slider.trigger('to.owl.carousel', [3])
  })
  $('.control_next').click(function() {
      slider.trigger('next.owl.carousel')
  })
  $('.control_prev').click(function() {
      slider.trigger('prev.owl.carousel')
  })
  ////////////////SIDEBAR TOGGLE///////////////////////////////////////////
  $('.js-toggle-menu').click(() => {
    var element = document.querySelector(".sidebar")
    if(element.classList.contains('sidebar-hide')) {
      $('.sidebar').addClass('sidebar-show')
      $('.sidebar').removeClass('sidebar-hide')
    }
    else {
      $('.sidebar').removeClass('sidebar-show')
      $('.sidebar').addClass('sidebar-hide')
    }
  })
  /////////HORIZONTAL CHECK/////////////////////////////////////////////////
  function checkHorizontal() {
    var hght = document.documentElement.clientHeight
    var wdth = document.documentElement.clientWidth
    if(wdth > hght) return true;
    return false;
  }
  function showIfHorizontal() {
    if(checkHorizontal()) {
      $('.warning').css('display', 'none')
    }
    else {
      $('.warning').css('display', 'flex')
    }
  }
  showIfHorizontal()
  window.addEventListener("resize", showIfHorizontal, {passive: true})
  window.addEventListener("orientationchange", showIfHorizontal, {passive: true})
  ///////////////TOGGLE POPUP//////////////////////////////////////////////////////
  $('.js-toggle-popup').click(() => {
    var element = document.querySelector(".js-toggle-popup")
    if(element.classList.contains('active')) {
      $('.popup').css('display', 'none')
      $('.js-toggle-popup').removeClass('active')
    }
    else {
      $('.popup').css('display', 'flex')
      $('.js-toggle-popup').addClass('active')
    }
  })
  ////////////////DARKMODE////////////////////////////////////////////////////////
  $('.js-toggle-light').click(() => {
    var element = document.querySelector(".js-toggle-light")
    if(element.classList.contains('active')) {
      $('body').removeClass('darkmode')
      $('.js-toggle-light').removeClass('active')
    }
    else {
      $('body').addClass('darkmode')
      $('.js-toggle-light').addClass('active')
    }
  })
})
