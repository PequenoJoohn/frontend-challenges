import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { BiChevronLeft } from 'react-icons/bi';

import { ProductWrapper } from './styles';

import api from '../../services/api';

import defaultImage from '../../assets/image-placeholder.svg';

const ProductDetail = (props) => {

    const productId = props.product.match.params.id;

    const [product, setProduct] = useState([0]);
    const [edit, setEdit] = useState(false);
    const history = useHistory();

    const [quantity, setQuantity] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [promotionalPrice, setPromotionalPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [depth, setDepth] = useState('');
    
    async function handleModify(e) {
        e.preventDefault();
        
        const updatedQuery = `mutation { updateSku(
            id: ${productId}, 
            quantity: ${!quantity ? product.quantity : quantity}, 
            salePrice: ${!salePrice ? product.salePrice : salePrice}, 
            promotionalPrice: ${!promotionalPrice ? product.promotionalPrice : promotionalPrice}, 
            package: {
                weight: ${!weight ? product.package?.weight : weight}, 
                height: ${!height ? product.package?.height : height}, 
                width: ${!width ? product.package?.width : width}, 
                depth: ${!depth ? product.package?.depth : depth}
            })
            {
                id
                quantity 
                salePrice 
                promotionalPrice
                package
            }}`
            
            try {
                await api.post(`?query=${updatedQuery}`).then(response => {
                    console.log(response);
                    editProduct();
                    history.go(0)
                });
            } catch (err) {
                alert(err)
            }
        }
        
    function editProduct() {
        setEdit(!edit);
        setQuantity('');
        setSalePrice('');
        setPromotionalPrice('');
        setWeight('');
        setHeight('');
        setWidth('');
        setDepth('');
    }

    useEffect(() => {
        async function asyncFunction() {
            const query = `{ Sku(id: ${productId}){ name imageUrl quantity salePrice promotionalPrice package }}`;
            await api.get(`?query=${query}`)
                .then(response => {
                    setProduct(response.data.data.Sku);
                });
        }
        asyncFunction();
    }, [productId]);

    return (
        <>
            <ProductWrapper>
                <div>
                    <div className="button-return" >
                        <Link className="link" to="/"><BiChevronLeft />Produtos</Link>
                    </div>
                    <div className="productView">

                        <form onSubmit={handleModify}>
                            <h1>{product.name}</h1>
                            <img src={product.imageUrl ? product.imageUrl : defaultImage} alt="" />

                            {edit ?
                                <>
                                    <p>Estoque:<input placeholder={product.quantity} value={quantity} onChange={e => setQuantity(e.target.value)} /></p>
                                    <p>Preço de venda:<input placeholder={product.salePrice} value={salePrice} onChange={e => setSalePrice(e.target.value)} /></p>
                                    <p>Preço Promocional:<input placeholder={product.promotionalPrice} value={promotionalPrice} onChange={e => setPromotionalPrice(e.target.value)} /></p>
                                    <p>Peso: <input placeholder={product.package?.weight} value={weight} onChange={e => setWeight(e.target.value)} /></p>
                                    <p>Altura: <input placeholder={product.package?.height} value={height} onChange={e => setHeight(e.target.value)} /></p>
                                    <p>Largura: <input placeholder={product.package?.width} value={width} onChange={e => setWidth(e.target.value)} /></p>
                                    <p>Profundidade: <input placeholder={product.package?.depth} value={depth} onChange={e => setDepth(e.target.value)} /></p>
                                </>
                                :
                                <>
                                    <p>Estoque: {product.quantity}</p>
                                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.salePrice).length >= 12 ?
                                        <p>Preço de Venda: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.salePrice).replace('.', '').replace(/(\d{3})/, "$1.").replace(',', '').substr(0, 9)}</p>
                                        :
                                        <p>Preço de Venda: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.salePrice).replace('.', '').replace(/(\d{2})/, "$1.").replace(',', '').substr(0, 8)}</p>
                                    }
                                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promotionalPrice).length >= 12 ?
                                        <p>Preço Promocional: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promotionalPrice).replace('.', '').replace(/(\d{3})/, "$1.").replace(',', '').substr(0, 9)}</p>
                                        :
                                        <p>Preço Promocional: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promotionalPrice).replace('.', '').replace(/(\d{2})/, "$1.").replace(',', '').substr(0, 8)}</p>
                                    }
                                    <p>Peso: {product.package?.weight} kg</p>
                                    <p>Altura: {product.package?.height} cm</p>
                                    <p>Largura: {product.package?.width} cm</p>
                                    <p>Profundidade: {product.package?.depth} cm</p>
                                </>
                            }
                            {edit ?
                                <>
                                    <button type="submit"> Salvar </button>
                                    <button onClick={editProduct}>Cancelar</button>
                                </>
                                :
                                <button onClick={editProduct}>Editar Produto</button>
                            }
                        </form>
                    </div>
                </div>
            </ProductWrapper>
        </>
    )
}

export default ProductDetail;