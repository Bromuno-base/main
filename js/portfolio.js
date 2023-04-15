
const button = document.getElementById('dragButton');
const imageList = document.querySelector('.portfolio-line');
const pThumbNailFrame = document.querySelectorAll('.p-thumbnail-frame');
const line = document.querySelector('.line');

let isDragging = false;
const SCROLL_INCREMENT = 50;
const DRAG_INCREMENT = 10;
let maxLeft = line.offsetWidth - button.offsetWidth;
let sliderWidth = 0;
let buttonWidth = 0;
let scrollPosition = 0;

pThumbNailFrame.forEach((element,index) => {

  console.log(element);
  element.addEventListener('mouseenter', () => {
    const thumbnailNAme = 'Project name ' + index;
    const thumbnailTitle = 'Project title ' + index;
    element.style.setProperty('--thumbnail-title', `"${thumbnailTitle}"`);
    element.style.setProperty('--thumbnail-name', `"${thumbnailNAme}"`);
    console.log('hello'+index );
  });
  
  // element.addEventListener('mouseleave', () => {
  //   console.log('hi');
  //   element.style.setProperty('--after-content', 'New content');
  // });
});


function updateDimensions() {
  maxLeft = line.offsetWidth - button.offsetWidth;
  sliderWidth = document.querySelector('.infinite-slider').offsetWidth;
  buttonWidth = button.offsetWidth;
  const scrollWidth = imageList.scrollWidth;
  const maxPosition = scrollWidth - imageList.offsetWidth;
  scrollPosition = Math.min(scrollPosition, maxPosition);
  const position = (scrollPosition / maxPosition) * (sliderWidth - buttonWidth);
  button.style.left = `${position}px`;
}

updateDimensions();

button.addEventListener('mousedown', (event) => {
  isDragging = true;
  button.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const x = event.clientX;
    const position = Math.min(Math.max(0, x - buttonWidth / 2), sliderWidth - buttonWidth);
    button.style.left = `${position}px`;
    const scrollWidth = imageList.scrollWidth;
    const maxPosition = scrollWidth - imageList.offsetWidth;
    scrollPosition = position / (sliderWidth - buttonWidth) * maxPosition;
    imageList.scrollTo(scrollPosition, 0);
  }
  
});

document.addEventListener('mouseup', (event) => {
  isDragging = false;
  button.style.cursor = 'pointer';
});

imageList.addEventListener('scroll', (e) => {
  scrollPosition = imageList.scrollLeft;
//   updateDimensions();
});

imageList.addEventListener('wheel', (e) => {
  e.preventDefault();
  const scrollWidth = imageList.scrollWidth;
  const maxPosition = scrollWidth - imageList.offsetWidth;
  const position = scrollPosition / maxPosition * (sliderWidth - buttonWidth);
  imageList.scrollLeft += e.deltaY * SCROLL_INCREMENT;
  updateDimensions();
});

window.addEventListener('resize', (event) => {
  updateDimensions();
});

button.style.transition = 'left 0.5s ease-out';
imageList.style.transition = 'left 0.5s ease-out';
