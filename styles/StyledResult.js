import styled from "styled-components"

const StyledResult = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
    background: #ffffff;
    
    .sub-container {
        display: block;
        width: 90%;
        max-width: 1000px;
        margin: 0 auto;
        padding: 60px 0;
        
        @media screen and (max-width: 1100px){
            padding: 5vw 0;
        }
        
        h1 {
            display: block;
            width: 100%;
            line-height: auto;
            font-size: 2.2rem;
            text-align: center;
            font-weight: 700;
            color: #222222;

            @media screen and (max-width: 1000px){
                font-size: 2rem;
            }

            @media screen and (max-width: 800px){
                font-size: 1.6rem;
            }

            @media screen and (max-width: 600px){
                font-size: 1.4rem;
            }
        }
        
        .users-name {
            display: block;
            width: 100%;
            line-height: auto;
            font-size: 16px;
            text-align: center;
            font-weight: 700;
            color: #aaaaaa;
            margin-bottom: 60px;

            @media screen and (max-width: 1000px){
                font-size: 15px;
            }
            
            @media screen and (max-width: 1100px){
                margin-bottom: 5vw;
            }

            @media screen and (max-width: 800px){
                font-size: 14px;
            }

            @media screen and (max-width: 600px){
                font-size: 12px;
            }
        }
        
        .cards {
            display: block;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px;
            width: 100%;
            
            @media screen and (max-width: 400px){
                grid-gap: 5vw;
            }
            
            .card {
                display: block;
                width: 100%;
                background: #ffffff;
                border: 1px solid #dddddd;
                box-shadow: 0 0 20px rgba(0,0,0,.2);
                border-radius: 10px;
                margin-bottom: 20px;

                @media screen and (max-width: 1000px){
                    grid-column: 1/3;
                }
                
                &.overview {
                    grid-column: 1/3;
                }

                @supports (display: grid){
                    margin-bottom: 0;
                }
                
                @media screen and (max-width: 1100px){
                    margin-bottom: 5vw;

                    @supports (display: grid){
                        margin-bottom: 0;
                    }
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
                    padding: 20px 100px 20px 50px;
                    
                    .right {
                        display: inline-block;
                        vertical-align: middle;
                        position: absolute;
                        top: 50%;
                        right: 50px;
                        transform: translateY(-50%);
                        font-family: sans-serif;
                        text-align: center;
                        font-size: 80%;
                            
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
                    
                    @media screen and (max-width: 800px){
                        font-size: 20px;
                        padding: 20px 90px 20px 40px;

                        .right {
                            right: 40px;
                        }
                    }
                    
                    @media screen and (max-width: 600px){
                        font-size: 18px;
                        padding: 15px 80px 15px 5%;
                        
                        .right {
                            right: 5%;
                        }
                    }
                }

                .pie-chart {
                    display: block;
                    width: 100%;
                    margin: 0 auto;
                    padding: 50px;
                    
                    @media screen and (max-width: 800px){
                        padding: 40px;
                    }
                    
                    @media screen and (max-width: 600px){
                        padding: 30px 5%;
                    }

                    .chart {
                        display: inline-block;
                        vertical-align: middle;
                        width: 50%;
                        overflow: visible;
                        position: relative;
                        border-right: 50px solid transparent;
                        cursor: pointer;

                        @media screen and (max-width: 800px){
                            border-right: 40px solid transparent;
                        }

                        @media screen and (max-width: 600px){
                            display: block;
                            width: 100%;
                            max-width: 300px;
                            border: 0;
                            margin: 0 auto 30px auto;
                        }
                        
                        .percentage {
                            display: block;
                            width: 100%;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            text-align: center;
                            font-weight: 700;
                            font-size: 20px;
                            color: #222222;
                            
                            strong {
                                color: #ff0000;
                                font-size: 140%;
                                vertical-align: baseline;
                            }

                            @media screen and (max-width: 1000px){
                                font-size: 16px;
                            }

                            @media screen and (max-width: 800px){
                                font-size: 14px;
                            }
                        }
                    }

                    .reference {
                        display: inline-block;
                        vertical-align: middle;
                        width: 50%;

                        @media screen and (max-width: 600px){
                            display: block;
                            width: 100%;
                            max-width: 300px;
                            border: 0;
                            margin: 0 auto;
                        }
                        
                        .category {
                            display: block;
                            width: 100%;
                            position: relative;
                            padding-left: 30px;
                            margin-bottom: 15px;
                            transition: .2s linear;
                            cursor: pointer;
                            
                            &:last-child {
                                margin-bottom: 0;
                            }

                            &.blured {
                                opacity: .2;
                                
                                &.hovered {
                                    opacity: 1;
                                }
                            }
                            
                            .color-code {
                                display: block;
                                width: 20px;
                                height: 20px;
                                border-radius: 4px;
                                position: absolute;
                                top: 50%;
                                transform: translateY(-50%);
                                left: 0;
                            }

                            .category-title {
                                display: block;
                                width: 100%;
                                line-height: auto;
                                font-size: 1.2rem;
                                color: #444444;
                                text-align: left;
                                font-weight: 400;
                            }

                            @media screen and (max-width: 1000px){
                                .color-code {
                                    width: 18px;
                                    height: 18px;
                                }

                                .category-title {
                                    font-size: 1rem;
                                }
                            }

                            @media screen and (max-width: 600px){
                                .color-code {
                                    width: 16px;
                                    height: 16px;
                                }

                                .category-title {
                                    font-size: .9rem;
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

                    .score {
                        display: inline-block;
                        vertical-align: middle;
                        font-family: sans-serif;
                        text-align: left;
                        font-size: 20px;
                        margin-right: 0;
                        font-weight: 700;
                        
                        span {
                            display: block;
                            width: 100%;
                            text-align: left;
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

                    .description {
                        display: block;
                        width: 100%;
                        line-height: 25px;
                        font-size: 16px;
                        color: #888888;
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

            &.odd {
                .card {
                    &:last-child {
                        grid-column: 1/3;
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
            margin: 60px auto 0 auto;
            
            &:active {
                background: #229922;
            }
            
            @media screen and (max-width: 1100px){
                margin-top: 5vw;
            }
        }
    }
`

export default StyledResult