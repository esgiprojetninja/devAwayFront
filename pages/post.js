import BaseLayout from "../components/BaseLayout";
import * as Types from "../app/types";
import React from "react";
import fetch from "isomorphic-unfetch";
import Markdown from "react-markdown";

function parseSummary(summary) {
    if (summary) {
        return summary.replace(/<[/]?p>/g, "");
    }
}

const Post = (props) => (
    <BaseLayout>
        <h1>{props.show.name}</h1>
        <p>{parseSummary(props.show.summary)}</p>
        <img src={props.show.image.medium} alt={props.show.name} />
        <div className="markdown">
            <Markdown source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
     `}/>
        </div>
        <style jsx global>{`
     .markdown {
       font-family: 'Arial';
     }

     .markdown a {
       text-decoration: none;
       color: blue;
     }

     .markdown a:hover {
       opacity: 0.6;
     }

     .markdown h3 {
       margin: 0;
       padding: 0;
       text-transform: uppercase;
     }
  `}</style>
    </BaseLayout>
);

Post.getInitialProps = async function (context) {
    const {id} = context.query;
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await res.json();

    return {show};
};

Post.propTypes = {
    show: Types.show.isRequired
};

export default Post;
