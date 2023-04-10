'use strict';
//
const lightStyles = document.querySelectorAll(
	'link[rel=stylesheet][media*=prefers-color-scheme][media*=light]'
);
const darkStyles = document.querySelectorAll(
	'link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]'
);
const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
const switcher = document.querySelector('#switcher');
const switcherRadios = switcher.querySelectorAll('.switcher__radio');

//
const getSystemScheme = function () {
	return darkSchemeMedia.matches ? 'dark' : 'light';
};
const getSavedScheme = function () {
	const scheme = window.localStorage.getItem('color-scheme');
	return scheme;
};
const saveScheme = function (scheme) {
	window.localStorage.setItem('color-scheme', scheme);
};
const deleteSavedScheme = function () {
	window.localStorage.removeItem('color-scheme');
};
//
const switchMedia = function (scheme) {
	//
	let lightMedia;
	let darkMedia;

	switch (scheme) {
		case 'light':
			lightMedia = 'all';
			darkMedia = 'not all';
			break;
		case 'dark':
			lightMedia = 'not all';
			darkMedia = 'all';
			break;
		default:
			lightMedia = '(prefers-color-scheme: light)';
			darkMedia = '(prefers-color-scheme: dark)';
			break;
	}
	[...lightStyles].forEach(link => {
		link.media = lightMedia;
	});
	[...darkStyles].forEach(link => {
		link.media = darkMedia;
	});
};
//
const setScheme = function (scheme) {
	switchMedia(scheme);
	scheme === 'auto' ? deleteSavedScheme() : saveScheme(scheme);
};

const setupSwitcher = function (savedScheme) {
	if (savedScheme) {
		switcherRadios.forEach(radio => {
			if (radio.value === savedScheme) radio.checked = true;
		});
	} else {
		switcherRadios.forEach(radio => {
			if (radio.value === 'auto') radio.checked = true;
		});
	}

	[...switcherRadios].forEach(radio => {
		radio.addEventListener('change', e => {
			setScheme(e.target.value);
		});
	});
};

const setupScheme = function () {
	//
	const savedScheme = getSavedScheme();
	const systemScheme = getSystemScheme();
	//
	setupSwitcher(savedScheme);

	if (!savedScheme) return;
	if (savedScheme !== systemScheme) setScheme(savedScheme);
};
setupScheme();
