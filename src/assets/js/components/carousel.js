import { tns } from 'tiny-slider/src/tiny-slider';

export function carousel() {
	return {
		tns: null,
		init() {
			this.tns = tns({
				container: this.$refs.container,
				items: 1,
				slideBy: 1,
				autoplay: false,
				autoHeight: false,
				controls: false,
				nav: false,
				navPosition: 'bottom',
				mouseDrag: true
			});
		},
	};
}
