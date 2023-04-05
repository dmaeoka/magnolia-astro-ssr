import Html from '~/components/widgets/Html.astro';
import Form from '~/components/widgets/Form.astro';
import Carousel from '~/components/widgets/Carousel.astro';
import Grid from '~/components/widgets/Grid.astro';
import GridMasonry from '~/components/widgets/GridMasonry.astro';
import Video from '~/components/widgets/Video.astro';
import VideoGrid from '~/components/widgets/VideoGrid.astro';
import Statistics from '~/components/widgets/Statistics.astro';
import StatisticsItem from '~/components/widgets/StatisticsItem.astro';
import SocialBar from '~/components/widgets/SocialBar.astro';
import LinkList from '~/components/widgets/LinkList.astro';
import Link from '~/components/widgets/Link.astro';
import FreeText from '~/components/widgets/FreeText.astro';

const componentMappings = {
	'mtk2:components/html': Html,
	'form:components/form': Form,
	'bae-astro:components/banner': Carousel,
	'bae-astro:components/grid': Grid,
	'bae-astro:components/gridMasonry': GridMasonry,
	'bae-astro:components/video': Video,
	'bae-astro:components/videoGrid': VideoGrid,
	'bae-astro:components/statistics': Statistics,
	'bae-astro:components/statisticsItem': StatisticsItem,
	'bae-astro:components/socialBar': SocialBar,
	'bae-astro:components/linkList': LinkList,
	'bae-astro:components/link': Link,
	'bae-astro:components/freeText': FreeText
};

export default componentMappings;
