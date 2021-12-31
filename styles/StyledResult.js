import styled from "styled-components"

const StyledResult = styled.div`
    display: flex;
    width: 100%;

    .sub-container {
        display: block;
        width: 90%;
        max-width: 1000px;
        margin: 0 auto;
        padding: 60px 0;
        
        @media screen and (max-width: 1100px){
            padding: 5vw 0;
        }

        .title {
            display: block;
            width: 100%;
            line-height: auto;
            font-size: 1.5rem;
            font-weight: 700;
            color: #222222;
            text-align: center;
            margin-bottom: 60px;
            
            span {
                color: #8a2be2;
            }

            @media screen and (max-width: 1100px){
                margin-bottom: 5vw;
            }
        }
        
        .card {
            display: block;
            width: 100%;
            background: #ffffff;
            border: 1px solid #dddddd;
            box-shadow: 0 0 20px rgba(0,0,0,.2);
            border-radius: 10px;
            margin-bottom: 20px;

            @media screen and (max-width: 1100px){
                margin-bottom: 5vw;
            }
            
            .head {
                display: block;
                width: 100%;
                line-height: auto;
                font-size: 22px;
                font-weight: 700;
                text-align: left;
                position: relative;
                border-bottom: 1px solid #dddddd;
                padding: 20px 50px;
                
                .scores {
                    display: inline-block;
                    vertical-align: middle;
                    position: absolute;
                    top: 50%;
                    right: 50px;
                    transform: translateY(-50%);

                    div {
                        display: inline-block;
                        vertical-align: middle;
                        font-family: sans-serif;
                        text-align: center;
                        font-size: 80%;

                        &.percentage {
                            margin-left: 30px;

                            @media screen and (max-width: 800px){
                                margin-left: 20px;
                            }
                            
                            @media screen and (max-width: 600px){
                                margin-left: 15px;
                            }
                        }
                        
                        span {
                            display: block;
                            width: 100%;
                            text-align: center;
                            font-weight: 400;
                            font-size: 60%;
                        }

                        strong {
                            color: #ff0000;
                            font-size: 140%;
                            vertical-align: baseline;
                        }
                    }
                }
                
                @media screen and (max-width: 800px){
                    font-size: 20px;
                    padding: 20px 40px;

                    .scores {
                        right: 40px;
                    }
                }
                
                @media screen and (max-width: 600px){
                    font-size: 18px;
                    padding: 15px 5%;
                    
                    .scores {
                        right: 5%;
                    }
                }
            }
            
            .graph {
                display: block;
                width: 100%;
                position: relative;
                padding: 50px;
                
                @media screen and (max-width: 800px){
                    padding: 40px;
                }
                
                @media screen and (max-width: 600px){
                    padding: 30px 5%;
                }
                
                .category {
                    display: block;
                    width: 100%;
                    margin-bottom: 20px;
                    position: relative;
                    z-index: 2;
                    overflow: visible;
                    
                    .name {
                        display: inline-block;
                        max-width: 100%;
                        text-align: right;
                        line-height: 25px;
                        font-size: 14px;
                        color: #444444;
                        font-weight: 700;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        
                        @media screen and (max-width: 600px){
                            font-size: 12px;
                        }
                    }
                    
                    .bar {
                        min-width: 1%;
                        height: 50px;
                        background: #444444;
                        position: relative;
                        overflow: visible;
                        transition: 1s ease-in-out;

                        .score {
                            display: inline-block;
                            text-align: right;
                            line-height: 25px;
                            font-family: sans-serif;
                            font-size: 14px;
                            color: #ffffff;
                            font-weight: 700;
                            padding: 0 10px;
                            position: absolute;
                            top: 50%;
                            right: 0;
                            transform: translateY(-50%);

                            strong {
                                color: #ff0000;
                                font-size: 140%;
                                vertical-align: baseline;
                            }

                            &.outside {
                                color: #444444;
                                transform: translateY(-50%) translateX(100%);
                            }
                            
                            @media screen and (max-width: 600px){
                                font-size: 12px;
                            }
                        }
                    }
                }

                .line-horizontal {
                    display: block;
                    width: 100%;
                    height: 35px;
                    position: relative;
                    overflow: visible;
                    font-size: 0;
                    margin-top: 50px;
                    transform: translateY(15%);
                    
                    &::before {
                        content: "";
                        display: block;
                        width: 100%;
                        height: 2px;
                        background: #dddddd;
                    }

                    @media screen and (max-width: 800px){
                        margin-top: 40px;
                    }
                    
                    @media screen and (max-width: 600px){
                        margin-top: 30px;
                    }
                    
                    .point {
                        display: inline-block;
                        vertical-align: top;
                        position: relative;
                        height: 100%;
                        overflow: visible;

                        &::before {
                            content: "";
                            display: block;
                            width: 2px;
                            height: 10px;
                            position: absolute;
                            top: 0;
                            right: 0;
                            background: #dddddd;
                        }

                        &.one {
                            &::after {
                                content: "";
                                display: block;
                                width: 2px;
                                height: 10px;
                                position: absolute;
                                top: 0;
                                left: 0;
                                background: #dddddd;
                            }
                        }
                        
                        span {
                            display: inline-block;
                            line-height: 25px;
                            font-family: sans-serif;
                            font-size: 14px;
                            color: #444444;
                            font-weight: 700;
                            text-align: center;
                            position: absolute;
                            top: 10px;
                            right: 0;
                            transform: translateX(50%);
                            
                            &.zero {
                                left: 0;
                                transform: translateX(-50%);
                            }
                            
                            @media screen and (max-width: 600px){
                                font-size: 12px;
                            }
                        }
                    }
                }
            }

            section {
                display: block;
                width: 100%;
                position: relative;
                padding: 20px 50px 30px 50px;
                
                @media screen and (max-width: 800px){
                    padding: 20px 40px 30px 40px;
                }
                
                @media screen and (max-width: 600px){
                    padding: 15px 5% 25px 5%;
                }

                .score,
                .percentage {
                    display: inline-block;
                    vertical-align: middle;
                    font-family: sans-serif;
                    text-align: center;
                    font-size: 20px;
                    margin-right: 50px;
                    font-weight: 700;
                    
                    span {
                        display: block;
                        width: 100%;
                        text-align: center;
                        font-weight: 400;
                        font-size: 60%;
                    }

                    strong {
                        color: #ff0000;
                        font-size: 140%;
                        vertical-align: baseline;
                    }

                    @media screen and (max-width: 800px){
                        font-size: 19px;
                        margin-right: 40px;
                    }
                    
                    @media screen and (max-width: 600px){
                        font-size: 18px;
                        margin-right: 5%;
                    }
                }

                .percentage {
                    margin-right: 0;

                    strong {
                        font-size: 140%;
                        color: #ff0000;
                    }
                    
                    @media screen and (max-width: 800px){
                        margin-right: 40px;
                    }
                    
                    @media screen and (max-width: 600px){
                        margin-right: 5%;
                    }
                }

                .description {
                    display: block;
                    width: 100%;
                    line-height: auto;
                    font-size: 16px;
                    color: #444444;
                    font-weight: 700;
                    text-align: left;
                    margin-top: 20px;
                    white-space: pre-wrap;

                    @media screen and (max-width: 1000px){
                        font-size: 15px;
                    }
                    
                    @media screen and (max-width: 600px){
                        font-size: 14px;
                        margin-top: 15px;
                    }
                }
            }
        }

        .share-btn {
            display: block;
            width: 100%;
            max-width: 400px;
            height: 60px;
            border: 0;
            outline: 0;
            background: #44aa44;
            font-size: 14px;
            font-weight: 700;
            color: #ffffff;
            text-align: center;
            border-radius: 5px;
            margin: 0 auto;

            &:active {
                background: #229922;
            }
        }
    }
`

export default StyledResult