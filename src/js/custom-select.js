var x, i, j, l, ll, selElmnt, a, b, c;
var navigator = document.getElementById('navigator') // найди применения этого элемента
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  if(selElmnt.options[selElmnt.selectedIndex].innerHTML.length > 10) {
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML.substring(0, 10)+"...";
  }
  else {
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML
  }
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;

    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        var input_selected = h.parentNode.children[0];
        input_selected.value = this.innerHTML
        //console.log(input_selected)
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            if(this.innerHTML.length > 10) {
              h.innerHTML = this.innerHTML.substring(0, 10)+"...";
            }
            else {
              h.innerHTML = this.innerHTML
            }

            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    c.addEventListener('click', countPrice)
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    navigator.classList.toggle('z-index')
  });
}
function shortenString(str, n) {
  if(str.length > n) return str.substring(0, 15) + "..."
  return str
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  navigator.classList.add('z-index')
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
var amount_selected = document.getElementById('amount')
var address_input = document.getElementById('address')
var delivery_selected = document.getElementById('delivery')
var delivery_label = document.getElementById('delivery-label')
var styling_selected = document.getElementById('styling-selected')
var coloring_selected = document.getElementById('coloring-selected')
var format_selected = document.getElementById('format-selected')
var type_selected = document.getElementById('type-selected')
var styling = document.getElementById('styling')
var coloring = document.getElementById('coloring')
var format = document.getElementById('format')
var type = document.getElementById('type')
var total_input = document.getElementById('total')

amount_selected.addEventListener('change', (e)=>{ countPrice() })
delivery_selected.addEventListener('change', (e)=>{ countPrice() })

function countPrice() {

  var price = parseFloat(0)
  var colored
  var sides
  var format_price
  var styling_price = 0
  var delivery_scaler = 0
  var n = parseInt(amount_selected.value)
  if(isNaN(n)) n = 0


  Array.from(coloring.options).forEach((element) => {
    if(element.value == coloring_selected.value) {
      colored = element.dataset.colored
      //console.log(colored)
    }
  })

  Array.from(type.options).forEach((element) => {
    if(element.value == type_selected.value) {
      sides = parseInt(element.dataset.sides)
      //console.log(sides)
    }
  })

  Array.from(format.options).forEach((element) => {
    if(element.value == format_selected.value) {
      if(colored=='true') format_price = parseFloat(element.dataset.colored)
      if(colored=='false') format_price = parseFloat(element.dataset.black)
      //console.log(format_price, element.dataset.colored, element.dataset.black, colored)
    }
  })

  Array.from(styling.options).forEach((element) => {
    if(element.value == styling_selected.value) {
       styling_price = parseFloat(element.dataset.price)
    }
  })
  if(delivery_selected.checked) {
    address_input.style.opacity = '1'
    address_input.required = true
    address_input.disabled = false
    delivery_label.innerHTML = 'доставка<br>включена'
    delivery_scaler = delivery_selected.dataset.delivery
    delivery_selected
  }
  else {
    address_input.style.opacity = '0'
    delivery_scaler = 0
    address_input.required = false
    delivery_label.innerHTML = 'доставка<br>отключена'
    address_input.disabled = true
  }
  console.log(delivery_selected.dataset.delivery, n)

    if(colored != undefined && sides != undefined && format_price != undefined && n != undefined) {
      price += Math.round((( format_price * n ) + styling_price + parseInt(delivery_scaler)) * 100)/100
    }
    //console.log(format_price, n, styling_price)

  var summary = document.getElementById('big-price')
  summary.innerHTML = price + ' р'
  total_input.value = price
}

countPrice()
