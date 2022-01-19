import styled from "styled-components"

const StyledQuestions = styled.div`
    display: block;
    width: 100%;
    
    header {
        display: block;
        width: 100%;
        height: 60px;
        background: #152238;
        position: relative;
        border-bottom: 1px solid rgba(255,255,255,.1);
        
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
                color: #dddddd;
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
                    background: rgba(255,255,255,.5);
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
                        background: #cd5c5c;
                        cursor: pointer;

                        &:last-child {
                            background: #ffffff;
                            color: #222222;
                        }
                        
                        &:active {
                            background: #229922;
                        }
                    }

                    &.loading {
                        color: transparent !important;
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
            line-height: 40px;
            font-weight: 700;
            font-size: 30px;
            text-align: left;
            white-space: pre-line;
            margin-bottom: 80px;
            color: #dddddd;

            @media screen and (max-width: 1000px){
                line-height: 35px;
                font-size: 25px;
            }

            @media screen and (max-width: 800px){
                line-height: 32px;
                font-size: 22px;
            }

            @media screen and (max-width: 600px){
                line-height: 30px;
                font-size: 20px;
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
                color: #dddddd;
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
                    border: 2px solid #ffa500;
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
                            background: #ffa500;
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
`

export default StyledQuestions