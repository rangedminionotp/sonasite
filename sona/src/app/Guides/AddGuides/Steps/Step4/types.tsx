export interface ItemByGroupProps {
  items: ItemsType;
}

interface ItemsType {
  starter: ItemDataType[];
  basic: ItemDataType[];
  epic: ItemDataType[];
  legendary: ItemDataType[];
  boots: ItemDataType[];
}

interface GoldType {
  base: number;
  purchasable: boolean;
  total: number;
  sell: number;
}

interface ItemDataType {
  id: string;
  name: string;
  image: string;
  plaintext: string;
  gold?: GoldType | null;
  tags?: string[] | null;
  buildInto?: string[] | null;
  buildFrom?: string[] | null;
  inStore?: boolean | null;
}
