import { Icategory } from './category';

export interface Iproduct {
  composition?: string;
  name: string;
  price: number;
  imagePath: string;
  volume?: string;
  path: string;
  id?: number;
  category: Icategory;
  count?: number;
}
