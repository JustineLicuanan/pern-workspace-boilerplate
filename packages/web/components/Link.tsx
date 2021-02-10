import { forwardRef, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';

interface ComposedProps {
	className: string;
}

interface LinkProps {
	activeClassName?: string;
	naked?: boolean;
}

type Props = PropsWithChildren<NextLinkProps & MuiLinkProps & LinkProps>;

const NextComposed = forwardRef<any, NextLinkProps & ComposedProps>(
	({ as, href, ...other }, ref) => (
		<NextLink href={href} as={as}>
			<a ref={ref} {...other} />
		</NextLink>
	)
);

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = ({
	href,
	activeClassName = 'active',
	className: classNameProps,
	innerRef,
	naked,
	...other
}: Props) => {
	const router = useRouter();
	const pathname = typeof href === 'string' ? href : href.pathname;
	const className = clsx(classNameProps, {
		[activeClassName]: router.pathname === pathname && activeClassName,
	});

	if (naked) {
		return (
			<NextComposed
				className={className}
				ref={innerRef}
				href={href}
				{...other}
			/>
		);
	}

	return (
		<MuiLink
			component={NextComposed}
			className={className}
			ref={innerRef}
			href={href}
			{...other}
		/>
	);
};

export default forwardRef<any, Props>((props, ref) => (
	<Link {...props} innerRef={ref} />
));
