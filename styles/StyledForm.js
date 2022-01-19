import styled from "styled-components"

const StyledForm = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
    background: #192841;
    padding: 60px 0;
    position: relative;
    
    .title {
        display: inline-block;
        line-height: 40px;
        font-size: 1.6rem;
        font-weight: 700;
        color: #ffffff;
        position: absolute;
        z-index: 2;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        text-transform: capitalize;

        span {
            color: #ffa500;
        }
    }
    
    form {
        display: block;
        width: 90%;
        max-width: 600px;
        margin: auto;
        padding: 30px 30px 90px 30px;
        background: #152238;
        position: relative;
        z-index: 2;
        border: 1px solid rgba(255,255,255,.2);
        border-radius: 4px;
        overflow: hidden;
        position: relative;

        @media screen and (max-width: 600px){
            padding: 20px 20px 80px 20px;
        }

        button[type=button]{
            display: block;
            width: 40px;
            height: 40px;
            background: transparent;
            border: 0;
            padding: 10px;
            margin-bottom: 30px;
            transform: translateX(-10px);
            
            @media screen and (max-width: 600px){
                margin-bottom: 20px;
            }
            
            svg {
                display: block;
                width: 100%;
                height: 100%;

                polyline {
                    stroke: #ffffff;
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }
            }
        }
        
        h2 {
            display: block;
            width: 100%;
            line-height: 40px;
            font-size: 30px;
            text-align: left;
            font-weight: 700;
            color: #ffffff;

            @media screen and (max-width: 600px){
                line-height: 35px;
                font-size: 25px;
            }
        }
        
        p {
            display: block;
            width: 100%;
            line-height: 25px;
            font-size: 16px;
            text-align: left;
            font-weight: 400;
            color: #dddddd;
            margin-bottom: 40px;
            
            @media screen and (max-width: 600px){
                line-height: 22px;
                font-size: 15px;
            }
        }

        .fields {
            display: block;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 10px;
            
            input[type=text],
            input[type=email],
            select {
                display: block;
                grid-column: 1/3;
                width: 100%;
                height: 50px;
                padding: 0 20px;
                border: 0;
                border-radius: 4px;
                background: rgba(255,255,255,.1);
                font-weight: 700;
                color: #dddddd;
                font-size: 16px;
                text-align: left;
                position: relative;
                z-index: 1;
                margin-bottom: 10px;

                @media screen and (min-width: 601px){
                    &[name=fullName]{
                        grid-column: 1/2;
                    }
                    
                    &[name=phone]{
                        grid-column: 2/3;
                    }
                }
                
                option {
                    background: #192841;
                }
                
                @supports (display: grid){
                    margin-bottom: 0;
                }
                
                @media screen and (max-width: 600px){
                    font-size: 15px;
                }
            }
        }

        button[type=submit]{
            display: block;
            width: 100%;
            height: 50px;
            position: absolute;
            bottom: 0;
            left: 0;
            border: 0;
            background: #dddddd;
            font-weight: 700;
            font-size: 13px;
            text-align: center;
            color: #222222;
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
                background: #dddddd;
            }
            
            &.loading {
                color: transparent;
                cursor: progress;
                
                img {
                    opacity: 1;
                }
            }
            
            @media screen and (max-width: 600px){
                font-size: 12px;
            }
        }

        .error {
            display: block;
            width: 100%;
            padding: 15px;
            background: #ff0000;
            color: #ffffff;
            font-weight: 700;
            line-height: 25px;
            font-size: 16px;
            text-align: left;
            border-radius: 5px;
            margin-top: 10px;
            
            @media screen and (max-width: 600px){
                font-size: 15px;
            }
        }
    }
`

export default StyledForm