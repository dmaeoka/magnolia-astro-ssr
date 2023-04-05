import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getProjectRootDir = (): string => {
	const mode = import.meta.env.MODE;
	return mode === 'production' ? path.join(__dirname, '../') : path.join(__dirname, '../../');
}

const __srcFolder = path.join(getProjectRootDir(), '/src');

export const getRelativeUrlByFilePath = (filepath: string): string => {
	return filepath.replace(__srcFolder, '');
}

export const getAreaNodes = (content: object) => {
	if (content && Object.keys(content).length > 0) {
		return content?.['@nodes'].map((nodeName) => content[nodeName]);
	}
}

export const getContentByPath = (content: object, path: string) => {
	if (content && path) {
		const pathArray = path.split("/").slice(2);
		return pathArray.reduce((o, k) => (o && o[k]), content);
	}
}

export const getProps = (node, index) => {
	const props = {
		metadata: undefined,
		key: undefined
	};
	const metadata = {
		'@index': index
	};

	Object.keys(node).forEach((key) => {
		if (key.match(/^(@|mgnl:|jcr:)/)) {
			metadata[key] = node[key];
		} else {
			props[key] = node[key];
		}
	});

	props.metadata = metadata;
	props.key = node['@id'];
	return props;
}

export const getPages = async (slug: string) => {
	slug = (slug && slug !== undefined) ? '/' + slug : '';
	const url = import.meta.env.ASTRO_APP_MGNL_API_NAV + slug
	return await fetch(url).then((r) => r.json());
}

const BASE_PATHNAME = '/';
export const trim = (str = '', ch?: string) => {
	let start = 0,
		end = str.length || 0;
	while (start < end && str[start] === ch) ++start;
	while (end > start && str[end - 1] === ch) --end;
	return start > 0 || end < str.length ? str.substring(start, end) : str;
}

export const trimSlash = (s: string) => trim(trim(s, '/'));

export const getAsset = (path: string): string => ('/' + [BASE_PATHNAME, path].map((el) => trimSlash(el)).filter((el) => !!el).join('/'));

const load = async function () {
	let images: Record<string, () => Promise<unknown>> | undefined = undefined;
	try {
		images = import.meta.glob('~/assets/images/**');
	} catch (e) {
		// continue regardless of error
	}
	return images;
}

let _images;

export const fetchLocalImages = async () => {
	_images = _images || load();
	return await _images;
}

export const findImage = async (imagePath?: string) => {
	if (typeof imagePath !== 'string') {
		return null;
	}

	if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) {
		return imagePath;
	}

	if (!imagePath.startsWith('~/assets')) {
		return null;
	}

	const images = await fetchLocalImages();
	const key = imagePath.replace('~/', '/src/');
	return typeof images[key] === 'function' ? (await images[key]())['default'] : null;
}

export const getEnv = () => {
	return {
		url: import.meta.env.PUBLIC_URL,
		host: import.meta.env.ASTRO_PUBLIC_MGNL_HOST,
		lang: (import.meta.env.ASTRO_PUBLIC_MGNL_LANGUAGES).split(' '),
		path: import.meta.env.ASTRO_APP_MGNL_SITE_PATH,
		templates: import.meta.env.ASTRO_APP_MGNL_API_TEMPLATES,
		pages: import.meta.env.ASTRO_APP_MGNL_API_PAGES,
		nav: import.meta.env.ASTRO_APP_MGNL_API_NAV,
	}
}

export const getLinkType = (item) => {
	switch (item.linkType) {
		case 'page':
			return item.linkTypepage;
		case 'download':
			return item.linkTypedownload;
		default:
			return item.linkTypeexternal;
	}
}

