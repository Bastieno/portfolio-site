function flipOverlay(el) {
  el.parentElement.parentElement.parentElement.nextElementSibling.style.height = '100%';
}

function closeOverlay(el) {
  el.parentElement.parentElement.parentElement.style.height = '0%';
}

var TypeWriter = function(textElement, words, wait) {
  this.textElement = textElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function() {
  var _this = this;
  var currentWordIndex = this.wordIndex % this.words.length;
  var fullText = this.words[currentWordIndex];

  if(this.isDeleting) {
    //Remov char
    this.txt = fullText.substring(0, this.txt.length - 1)
  } else {
    // Add char
    this.txt = fullText.substring(0, this.txt.length + 1)
  }

  // Insert txt into element
  this.textElement.innerHTML = '<span class="txt">' + this.txt + '</span>'

  // Type speed
  var typeSpeed = 200;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fullText) {
    typeSpeed = this.wait;
    this.isDeleting = true
  } else if(this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed = 500
  }

  setTimeout(function() {
    _this.type()
  }, typeSpeed);
}

function init() {
  var textElement = document.getElementById('text-type');
  var words = JSON.parse(textElement.getAttribute('data-words'));
  var wait = textElement.getAttribute('data-wait');
  new TypeWriter(textElement, words, wait)
}

document.addEventListener('DOMContentLoaded', init);
