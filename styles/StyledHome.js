import styled from "styled-components"

const StyledHome = styled.div`
    display: block;
    width: 100%;
    min-height: 100vh;

    header {
        display: block;
        width: 90%;
        max-width: 1200px;
        margin: 0 auto;
        height: 80px;
        text-align: center;
        
        a {
            display: inline-block;
            line-height: auto;
            font-size: 30px;
            font-weight: 700;
            color: #ffffff;
            text-transform: capitalize;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            
            span {
                color: #ffa500;
            }

            @media screen and (max-width: 1200px){
                font-size: 25px;
            }

            @media screen and (max-width: 600px){
                font-size: 23px;
            }
        }
    }

    .cta {
        display: block;
        width: 100%;
        max-width: 300px;
        line-height: 55px;
        padding: 0 20px;
        background: #ffffff;
        font-size: 20px;
        font-weight: 700;
        color: #222222;
        position: relative;
        overflow: hidden;
        transition: .2s ease-in-out;

        &.centered {
            margin: 0 auto;

            @media screen and (max-width: 600px){
                margin: 0;
            }
        }

        &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            background: #cd5c5c;
            position: absolute;
            z-index: 1;
            top: 0;
            left: -100%;
            transition: inherit;
        }

        span {
            position: relative;
            z-index: 2;
        }

        svg {
            display: inline-block;
            vertical-align: middle;
            height: 25px;
            margin-left: 60px;
            position: absolute;
            z-index: 2;
            top: 50%;
            transform: translateY(-50%);
            right: 20px;
            
            polyline {
                stroke: #222222;
                fill: none;
                stroke-linecap: round;
                stroke-linejoin: round;
                transition: inherit;
            }
        }
        
        &:hover {
            color: #ffffff;

            &::before {
                left: 0;
            }

            svg {
                polyline {
                    stroke: #ffffff;
                }
            }
        }

        @media screen and (max-width: 1200px){
            width: 250px;
            line-height: 50px;
            font-size: 16px;

            svg {
                height: 20px;
            }
        }
    }

    .intro {
        display: block;
        width: 90%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 100px 0;

        @media screen and (max-width: 1200px){
            padding: 80px 0;
        }

        @media screen and (max-width: 800px){
            padding: 60px 0;
        }
        
        .section {
            display: inline-block;
            vertical-align: middle;
            width: 50%;

            &:first-child {
                h1 {
                    display: block;
                    width: 100%;
                    line-height: 70px;
                    font-size: 60px;
                    font-weight: 700;
                    text-align: left;
                    color: #ffa500;
                    margin-bottom: 20px;

                    @media screen and (max-width: 1200px){
                        line-height: 60px;
                        font-size: 50px;
                    }

                    @media screen and (max-width: 1000px){
                        line-height: 50px;
                        font-size: 40px;
                    }
                }

                h2 {
                    display: block;
                    width: 100%;
                    line-height: 30px;
                    font-size: 20px;
                    font-weight: 700;
                    text-align: left;
                    color: #dddddd;
                    margin-bottom: 50px;

                    @media screen and (max-width: 1200px){
                        line-height: 25px;
                        font-size: 16px;
                    }
                    
                    @media screen and (max-width: 1000px){
                        font-size: 15px;
                    }
                }

                @media screen and (max-width: 1000px){
                    width: 55%;
                    margin-right: 5%;
                }

                @media screen and (max-width: 800px){
                    display: block;
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                }
            }

            &:last-child {
                svg {
                    display: block;
                    width: 80%;
                    margin-left: 20%;
                    
                    path {
                        fill: #cd5c5c;
                    }
                    
                    rect {
                        fill: #ffffff;
                    }
                    
                    circle {
                        fill: #87ceeb;
                    }
                }

                @media screen and (max-width: 1000px){
                    width: 40%;

                    svg {
                        width: 100%;
                        margin-left: 0;
                    }
                }

                @media screen and (max-width: 800px){
                    display: block;
                    width: 90%;
                    max-width: 300px;
                    margin: 60px auto 0 auto;
                }
            }
        }
    }

    .boundary {
        display: block;
        width: 90%;
        max-width: 1200px;
        height: 100px;
        position: relative;
        margin: 0 auto;

        &::before,
        &::after {
            content: "";
            display: block;
            width: 50%;
            height: 1px;
            border-bottom: 1px solid rgba(255,255,255,.5);
            position: absolute;
            z-index: 1;
            top: 50%;
            transform: translateY(-50%);
        }

        &::before {
            left: 0;
        }

        &::after {
            right: 0;
        }

        .circle {
            display: block;
            width: 100px;
            height: 100px;
            background: #192841;
            padding: 20px;
            position: absolute;
            z-index: 2;
            top: 0;
            left: 50%;
            transform: translateX(-50%);

            &::before {
                content: "";
                display: block;
                width: 100%;
                height: 100%;
                background: rgba(255,255,255,.5);
                border-radius: 50%;
            }
        }

        @media screen and (max-width: 1200px){
            height: 80px;

            .circle {
                width: 80px;
                height: 80px;
            }
        }

        @media screen and (max-width: 800px){
            height: 60px;

            .circle {
                width: 60px;
                height: 60px;
                padding: 15px;
            }
        }

        @media screen and (max-width: 600px){
            height: 40px;

            .circle {
                width: 40px;
                height: 40px;
                padding: 10px;
            }
        }
    }

    section {
        display: block;
        width: 90%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 100px 0;

        &.no-padding-top {
            padding-top: 0;
        }

        @media screen and (max-width: 1200px){
            padding: 80px 0;

            &.no-padding-top {
                padding-top: 0;
            }
        }

        @media screen and (max-width: 800px){
            padding: 60px 0;

            &.no-padding-top {
                padding-top: 0;
            }
        }
        
        h2 {
            display: block;
            width: 100%;
            line-height: 50px;
            font-size: 40px;
            font-weight: 700;
            text-align: center;
            color: #dddddd;
            margin-bottom: 20px;

            @media screen and (max-width: 1200px){
                line-height: 45px;
                font-size: 35px;
            }

            @media screen and (max-width: 1000px){
                line-height: 40px;
                font-size: 30px;
            }

            @media screen and (max-width: 800px){
                text-align: left;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            @media screen and (max-width: 600px){
                line-height: 35px;
                font-size: 25px;

                br {
                    display: none;
                }
            }
        }

        .sections {
            display: block;
            margin-top: 100px;

            @media screen and (max-width: 1200px){
                margin-top: 80px;
            }

            @media screen and (max-width: 800px){
                margin-top: 60px;
            }

            .section {
                display: inline-block;
                vertical-align: middle;
                width: 50%;
                
                &:first-child {
                    padding-right: 40px;
                }

                &:last-child {
                    padding-left: 40px;
                }
                
                h3 {
                    display: block;
                    width: 100%;
                    color: #cd5c5c;
                    font-weight: 700;
                    text-align: left;
                    line-height: 40px;
                    font-size: 30px;
                    margin-bottom: 40px;

                    @media screen and (max-width: 1200px){
                        line-height: 36px;
                        font-size: 26px;
                    }

                    @media screen and (max-width: 1000px){
                        line-height: 34px;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }

                    @media screen and (max-width: 600px){
                        line-height: 32px;
                        font-size: 22px;
                    }
                }

                p {
                    display: block;
                    width: 100%;
                    color: #ffffff;
                    font-weight: 700;
                    text-align: left;
                    line-height: 25px;
                    font-size: 16px;

                    @media screen and (max-width: 1200px){
                        font-size: 15px;
                    }
                    
                    @media screen and (max-width: 600px){
                        font-size: 14px;
                    }
                }
                
                svg {
                    display: block;
                    width: 90%;

                    @media screen and (max-width: 800px){
                        max-width: 300px;
                        margin: 0 auto;
                    }
                }

                @media screen and (max-width: 1000px){
                    &:first-child {
                        padding-right: 20px;
                    }

                    &:last-child {
                        padding-left: 20px;
                    }
                }

                @media screen and (max-width: 800px){
                    display: block;
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;

                    &:first-child {
                        padding: 0;
                        margin-bottom: 60px;
                    }

                    &:last-child {
                        padding: 0;
                    }
                }
            }
        }
    }
`

export default StyledHome