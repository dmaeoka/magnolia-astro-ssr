import Alpine from 'alpinejs';
import Macy from 'macy';
import intersect from '@alpinejs/intersect';
import persist from "@alpinejs/persist";
import { navbar } from './components/navbar';
import { carousel } from './components/carousel';

window.Alpine = Alpine;
Alpine.plugin(intersect);
Alpine.plugin(persist);
window.navbar = navbar;
window.carousel = carousel;
window.Macy = Macy;

Alpine.store("app", {
	init() {
		this.isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	},
	isDark: Alpine.$persist(false),
	isLoggedIn: Alpine.$persist(false),
});

Alpine.start();

var macy = Macy({
	container: '#macy-container',
	trueOrder: false,
	waitForImages: false,
	margin: 24,
	columns: 6,
	breakAt: {
		1200: 5,
		940: 3,
		520: 2,
		400: 1
	}
});
