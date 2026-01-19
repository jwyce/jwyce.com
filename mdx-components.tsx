import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: ({ children }) => (
			<h1 className="text-2xl font-bold mb-1">{children}</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-lg font-semibold mt-8 mb-1">{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-base font-semibold mt-6 mb-1">{children}</h3>
		),
		p: ({ children }) => (
			<span className="block leading-relaxed mb-4">
				{children}
			</span>
		),
		ul: ({ children }) => (
			<ul className="list-[square] list-outside marker:text-muted-foreground space-y-1 mb-4 pl-5">
				{children}
			</ul>
		),
		ol: ({ children }) => (
			<ol className="list-decimal list-outside space-y-1 text-muted-foreground mb-4 pl-5">
				{children}
			</ol>
		),
		li: ({ children }) => <li>{children}</li>,
		code: ({ children }) => (
			<code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
				{children}
			</code>
		),
		pre: ({ children }) => (
			<pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 text-sm">
				{children}
			</pre>
		),
		blockquote: ({ children }) => (
			<blockquote className="border-l-2 border-muted-foreground pl-4 italic text-muted-foreground mb-4">
				{children}
			</blockquote>
		),
		...components,
	};
}
