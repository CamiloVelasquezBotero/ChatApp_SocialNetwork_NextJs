import React from 'react'

export default function Spinner() {
  return (
    <>
        <style>
            {`
                .loader {
                    width: 48px;
                    height: 48px;
                    border: 3px solid #000000;
                    border-radius: 50%;
                    display: inline-block;
                    position: relative;
                    box-sizing: border-box;
                    animation: rotation 1s linear infinite;
                }
                .loader::after,
                .loader::before {
                    content: '';  
                    box-sizing: border-box;
                    position: absolute;
                    left: 0;
                    top: 0;
                    background: #09FF00;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }
                .loader::before {
                    left: auto;
                    top: auto;
                    right: 0;
                    bottom: 0;
                }

                @keyframes rotation {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                } 
            `}
        </style>

        <div className='h-full pt-30'>
            <span className="loader"></span>
        </div>
    </>
  )
}
