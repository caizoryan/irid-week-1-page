// Every h1 in the presentation gets a marker automatically.
const rail = document.querySelector('.section-rail');
const headings = [...document.querySelectorAll('main h1')];
const markers = headings.map(heading => {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', heading.textContent.trim());
	let c = 'dash'
	if (heading.textContent.trim() == 'Intention setting activity (AP)') {c += ' extra'}
  button.innerHTML = '<span class="'+c+'"></span><span class="rail-title"><span></span></span>';
  button.querySelector('.rail-title span').textContent = heading.textContent.trim();
  button.addEventListener('click', () => heading.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start'
  }));
  rail.append(button);
  return button;
});

let pending = false;
function updateMarkers() {
  pending = false;
  headings.forEach ( (heading, index) => {
    markers[index].classList.toggle('passed', heading.getBoundingClientRect().top <= innerHeight * 0.3);
  });
}
function scheduleUpdate() {
  if (!pending) {
    pending = true;
    requestAnimationFrame(updateMarkers);
  }
}
addEventListener('scroll', scheduleUpdate, { passive: true });
addEventListener('resize', scheduleUpdate);
updateMarkers();
