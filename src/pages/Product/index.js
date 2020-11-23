import Navbar from '../../components/Navbar';
import ProductDetail from '../../components/ProductDetail';

export default function Product(props) {
    return (
        <>
            <Navbar />
            <ProductDetail product={props} />
        </>
    )
}