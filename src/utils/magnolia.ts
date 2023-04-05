export default () => {
	return {
		name: '@magnolia/annotations',
		hooks: {
			'astro:config:setup': async ({
				command,
				injectScript
			}) => {
				if (command === 'dev') {
					injectScript('page', `
import { PageEditorBridge, EditorContextHelper } from '@magnolia/template-annotations';
if(EditorContextHelper.inIframe()) {
	PageEditorBridge.init();
	PageEditorBridge.onMessage('updateState', (message) => console.log(JSON.stringify(message)));
}
					`);
				}
			}
		}
	};
};
