import Text from "components/Text";
import ReactMarkdown from "react-markdown";
import rehypeMathjax from "rehype-mathjax/browser";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import style from "./style.module.scss";

interface MarkdownPropsI {
	children?: string;
}

const Markdown = ({ children }: MarkdownPropsI) => {
	const mdComponents = {
		p: ({ children }: { children?: React.ReactNode }) => <Text>{children}</Text>,
	};

	const mdProps = {
		remarkPlugins: [remarkMath, remarkGfm],
		rehypePlugins: [rehypeMathjax, rehypeRaw],
	};

	return (
		<ReactMarkdown {...mdProps} className={style.md} components={mdComponents}>
			{children}
		</ReactMarkdown>
	);
};

export default Markdown;
