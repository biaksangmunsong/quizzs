import styled from "styled-components"

const StyledSignIn = styled.div`
    display: block;
    width: 100%;
    
    main {
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
            width: 90%;
            max-width: 800px;
            margin: auto;
            position: relative;
            z-index: 2;

            .loading {
                display: block;
                width: 100%;
                
                img {
                    display: block;
                    width: 60px;
                    height: 60px;
                    margin: 0 auto;
                }
            }
            
            form {
                display: block;
                width: 100%;
                
                h1 {
                    display: block;
                    width: 100%;
                    line-height: auto;
                    font-size: 3rem;
                    text-align: center;
                    font-weight: 700;
                    color: #222222;
                    margin-bottom: 6px;
                    
                    @media screen and (max-width: 1000px){
                        font-size: 2.5rem;
                    }

                    @media screen and (max-width: 600px){
                        font-size: 2rem;
                    }
                }
                
                h2 {
                    display: block;
                    width: 100%;
                    line-height: auto;
                    font-size: 1.2rem;
                    text-align: center;
                    font-weight: 400;
                    color: #222222;
                    margin-bottom: 40px;

                    @media screen and (max-width: 1000px){
                        font-size: 1rem;
                    }
                }

                .input-and-button {
                    display: block;
                    width: 100%;
                    position: relative;

                    input[type=email]{
                        display: block;
                        width: 100%;
                        height: 60px;
                        padding: 0 120px 0 20px;
                        border: 2px solid #dddddd;
                        border-radius: 5px;
                        background: #ffffff;
                        font-weight: 700;
                        color: #009900;
                        font-size: 1.2rem;
                        text-align: left;
                        position: relative;
                        z-index: 1;

                        @media screen and (max-width: 1000px){
                            font-size: 1rem;
                        }

                        @media screen and (max-width: 500px){
                            padding: 0 15px;
                        }
                    }
                    
                    button[type=submit]{
                        display: block;
                        width: 100px;
                        height: 40px;
                        position: absolute;
                        z-index: 2;
                        top: 10px;
                        right: 10px;
                        border: 0;
                        background: #bbbbbb;
                        font-weight: 700;
                        font-size: 12px;
                        text-align: center;
                        color: #ffffff;
                        border-radius: 5px;
                        font-family: "Raleway", sans-serif;
                        text-transform: uppercase;
                        cursor: not-allowed;
                        
                        img {
                            display: inline-block;
                            vertical-align: middle;
                            width: 20px;
                            height: 20px;
                            opacity: 0;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translateX(-50%) translateY(-50%);
                        }

                        &.active {
                            background: #8a2be2;
                            cursor: pointer;

                            &:active {
                                background: #000099;
                            }

                            &.loading {
                                color: transparent;
                                cursor: progress;
                                
                                img {
                                    opacity: 1;
                                }
                            }
                        }

                        @media screen and (max-width: 500px){
                            width: 100%;
                            height: 50px;
                            position: relative;
                            padding: 0;
                            top: 0;
                            right: 0;
                            margin-top: 10px;
                        }
                    }
                }
                
                input[type=text],
                select {
                    display: block;
                    width: 100%;
                    height: 60px;
                    padding: 0 20px;
                    border: 2px solid #dddddd;
                    border-radius: 5px;
                    background: #ffffff;
                    font-weight: 700;
                    color: #009900;
                    font-size: 1.2rem;
                    text-align: left;
                    position: relative;
                    z-index: 1;
                    margin-bottom: 10px;

                    @media screen and (min-width: 601px){
                        &.short {
                            display: inline-block;
                            vertical-align: middle;
                            width: 49.5%;
                            margin-right: 1%;

                            &.no-margin {
                                margin-right: 0;
                            }
                        }
                    }
                    
                    @media screen and (max-width: 1000px){
                        font-size: 1rem;
                    }
                }
                
                .new-user-submit-btn {
                    display: block;
                    width: 100%;
                    max-width: 300px;
                    margin: 20px auto 0 auto;
                    height: 60px;
                    position: relative;
                    border: 0;
                    background: #8a2be2;
                    font-weight: 700;
                    font-size: 12px;
                    text-align: center;
                    color: #ffffff;
                    border-radius: 5px;
                    font-family: "Raleway", sans-serif;
                    text-transform: uppercase;
                    cursor: pointer;
                    
                    img {
                        display: inline-block;
                        vertical-align: middle;
                        width: 20px;
                        height: 20px;
                        opacity: 0;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translateX(-50%) translateY(-50%);
                    }

                    &:active {
                        background: #000099;
                    }
                    
                    &.loading {
                        color: transparent;
                        cursor: progress;
                        
                        img {
                            opacity: 1;
                        }
                    }
                    
                    @media screen and (max-width: 600px){
                        max-width: 100%;
                        margin: 0;
                    }
                }

                .message {
                    display: block;
                    width: 100%;
                    padding: 20px;
                    border-radius: 10px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    text-align: left;
                    color: #ffffff;
                    margin-top: 20px;
                    
                    &.success {
                        background: #009900;
                    }

                    &.error {
                        background: #dd0000;
                    }
                    
                    @media screen and (max-width: 1000px){
                        font-size: .9rem;
                    }

                    @media screen and (max-width: 500px){
                        padding: 15px;
                    }
                }
            }
        }
    }
    
    .page-message {
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
                
                &:active {
                    background: #0000ff;
                }
                
                @media screen and (max-width: 600px){
                    font-size: .8rem;
                }
            }
        }
    }
`

export default StyledSignIn