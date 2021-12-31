import styled from "styled-components"

const StyledShare = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: auto;
    position: fixed;
    z-index: 100;
    background: rgba(0,0,0,.9);
    padding: 60px 0;

    .modal {
        display: block;
        width: 90%;
        max-width: 400px;
        margin: auto;
        position: relative;
        z-index: 2;
        background: #222222;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid #444444;

        h1 {
            display: block;
            width: 100%;
            line-height: 60px;
            font-size: 20px;
            font-weight: 700;
            text-align: left;
            background: #cd5c5c;
            color: #ffffff;
            padding: 0 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: relative;

            button {
                display: block;
                width: 60px;
                height: 60px;
                position: absolute;
                top: 0;
                right: 0;
                border: 0;
                outline: 0;
                background: transparent;

                span {
                    display: block;
                    width: 25px;
                    height: 2px;
                    background: #ffffff;
                    position: absolute;
                    top: 50%;
                    left: 50%;

                    &:nth-child(1){
                        transform: translateY(-50%) translateX(-50%) rotate(45deg);
                    }
                    
                    &:nth-child(2){
                        transform: translateY(-50%) translateX(-50%) rotate(-45deg);
                    }
                }
            }

            @media screen and (max-width: 400px){
                font-size: 18px;
            }
        }

        .btns {
            display: block;
            width: 100%;

            a {
                display: block;
                width: 100%;
                line-height: 60px;
                font-size: 16px;
                font-weight: 700;
                text-align: left;
                color: #ffffff;
                padding: 0 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                border-bottom: 1px solid #444444;

                &:first-child {
                    padding-top: 10px;
                }

                &:last-child {
                    padding-bottom: 10px;
                    border: 0;
                }

                @media screen and (max-width: 400px){
                    font-size: 14px;
                }
            }
        }
    }
    
    .bg-layer {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
    }
`

export default StyledShare