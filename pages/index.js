import Link from "next/link";
import BaseLayout from "../components/BaseLayout";
import fetch from "isomorphic-unfetch";
import React from "react";
import * as types from "../app/types";

class ShowLink extends React.Component {

    render() {
        const {show} = this.props;
        return (
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
    }
};

ShowLink.propTypes = {
    show: types.show
};

export default class Index extends React.Component {
    static async getInitialProps(context) {
        const userRes = await fetch("http://127.0.0.1:3000/api/me");
        const user = await userRes.json();
        const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
        const data = await res.json();
        return {
            shows: data,
            user: user
        };
    };

    render() {
        return (
            <BaseLayout>
                <h1>{ this.props.user.displayName }</h1>
                <h1>Batman TV shows</h1>
                <ul>
                    {this.props.shows.map(({show}) => (
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
    }
};

Index.propTypes = {
    shows: types.shows
};
