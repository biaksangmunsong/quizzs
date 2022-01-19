import styled from "styled-components"

const StyledTest = styled.div`
    display: block;
    width: 100%;
    min-height: 100vh;

    .page-loading {
        display: flex;
        width: 100%;
        min-height: 100vh;
        padding: 50px 0;

        img {
            display: block;
            width: 60px;
            height: 60px;
            margin: auto;
        }
    }

    .message {
        display: flex;
        width: 100%;
        min-height: 100vh;
        padding: 50px 0;

        .sub-container {
            display: block;
            width: 90%;
            max-width: 600px;
            margin: auto;
            text-align: center;
            
            p {
                display: block;
                width: 100%;
                line-height: 40px;
                font-size: 30px;
                text-align: center;
                color: #ffffff;
                font-weight: 700;

                @media screen and (max-width: 600px){
                    line-height: 35px;
                    font-size: 25px;
                }
            }

            .cta {
                display: inline-block;
                padding: 0 30px;
                line-height: 40px;
                border: 0;
                border-radius: 4px;
                background: #ffffff;
                text-align: center;
                font-weight: 700;
                text-transform: uppercase;
                font-family: "Raleway", sans-serif;
                color: #222222;
                font-size: 14px;
                margin-top: 20px;

                @media screen and (max-width: 600px){
                    line-height: 38px;
                    font-size: 13px;
                }
            }
        }
    }
`

export default StyledTest