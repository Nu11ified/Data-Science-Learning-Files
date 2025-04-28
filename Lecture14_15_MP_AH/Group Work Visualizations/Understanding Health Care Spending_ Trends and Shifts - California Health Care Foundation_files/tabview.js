// Minimal tabview implementation - just headers, links & content
// Renders as an accordion on small screens.

const tabs = Array.from(document.querySelectorAll('.tabview__panel'));
const buttons = Array.from(document.querySelectorAll('.tabview__button'));
const sections = tabs.map(tab => tab.id);

const showTab = (id) => {
	const newTab = document.getElementById(id);
	tabs.map((tab, i) => {
		tab.classList.remove('is-active');
		buttons[i].classList.remove('active');
		if (tab == newTab) {
			tab.classList.add('is-active');
			buttons[i].classList.add('active');
			tab.focus();
		}
	});
}

buttons.map(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		window.history.replaceState({}, '', button.hash);
		showTab(button.hash.substr(1));
	});
});

window.addEventListener('DOMContentLoaded', () => {
	if (sections.includes(window.location.hash.substring(1))) {
		showTab(window.location.hash.substring(1));
	}
});
