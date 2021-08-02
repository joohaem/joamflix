import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Footer = styled.footer`
    font-size: 12px;
    text-align: center;
    border-top: 1px solid #ffd54f;
`;

const Address = styled.address`
    color: #999;
    margin-top: 2%;
`;
const Notice = styled.p`
    color: #999;
    margin: 2% 0;
`;

export default () => {
    return <Footer>
        <Address>
            www.snupi.tistory.com (Tistory), www.github.com/joohaem (Github)
        </Address>
        <Notice>
            Copyright © SNUPI. All Rights Reserved.
        </Notice>
    </Footer>
};