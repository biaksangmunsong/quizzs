import styled from "styled-components"

const StyledHeader = styled.header`
    display: block;
    width: 85%;
    max-width: 1000px;
    height: 40px;
    position: absolute;
    z-index: 2;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);

    @media screen and (max-width: 600px){
        width: 90%;
    }

    .title {
        display: inline-block;
        line-height: 40px;
        font-size: 1.6rem;
        font-weight: 700;
        color: #222222;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        
        span {
            color: #dd0000;
        }

        @media screen and (max-width: 600px){
            &:not(.always-centered){
                left: 0;
                transform: none;
            }
        }
    }
    
    .sign-out-btn {
        display: inline-block;
        position: absolute;
        z-index: 3;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        cursor: pointer;
        background: transparent;
        border: 0;
        outline: 0;
        font-size: 14px;
        font-weight: 700;
        font-family: "Raleway", sans-serif;
        color: #8a2be2;
    }
`

export default StyledHeader