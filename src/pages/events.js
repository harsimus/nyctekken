import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "components/Layout";
import EventCard from "components/EventCard";

const EventsTitle = styled("h1")`
    margin-bottom: 1em;
`

const Events = ({ events, meta }) => (
    <>
        <Helmet
            title={`Events | Prist, Gatsby & Prismic Starter`}
            titleTemplate={`%s | Events | Prist, Gatsby & Prismic Starter`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Events | Prist, Gatsby & Prismic Starter`,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
        <Layout>
            <EventsTitle>
                Events
            </EventsTitle>
            <>
                {events.map((event, i) => (
                    <EventCard
                        key={i}
                        category={event.node.event_category}
                        title={event.node.event_title}
                        description={event.node.event_preview_description}
                        thumbnail={event.node.event_preview_thumbnail}
                        uid={event.node._meta.uid}
                    />
                ))}
            </>
        </Layout>
    </>
);

export default ({ data }) => {
    const events = data.prismic.allEvents.edges;
    const meta = data.site.siteMetadata;
    if (!events) return null;

    return (
        <Events events={events} meta={meta}/>
    )
}

Events.propTypes = {
    events: PropTypes.array.isRequired,
};

export const query = graphql`
    {
        prismic {
            allEvents {
                edges {
                    node {
                        event_title
                        event_preview_description
                        event_preview_thumbnail
                        event_category
                        event_post_date
                        _meta {
                            uid
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`
