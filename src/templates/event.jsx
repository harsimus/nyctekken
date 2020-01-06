import React from 'react';
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "@emotion/styled";
import colors from "styles/colors";
import { Link, graphql } from 'gatsby';
import { RichText } from "prismic-reactjs";
import Button from "components/_ui/Button";
import Layout from "components/Layout";

const EventHeroContainer = styled("div")`
    background: ${colors.grey200};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    position: relative;
    padding-top: 2.25em;
    margin-bottom: 3.5em;

    img {
        max-width: 600px;
    }
`

const EventTitle = styled("div") `
    max-width: 550px;
    margin: 0 auto;
    text-align: center;
`

const EventBody = styled("div")`
    max-width: 550px;
    margin: 0 auto;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const EventLink = styled(Link)`
    margin-top: 3em;
    display: block;
    text-align: center;
`

const AboutLink = styled("a")`
    margin-bottom: 1.5em;
    font-weight: 600;
    line-height: 1.9;
    text-decoration: none;
    color: currentColor;

    span {
        margin-left: 1em;
        transform: translateX(-8px);
        display: inline-block;
        opacity: 0;
        transition: all 400ms ease-in-out;
    }

    &:hover {
        span {
            transform: translateX(0px);
            opacity: 1;
            transition: all 150ms ease-in-out;
        }
    }
`

const Event = ({ event, meta }) => {
    return (
        <>
            <Helmet
                title={`${event.event_title[0].text} | Prist, Gatsby & Prismic Starter`}
                titleTemplate={`%s | ${meta.title}`}
                meta={[
                    {
                        name: `description`,
                        content: meta.description,
                    },
                    {
                        property: `og:title`,
                        content: `${event.event_title[0].text} | Prist, Gatsby & Prismic Starter`,
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
                <EventTitle>
                    {RichText.render(event.event_title)}
                </EventTitle>
                {event.event_hero_image && (
                    <EventHeroContainer>
                        <img src={event.event_hero_image.url} alt="bees" />
                    </EventHeroContainer>
                )}
                <AboutLink
                    href={event.event_registration_link.url}
                    target="_blank" rel="noopener noreferrer">
                    <Button className="Button--secondary">
                    Register here!
                    </Button>
                    <span>&#8594;</span>
                </AboutLink>
                <EventBody>
                    {RichText.render(event.event_description)}
                    <EventLink to={"/events"}>
                        <Button className="Button--secondary">
                            See other events
                        </Button>
                    </EventLink>
                </EventBody>
            </Layout>
        </>
    )
}

export default ({ data }) => {
    const eventContent = data.prismic.allEvents.edges[0].node;
    const meta = data.site.siteMetadata;
    return (
        <Event event={eventContent} meta={meta}/>
    )
}

Event.propTypes = {
    event: PropTypes.object.isRequired,
};

export const query = graphql`
    query EventQuery($uid: String) {
        prismic {
            allEvents(uid: $uid) {
                edges {
                    node {
                        event_title
                        event_preview_description
                        event_preview_thumbnail
                        event_category
                        event_post_date
                        event_hero_image
                        event_registration_link {
                            ... on PRISMIC__ExternalLink {
                                _linkType
                                url
                            }
                        }
                        event_description
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
