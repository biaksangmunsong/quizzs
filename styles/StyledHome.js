import styled from "styled-components"

const StyledHome = styled.div`
    display: block;
    width: 100%;

    .intro {
        display: flex;
        width: 100%;
        min-height: 100vh;
        padding: 100px 0;
        position: relative;
        
        &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            background-image: url(/pexels-gdtography-911738.jpg);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            opacity: .2;
        }
        
        .sub-container {
            display: block;
            width: 85%;
            max-width: 1000px;
            margin: auto;
            text-align: center;
            position: relative;
            z-index: 2;

            @media screen and (max-width: 600px){
                width: 90%;
            }

            h1 {
                display: block;
                width: 100%;
                line-height: auto;
                font-size: 3.5rem;
                text-align: center;
                font-weight: 700;

                @media screen and (max-width: 1200px){
                    font-size: 3rem;
                }

                @media screen and (max-width: 1000px){
                    font-size: 2.6rem;
                }

                @media screen and (max-width: 600px){
                    font-size: 2.2rem;
                }
                
                @media screen and (max-width: 500px){
                    font-size: 2rem;
                }
                
                @media screen and (max-width: 400px){
                    font-size: 1.9rem;
                }
            }

            .intro-line {
                display: block;
                width: 100%;
                line-height: auto;
                font-size: 1.2rem;
                text-align: center;
                font-weight: 400;
                margin: 20px 0 40px 0;

                @media screen and (max-width: 1200px){
                    font-size: 1.1rem;
                }

                @media screen and (max-width: 600px){
                    font-size: 1rem;
                }
            }
            
            .call-to-action {
                display: inline-block;
                height: 50px;
                overflow: hidden;
                padding: 0 50px;
                font-size: 1rem;
                text-align: center;
                font-weight: 700;
                border: 0;
                border-radius: 5px;
                outline: 0;
                background: #8a2be2;
                color: #ffffff;
                position: relative;
                cursor: pointer;

                img {
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    opacity: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                }
                
                &:active {
                    background: #0000ff;
                }

                &.loading {
                    color: transparent;
                    cursor: progress;
                    
                    img {
                        opacity: 1;
                    }
                }
                
                @media screen and (max-width: 600px){
                    font-size: .8rem;
                }
            }
        }
    }

    .questions {
        display: block;
        width: 100%;
        padding-top: 60px;
        
        @media screen and (max-width: 800px){
            padding-top: 50px;
        }
        
        header {
            display: block;
            width: 100%;
            height: 60px;
            background: #eeeeee;
            position: fixed;
            z-index: 10;
            top: 0;
            left: 0;
            border-bottom: 1px solid #dddddd;
            
            @media screen and (max-width: 800px){
                height: 50px;
            }
            
            .sub-container {
                display: block;
                width: 90%;
                max-width: 1200px;
                height: 100%;
                margin: 0 auto;
                position: relative;

                @media screen and (max-width: 400px){
                    width: 100%;
                    padding: 0 8px;
                }
                
                .timer,
                .current-question {
                    display: inline-block;
                    vertical-align: middle;
                    line-height: 60px;
                    font-family: sans-serif;
                    text-align: left;
                    color: #222222;
                    font-weight: 700;
                    font-size: 1.2rem;
                    
                    &.up {
                        font-family: "Raleway", sans-serif;
                        color: #ff0000;
                    }

                    @media screen and (max-width: 1000px){
                        font-size: 1.1rem;
                    }

                    @media screen and (max-width: 800px){
                        line-height: 50px;
                        font-size: 1rem;
                    }

                    @media screen and (max-width: 360px){
                        font-size: .9rem;
                    }
                }

                .timer {
                    margin-right: 30px;

                    @media screen and (max-width: 360px){
                        margin-right: 15px;
                    }
                }

                .btns {
                    display: inline-block;
                    vertical-align: middle;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 0;

                    @media screen and (max-width: 400px){
                        right: 8px;
                    }

                    button {
                        display: inline-block;
                        vertical-align: middle;
                        padding: 0 30px;
                        height: 40px;
                        margin-right: 10px;
                        border: 0;
                        outline: 0;
                        background: #bbbbbb;
                        font-family: "Raleway", sans-serif;
                        font-weight: 700;
                        color: #ffffff;
                        text-align: center;
                        font-size: .8rem;
                        border-radius: 4px;
                        cursor: not-allowed;
                        position: relative;
                        
                        &:last-child {
                            margin-right: 0;
                        }

                        img {
                            display: inline-block;
                            vertical-align: middle;
                            width: 20px;
                            opacity: 0;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translateX(-50%) translateY(-50%);
                        }

                        &.active {
                            background: #44aa44;
                            cursor: pointer;
                            
                            &:active {
                                background: #229922;
                            }
                        }

                        &.loading {
                            color: transparent;
                            cursor: progress;
                            
                            img {
                                opacity: 1;
                            }
                        }

                        @media screen and (max-width: 800px){
                            padding: 0 20px;
                            height: 35px;
                            margin-right: 5px;
                        }

                        @media screen and (max-width: 360px){
                            padding: 0 18px;
                            font-size: .75rem;
                        }
                    }
                }
            }
        }

        .question {
            display: block;
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 80px 0;

            @media screen and (max-width: 600px){
                padding: 60px 0;
            }
            
            h2 {
                display: block;
                width: 100%;
                line-height: auto;
                font-weight: 700;
                font-size: 1.6rem;
                text-align: left;
                white-space: pre-line;
                margin-bottom: 80px;
                color: #222222;

                @media screen and (max-width: 1000px){
                    font-size: 1.4rem;
                }

                @media screen and (max-width: 800px){
                    font-size: 1.2rem;
                }

                @media screen and (max-width: 600px){
                    margin-bottom: 60px;
                }
            }
            
            ul {
                display: block;
                width: 100%;
                list-style-type: none;

                li {
                    width: 100%;
                    line-height: auto;
                    font-size: 1.2rem;
                    font-weight: 400;
                    margin-bottom: 20px;
                    padding-left: 40px;
                    position: relative;
                    color: #222222;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    
                    &:last-child {
                        margin-bottom: 0;
                    }
                    
                    .radio {
                        display: block;
                        width: 20px;
                        height: 20px;
                        border: 1px solid #999999;
                        border-radius: 50%;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-40%);
                        left: 0;
                        padding: 4px;
                        cursor: pointer;
                        
                        &.selected {
                            &::before {
                                content: "";
                                display: block;
                                width: 100%;
                                height: 100%;
                                background: #999999;
                                border-radius: 50%;
                            }
                        }
                    }
                    
                    .option-id {
                        font-weight: 700;
                        margin-right: 5px;
                        cursor: pointer;
                    }

                    .text {
                        cursor: pointer;
                    }

                    @media screen and (max-width: 1000px){
                        font-size: 1.1rem;
                        padding-left: 35px;

                        .radio {
                            width: 18px;
                            height: 18px;
                            padding: 3px;
                            transform: translateY(-45%);
                        }
                    }

                    @media screen and (max-width: 800px){
                        font-size: 1rem;
                        padding-left: 30px;
                    }
                }
            }
        }
    }

    .message {
        display: flex;
        width: 100%;
        min-height: 100vh;
        padding: 60px 0;
        position: relative;
        
        &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            background-image: url(/pexels-gdtography-911738.jpg);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            opacity: .2;
        }

        .sub-container {
            display: block;
            width: 90%;
            max-width: 1000px;
            margin: auto;
            text-align: center;
            position: relative;
            z-index: 2;

            h2 {
                display: block;
                width: 100%;
                line-height: auto;
                font-size: 3.5rem;
                text-align: center;
                font-weight: 700;
                margin-bottom: 40px;
                
                @media screen and (max-width: 1200px){
                    font-size: 3rem;
                }

                @media screen and (max-width: 1000px){
                    font-size: 2.6rem;
                }

                @media screen and (max-width: 600px){
                    font-size: 2.2rem;
                }
                
                @media screen and (max-width: 500px){
                    font-size: 2rem;
                }
                
                @media screen and (max-width: 400px){
                    font-size: 1.9rem;
                }
            }
            
            .call-to-action {
                display: inline-block;
                height: 50px;
                overflow: hidden;
                padding: 0 50px;
                font-size: 1rem;
                text-align: center;
                font-weight: 700;
                border: 0;
                border-radius: 5px;
                outline: 0;
                background: #8a2be2;
                color: #ffffff;
                position: relative;
                cursor: pointer;

                img {
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    opacity: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                }
                
                &:active {
                    background: #0000ff;
                }

                &.loading {
                    color: transparent;
                    cursor: progress;
                    
                    img {
                        opacity: 1;
                    }
                }
                
                @media screen and (max-width: 600px){
                    font-size: .8rem;
                }
            }
        }
    }
`

export default StyledHome