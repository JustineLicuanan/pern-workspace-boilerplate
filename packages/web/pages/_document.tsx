import { Children } from 'react';
import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {
	// `getInitialProps` belongs to `_document` (instead of `_app`),
	// it's compatible with server-side generation (SSG).
	static async getInitialProps(ctx: DocumentContext) {
		// Render app and page and get the context of the page with collected side effects.
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () => {
			return originalRenderPage({
				enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
			});
		};

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			// Styles fragment is rendered after the app and page rendering finish.
			styles: [
				...Children.toArray(initialProps.styles),
				sheets.getStyleElement(),
			],
		};
	}

	render() {
		return (
			<Html lang='en'>
				<Head>
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
