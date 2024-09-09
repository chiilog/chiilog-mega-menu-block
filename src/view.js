import { store, getContext } from '@wordpress/interactivity';

const { actions } = store( 'chiilog/chiilog-mega-menu-block', {
	actions: {
		onMouseEnter() {
			const context = getContext();
			const mediaQuery = window.matchMedia(`(min-width: ${context.breakpoint}px)`);
			if ( mediaQuery.matches ) {
				actions.openMegaMenu();
			}
		},
		onMouseLeave() {
			const context = getContext();
			const mediaQuery = window.matchMedia(`(min-width: ${context.breakpoint}px)`);
			if ( mediaQuery.matches ) {
				actions.closeMegaMenu();
			}
		},
		openMegaMenu() {
			const context = getContext();
			context.isOpen = true;
		},
		closeMegaMenu() {
			const context = getContext();
			context.isOpen = false;
		},
		toggleMegaMenu() {
			const context = getContext();
			context.isOpen = !context.isOpen;
		}
	},
	callbacks: {
		initResizeListener() {
			const context = getContext();
			context.isOpen = false;
		}
	}
} );
