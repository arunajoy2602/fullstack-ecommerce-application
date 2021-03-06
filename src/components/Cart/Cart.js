import React from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import ProductItem from '../Products/ProductItem';
import Totals from './Totals';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { Query } from 'react-apollo';
import { GET_CART } from '../../constants';


const CartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const CartItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Cart = ({ history }) => (
  <>
    {history && (
      <SubHeader goBack={() => history.goBack()} title='Cart' />
    )}
    <Query query={GET_CART}>
      {({ loading, error, data }) => {
        if (loading || error) {
          return <Alert>{loading ? 'Loading...' : error}</Alert>;
        }
        return (
          <CartWrapper>
            <CartItemsWrapper>
              {data.cart && data.cart.products.map(product => (
                <ProductItem key={product.id} data={product} />
              ))}
            </CartItemsWrapper>
            <Totals count={data.cart.total} />
            {data.cart && data.cart.products.length > 0 && (
              <Link to='/checkout'>
                <Button color='blue'>Checkout</Button>
              </Link>
            )}
          </CartWrapper>
        );
      }}
    </Query>
  </>
);


Cart.defaultProps = {
  loading: false,
  erorr: '',
  cart: {
    products: [],
    total: 0,
  },
};

export default Cart;
