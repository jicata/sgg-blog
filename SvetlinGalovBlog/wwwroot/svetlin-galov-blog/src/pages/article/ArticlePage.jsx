import ArticleGrid from "./ArticleGrid/ArticleGrid.jsx";
import ArticleHeading from "./ArticleHeading/ArticleHeading.jsx";
import ContentImage from "../../components/Content/ContentImage/ContentImage.jsx";
import TableOfContents from "./TableOfContents/TableOfContents.jsx";
import Paragraph from "../../components/Content/Paragraph/Paragraph.jsx";
import Blockquote from "../../components/Content/Blockquote/Blockquote.jsx";
import Span from "../../components/Content/Span/Span.jsx";
import CodeBlock from "../../components/Content/CodeBlock/CodeBlock.jsx";
import {useEffect, useState} from "react";
import RelatedArticles from "./RelatedArticles/RelatedArticles.jsx";
import MaxWidthWrapper from "../../components/MaxWidthWrapper/max-width-wrapper.tsx";

const Article = {
    "id": "articleId",
    "title": "Hello from the other side",
    "category": "Lorem",
    "subtitle": "Welcome to the other side",
    "createdOn": "05-03-2026",
    "modifiedOn": "05-03-2026",
    "tableOfContents": [
        {
            "fragmentUrl": "#lorem",
            "name": "Lorem",
        },
        {
            "fragmentUrl": "#ipsum",
            "name": "Ipsum",
        },
        {
            "fragmentUrl": "#code",
            "name": "Code",
        },
    ],
    "content": [
        {
            "type": "p",
            "children": [],
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero quis enim hendrerit posuere id eu lectus. Ut iaculis pellentesque risus, ac fermentum tortor ullamcorper sed. Donec quis viverra urna. Ut tincidunt arcu nec tempus vehicula. Vivamus pellentesque nunc vitae velit convallis, vel aliquam neque gravida. Praesent quis imperdiet nisl. Phasellus suscipit sem interdum faucibus viverra. Donec sed ipsum semper, porta neque sit amet, facilisis justo. Mauris ultrices volutpat quam, sed consequat dui luctus vitae.",
            "id": "lorem"
        },
        {
            "type": "p",
            "children": [],
            "content": "Nulla porta semper sapien. Curabitur tempor ac quam sit amet lobortis. Curabitur sit amet facilisis arcu. Morbi fermentum porta consectetur. Curabitur laoreet sagittis felis, vitae tempor lacus vulputate vel. Donec faucibus rhoncus finibus. Fusce varius placerat orci, ut tincidunt nisi facilisis in. Mauris consectetur est sed nulla dignissim imperdiet."
        },
        {
            "type": "img",
            "children": [],
            "content": "/../../../public/FullBleed_IF.png",
        },
        {
            "type": "p",
            "children": [],
            "content": "Nulla porta semper sapien. Curabitur tempor ac quam sit amet lobortis. Curabitur sit amet facilisis arcu. Morbi fermentum porta consectetur. Curabitur laoreet sagittis felis, vitae tempor lacus vulputate vel. Donec faucibus rhoncus finibus. Fusce varius placerat orci, ut tincidunt nisi facilisis in. Mauris consectetur est sed nulla dignissim imperdiet."
        },
        {
            "type": "img",
            "children": [],
            "content": "/../../../public/FullBleed_IF.png",
            "custom": "full-bleed"
        },
        {
            "type": "p",
            "children": [],
            "content": "Nulla porta semper sapien. Curabitur tempor ac quam sit amet lobortis. Curabitur sit amet facilisis arcu. Morbi fermentum porta consectetur. Curabitur laoreet sagittis felis, vitae tempor lacus vulputate vel. Donec faucibus rhoncus finibus. Fusce varius placerat orci, ut tincidunt nisi facilisis in. Mauris consectetur est sed nulla dignissim imperdiet."
        },
        {
            "type": "blockquote",
            "children": [
                {
                    type: "span",
                    content: " — Dreadnought, Warhammer 40K",
                    custom: "italics"
                }
            ],
            "content": "Even in death I still serve",
        },
        {
            "type": "codeblock",
            "content": "import React from 'react';import React from 'react';import React from 'react';import React from 'react';import React from 'react';import React from 'react';import React from 'react';import React from 'react';import React from 'react';",
            "id": "code"
        },
        {
            "type": "p",
            "content": "Nulla porta semper sapien. Curabitur tempor ac quam sit amet lobortis. Curabitur sit amet facilisis arcu. Morbi fermentum porta consectetur. Curabitur laoreet sagittis felis, vitae tempor lacus vulputate vel. Donec faucibus rhoncus finibus. Fusce varius placerat orci, ut tincidunt nisi facilisis in. Mauris consectetur est sed nulla dignissim imperdiet."
        },
    ]
}

const blockRenderers = {
    p: (key, block, childrenToAdd, htmlProps) => <Paragraph key={key} as={block.type} content={block.content}
                                                            children={childrenToAdd} {...htmlProps}/>,
    img: (key, block, childrenToAdd, htmlProps) => <ContentImage key={key} imgPath={block.content}
                                                                 className={block.custom} children={childrenToAdd}/>,
    blockquote: (key, block, childrenToAdd, htmlProps) => <Blockquote key={key} content={block.content}
                                                                      children={childrenToAdd}/>,
    span: (key, block, childrenToAdd, htmlProps) => <Span key={key} content={block.content} className={block.custom}
                                                          children={childrenToAdd}/>,
    codeblock: (key, block, childrenToAdd, htmlProps) => <CodeBlock key={key} content={block.content}
                                                                    children={childrenToAdd} {...htmlProps}/>,
}

const RenderChild = (child, key) => {
    const childrenToAdd = (child.children || []).map((child, index) => {
        return RenderChild(child, index);
    })

    const {type, content, children, custom, ...htmlProps} = child;
    console.log(htmlProps);
    return blockRenderers[child.type](
        key,
        child,
        childrenToAdd,
        htmlProps);
}

const ArticlePage = () => {
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        const sectionIds = Article.tableOfContents.map(
            item => item.fragmentUrl.replace('#', '')
        );

        const elements = sectionIds
            .map(id => document.getElementById(id))
            .filter(Boolean);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {rootMargin: '-20% 0px -20% 0px'}
        );
        elements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <MaxWidthWrapper as={'main'} paddingInline={"0"}>
            <ArticleHeading
                id={Article.id}
                title={Article.title}
                subtitle={Article.subtitle}
                category={Article.category}
                createdOn={Article.createdOn}
                modifiedOn={Article.modifiedOn}/>
            <ArticleGrid withToc={true}>
                <TableOfContents contents={Article.tableOfContents} activeId={activeId}/>
                {Article.content.map((c, index) => RenderChild(c, index))}
            </ArticleGrid>
            <RelatedArticles></RelatedArticles>
        </MaxWidthWrapper>
    );
};

export default ArticlePage;