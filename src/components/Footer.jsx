import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Logo from "components/_ui/Logo";
import spooch from "images/oscar-icon.png"
import SocialMediaIcons from 'react-social-media-icons';

const FooterContainer = styled("div")`
    padding-top: 3.75em;
    padding-bottom: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
        max-width: 50px;
    }
`

const FooterAuthor = styled("a")`
    font-size: 0.75em;
    color: ${colors.grey700};
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    margin-top: 1.5em;

     &:hover {
         color: ${colors.blue900};

        .FooterSpooch {
            animation-name: rotate;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }
    }

    @keyframes rotate {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
`

const FooterSpooch = styled("img")`
    max-width: 33px;
    margin-top: 0.25em;
`

const socialMediaIcons = [
  {
    url: 'https://github.com/andrewgbliss',
    className: 'fa-github-square',
  },
  {
    url: 'https://gitlab.com/andrewgbliss',
    className: 'fa-gitlab',
  },
  {
    url: 'https://www.npmjs.com/~andrewgbliss',
    className: 'fa-npm',
  },
];

const Footer = () => (
    <FooterContainer>
        <Link to="/">
            <Logo />
        </Link>
        <SocialMediaIcons
          icons={socialMediaIcons}
          iconSize={'1.3em'}
          iconColor={'#495056'}
        />
        <FooterAuthor href="https://twitter.com/harsimus">
            © 2020 — Developed by Harsimus
            <FooterSpooch className="FooterSpooch" src={spooch} />
        </FooterAuthor>
    </FooterContainer>
)

export default Footer;
