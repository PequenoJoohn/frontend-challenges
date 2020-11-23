import styled from 'styled-components';

export const ProductWrapper = styled.div`

    > h1 {
        padding: 50px 0 30px 50px;
        font-size: 36px;
    }
   
    .scrollInfinite {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        justify-items:center;
        align-items: center;

        li {
            align-items: center;
            border-radius: 25px;
            border: 1px solid #ccc;
            display: grid;
            grid-template-rows: 180px 10px 50px 40px;
            font-family: 'Rubik', sans-serif;
            height: 300px;
            justify-items:center;
            margin: 10px;
            text-align: center;
            width: 300px;
            background: #f8f9fa;

            .link {
                text-decoration: none;
                color: var(--white);
                transition: 0.3s;
                background: var(--black);
                padding: 5px;
                border-radius: 5px;
                border: 1px solid transparent;

                &:hover {
                    background: var(--white);
                    color: var(--black);
                    border: 1px solid var(--black);
                }
            }

            img {
                width: 100px;
               background-size: cover;
           }
       }
   }

   .promotional {
    text-decoration: line-through;
   }
`;