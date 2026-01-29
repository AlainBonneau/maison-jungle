import Footer from '../components/layout/Footer'
import ShoppingList from '../components/ShoppingList'
import type { CartItem } from '../types/cart';
import type { Plant } from '../types/plant';
import '../styles/Layout.css'

function HomePage({ cart, addToCart } : { cart: CartItem[]; addToCart: (plant: Plant) => void }) {
	return (
		<div>
			<div className='lmj-layout-inner'>
				<ShoppingList cart={cart} addToCart={addToCart} />
			</div>
			<Footer />
		</div>
	)
}

export default HomePage 