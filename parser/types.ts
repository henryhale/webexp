export type Block = [string, string, ...Block[]]

export type IndexedObject = Record<string, string>

export type Attributes = IndexedObject

export type NamedBlock = {
	tag: string
	attr: string
	blocks: (string | Block)[]
	content: IndexedObject
}

export type TemplateRenderer = (block: NamedBlock, render: (root: Block) => string) => string

export type Templates = Map<string, TemplateRenderer>