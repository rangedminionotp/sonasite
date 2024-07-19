export interface ItemByGroupProps {
  items: ItemsType;
}

interface ItemsType {
  starter: ItemDataType[];
  basic: ItemDataType[];
  epic: ItemDataType[];
  legendary: ItemDataType[];
  boots: ItemDataType[];
  consumablesTrinkets: ItemDataType[];
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

export const ItemSideBarNames = [
  "Attack Damage",
  "Crit Chance",
  "Attack Speed",
  "Armor Penetration",
  "On-Hit",
  "Life Steal",
  "Ability Power",
  "Mana",
  "Magic Penetration",
  "Health",
  "Armor",
  "Magic Resist",
  "Ability Haste",
  "Movement Speed",
  "Omni-Vamp",
  "Mana Regen",
];
export const ItemSideBarTags = [
  "damage",
  "criticalstrike",
  "attackspeed",
  "armorpenetration",
  "onhit",
  "lifesteal",
  "spelldamage",
  "mana",
  "magicpenetration",
  "health",
  "armor",
  "spellblock",
  "cooldownreduction",
  ["boots", "nonbootsmovement"],
  "spellvamp",
  "manaregen",
];
