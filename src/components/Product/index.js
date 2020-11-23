import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import api from '../../services/api';

import { ProductWrapper } from './styles';

import defaultImage from '../../assets/image-placeholder.svg';

export default function Product() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);

    //Buscar produtos
    useEffect(() => {
        async function fetchData() {
            const query = `{allSkus{id name salePrice promotionalPrice imageUrl}}`;
            const products = await api.get(`graphql?query=${query}`);
            setProducts(products.data.data.allSkus);
        }
        fetchData();
    }, [setProducts]);

    //Função para formartar
    function formattedValue(data) {
        return data.length >= 12 ?
            Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data).replace('.', '').replace(/(\d{2})/, "$1.").replace(',', '').substr(0, 8)
            :
            Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data).replace('.', '').replace(/(\d{3})/, "$1.").replace(',', '').substr(0, 9)
    }

    return (
        <ProductWrapper>

            <h1>Produtos</h1>
            <ul>
                <InfiniteScroll className="scrollInfinite" dataLength={products.length} next={() => setPage(page + 1)} hasMore={true}>
                    {products.map(product => (
                        <li key={product.id}>
                            <img src={product.imageUrl ? product.imageUrl : defaultImage} alt="" />
                            <h1>{product.name}</h1>
                            {product.salePrice < product.promotionalPrice ?
                                <p>{formattedValue(product.salePrice)} </p>
                                :
                                <>
                                    {product.promotionalPrice < product.salePrice ?
                                        <p> <span className="promotional">{formattedValue(product.salePrice)}</span> por {formattedValue(product.promotionalPrice)}</p>
                                        :
                                        formattedValue(product.salePrice)}
                                </>
                            }
                            <Link className="link" to={`/product/${product.id}`}>Ver detalhes</Link>
                        </li>
                    ))}
                </InfiniteScroll>
            </ul>
        </ProductWrapper>
    )
}