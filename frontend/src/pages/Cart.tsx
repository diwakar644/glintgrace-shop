import styled from 'styled-components';
import { useCart } from '../store';
import { Link } from 'react-router-dom';
import { Trash2, Heart, Truck, ArrowRight, PlusCircle } from 'lucide-react';

const Section = styled.section`
  padding-bottom: 2rem;
  background-color: #f9fafb; /* neutral-50 */
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const MainContent = styled.main``;

const Sidebar = styled.aside``;

const Card = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CartItemArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ItemImageContainer = styled.div`
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemTitle = styled.h5`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  
  a {
    color: #1f2937;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ItemMeta = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.4;
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  @media (max-width: 640px) {
    align-items: flex-start;
    margin-top: 1rem;
  }
`;

const PriceTag = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Select = styled.select`
  padding: 0.375rem 2rem 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  font-size: 0.875rem;
  cursor: pointer;
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
  }

  &.danger:hover {
    color: #ef4444;
    border-color: #ef4444;
    background-color: #fef2f2;
  }
`;

const SummaryCard = styled.div`
  background-color: rgb(241, 245, 249);
  padding: 1.25rem;
  border-radius: 0.5rem;
`;

const PromoForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const Button = styled.button<{ $primary?: boolean; $secondary?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${props => props.$primary && `
    background-color: #10b981;
    color: white;
    width: 100%;
    font-size: 1.125rem;
    padding: 0.75rem;

    &:hover {
      background-color: #059669;
    }
  `}

  ${props => props.$secondary && `
    background-color: #3b82f6;
    color: white;
    
    &:hover {
      background-color: #2563eb;
    }
  `}

  ${props => !props.$primary && !props.$secondary && `
    background-color: white;
    border-color: #d1d5db;
    color: #374151;

    &:hover {
      background-color: #f9fafb;
    }
  `}
`;

const SummaryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SummaryItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  color: #4b5563;
  
  var {
    font-style: normal;
    font-weight: 500;
    color: #111827;
  }
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #d1d5db;
  margin: 1rem 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
`;

const DeliveryBox = styled.figure`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  padding: 0.75rem;
  background-color: #e5e7eb;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  gap: 0.75rem;
`;

const IconBox = styled.span`
  background: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f97316; /* Orange */
`;

const DeliveryText = styled.figcaption`
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.25;
`;

const RemoveAllLink = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: underline;
  width: 100%;
  text-align: right;
  margin-top: 1rem;
  
  &:hover {
    color: #dc2626;
  }
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;


export default function Cart() {
  const { cart, removeFromCart, total, clearCart, addToCart } = useCart();

  // Add Demo Items for Testing
  const addDemoItems = () => {
    addToCart({ id: 101, name: "Gold Ear Ring", price: 2999, image: "https://images.unsplash.com/photo-1651160670627-2896ddf7822f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8andlbGxlcnl8ZW58MHx8MHx8fDA%3D" });
    addToCart({ id: 102, name: "Diamond Necklace", price: 4500, image: "https://images.unsplash.com/photo-1656428851610-a2de17b056a1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" });
    addToCart({ id: 103, name: "Silver Bracelet", price: 1200, image: "https://images.unsplash.com/photo-1679156271456-d6068c543ee7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8andlbGxlcnl8ZW58MHx8MHx8fDA%3D" });
  };

  const subTotal = total();
  const tax = subTotal * 0.18;
  const delivery = subTotal > 0 ? 50 : 0; 
  const discount = 0; 
  const finalTotal = subTotal + tax + delivery - discount;

  if (cart.length === 0) {
    return (
      <Section>
        <Container>
          <EmptyStateContainer>
            <div style={{ marginBottom: '1rem', color: '#d1d5db' }}>
              <Trash2 size={64} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151' }}>Your Cart is Empty</h2>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Looks like you haven't added anything yet.</p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/">
                <Button>Go Shopping</Button>
              </Link>
              
              <Button $secondary onClick={addDemoItems}>
                <PlusCircle size={18} /> Add Demo Items
              </Button>
            </div>
          </EmptyStateContainer>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container style={{ paddingTop: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Your Cart</h2>
        <h2 style={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'rgb(107, 124, 148)' }}>{cart.length} Products in your cart</h2>

        <Grid>
          <MainContent>
            <Card>
              {cart.map((item) => (
                <CartItemArticle key={item.id}>
                  <ItemImageContainer>
                    <img src={item.image} alt={item.name} />
                  </ItemImageContainer>

                  <ItemInfo>
                    <ItemTitle>
                      <Link to="#">{item.name}</Link>
                    </ItemTitle>
                    <ItemMeta>
                      {/* Dynamically import this from the database */}
                      Size: Medium <br />
                      Material: Standard <br />
                      Color: Default
                    </ItemMeta>
                  </ItemInfo>

                  <ItemActions>
                    <PriceTag>₹{item.price.toFixed(2)}</PriceTag>
                    
                    <ActionButtons>
                      <Select defaultValue="1">
                        <option value="1">Qty: 1</option>
                        <option value="2">Qty: 2</option>
                        <option value="3">Qty: 3</option>
                        <option value="4">Qty: 4</option>
                      </Select>
                      
                      <IconButton title="Save for later">
                        <Heart size={18} />
                      </IconButton>
                      
                      <IconButton 
                        className="danger" 
                        title="Remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </ActionButtons>
                  </ItemActions>
                </CartItemArticle>
              ))}

              <RemoveAllLink onClick={clearCart}>
                Remove all from cart
              </RemoveAllLink>
            </Card>
          </MainContent>

          <Sidebar>
            <SummaryCard>
              <PromoForm onSubmit={(e) => e.preventDefault()}>
                <Input type="text" placeholder="Enter Promocode" />
                <Button type="button">Apply</Button>
              </PromoForm>

              <SummaryList>
                <SummaryItem>
                  <label>Items ({cart.length}):</label>
                  <var>₹{subTotal.toFixed(2)}</var>
                </SummaryItem>
                <SummaryItem>
                  <label>Discount:</label>
                  <var style={{ color: '#10b981' }}>- ₹{discount.toFixed(2)}</var>
                </SummaryItem>
                <SummaryItem>
                  <label>Delivery:</label>
                  <var>₹{delivery.toFixed(2)}</var>
                </SummaryItem>
                <SummaryItem>
                  <label>Tax:</label>
                  <var>₹{tax.toFixed(2)}</var>
                </SummaryItem>
              </SummaryList>

              <Divider />

              <TotalRow>
                <span>Total:</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </TotalRow>

              <Button 
                $primary 
                onClick={() => {
                  alert("Proceeding to checkout..."); 
                  clearCart();
                }}
              >
                Checkout <ArrowRight size={20} style={{ marginLeft: '8px', verticalAlign: 'middle' }}/>
              </Button>

              <DeliveryBox>
                <IconBox>
                  <Truck size={24} />
                </IconBox>
                <DeliveryText>
                  Expected delivery <br />
                  <strong>Sun, Feb 31, 2026</strong>
                </DeliveryText>
              </DeliveryBox>
            </SummaryCard>
          </Sidebar>
        </Grid>
      </Container>
    </Section>
  );
}