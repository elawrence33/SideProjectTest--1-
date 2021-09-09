import React from "react";
import {  Box,  Container,  Row,  Column,  FooterLink,  Heading,} from "./FooterStyles";
  
const Footer = () => {
  return (
    <Box>
      <Container>
          <Row>
            <Heading>Catalyst Campus Client Web Database</Heading>
            <FooterLink href="https:/www.catalystcampus.org">Catalyst Website</FooterLink>
            <FooterLink href="http://lotrproject.com/quotes/character/gandalf">    </FooterLink>
            </Row>
      </Container>
    </Box>
  )
}
export default Footer;