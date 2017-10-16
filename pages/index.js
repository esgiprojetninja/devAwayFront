import Link from "next/link";
import BaseLayout from "../components/BaseLayout";
import fetch from "isomorphic-unfetch";
import React from "react";
import * as types from "../app/types";

const ShowLink = ({show}) => (
    <li>
        <Link href={`/post?id=${show.id}`} as={`/p/${show.id}`}>
            <a>{show.name}</a>
        </Link>
        <style jsx>{`
            li {
                list-style: none;
                margin: 5px 0;
            }

            a {
                text-decoration: none;
                color: blue;
                font-family: "Arial";
            }

            a:hover {
                opacity: 0.6;
            }
        `}</style>
    </li>
);

ShowLink.propTypes = {
    show: types.show
};

const Index = (props) => (
    <BaseLayout>
        <h1>Batman TV shows</h1>
        <ul>
            {props.shows.map(({show}) => (
                <ShowLink show={show} key={show.id} />
            ))}
        </ul>
        <style jsx>{`
            h1, a {
            font-family: "Arial";
            }

            ul {
            padding: 0;
            }

            li {
            list-style: none;
            margin: 5px 0;
            }

            a {
            text-decoration: none;
            color: blue;
            }

            a:hover {
            opacity: 0.6;
            }
        `}</style>
    </BaseLayout>
);

Index.propTypes = {
    shows: types.shows
};

Index.getInitialProps = async function () {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    return {
        shows: data
    };
};

export default Index;
