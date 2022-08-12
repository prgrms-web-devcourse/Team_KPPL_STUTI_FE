import { ReactNode } from 'react';

import { Article } from './ItemCard.style';

interface Props {
  children: ReactNode;
}

function ItemCard({ children }: Props) {
  return <Article>{children}</Article>;
}
export default ItemCard;
