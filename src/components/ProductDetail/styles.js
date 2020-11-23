import styled from 'styled-components';

export const ProductWrapper = styled.div`
   display: flex;

    .button-return {
       padding: 25px 0px 0px 50px;
    }

   .link {
        text-decoration: none;
        display: flex;
        align-items: center;
        color: var(--black);
        transition: 0.3s;

        &:hover {
            color: #ccc;
        }
    }

    .productView {
       padding: 50px;

       h1 {
           font-size: 24px;
           font-family: Arial, Helvetica, sans-serif;
           margin-bottom: 20px;
       }
       
       p {
           font-size: 18px;

           &:nth-child(1n+2) {
               padding-top: 10px;
               font-family: Arial, Helvetica, sans-serif;
           }
       }
       img {
           width: 120px;
       }

       button {
            background: var(--black);
            border-radius: 5px;
            border: 1px solid transparent;
            color: var(--white);
            margin-top: 20px;
            padding: 5px;
            transition: 0.3s;
            text-decoration: none;
            
            &:nth-child(1n+2) {
                margin-left: 5px;
            }

            &:hover {
                background: var(--white);
                border: 1px solid var(--black);
                color: var(--black);
            }
       }
   }
`;